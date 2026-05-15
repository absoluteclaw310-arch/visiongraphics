import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_fallback_for_build_only', {
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
      const priceValue = priceObj ? (priceObj.unit_amount / 100) : 0;
      
      // Determine a category from metadata or name fallback
      let categoryId = product.metadata.category || 'Other';
      const nameLower = product.name.toLowerCase();
      if (categoryId === 'Other') {
        if (nameLower.includes('vinyl')) categoryId = 'Die-Cut Vinyl';
        else if (nameLower.includes('tape')) categoryId = 'Tools';
        else if (nameLower.includes('laminate')) categoryId = 'Laminate';
        else if (nameLower.includes('banner') || nameLower.includes('paper')) categoryId = 'Printable Media';
      }

      return {
        id: product.id,
        categoryId: categoryId,
        name: product.name,
        description: product.description || '',
        photo: product.images[0] || '/placeholder-product.jpg',
        options: [{
          size: product.metadata.size || 'Standard Roll',
          price: priceValue
        }],
        status: priceValue === 0 ? 'OUT OF STOCK' : undefined,
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
