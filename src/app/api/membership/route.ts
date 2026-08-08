import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate required fields
    const { type, contactName, phone, email } = body;
    if (!type || !contactName || !phone || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (type === "wholesale" && (!body.businessName || !body.taxId)) {
      return NextResponse.json(
        { error: "Wholesale applications require business name and Tax ID" },
        { status: 400 }
      );
    }

    // For now, log the submission and return success.
    // TODO: Connect to email service (SendGrid, Resend, etc.) or database.
    console.log("Membership application received:", body);

    return NextResponse.json({
      success: true,
      message: "Application received. We will contact you shortly.",
    });
  } catch (error: any) {
    console.error("Error processing membership application:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
