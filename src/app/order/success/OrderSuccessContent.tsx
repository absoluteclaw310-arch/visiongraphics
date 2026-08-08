"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<{
    loading: boolean;
    customer?: string;
    total?: string;
    error?: string;
  }>({ loading: true });

  useEffect(() => {
    if (!sessionId) {
      setStatus({ loading: false, error: "No session ID provided." });
      return;
    }

    fetch(`/api/checkout/verify?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setStatus({ loading: false, error: data.error });
        } else {
          setStatus({
            loading: false,
            customer: data.customer_email,
            total: data.amount_total,
          });
        }
      })
      .catch(() => {
        setStatus({ loading: false, error: "Could not verify order." });
      });
  }, [sessionId]);

  return (
    <div className="max-w-2xl mx-auto py-16 px-6 text-center">
      <div className="bg-white p-8 rounded-xl shadow-lg border">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
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
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold mb-4 font-primary text-blue-900">
          Order Confirmed!
        </h1>

        {status.loading ? (
          <p className="text-gray-600">Verifying your order details...</p>
        ) : status.error ? (
          <p className="text-red-600">{status.error}</p>
        ) : (
          <>
            <p className="text-lg text-gray-700 mb-2">
              A confirmation has been sent to{" "}
              <span className="font-semibold">{status.customer}</span>.
            </p>
            {status.total && (
              <p className="text-gray-600 mb-6">
                Order total: <span className="font-semibold">{status.total}</span>
              </p>
            )}
          </>
        )}

        <p className="text-gray-700 mb-8">
          Your digital download link will be delivered by email shortly. If you
          don’t see it within a few minutes, check your spam or promotions
          folder.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/"
            className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Return Home
          </Link>
          <Link
            href="/products"
            className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Product Page
          </Link>
        </div>
      </div>
    </div>
  );
}
