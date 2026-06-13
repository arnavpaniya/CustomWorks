"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CreditCard, MapPin, ShoppingBag, ShieldCheck, Smartphone, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart.store";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { load } from "@cashfreepayments/cashfree-js";
import { toast } from "sonner";

const STEPS = [
  { id: 1, label: "Address", icon: MapPin },
  { id: 2, label: "Payment", icon: CreditCard },
  { id: 3, label: "Review", icon: ShoppingBag },
];

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState("UPI");
  const [upiId, setUpiId] = useState("");
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" });
  const [selectedBank, setSelectedBank] = useState("");
  
  const { items, subtotal, total } = useCartStore();

  const sub = subtotal();
  const gst = sub * 0.18;
  const shipping = sub >= 999 ? 0 : 99;
  const finalTotal = total();

  const [address, setAddress] = useState({
    name: "", phone: "", line1: "", line2: "", city: "", state: "", pincode: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

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
        paymentMethod: selectedMethod === "COD" ? "COD" : "ONLINE"
      };

      const res = await fetch(process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/orders/checkout` : "https://customworks.onrender.com/api/orders/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to initiate checkout");

      if (data.paymentMethod === "COD") {
        toast.success("Order placed successfully via Cash on Delivery!");
        window.location.href = `/order-success?order_id=${data.orderId}`;
        return;
      }

      // Initialize Cashfree
      const cashfree = await load({
        mode: "production" // Cashfree keys provided were prod keys
      });

      let paymentMethod: any = null;

      if (selectedMethod === "UPI") {
        if (!upiId) {
          toast.error("Please enter your UPI ID");
          setIsProcessing(false);
          return;
        }
        paymentMethod = {
          upi: {
            channel: "collect",
            upi_id: upiId.trim()
          }
        };
      } else if (selectedMethod === "CARD") {
        if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv) {
          toast.error("Please fill in all card details");
          setIsProcessing(false);
          return;
        }
        const [expiryMM, expiryYY] = cardDetails.expiry.split("/");
        if (!expiryMM || !expiryYY) {
          toast.error("Invalid expiry date format. Use MM/YY");
          setIsProcessing(false);
          return;
        }
        paymentMethod = {
          card: {
            card_number: cardDetails.number.replace(/\s+/g, ""),
            card_expiry_mm: expiryMM.trim().padStart(2, "0"),
            card_expiry_yy: expiryYY.trim().length === 2 ? "20" + expiryYY.trim() : expiryYY.trim(),
            card_cvv: cardDetails.cvv.trim(),
            card_holder_name: address.name || "Card Holder"
          }
        };
      } else if (selectedMethod === "NETBANKING") {
        if (!selectedBank) {
          toast.error("Please select your bank");
          setIsProcessing(false);
          return;
        }
        const bankCodes: Record<string, string> = {
          SBI: "3003",
          HDFC: "3022",
          ICICI: "3019",
          AXIS: "3005",
          KOTAK: "3033"
        };
        const bankCode = bankCodes[selectedBank];
        if (!bankCode) {
          toast.error("Unsupported bank selection");
          setIsProcessing(false);
          return;
        }
        paymentMethod = {
          netbanking: {
            netbanking_bank_code: bankCode
          }
        };
      }

      if (paymentMethod) {
        toast.info("Initiating payment request...");
        await cashfree.pay({
          paymentSessionId: data.paymentSessionId,
          paymentMethod,
          returnUrl: `${window.location.origin}/order-success?order_id=${data.orderId}`,
        });
      } else {
        cashfree.checkout({
          paymentSessionId: data.paymentSessionId,
          returnUrl: `${window.location.origin}/order-success?order_id=${data.orderId}`,
        });
      }

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
                  <h2 className="font-bold text-lg text-[#0A0A0A] mb-2">Payment</h2>
                  <div className="flex items-center gap-2 mb-6 p-3 bg-green-50 rounded-xl">
                    <ShieldCheck size={16} className="text-green-600" />
                    <p className="text-xs text-green-700 font-medium">100% secure checkout. Your payment info is encrypted.</p>
                  </div>
                  
                  {/* Payment gateway selection */}
                  <div className="space-y-4">
                    {/* Method 1: UPI */}
                    <div 
                      onClick={() => setSelectedMethod("UPI")}
                      className={cn(
                        "border rounded-xl p-4 cursor-pointer transition-all flex flex-col gap-3",
                        selectedMethod === "UPI" 
                          ? "border-narrative-forest bg-narrative-forest/5 ring-1 ring-narrative-forest" 
                          : "border-zinc-200 hover:border-zinc-300"
                      )}
                    >
                      <div className="flex items-start justify-between w-full">
                        <div className="flex gap-3">
                          <div className="h-5 w-5 rounded-full border border-zinc-300 flex items-center justify-center mt-0.5 flex-shrink-0">
                            {selectedMethod === "UPI" && <div className="h-2.5 w-2.5 rounded-full bg-narrative-forest" />}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-narrative-forest">UPI (Google Pay, PhonePe, Paytm)</p>
                            <p className="text-xs text-narrative-forest/60 mt-0.5">Pay securely using any UPI app.</p>
                          </div>
                        </div>
                        <Smartphone className="text-narrative-forest/80 flex-shrink-0" size={20} />
                      </div>
                      
                      {selectedMethod === "UPI" && (
                        <div className="mt-2 pl-8 pr-2 w-full flex flex-col gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <label htmlFor="upi-id-input" className="text-xs font-semibold text-narrative-forest/70">UPI ID</label>
                          <input 
                            id="upi-id-input"
                            type="text" 
                            placeholder="username@okaxis" 
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            className="h-10 px-3 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-narrative-forest w-full bg-white"
                          />
                        </div>
                      )}
                    </div>

                    {/* Method 2: Credit/Debit Card */}
                    <div 
                      onClick={() => setSelectedMethod("CARD")}
                      className={cn(
                        "border rounded-xl p-4 cursor-pointer transition-all flex flex-col gap-3",
                        selectedMethod === "CARD" 
                          ? "border-narrative-forest bg-narrative-forest/5 ring-1 ring-narrative-forest" 
                          : "border-zinc-200 hover:border-zinc-300"
                      )}
                    >
                      <div className="flex items-start justify-between w-full">
                        <div className="flex gap-3">
                          <div className="h-5 w-5 rounded-full border border-zinc-300 flex items-center justify-center mt-0.5 flex-shrink-0">
                            {selectedMethod === "CARD" && <div className="h-2.5 w-2.5 rounded-full bg-narrative-forest" />}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-narrative-forest">Credit / Debit Card</p>
                            <p className="text-xs text-narrative-forest/60 mt-0.5">Pay via Visa, Mastercard, RuPay, or Diners.</p>
                          </div>
                        </div>
                        <CreditCard className="text-narrative-forest/80 flex-shrink-0" size={20} />
                      </div>
                      
                      {selectedMethod === "CARD" && (
                        <div className="mt-2 pl-8 pr-2 w-full grid grid-cols-2 gap-3" onClick={(e) => e.stopPropagation()}>
                          <div className="col-span-2 flex flex-col gap-1.5">
                            <label htmlFor="card-number-input" className="text-xs font-semibold text-narrative-forest/70">Card Number</label>
                            <input 
                              id="card-number-input"
                              type="text" 
                              placeholder="4111 2222 3333 4444" 
                              value={cardDetails.number}
                              onChange={(e) => setCardDetails(prev => ({ ...prev, number: e.target.value }))}
                              className="h-10 px-3 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-narrative-forest w-full bg-white"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label htmlFor="card-expiry-input" className="text-xs font-semibold text-narrative-forest/70">Expiry Date</label>
                            <input 
                              id="card-expiry-input"
                              type="text" 
                              placeholder="MM/YY" 
                              value={cardDetails.expiry}
                              onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
                              className="h-10 px-3 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-narrative-forest w-full bg-white"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label htmlFor="card-cvv-input" className="text-xs font-semibold text-narrative-forest/70">CVV</label>
                            <input 
                              id="card-cvv-input"
                              type="password" 
                              placeholder="***" 
                              maxLength={3}
                              value={cardDetails.cvv}
                              onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value }))}
                              className="h-10 px-3 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-narrative-forest w-full bg-white"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Method 3: Net Banking */}
                    <div 
                      onClick={() => setSelectedMethod("NETBANKING")}
                      className={cn(
                        "border rounded-xl p-4 cursor-pointer transition-all flex flex-col gap-3",
                        selectedMethod === "NETBANKING" 
                          ? "border-narrative-forest bg-narrative-forest/5 ring-1 ring-narrative-forest" 
                          : "border-zinc-200 hover:border-zinc-300"
                      )}
                    >
                      <div className="flex items-start justify-between w-full">
                        <div className="flex gap-3">
                          <div className="h-5 w-5 rounded-full border border-zinc-300 flex items-center justify-center mt-0.5 flex-shrink-0">
                            {selectedMethod === "NETBANKING" && <div className="h-2.5 w-2.5 rounded-full bg-narrative-forest" />}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-narrative-forest">Net Banking</p>
                            <p className="text-xs text-narrative-forest/60 mt-0.5">Pay directly from your bank account.</p>
                          </div>
                        </div>
                        <Landmark className="text-narrative-forest/80 flex-shrink-0" size={20} />
                      </div>
                      
                      {selectedMethod === "NETBANKING" && (
                        <div className="mt-2 pl-8 pr-2 w-full flex flex-col gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <label htmlFor="bank-select" className="text-xs font-semibold text-narrative-forest/70">Select Bank</label>
                          <select 
                            id="bank-select"
                            value={selectedBank}
                            onChange={(e) => setSelectedBank(e.target.value)}
                            className="h-10 px-3 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-narrative-forest w-full bg-white"
                          >
                            <option value="">-- Choose Your Bank --</option>
                            <option value="SBI">State Bank of India</option>
                            <option value="HDFC">HDFC Bank</option>
                            <option value="ICICI">ICICI Bank</option>
                            <option value="AXIS">Axis Bank</option>
                            <option value="KOTAK">Kotak Mahindra Bank</option>
                          </select>
                        </div>
                      )}
                    </div>

                    {/* Method 4: COD */}
                    <div 
                      onClick={() => setSelectedMethod("COD")}
                      className={cn(
                        "border rounded-xl p-4 cursor-pointer transition-all flex flex-col gap-3",
                        selectedMethod === "COD" 
                          ? "border-narrative-forest bg-narrative-forest/5 ring-1 ring-narrative-forest" 
                          : "border-zinc-200 hover:border-zinc-300"
                      )}
                    >
                      <div className="flex items-start justify-between w-full">
                        <div className="flex gap-3">
                          <div className="h-5 w-5 rounded-full border border-zinc-300 flex items-center justify-center mt-0.5 flex-shrink-0">
                            {selectedMethod === "COD" && <div className="h-2.5 w-2.5 rounded-full bg-narrative-forest" />}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-narrative-forest">Cash on Delivery (COD)</p>
                            <p className="text-xs text-narrative-forest/60 mt-0.5">Pay via cash or digital UPI when your order is delivered to your doorstep.</p>
                          </div>
                        </div>
                        <MapPin className="text-narrative-forest/80 flex-shrink-0" size={20} />
                      </div>
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
