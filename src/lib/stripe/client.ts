import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn("Missing STRIPE_SECRET_KEY environment variable");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia',
  appInfo: {
    name: 'Vision Graphics Store',
    version: '0.1.0'
  }
});