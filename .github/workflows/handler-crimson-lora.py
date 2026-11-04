#!/usr/bin/env python3
"""
Crimson LoRA Serverless Handler
Generates images using SDXL + our trained Crimson LoRA for character consistency
"""

import os
import io
import base64
import json
import time
import urllib.request
import torch
from PIL import Image
from diffusers import StableDiffusionXLPipeline, DPMSolverMultistepScheduler
import runpod

# Configuration
SDXL_BASE_PATH = os.environ.get('SDXL_BASE_PATH', '/workspace/models/sdxl')
LORA_PATH = os.environ.get('LORA_PATH', '/workspace/models/lora/crimson-sdxl-lora.safetensors')
LORA_DOWNLOAD_URL = os.environ.get('LORA_DOWNLOAD_URL', 'https://github.com/absoluteclaw310-arch/crimson-lora/releases/download/v1.0.0/crimson-sdxl-lora.safetensors')
TRIGGER_WORD = os.environ.get('TRIGGER_WORD', 'crimson woman')

# Global pipeline (loaded once at import time for cold-start efficiency)
pipe = None
lora_loaded = False

def download_file(url, path, timeout=300):
    """Download a file with progress"""
    os.makedirs(os.path.dirname(path), exist_ok=True)
    
    if os.path.exists(path):
        print(f"File already exists: {path}")
        return True
    
    print(f"Downloading from {url}...")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        
        with urllib.request.urlopen(req, timeout=timeout) as response:
            total_size = int(response.headers.get('Content-Length', 0))
            downloaded = 0
            chunk_size = 1024 * 1024
            
            with open(path, 'wb') as f:
                while True:
                    chunk = response.read(chunk_size)
                    if not chunk:
                        break
                    f.write(chunk)
                    downloaded += len(chunk)
                    
                    if total_size > 0:
                        percent = (downloaded / total_size) * 100
                        print(f"\rProgress: {percent:.1f}%", end='')
        
        file_size = os.path.getsize(path) / (1024 * 1024)
        print(f"\nDownloaded: {path} ({file_size:.1f} MB)")
        return True
        
    except Exception as e:
        print(f"Download failed: {e}")
        if os.path.exists(path):
            os.remove(path)
        return False

def load_pipeline():
    """Load SDXL pipeline with our LoRA weights"""
    global pipe, lora_loaded
    
    if pipe is not None:
        return pipe
    
    print("="*60)
    print("Crimson LoRA Serverless Worker - Loading Pipeline")
    print("="*60)
    
    start_time = time.time()
    
    try:
        print("Loading SDXL base model...")
        if os.path.exists(SDXL_BASE_PATH):
            pipe = StableDiffusionXLPipeline.from_pretrained(
                SDXL_BASE_PATH,
                torch_dtype=torch.float16,
                use_safetensors=True,
                local_files_only=True
            )
            print("Loaded SDXL from local cache")
        else:
            print("Downloading SDXL from HuggingFace...")
            pipe = StableDiffusionXLPipeline.from_pretrained(
                "stabilityai/stable-diffusion-xl-base-1.0",
                torch_dtype=torch.float16,
                variant="fp16",
                use_safetensors=True
            )
            os.makedirs(SDXL_BASE_PATH, exist_ok=True)
            pipe.save_pretrained(SDXL_BASE_PATH)
            print("SDXL cached for future use")
    except Exception as e:
        print(f"Error loading SDXL: {e}")
        raise
    
    print("\nSetting up Crimson LoRA...")
    if download_file(LORA_DOWNLOAD_URL, LORA_PATH):
        try:
            print("Loading LoRA weights...")
            pipe.load_lora_weights(LORA_PATH)
            lora_loaded = True
            print("✓ LoRA weights loaded successfully!")
        except Exception as e:
            print(f"⚠ Warning: Could not load LoRA: {e}")
    else:
        print("⚠ Warning: LoRA download failed, using base SDXL model")
    
    print("\nMoving to GPU...")
    pipe = pipe.to("cuda")
    
    pipe.scheduler = DPMSolverMultistepScheduler.from_config(
        pipe.scheduler.config,
        algorithm_type="dpmsolver++",
        use_karras_sigmas=True
    )
    
    pipe.enable_attention_slicing()
    pipe.enable_vae_slicing()
    
    load_time = time.time() - start_time
    print(f"\n{'='*60}")
    print(f"Pipeline ready in {load_time:.2f}s")
    print(f"LoRA Status: {'ACTIVE ✓' if lora_loaded else 'INACTIVE ⚠'}")
    print(f"{'='*60}\n")
    
    return pipe

def generate_image(job):
    """Generate image with our Crimson LoRA"""
    global pipe
    
    if pipe is None:
        pipe = load_pipeline()
    
    job_input = job.get('input', {})
    
    user_prompt = job_input.get('prompt', 'portrait photo')
    if TRIGGER_WORD.lower() not in user_prompt.lower():
        prompt = f"{TRIGGER_WORD}, {user_prompt}"
    else:
        prompt = user_prompt
    
    default_negative = 'blurry, low quality, distorted, ugly, deformed, cartoon, anime, illustration, painting, 3d render, watermark, signature'
    negative_prompt = job_input.get('negative_prompt', default_negative)
    
    width = job_input.get('width', 1024)
    height = job_input.get('height', 1024)
    num_steps = job_input.get('num_inference_steps', 30)
    guidance_scale = job_input.get('guidance_scale', 7.5)
    seed = job_input.get('seed')
    
    if seed is not None:
        torch.manual_seed(seed)
    
    print(f"Generating: {prompt}")
    print(f"Steps: {num_steps}, Guidance: {guidance_scale}, Size: {width}x{height}")
    start_time = time.time()
    
    with torch.autocast("cuda"):
        image = pipe(
            prompt=prompt,
            negative_prompt=negative_prompt,
            width=width,
            height=height,
            num_inference_steps=num_steps,
            guidance_scale=guidance_scale,
        ).images[0]
    
    gen_time = time.time() - start_time
    print(f"Generated in {gen_time:.2f}s")
    
    buffered = io.BytesIO()
    image.save(buffered, format="PNG")
    img_base64 = base64.b64encode(buffered.getvalue()).decode()
    
    return {
        "image": f"data:image/png;base64,{img_base64}",
        "prompt": prompt,
        "lora_loaded": lora_loaded,
        "width": width,
        "height": height,
        "generation_time": gen_time
    }

def handler(job):
    """Main handler for RunPod serverless"""
    try:
        result = generate_image(job)
        return result
    except Exception as e:
        print(f"Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return {"error": str(e), "lora_loaded": lora_loaded}

if __name__ == "__main__":
    print("\n" + "="*60)
    print("Crimson LoRA Serverless Worker")
    print("="*60)
    print("Pre-loading pipeline (this may take a few minutes on first run)...")
    load_pipeline()
    print("Ready for inference!")
    print("="*60 + "\n")
    
    runpod.serverless_start({"handler": handler})
