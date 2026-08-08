import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/client";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      customer_email: session.customer_details?.email || "",
      amount_total: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: session.currency || "usd",
      }).format((session.amount_total || 0) / 100),
      status: session.status,
    });
  } catch (error: any) {
    console.error("Error verifying checkout session:", error);
    return NextResponse.json(
      { error: error.message || "Failed to verify session" },
      { status: 500 }
    );
  }
}
