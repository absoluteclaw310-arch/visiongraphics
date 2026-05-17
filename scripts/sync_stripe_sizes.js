const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const productSizes = {
  "RTape 4075RLA Transfer Tape": [
    { size: '12"', price: 7500 },
    { size: '24"', price: 15500 }
  ],
  "Orafol 3258 Gloss White Vinyl (6 mil)": [
    { size: '24"', price: 12000 },
    { size: '48"', price: 21000 },
    { size: '54" x 33yd', price: 18500 },
    { size: '60" x 33yd', price: 21000 }
  ],
  "Orafol 3164 Economy Gloss Vinyl": [
    { size: '54" x 75 yds', price: 7200 }
  ],
  "6mil White Reflective Vinyl": [
    { size: '30" x 75 yds', price: 75000 },
    { size: '48" x 75 yds', price: 110000 }
  ],
  "Calendered Gloss White Vinyl": [
    { size: '24" x 10\'', price: 4500 },
    { size: '48" x 10\'', price: 8500 },
    { size: '54" x 10\'', price: 9500 },
    { size: '60" x 10\'', price: 11000 }
  ],
  "Lumina® by FDC 7504 Banner": [
    { size: '38" x 50Yds', price: 13000 },
    { size: '54" x 50Yds', price: 18000 }
  ],
  "Lumina® by FDC 7238 Print Media": [
    { size: '54" x 75 yds', price: 36000 }
  ],
  "Lumina® by FDC 7204 Print Media": [
    { size: '54" x 75 yds', price: 19000 }
  ],
  "Lumina® by FDC 7038 Laminate": [
    { size: '54" x 75 yds', price: 26000 }
  ],
  "Lumina® by FDC 7267 Print Media": [
    { size: '54" x 75 yds', price: 29500 }
  ],
  "Magnum Magnetics Sheeting": [
    { size: '24" x 25\'', price: 28000 }
  ],
  "Magnetic 25' Beacon": [
    { size: '25\'', price: 25000 }
  ]
};

async function run() {
  const products = await stripe.products.list({ limit: 100, active: true });
  const prices = await stripe.prices.list({ limit: 100, active: true });
  
  for (const product of products.data) {
    let name = product.name;
    let targetSizes = productSizes[name];
    if (!targetSizes) {
       if (name.includes('Transfer Tape') || name.includes('Medium Tack')) targetSizes = productSizes['RTape 4075RLA Transfer Tape'];
       else if (name.includes('Solvent Gloss White')) targetSizes = [{size: '54" x 75 yds', price: 7139}];
       else if (name.includes('Premium White Scrim')) targetSizes = productSizes['Lumina® by FDC 7504 Banner'];
       else if (name.includes('Economy Vinyl')) targetSizes = productSizes['Orafol 3164 Economy Gloss Vinyl'];
       else if (name.includes('Gloss Ultra-Calendered')) targetSizes = productSizes['Calendered Gloss White Vinyl'];
    }

    if (targetSizes) {
      console.log(`Processing sizes for ${name}...`);
      
      const productPrices = prices.data.filter(p => p.product === product.id);
      
      const newPriceIds = [];
      for (const ts of targetSizes) {
        const newPrice = await stripe.prices.create({
          product: product.id,
          unit_amount: ts.price,
          currency: 'usd',
          nickname: ts.size,
          metadata: { size: ts.size }
        });
        newPriceIds.push(newPrice.id);
        console.log(`  Created ${ts.size} at $${ts.price / 100}`);
      }

      if (newPriceIds.length > 0) {
        await stripe.products.update(product.id, {
          default_price: newPriceIds[0]
        });
        console.log(`  Set ${newPriceIds[0]} as default`);

        for (const p of productPrices) {
          try {
            await stripe.prices.update(p.id, { active: false });
            console.log(`  Archived old price ${p.id}`);
          } catch (e) {
            console.error(`  Failed to archive price ${p.id}: ${e.message}`);
          }
        }
      }
    }
  }
}

run().then(() => console.log('Done.')).catch(console.error);
