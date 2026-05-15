import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/client';

export async function GET(req: Request) {
  try {
    const products = await stripe.products.list({ limit: 100, active: true });
    const prices = await stripe.prices.list({ limit: 100, active: true });
    
    let logs: string[] = [];
    
    // Unapproved products to archive
    const unapprovedNames = [
      "Gloss Ultra-Calendered Vinyl Grey Adhesive",
      "Solvent Gloss White Paper",
      "Direct To Film Hot/Cold Peel",
      "with Air Release Tech",
      "Heat Transfer Print Media",
      "/MLX with Air Release Tech",
      "Solvent Gloss White Paper 8mil"
    ];

    let economyVinylCount = 0;
    let economyVinylIdToKeep = null;

    for (const product of products.data) {
      // 1. Remove duplicates of "Economy Vinyl"
      if (product.name === "Economy Vinyl") {
        economyVinylCount++;
        if (economyVinylCount > 1) {
          await stripe.products.update(product.id, { active: false });
          logs.push(`Archived duplicate Economy Vinyl (${product.id})`);
          continue;
        } else {
          economyVinylIdToKeep = product.id;
        }
      }

      // 2. Remove unapproved products
      if (unapprovedNames.some(name => product.name.includes(name))) {
        await stripe.products.update(product.id, { active: false });
        logs.push(`Archived unapproved product: ${product.name}`);
        continue;
      }

      // 3. Move to correct category
      if (product.name.includes("6 Mil White Vinyl") || product.name === "Vinyl Grey Adhesive") {
        await stripe.products.update(product.id, { metadata: { ...product.metadata, category: 'Printable Media' } });
        logs.push(`Moved ${product.name} to Printable Media category`);
      }
    }

    // 4. Edit Economy Vinyl (the one we kept)
    if (economyVinylIdToKeep) {
      logs.push(`Editing Economy Vinyl sizes and colors...`);

      const newOptions = [
        { size: 'Black - 15" x 50 yd', price: 8000 },
        { size: 'White - 15" x 50 yd', price: 8000 },
        { size: 'Black - 24" x 50 yd', price: 15000 },
        { size: 'White - 24" x 50 yd', price: 15000 },
        { size: 'Black - 30" x 50 yd', price: 22000 },
        { size: 'White - 30" x 50 yd', price: 22000 },
      ];

      let isFirst = true;
      for (const opt of newOptions) {
        const newPrice = await stripe.prices.create({
          product: economyVinylIdToKeep,
          unit_amount: opt.price,
          currency: 'usd',
          nickname: opt.size,
          metadata: { size: opt.size }
        });
        logs.push(`Added ${opt.size} at $${opt.price / 100}`);

        if (isFirst) {
          // Set the default price FIRST, so the old default price is no longer protected
          await stripe.products.update(economyVinylIdToKeep, { default_price: newPrice.id });
          isFirst = false;
        }
      }

      // Now that the default price is updated, we can safely deactivate old prices
      const productPrices = prices.data.filter(p => p.product === economyVinylIdToKeep);
      for (const p of productPrices) {
        if (p.active) await stripe.prices.update(p.id, { active: false });
      }
    }

    return NextResponse.json({ success: true, logs });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}