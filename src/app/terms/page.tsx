import LayoutShell from "@/components/LayoutShell";

export default function TermsAndConditions() {
  return (
    <LayoutShell>
      <div className="max-w-4xl mx-auto p-8 py-12">
        <h1 className="text-3xl font-bold mb-6 font-primary text-blue-900">
          Terms and Conditions
        </h1>
        <p className="mb-4 text-gray-500">Last Updated: June 8, 2026</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
          <p className="text-gray-700">
            By accessing the Vision Graphics website and purchasing our
            products, you agree to be bound by these Terms and Conditions.
            These terms apply to all visitors, users, and wholesale account
            holders.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">2. Wholesale Accounts & Membership</h2>
          <p className="text-gray-700 mb-2">
            Wholesale pricing is exclusively available to approved members.
            Vision Graphics reserves the right to:
          </p>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Verify business credentials before granting wholesale access.</li>
            <li>Modify membership terms or pricing structures at any time.</li>
            <li>Suspend or terminate accounts that violate our terms of service.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">3. Orders & Payment</h2>
          <p className="text-gray-700 mb-2">
            All orders placed through the website or via contract are subject
            to acceptance by Vision Graphics.
          </p>
          <p className="text-gray-700">
            Payment terms for wholesale accounts are governed by the specific
            contract signed at the time of membership approval. For standard
            orders, payment is required at the time of checkout.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">4. Limitation of Liability</h2>
          <p className="text-gray-700">
            Vision Graphics shall not be liable for any indirect, incidental,
            or consequential damages arising from the use of our products,
            including but not limited to installation errors or material
            failure when not used according to manufacturer specifications.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">5. Governing Law</h2>
          <p className="text-gray-700">
            These terms are governed by the laws of the State of New York, and
            any disputes shall be resolved in the courts of the Capital
            District.
          </p>
        </section>
      </div>
    </LayoutShell>
  );
}
