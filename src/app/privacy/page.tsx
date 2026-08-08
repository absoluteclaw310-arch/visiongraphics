import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">Last Updated: June 8, 2026</p>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Introduction</h2>
        <p className="text-gray-700">
          Welcome to Vision Graphics. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our practices, please contact us.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Information We Collect</h2>
        <p className="text-gray-700 mb-2">
          We collect personal information that you voluntarily provide to us when you:
        </p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Register for a wholesale account</li>
          <li>Place an order for materials</li>
          <li>Contact us via our website forms</li>
          <li>Sign up for our newsletter</li>
        </ul>
        <p className="text-gray-700 mt-2">
          This may include your name, email address, phone number, company name, and shipping/billing address.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">How We Use Your Information</h2>
        <p className="text-gray-700 mb-2">
          We use the information we collect to:
        </p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Process and fulfill your orders</li>
          <li>Manage your wholesale account and pricing</li>
          <li>Communicate with you about your orders and account</li>
          <li>Improve our website and services</li>
          <li>Comply with legal obligations</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Data Sharing</h2>
        <p className="text-gray-700">
          We do not sell your personal information to third parties. We may share information with trusted service providers (such as shipping carriers and payment processors) to the extent necessary to fulfill your orders.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Your Rights</h2>
        <p className="text-gray-700">
          Depending on your location, you may have certain rights regarding your personal data, including the right to access, correct, or delete the information we hold about you.
        </p>
      </section>
    </div>
  );
}
