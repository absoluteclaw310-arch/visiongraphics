import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn("Missing STRIPE_SECRET_KEY environment variable");
}

// Ensure there is always a fallback string so Stripe doesn't throw during build time
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder_for_build', {
  apiVersion: '2025-02-24.acacia',
  appInfo: {
    name: 'Vision Graphics Store',
    version: '0.1.0'
  }
});