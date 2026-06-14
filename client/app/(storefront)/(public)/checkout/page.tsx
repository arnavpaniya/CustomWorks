"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { calculateShippingCharge } from "@/lib/shipping-engine";
import { Check, CreditCard, MapPin, ShoppingBag, ShieldCheck, Smartphone, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart.store";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { load } from "@cashfreepayments/cashfree-js";
import { toast } from "sonner";

import { useAuth } from "@/lib/useAuth";
import { getUserProfile } from "@/lib/profile-service";

const STEPS = [
  { id: 1, label: "Address", icon: MapPin },
  { id: 2, label: "Payment", icon: CreditCard },
  { id: 3, label: "Review", icon: ShoppingBag },
];

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const { user } = useAuth();
  
  const { items, subtotal, total, getShippingCharge, setShippingCharge } = useCartStore();

  const [address, setAddress] = useState({
    name: "", phone: "", line1: "", line2: "", city: "", state: "", pincode: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (user) {
      getUserProfile(user.uid).then((profile) => {
        if (profile) {
          setAddress({
            name: profile.name || user.displayName || "",
            phone: profile.phone || "",
            line1: profile.line1 || "",
            line2: profile.line2 || "",
            city: profile.city || "",
            state: profile.state || "",
            pincode: profile.pincode || "",
          });
        } else if (user.displayName) {
          setAddress((a) => ({
            ...a,
            name: user.displayName || "",
          }));
        }
      });
    }
  }, [user]);

  const sub = subtotal();
  // Compute GST only on non-exempt items
  const taxableSubtotal = items
    .filter((i) => !i.gstExempt)
    .reduce((sum, i) => sum + i.price * i.quantity, 0);
  const gst = taxableSubtotal * 0.18;
  const allFreeShipping = items.length > 0 && items.every((i) => i.freeShipping);
  const shipping = allFreeShipping ? 0 : getShippingCharge();
  const finalTotal = total();

  // Dynamically calculate and update shipping charge based on address location
  useEffect(() => {
    if (address.city || address.pincode) {
      const details = calculateShippingCharge(sub, address.city, address.pincode);
      setShippingCharge(details.amount);
    } else {
      setShippingCharge(null);
    }
  }, [sub, address.city, address.pincode, setShippingCharge]);

  const handleCheckout = async () => {
    try {
      setIsProcessing(true);

      const payload = {
        items,
        address,
        subtotal: sub,
        gst,
        shipping,
        total: finalTotal,
        paymentMethod: "ONLINE"
      };

      const res = await fetch(process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/orders/checkout` : "https://customworks.onrender.com/api/orders/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to initiate checkout");



      // Initialize Cashfree and open hosted checkout (handles UPI, Card, NetBanking, Wallets)
      const cashfree = await load({
        mode: "production"
      });

      const checkoutOptions: any = {
        paymentSessionId: data.paymentSessionId,
        returnUrl: `${window.location.origin.replace("http://", "https://")}/order-success?order_id=${data.orderId}`,
      };

      cashfree.checkout(checkoutOptions);

    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "An error occurred during checkout");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-black text-[#0A0A0A] mb-8">Checkout</h1>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-10">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2 flex-1">
            <button
              onClick={() => step > s.id && setStep(s.id)}
              className={cn(
                "h-9 w-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all",
                step > s.id ? "bg-[#22C55E] text-white cursor-pointer" :
                step === s.id ? "bg-[#0A0A0A] text-white" :
                "bg-[#E5E5E5] text-[#9A9A9A] cursor-default",
              )}
              disabled={step <= s.id}
              aria-current={step === s.id ? "step" : undefined}
            >
              {step > s.id ? <Check size={16} /> : s.id}
            </button>
            <span className={cn("text-sm font-medium hidden sm:block", step === s.id ? "text-[#0A0A0A]" : "text-[#9A9A9A]")}>
              {s.label}
            </span>
            {i < STEPS.length - 1 && (
              <div className={cn("flex-1 h-px", step > s.id ? "bg-[#22C55E]" : "bg-[#E5E5E5]")} />
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6">
                  <h2 className="font-bold text-lg text-[#0A0A0A] mb-5">Shipping Address</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { key: "name", label: "Full Name", type: "text", span: false },
                      { key: "phone", label: "Phone Number", type: "tel", span: false },
                      { key: "line1", label: "Address Line 1", type: "text", span: true },
                      { key: "line2", label: "Address Line 2 (Optional)", type: "text", span: true },
                      { key: "city", label: "City", type: "text", span: false },
                      { key: "state", label: "State", type: "text", span: false },
                      { key: "pincode", label: "Pincode", type: "text", span: false },
                    ].map(({ key, label, type, span }) => (
                      <div key={key} className={cn("flex flex-col gap-1.5", span && "sm:col-span-2")}>
                        <label htmlFor={`addr-${key}`} className="text-sm font-medium text-[#0A0A0A]">{label}</label>
                        <input
                          id={`addr-${key}`}
                          type={type}
                          value={address[key as keyof typeof address]}
                          onChange={(e) => setAddress((a) => ({ ...a, [key]: e.target.value }))}
                          className="h-10 px-3 rounded-lg border border-[#E5E5E5] text-sm focus:outline-none focus:ring-2 focus:ring-[#0A0A0A]"
                        />
                      </div>
                    ))}
                  </div>
                  <Button variant="accent" size="lg" className="mt-6 w-full" onClick={() => setStep(2)}>
                    Continue to Payment
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6">
                  <h2 className="font-bold text-lg text-[#0A0A0A] mb-2">Payment Method</h2>
                  <div className="flex items-center gap-2 mb-6 p-3 bg-green-50 rounded-xl">
                    <ShieldCheck size={16} className="text-green-600" />
                    <p className="text-xs text-green-700 font-medium">100% secure checkout. Your payment info is encrypted.</p>
                  </div>
                  
                  <div className="space-y-3">
                    {/* Pay Online */}
                    <div 
                      className="border rounded-xl p-4 border-[#0A0A0A] bg-[#0A0A0A]/5 ring-1 ring-[#0A0A0A]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-5 w-5 rounded-full border-2 border-zinc-300 flex items-center justify-center flex-shrink-0">
                          <div className="h-2.5 w-2.5 rounded-full bg-[#0A0A0A]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-[#0A0A0A]">Pay Online</p>
                          <p className="text-xs text-[#6B6B6B] mt-0.5">UPI · Credit/Debit Card · Net Banking · Wallets</p>
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <Smartphone size={16} className="text-[#6B6B6B]" />
                          <CreditCard size={16} className="text-[#6B6B6B]" />
                          <Landmark size={16} className="text-[#6B6B6B]" />
                        </div>
                      </div>
                      <p className="text-xs text-[#6B6B6B] mt-3 ml-8">You'll be redirected to Cashfree's secure payment page to complete your payment.</p>
                    </div>
                  </div>

                  <Button variant="accent" size="lg" className="mt-6 w-full" onClick={() => setStep(3)}>
                    Continue to Review
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6">
                  <h2 className="font-bold text-lg text-[#0A0A0A] mb-5">Review Your Order</h2>
                  <div className="space-y-3 mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-[#F5F5F5] flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#0A0A0A] truncate">{item.name}</p>
                          <p className="text-xs text-[#6B6B6B]">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-bold">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>
                  {/* Delivery address summary */}
                  <div className="bg-[#FAFAFA] rounded-xl p-4 mb-6">
                    <p className="text-xs font-semibold text-[#0A0A0A] mb-1">Delivering to</p>
                    <p className="text-sm text-[#6B6B6B]">
                      {address.name} · {address.phone}<br />
                      {address.line1}{address.line2 ? `, ${address.line2}` : ""}<br />
                      {address.city}, {address.state} – {address.pincode}
                    </p>
                    {address.city && address.pincode && (
                      <div className="mt-3 pt-3 border-t border-zinc-200/60">
                        <span className="inline-flex items-center rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600">
                          {calculateShippingCharge(sub, address.city, address.pincode).message}
                        </span>
                      </div>
                    )}
                  </div>
                  <Button 
                    variant="accent" 
                    size="lg" 
                    className="w-full"
                    onClick={handleCheckout}
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : `Place Order · ${formatPrice(finalTotal)}`}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5 sticky top-24">
            <h3 className="font-bold text-sm text-[#0A0A0A] mb-4">Order Summary</h3>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between"><span className="text-[#6B6B6B]">Subtotal</span><span>{formatPrice(sub)}</span></div>
              <div className="flex justify-between"><span className="text-[#6B6B6B]">GST (18%)</span><span>{formatPrice(gst)}</span></div>
              <div className="flex justify-between">
                <span className="text-[#6B6B6B]">Shipping</span>
                <div className="text-right">
                  <span className={shipping === 0 ? "text-green-600" : ""}>
                    {shipping === 0 ? "FREE" : formatPrice(shipping)}
                  </span>
                  {address.city && address.pincode && (
                    <p className="text-[10px] text-zinc-500 font-light mt-0.5">
                      {calculateShippingCharge(sub, address.city, address.pincode).message}
                    </p>
                  )}
                </div>
              </div>
              <div className="border-t border-[#E5E5E5] pt-2.5 flex justify-between font-bold text-base">
                <span>Total</span><span>{formatPrice(finalTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
