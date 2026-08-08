import React from 'react';

export default function Accessibility() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Accessibility Statement</h1>
      <p className="mb-4">Last Updated: June 8, 2026</p>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Our Commitment</h2>
        <p className="text-gray-700">
          Vision Graphics is committed to ensuring that our website is accessible to everyone, regardless of their physical or cognitive ability. We strive to follow the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Accessibility Features</h2>
        <p className="text-gray-700 mb-2">
          We are continuously working to improve the accessibility of our site. Current efforts include:
        </p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Ensuring high contrast ratios for text and backgrounds</li>
          <li>Using semantic HTML for better screen reader compatibility</li>
          <li>Providing alternative text for images where applicable</li>
          <li>Ensuring the site is navigable via keyboard</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Feedback and Assistance</h2>
        <p className="text-gray-700 mb-2">
          We welcome your feedback on the accessibility of the Vision Graphics website. If you encounter any accessibility barriers or have suggestions for improvement, please let us know:
        </p>
        <p className="text-gray-700 font-medium">
          Email: info@visiongraphics.com
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Contact Information</h2>
        <p className="text-gray-700">
          If you need assistance accessing any part of this website, please contact us and we will provide the information in an alternative format.
        </p>
      </section>
    </div>
  );
}
