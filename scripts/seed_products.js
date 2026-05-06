const Stripe = require('stripe');
const stripe = new Stripe('process.env.STRIPE_SECRET_KEY');

const products = [
  {
    name: 'Lumina® by FDC 7238 Print Media',
    description: 'Intermediate-grade calendered vinyl film for general-purpose graphics, signage, and decals. Medium-term durability with clean removal and gray air egress adhesive.',
    image: 'https://www.fdcfilms.com/wp-content/uploads/2020/10/7238-002-Gloss-White.jpg',
    price: 4500 // Example price $45.00
  },
  {
    name: 'Lumina® by FDC 7038 Laminate',
    description: 'Intermediate-grade calendered vinyl laminate to protect vinyl films from abrasion, UV exposure, and chemicals.',
    image: 'https://www.fdcfilms.com/wp-content/uploads/2019/12/000-Clear.jpg',
    price: 3500 // Example price $35.00
  },
  {
    name: 'Lumina® by FDC 7204 Print Media',
    description: 'Gloss white vinyl for promotional short-term flat applications like POP displays and promotional graphics.',
    image: 'https://www.fdcfilms.com/wp-content/uploads/2020/07/002-Gloss-White.jpg',
    price: 3000 // Example price $30.00
  },
  {
    name: 'Lumina® by FDC 7504 Print Media',
    description: '13 oz PVC scrim banner for general-purpose signage and displays. Tear, curl, and fire resistant.',
    image: 'https://www.fdcfilms.com/wp-content/uploads/2019/12/2100002.jpg',
    price: 5000 // Example price $50.00
  },
  {
    name: 'Lumina® by FDC 7267 Print Media',
    description: 'Perforated calendered vinyl for one-way vision window graphics. White print side and black see-through side.',
    image: 'https://www.fdcfilms.com/wp-content/uploads/2019/12/2100002.jpg',
    price: 6000 // Example price $60.00
  }
];

async function seedProducts() {
  for (const p of products) {
    try {
      console.log(`Creating product: ${p.name}...`);
      const product = await stripe.products.create({
        name: p.name,
        description: p.description,
        images: [p.image],
      });
      
      await stripe.prices.create({
        product: product.id,
        unit_amount: p.price,
        currency: 'usd',
      });
      
      console.log(`✅ Successfully added ${p.name}`);
    } catch (e) {
      console.error(`❌ Failed to add ${p.name}:`, e.message);
    }
  }
}

seedProducts().then(() => console.log('Seeding complete.'));
