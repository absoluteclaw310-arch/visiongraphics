import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/client';

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Format items for Stripe Checkout
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product: item.id, // Using the existing Stripe product ID
        unit_amount: Math.round(parseFloat(item.price) * 100),
      },
      quantity: item.quantity,
    }));

    // Generate Stripe Checkout Session URL
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      // We will define these URLs later, falling back to homepage for now
      success_url: `${req.headers.get('origin')}/?success=true`,
      cancel_url: `${req.headers.get('origin')}/products?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
