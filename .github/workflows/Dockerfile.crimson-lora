# Dockerfile for Crimson LoRA Serverless
# Downloads LoRA from GitHub release on startup, caches SDXL base model

FROM runpod/pytorch:2.2.0-py3.10-cuda12.1-runtime-ubuntu22.04

# Install system dependencies
RUN apt-get update && apt-get install -y \
    wget \
    git \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /workspace

# Install Python dependencies for SDXL + LoRA inference
RUN pip install --no-cache-dir --break-system-packages \
    torch==2.2.0 \
    diffusers==0.27.2 \
    transformers==4.38.2 \
    accelerate==0.28.0 \
    safetensors==0.4.2 \
    pillow==10.2.0 \
    numpy==1.26.4 \
    requests==2.31.0 \
    runpod==1.7.6

# Create model directories
RUN mkdir -p /workspace/models/lora /workspace/models/sdxl

# Copy handler script
COPY handler-crimson-lora.py /workspace/handler.py

# Make handler executable
RUN chmod +x /workspace/handler.py

# Environment variables
ENV PYTHONUNBUFFERED=1
ENV SDXL_BASE_PATH=/workspace/models/sdxl
ENV LORA_PATH=/workspace/models/lora/crimson-sdxl-lora.safetensors
ENV LORA_DOWNLOAD_URL=https://github.com/absoluteclaw310-arch/crimson-lora/releases/download/v1.0.0/crimson-sdxl-lora.safetensors
ENV TRIGGER_WORD="crimson woman"
ENV HF_HOME=/workspace/.cache/huggingface

# Expose port for RunPod
EXPOSE 8000

# Start handler
CMD ["python3", "/workspace/handler.py"]
