import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/client';

export async function GET() {
  try {
    // Fetch active products from Stripe
    const products = await stripe.products.list({
      active: true,
      expand: ['data.default_price'],
    });
    
    // Format them for the frontend
    const items = products.data.map(product => {
      // Handle the expanded price object
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const defaultPrice = product.default_price as any;
      const priceAmount = defaultPrice?.unit_amount 
        ? (defaultPrice.unit_amount / 100).toFixed(2) 
        : '0.00';
        
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: priceAmount,
        image: product.images?.[0] || null,
      };
    });
    
    return NextResponse.json({ items });
  } catch (error) {
    console.error('Error fetching Stripe catalog:', error);
    return NextResponse.json({ error: 'Failed to fetch catalog' }, { status: 500 });
  }
}
