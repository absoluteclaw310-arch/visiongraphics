import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe/client";

type CartItem = {
  cartId: string;
  productId: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  stripePriceId: string | null;
};

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Validate cart items and build line items
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    const invalidItems: string[] = [];

    items.forEach((item: CartItem) => {
      if (!item.stripePriceId) {
        invalidItems.push(item.name || item.cartId);
        return;
      }
      lineItems.push({
        price: item.stripePriceId,
        quantity: item.quantity || 1,
      });
    });

    if (invalidItems.length > 0) {
      return NextResponse.json(
        {
          error: `Some items do not have a valid Stripe price: ${invalidItems.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const origin =
      req.headers.get("origin") || "https://visiongraphics.vercel.app";

    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/products?canceled=true`,
      automatic_tax: { enabled: false },
      billing_address_collection: "auto",
      phone_number_collection: { enabled: false },
      metadata: {
        source: "vision-graphics-website",
        order_type: "digital_download",
      },
    };

    // Optional: enable Stripe Tax only if configured
    if (process.env.STRIPE_TAX_ENABLED === "true") {
      sessionConfig.automatic_tax = { enabled: true };
    }

    // Optional: collect tax ID for business buyers if Stripe Tax is on
    if (process.env.STRIPE_TAX_ENABLED === "true") {
      sessionConfig.customer_creation = "always";
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Error creating Stripe checkout session:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
