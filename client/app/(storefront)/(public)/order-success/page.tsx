"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id") || "Unknown";

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="flex justify-center mb-6">
        <CheckCircle2 size={64} className="text-green-500" />
      </div>
      <h1 className="text-4xl font-black text-[#0A0A0A] mb-4">Payment Successful!</h1>
      <p className="text-[#6B6B6B] mb-8 text-lg">
        Thank you for your order. We are now processing it.
        <br />
        Your Order ID is <strong>{orderId}</strong>
      </p>

      <div className="flex items-center justify-center gap-4">
        <Button asChild variant="primary" size="lg">
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
