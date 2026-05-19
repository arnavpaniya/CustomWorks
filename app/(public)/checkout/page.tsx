"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CreditCard, MapPin, ShoppingBag, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart.store";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, label: "Address", icon: MapPin },
  { id: 2, label: "Payment", icon: CreditCard },
  { id: 3, label: "Review", icon: ShoppingBag },
];

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const { items, subtotal, total } = useCartStore();

  const sub = subtotal();
  const gst = sub * 0.18;
  const shipping = sub >= 999 ? 0 : 99;
  const finalTotal = total();

  const [address, setAddress] = useState({
    name: "", phone: "", line1: "", line2: "", city: "", state: "", pincode: "",
  });

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
                  <h2 className="font-bold text-lg text-[#0A0A0A] mb-2">Payment</h2>
                  <div className="flex items-center gap-2 mb-6 p-3 bg-green-50 rounded-xl">
                    <ShieldCheck size={16} className="text-green-600" />
                    <p className="text-xs text-green-700 font-medium">100% secure checkout. Your payment info is encrypted.</p>
                  </div>
                  {/* Payment gateway placeholder */}
                  <div className="border-2 border-dashed border-[#E5E5E5] rounded-xl p-10 text-center">
                    <CreditCard size={40} className="text-[#9A9A9A] mx-auto mb-3" />
                    <p className="text-sm text-[#6B6B6B] mb-1">Payment gateway will be integrated here</p>
                    <p className="text-xs text-[#9A9A9A]">UPI · Cards · Net Banking · EMI</p>
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
                  </div>
                  <Button variant="accent" size="lg" className="w-full">
                    Place Order · {formatPrice(finalTotal)}
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
              <div className="flex justify-between"><span className="text-[#6B6B6B]">Shipping</span><span className={shipping === 0 ? "text-green-600" : ""}>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span></div>
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
