"use client";

import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    category: "Ordering & Design",
    items: [
      {
        q: "How do I upload my own design?",
        a: "You can upload your own design directly on the product page using our interactive Customizer tool. We accept PNG, JPG, and SVG formats. For best results, use high-resolution images (at least 300 DPI)."
      },
      {
        q: "Can I request a sample before placing a bulk order?",
        a: "Yes! For corporate or bulk orders, we can provide a physical sample for approval before proceeding with the full production run. Please contact our corporate sales team."
      },
      {
        q: "Do you review designs before printing?",
        a: "Yes, our pre-press team briefly reviews designs for print quality and alignment. However, we do not proofread text or alter the fundamental design. You are responsible for ensuring your design is exactly as you want it."
      }
    ]
  },
  {
    category: "Shipping & Delivery",
    items: [
      {
        q: "How long will it take to receive my order?",
        a: "Most orders are processed, printed, and shipped within 3-5 business days. Delivery typically takes an additional 2-5 days depending on your location in India. Total estimated time from order to delivery is 5-10 business days."
      },
      {
        q: "Do you offer free shipping?",
        a: "Yes, we offer free shipping across India for all orders above ₹999. For orders below this amount, standard shipping rates apply based on your location."
      },
      {
        q: "How can I track my order?",
        a: "Once your order is dispatched, you will receive an SMS and email with the tracking link. You can also track your order status in the 'My Orders' section of your account dashboard."
      }
    ]
  },
  {
    category: "Returns & Refunds",
    items: [
      {
        q: "Can I return a customized product?",
        a: "Because custom products are made specifically for you, we cannot accept returns for reasons like change of mind or incorrect size selection. However, if there is a manufacturing defect or printing error on our part, we will gladly offer a replacement or refund."
      },
      {
        q: "What if my item arrives damaged?",
        a: "If your item arrives damaged, please take clear photos of the damage and the packaging, and contact our support team by email within 48 hours of delivery. We will scrutinize the claim to verify it is an actual delivery-related issue before proceeding with a replacement."
      }
    ]
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>("0-0");

  const toggleAccordion = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-block mb-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-black bg-brand-black/5 px-2.5 py-0.5 rounded-full border border-brand-black/10">
            Help Center
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-brand-black mb-6">
          Frequently Asked Questions
        </h1>
        <p className="text-brand-muted text-lg leading-relaxed max-w-2xl mx-auto">
          Find answers to common questions about designing, ordering, shipping, and returns.
        </p>
      </div>

      <div className="space-y-12">
        {faqs.map((category, catIdx) => (
          <div key={category.category}>
            <h2 className="text-2xl font-bold text-brand-black mb-6">{category.category}</h2>
            <div className="space-y-4">
              {category.items.map((faq, itemIdx) => {
                const id = `${catIdx}-${itemIdx}`;
                const isOpen = openIndex === id;
                return (
                  <div key={id} className="bg-white border border-brand-border rounded-2xl overflow-hidden shadow-sm">
                    <button
                      onClick={() => toggleAccordion(id)}
                      className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-black"
                    >
                      <span className="font-bold text-brand-black">{faq.q}</span>
                      <ChevronDown
                        size={20}
                        className={`text-brand-muted transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-6 pb-6 text-brand-muted text-sm leading-relaxed border-t border-brand-border pt-4">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Still need help CTA */}
      <div className="mt-20 bg-white border border-brand-border rounded-3xl p-10 text-center shadow-lg">
        <div className="h-16 w-16 mx-auto bg-white rounded-2xl border border-brand-border shadow-sm flex items-center justify-center mb-6">
          <MessageCircle size={28} className="text-brand-orange" />
        </div>
        <h3 className="text-2xl font-black text-brand-black mb-3">Still have questions?</h3>
        <p className="text-brand-muted mb-8 max-w-md mx-auto">
          Can&apos;t find the answer you&apos;re looking for? Our friendly support team is here to help.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="https://wa.me/">
             <Button variant="accent" size="lg" className="w-full sm:w-auto px-8">
               Chat on WhatsApp
             </Button>
          </a>
          <a href="/contact">
            <Button variant="outline" size="lg" className="w-full sm:w-auto px-8">
              Contact Us
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
