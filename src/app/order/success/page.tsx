"use client";

import { Suspense } from "react";
import OrderSuccessContent from "./OrderSuccessContent";
import LayoutShell from "@/components/LayoutShell";

export default function OrderSuccessPage() {
  return (
    <LayoutShell>
      <Suspense
        fallback={
          <div className="max-w-2xl mx-auto py-16 px-6 text-center">
            <p className="text-gray-600">Loading order details...</p>
          </div>
        }
      >
        <OrderSuccessContent />
      </Suspense>
    </LayoutShell>
  );
}
