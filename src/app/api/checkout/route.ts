import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/client';

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Validate items have price IDs
    const missingPriceIds = items.filter((item: any) => !item.stripePriceId && !item.priceId);
    if (missingPriceIds.length > 0) {
      return NextResponse.json({ 
        error: 'Some items are missing price information. Please clear your cart and add items again.' 
      }, { status: 400 });
    }

    // Format items for Stripe Checkout using existing Price IDs
    const lineItems = items.map((item: any) => ({
      price: item.stripePriceId || item.priceId,
      quantity: item.quantity,
    }));

    // Generate Stripe Checkout Session URL
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/?success=true`,
      cancel_url: `${req.headers.get('origin')}/products?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
