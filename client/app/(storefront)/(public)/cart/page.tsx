"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart.store";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, total, couponCode, couponDiscount, applyCoupon, removeCoupon } = useCartStore();
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");

  const sub = subtotal();
  // Compute GST only on non-exempt items
  const taxableSubtotal = items
    .filter((i) => !i.gstExempt)
    .reduce((sum, i) => sum + i.price * i.quantity, 0);
  const gst = taxableSubtotal * 0.18;
  const allFreeShipping = items.length > 0 && items.every((i) => i.freeShipping);
  const shipping = allFreeShipping ? 0 : (sub >= 999 ? 0 : 99);
  const finalTotal = total();

  const handleCoupon = () => {
    if (couponInput.toUpperCase() === "FIRST10") {
      applyCoupon("FIRST10", sub * 0.1);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code");
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center text-center">
        <ShoppingBag size={56} className="text-[#E5E5E5] mb-6" />
        <h1 className="text-2xl font-black text-[#0A0A0A] mb-2">Your cart is empty</h1>
        <p className="text-[#6B6B6B] mb-8">Add some custom products to get started.</p>
        <Link href="/products">
          <Button variant="accent" size="lg">
            Browse Products <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-black text-[#0A0A0A] mb-8">Your Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items list */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="bg-white rounded-2xl border border-[#E5E5E5] p-4 flex gap-4"
              >
                <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-[#F5F5F5]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-[#0A0A0A] truncate">{item.name}</h3>
                  {item.variant && (
                    <p className="text-xs text-[#6B6B6B] mt-0.5">{item.variant}</p>
                  )}
                  {item.customSummary && (
                    <p className="text-xs text-[#9A9A9A] mt-0.5 line-clamp-1">{item.customSummary}</p>
                  )}

                  <div className="flex items-center justify-between mt-3 gap-4">
                    {/* Quantity */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= (item.moq || 1)}
                        className="h-7 w-7 rounded-lg border border-[#E5E5E5] flex items-center justify-center hover:border-[#0A0A0A] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-[#E5E5E5] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-7 w-7 rounded-lg border border-[#E5E5E5] flex items-center justify-center hover:border-[#0A0A0A] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <p className="text-sm font-bold text-[#0A0A0A]">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-red-50 hover:text-red-500 text-[#9A9A9A] transition-colors"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 sticky top-24">
            <h2 className="font-bold text-lg text-[#0A0A0A] mb-5">Order Summary</h2>

            <div className="space-y-3 text-sm mb-5">
              <div className="flex justify-between">
                <span className="text-[#6B6B6B]">Subtotal</span>
                <span className="font-medium">{formatPrice(sub)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B6B6B]">GST (18%)</span>
                <span className="font-medium">{formatPrice(gst)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B6B6B]">Shipping</span>
                <span className={shipping === 0 ? "text-green-600 font-medium" : "font-medium"}>
                  {shipping === 0 ? "FREE" : formatPrice(shipping)}
                </span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Coupon ({couponCode})</span>
                  <span>-{formatPrice(couponDiscount)}</span>
                </div>
              )}
              <div className="border-t border-[#E5E5E5] pt-3 flex justify-between font-bold text-base">
                <span>Total</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* Coupon */}
            {!couponCode ? (
              <div className="mb-5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    value={couponInput}
                    onChange={(e) => { setCouponInput(e.target.value); setCouponError(""); }}
                    className="flex-1 h-9 px-3 rounded-lg border border-[#E5E5E5] text-sm focus:outline-none focus:ring-2 focus:ring-[#0A0A0A]"
                    aria-label="Coupon code"
                  />
                  <Button variant="outline" size="sm" onClick={handleCoupon}>Apply</Button>
                </div>
                {couponError && <p className="text-xs text-red-500 mt-1">{couponError}</p>}
              </div>
            ) : (
              <div className="flex items-center justify-between bg-green-50 rounded-lg px-3 py-2 mb-5">
                <p className="text-xs text-green-700 font-medium">
                  Coupon &ldquo;{couponCode}&rdquo; applied!
                </p>
                <button onClick={removeCoupon} className="text-xs text-green-600 underline">Remove</button>
              </div>
            )}

            <Link href="/checkout">
              <Button variant="accent" size="lg" className="w-full">
                Proceed to Checkout <ArrowRight size={16} />
              </Button>
            </Link>

            <p className="text-xs text-[#9A9A9A] text-center mt-3">
              Free shipping on orders above ₹999
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
