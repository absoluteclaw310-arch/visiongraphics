import LayoutShell from "@/components/LayoutShell";
import Link from "next/link";

export default function MembershipPage() {
  return (
    <LayoutShell>
      <div className="flex-grow flex items-center justify-center py-16 px-6">
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg border max-w-2xl w-full text-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold mb-4 font-primary text-blue-900">
            Wholesale Membership is Currently Closed
          </h1>

          <p className="text-lg text-gray-700 mb-6">
            We are currently focused on digital products. Our wholesale
            membership program for physical sign supplies will reopen soon.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/products"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              View Digital Product
            </Link>
            <Link
              href="/"
              className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </LayoutShell>
  );
}
