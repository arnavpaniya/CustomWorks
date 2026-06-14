"use client";

import Link from "next/link";
import { useState, useEffect, useRef, Suspense } from "react";
import { CheckCircle2, Loader2, XCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id") || "";
  const [status, setStatus] = useState<"verifying" | "success" | "failed">("verifying");
  const [errorMessage, setErrorMessage] = useState("");
  const retryCountRef = useRef(0);

  const verifyPayment = async () => {
    if (!orderId) {
      setStatus("failed");
      setErrorMessage("No order ID provided in URL.");
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://customworks.onrender.com/api";
      const res = await fetch(`${apiUrl}/orders/${orderId}/verify-payment`);
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
      } else {
        // Retry logic: try 3 times, every 3 seconds
        if (retryCountRef.current < 3) {
          retryCountRef.current += 1;
          setTimeout(verifyPayment, 3000);
        } else {
          setStatus("failed");
          setErrorMessage(data.message || "Payment verification timed out. If you made a payment, please contact support with your Order ID.");
        }
      }
    } catch (error) {
      console.error("Verification fetch error:", error);
      if (retryCountRef.current < 3) {
        retryCountRef.current += 1;
        setTimeout(verifyPayment, 3000);
      } else {
        setStatus("failed");
        setErrorMessage("Network error verifying payment. Please refresh the page or contact support.");
      }
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [orderId]);

  if (status === "verifying") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-zinc-900 mb-6" size={56} />
        <h1 className="text-3xl font-black text-[#0A0A0A] mb-3">Verifying Payment...</h1>
        <p className="text-[#6B6B6B] max-w-md text-sm sm:text-base">
          Please wait while we confirm your payment transaction with Cashfree. Do not refresh or close this page.
        </p>
        <p className="text-[#9A9A9A] text-xs mt-4 font-mono">Order ID: {orderId}</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center">
        <div className="flex justify-center mb-6">
          <XCircle size={64} className="text-red-500" />
        </div>
        <h1 className="text-3xl font-black text-[#0A0A0A] mb-4">Verification Pending or Failed</h1>
        <p className="text-[#6B6B6B] mb-8 max-w-md text-sm sm:text-base">
          {errorMessage || "We couldn't verify your payment status with the gateway."}
          <br />
          If you have been charged, rest assured we will update your order status once verified.
        </p>
        <p className="text-sm font-semibold text-[#0A0A0A] mb-6">
          Order ID: <span className="font-mono bg-zinc-100 px-2 py-1 rounded">{orderId || "N/A"}</span>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            onClick={() => {
              retryCountRef.current = 0;
              setStatus("verifying");
              verifyPayment();
            }}
            variant="outline" 
            size="lg"
            className="flex items-center gap-2 border-[#0A0A0A] hover:bg-[#FAFAFA]"
          >
            <RefreshCw size={16} /> Re-verify Payment
          </Button>
          <Button asChild variant="primary" size="lg">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center">
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
