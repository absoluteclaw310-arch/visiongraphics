import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_fallback_for_build_only', {
  apiVersion: '2024-12-18.acacia', // Use the latest stable API version
});

export const fetchCache = 'force-no-store';
export const revalidate = 0;
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY is not configured');
      return NextResponse.json({ error: 'Payment gateway configuration missing' }, { status: 500 });
    }

    // Fetch all active products
    const products = await stripe.products.list({
      active: true,
      limit: 100,
    });

    // Filter to only include products tagged with website: 'vision graphics'
    const filteredProducts = products.data.filter(p => 
      p.metadata && p.metadata.website && p.metadata.website.toLowerCase() === 'vision graphics'
    );

    // Fetch all active prices to get the variable sizes
    const prices = await stripe.prices.list({
      active: true,
      limit: 100,
    });

    // Group prices by product
    const pricesByProduct: Record<string, Stripe.Price[]> = {};
    prices.data.forEach(price => {
      if (typeof price.product === 'string') {
        if (!pricesByProduct[price.product]) pricesByProduct[price.product] = [];
        pricesByProduct[price.product].push(price);
      }
    });

    // Map Stripe products to the format expected by ProductList
    const items = filteredProducts.map((product) => {
      // Determine a category from metadata or name fallback
      let categoryId = product.metadata.category || 'Other';
      let nameStr = product.name;
      const nameLower = nameStr.toLowerCase();
      
      // Request #3: remove 'HEAT' from the title of transfer tape
      if (nameLower.includes('transfer tape')) {
        nameStr = nameStr.replace(/heat\s+/i, '').replace(/Heat\s+/i, '');
        categoryId = 'Transfer Tape';
      }

      if (categoryId === 'Other') {
        if (nameLower.includes('vinyl')) categoryId = 'Die-Cut Vinyl';
        else if (nameLower.includes('tape')) categoryId = 'Transfer Tape';
        else if (nameLower.includes('laminate')) categoryId = 'Laminate';
        else if (nameLower.includes('banner') || nameLower.includes('paper')) categoryId = 'Banner Material';
      }

      if (nameLower.includes('magnet')) {
        categoryId = 'Magnet Material';
      }

      if (nameLower.includes('3258')) {
        categoryId = 'Printable Media';
      }

      if (categoryId === 'Printable Media' && !nameLower.includes('3258')) {
        categoryId = 'Banner Material';
      }

      if (categoryId === 'Other') {
        categoryId = 'Printable Media';
      }

      // Map all active prices to options
      const productPrices = pricesByProduct[product.id] || [];
      const deduplicatedOptions: Record<string, any> = {};
      
      productPrices.forEach(price => {
        const sizeStr = price.nickname || price.metadata.size || 'Standard Roll';
        // Keep the lowest active price for a given size string
        const priceValue = price.unit_amount ? (price.unit_amount / 100) : 0;
        if (!deduplicatedOptions[sizeStr] || deduplicatedOptions[sizeStr].price > priceValue) {
          deduplicatedOptions[sizeStr] = {
            size: sizeStr,
            price: priceValue,
            stripePriceId: price.id,
          };
        }
      });

      const options = Object.values(deduplicatedOptions).sort((a, b) => a.price - b.price); // Sort sizes by price low to high

      // Fallback if no prices
      if (options.length === 0) {
        options.push({
          size: 'Standard Roll',
          price: 0,
          stripePriceId: null
        });
      }

      return {
        id: product.id,
        categoryId: categoryId,
        name: nameStr,
        description: product.description || '',
        photo: product.images[0] || '/placeholder-product.jpg',
        options: options,
        status: options.every(o => o.price === 0) ? 'OUT OF STOCK' : undefined,
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
