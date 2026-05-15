import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia', // Use the latest stable API version
});

export async function GET() {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY is not configured');
      return NextResponse.json({ error: 'Payment gateway configuration missing' }, { status: 500 });
    }

    // Fetch all active products
    const products = await stripe.products.list({
      active: true,
      expand: ['data.default_price'],
    });

    // Map Stripe products to the format expected by ProductList
    const items = products.data.map((product) => {
      const priceObj = product.default_price as any;
      return {
        id: product.id,
        name: product.name,
        description: product.description || '',
        image: product.images[0] || '/placeholder-product.jpg',
        price: priceObj ? (priceObj.unit_amount / 100).toFixed(2) : 'Contact for pricing',
        stripePriceId: priceObj?.id || null,
      };
    });

    return NextResponse.json({ items });
  } catch (error: any) {
    console.error('Error fetching Stripe catalog:', error);
    return NextResponse.json(
      { error: 'Failed to fetch catalog from Stripe', details: error.message },
      { status: 500 }
    );
  }
}
