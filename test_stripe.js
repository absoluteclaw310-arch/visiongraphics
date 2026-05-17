require('dotenv').config({ path: './.env.local' });
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
async function test() {
  const products = await stripe.products.list({active: true, limit: 100});
  const filtered = products.data.filter(p => p.name.includes('7504'));
  console.log(filtered.map(p => ({id: p.id, name: p.name, meta: p.metadata})));
}
test();
