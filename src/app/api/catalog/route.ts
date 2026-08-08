import { NextResponse } from "next/server";

export const fetchCache = "force-no-store";
export const revalidate = 0;
export const dynamic = "force-dynamic";

// Single digital product: a downloadable PDF guide.
// The actual Stripe price ID must be configured via STRIPE_PDF_PRICE_ID.
const DIGITAL_PRODUCT = {
  id: process.env.STRIPE_PDF_PRODUCT_ID || "prod_digital_pdf_guide",
  name: "The Complete Sign Shop Growth Playbook",
  description:
    "A 60-page actionable PDF packed with sourcing strategies, pricing frameworks, and systems to scale your sign shop. Instant download after purchase.",
  price: 29.99,
  priceId:
    process.env.STRIPE_PDF_PRICE_ID ||
    "price_1PlaceholderReplaceInVercel",
  photo: "",
};

export async function GET() {
  const priceId = process.env.STRIPE_PDF_PRICE_ID;

  if (!priceId) {
    console.error("STRIPE_PDF_PRICE_ID is not configured");
    // Return the product with a warning so the page renders; checkout will fail clearly.
    return NextResponse.json({
      items: [
        {
          ...DIGITAL_PRODUCT,
          options: [
            {
              size: "Digital PDF",
              price: DIGITAL_PRODUCT.price,
              stripePriceId: null,
            },
          ],
        },
      ],
      warning: "Payment not configured. Set STRIPE_PDF_PRICE_ID in Vercel.",
    });
  }

  return NextResponse.json({
    items: [
      {
        ...DIGITAL_PRODUCT,
        options: [
          {
            size: "Digital PDF",
            price: DIGITAL_PRODUCT.price,
            stripePriceId: priceId,
          },
        ],
      },
    ],
  });
}
