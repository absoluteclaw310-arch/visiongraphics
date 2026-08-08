import React from 'react';

export default function ShippingReturns() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Shipping & Returns</h1>
      <p className="mb-4">Last Updated: June 8, 2026</p>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Local Delivery</h2>
        <p className="text-gray-700 mb-2">
          Vision Graphics provides <strong>free delivery within the Capital District</strong> for:
        </p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Qualified wholesale account holders with a valid contract.</li>
          <li>Orders that meet our minimum purchase threshold.</li>
        </ul>
        <p className="text-gray-700 mt-2">
          Delivery schedules are managed daily. Please contact us for specific delivery windows or urgent requests.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Returns Policy</h2>
        <p className="text-gray-700 mb-2">
          Due to the nature of sign materials (vinyl, films, and specialty media), we have strict return guidelines:
        </p>
        <ul className="list-disc pl-6 text-gray-700">
          <li><strong>Unopened Materials:</strong> May be returned within 14 days of purchase with a valid receipt.</li>
          <li><strong>Custom Cuts/Orders:</strong> All custom-cut materials or special-order products are non-refundable.</li>
          <li><strong>Defective Products:</strong> If you receive material that is defective from the manufacturer, please notify us immediately with photos of the defect and the roll ID.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">How to Initiate a Return</h2>
        <p className="text-gray-700 mb-2">
          To start a return or report a defect, please:
        </p>
        <ol className="list-decimal pl-6 text-gray-700">
          <li>Email us at <span className="font-medium">info@visiongraphics.com</span> with your order number.</li>
          <li>Include details about the product and the reason for the return.</li>
          <li>Wait for approval before shipping any materials back to our warehouse.</li>
        </ol>
      </section>
    </div>
  );
}
