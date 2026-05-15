import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/client';

export async function GET() {
  try {
    const products = await stripe.products.list({ limit: 100, active: true });
    const prices = await stripe.prices.list({ limit: 100, active: true });
    
    let logs: string[] = [];
    
    // 1. Rename "Medium Tack Heat Transfer Tape" to "Medium Tack Transfer Tape"
    for (const product of products.data) {
      if (product.name.includes('Heat Transfer Tape')) {
        const newName = product.name.replace(/Heat /g, '');
        await stripe.products.update(product.id, { name: newName });
        logs.push(`Renamed ${product.name} to ${newName}`);
      }
    }
    
    // 2. Variable Pricing definitions based on old JSON
    const productSizes: Record<string, {size: string, price: number}[]> = {
      "Orafol 3164 Economy Gloss Vinyl": [
        { size: '24" x 10\'', price: 3500 },
        { size: '48" x 10\'', price: 6500 },
        { size: '54" x 10\'', price: 7200 }
      ],
      "Calendered Gloss White Vinyl": [
        { size: '24" x 10\'', price: 4500 },
        { size: '48" x 10\'', price: 8500 },
        { size: '54" x 10\'', price: 9500 },
        { size: '60" x 10\'', price: 11000 }
      ],
      "Medium Tack Transfer Tape": [
        { size: '12"', price: 7500 },
        { size: '24"', price: 15500 }
      ],
      "Orafol 3258 Gloss White Vinyl (6 mil)": [
        { size: '24"', price: 12000 },
        { size: '48"', price: 21000 },
        { size: '54" x 33yd', price: 18500 },
        { size: '60" x 33yd', price: 21000 }
      ],
      "Lumina® by FDC 7504 Banner": [
        { size: '38" x 50Yds', price: 13000 },
        { size: '54" x 50Yds', price: 18000 }
      ]
    };
    
    // Re-fetch products to get updated names
    const updatedProducts = await stripe.products.list({ limit: 100, active: true });
    
    for (const product of updatedProducts.data) {
      let targetSizes = productSizes[product.name];
      
      // Fuzzy matching for Vercel's Stripe products
      if (!targetSizes) {
        if (product.name.includes('Economy Vinyl')) targetSizes = productSizes["Orafol 3164 Economy Gloss Vinyl"];
        else if (product.name.includes('Gloss Ultra-Calendered Vinyl')) targetSizes = productSizes["Calendered Gloss White Vinyl"];
        else if (product.name.includes('Medium Tack Transfer Tape')) targetSizes = productSizes["Medium Tack Transfer Tape"];
      }

      if (targetSizes) {
        logs.push(`Updating sizes for ${product.name}...`);
        
        // Remove default price before archiving
        if (product.default_price) {
          await stripe.products.update(product.id, { default_price: '' as any });
        }
        
        // Deactivate old prices
        const productPrices = prices.data.filter(p => p.product === product.id);
        for (const p of productPrices) {
          if (p.active) await stripe.prices.update(p.id, { active: false });
        }
        
        // Add new prices with sizes as nicknames
        let isFirst = true;
        for (const ts of targetSizes) {
          const newPrice = await stripe.prices.create({
            product: product.id,
            unit_amount: ts.price,
            currency: 'usd',
            nickname: ts.size,
            metadata: { size: ts.size }
          });
          logs.push(`  Added ${ts.size} at $${ts.price / 100}`);
          
          if (isFirst) {
             await stripe.products.update(product.id, { default_price: newPrice.id });
             isFirst = false;
          }
        }
      }
    }
    
    return NextResponse.json({ success: true, logs });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
