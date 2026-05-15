import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/client';

export async function GET(req: Request) {
  try {
    const products = await stripe.products.list({ limit: 100, active: true });
    
    let logs: string[] = [];
    
    for (const product of products.data) {
      if (product.name.includes("6 Mil White Vinyl")) {
        const newDesc = "6 Mil Vinyl. This can be used for interior and exterior signage. Create awesome outdoor signage.";
        await stripe.products.update(product.id, { description: newDesc });
        logs.push(`Updated description for ${product.name}`);
      } else if (product.name.includes("Premium White Scrim Banner 13oz.")) {
        const newDesc = "This is a premium 13 Oz banner material. High quality for an affordable price. Can be used indoor or outdoor.";
        await stripe.products.update(product.id, { description: newDesc });
        logs.push(`Updated description for ${product.name}`);
      } else if (product.name === "Economy Vinyl") {
        const newDesc = "A great choice for vibrant colored signage. Used for die cut graphics.";
        await stripe.products.update(product.id, { description: newDesc });
        logs.push(`Updated description for ${product.name}`);
      } else if (product.name.includes("Medium Tack Transfer Tape")) {
        const newDesc = "This medium tack transfer tape is perfect for all die cut graphics.";
        await stripe.products.update(product.id, { description: newDesc });
        logs.push(`Updated description for ${product.name}`);
      }
    }

    return NextResponse.json({ success: true, logs });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}