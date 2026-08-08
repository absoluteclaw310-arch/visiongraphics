import LayoutShell from "@/components/LayoutShell";

export default function DigitalDelivery() {
  return (
    <LayoutShell>
      <div className="max-w-4xl mx-auto p-8 py-12">
        <h1 className="text-3xl font-bold mb-6 font-primary text-blue-900">
          Digital Delivery Policy
        </h1>
        <p className="mb-4 text-gray-500">Last Updated: June 8, 2026</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Instant Download</h2>
          <p className="text-gray-700">
            All purchases are digital downloads. After your payment is
            confirmed, you will receive an email with a secure download link for
            your PDF file.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">No Shipping</h2>
          <p className="text-gray-700">
            Nothing is shipped. You can access your file from any device after
            purchase.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Download Issues</h2>
          <p className="text-gray-700 mb-2">If you have trouble accessing your file:</p>
          <ol className="list-decimal pl-6 text-gray-700">
            <li>Check your inbox and spam folder for the confirmation email.</li>
            <li>Use the same email address you entered at checkout.</li>
            <li>
              Contact us at{" "}
              <span className="font-medium">info@visiongraphics.com</span>{" "}
              with your order number.
            </li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Refund Policy</h2>
          <p className="text-gray-700">
            Because this is a digital product, all sales are final. If you
            experience a technical issue that prevents you from accessing your
            download, we will work with you to resolve it.
          </p>
        </section>
      </div>
    </LayoutShell>
  );
}
