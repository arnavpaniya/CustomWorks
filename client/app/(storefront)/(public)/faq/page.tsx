"use client";

import { useState } from "react";
import { ChevronDown, MessageCircle, Sparkles, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    category: "Ordering & Design",
    color: "clay",
    colorClass: "bg-narrative-clay/10 border-narrative-clay/15 text-narrative-clay",
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
    color: "sage",
    colorClass: "bg-narrative-sage/10 border-narrative-sage/15 text-narrative-sage",
    items: [
      {
        q: "How long will it take to receive my order?",
        a: "Most orders are processed, printed, and shipped within 3-5 business days. Delivery typically takes an additional 2-5 days depending on your location in Bengaluru. Total estimated time from order to delivery is 5-10 business days."
      },
      {
        q: "Do you offer free shipping?",
        a: "Yes, we offer free shipping across Bengaluru for all orders above ₹999. For orders below this amount, standard shipping rates apply based on your location."
      },
      {
        q: "How can I track my order?",
        a: "Once your order is dispatched, you will receive an SMS and email with the tracking link. You can also track your order status in the 'My Orders' section of your account dashboard."
      }
    ]
  },
  {
    category: "Returns & Refunds",
    color: "ochre",
    colorClass: "bg-narrative-ochre/10 border-narrative-ochre/15 text-narrative-ochre",
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
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <section className="bg-[#FAF6F0] py-16 sm:py-24 border-b border-zinc-200/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 mb-4 px-3 py-1 rounded-full bg-narrative-clay/10 text-narrative-clay text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={12} /> Help Center
          </div>
          <h1 className="text-4xl sm:text-6xl font-black font-serif text-narrative-forest mb-6 leading-[1.15]">
            Frequently asked <span className="text-narrative-clay italic font-normal">questions</span>
          </h1>
          <p className="text-narrative-forest/75 text-lg leading-relaxed font-light max-w-xl mx-auto">
            Find answers to common questions about designing, ordering, shipping, and return policies.
          </p>
        </div>
      </section>

      {/* Accordion List */}
      <section className="py-20 sm:py-28 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {faqs.map((category, catIdx) => (
            <div key={category.category} className="space-y-6">
              <div className="flex items-center gap-3">
                <div className={`h-8 w-8 flex items-center justify-center rounded-lg border ${category.colorClass}`}>
                  <HelpCircle size={15} />
                </div>
                <h2 className="text-2xl font-bold font-serif text-narrative-forest">{category.category}</h2>
              </div>
              
              <div className="space-y-4">
                {category.items.map((faq, itemIdx) => {
                  const id = `${catIdx}-${itemIdx}`;
                  const isOpen = openIndex === id;
                  return (
                    <div 
                      key={id} 
                      className={`bg-white border rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ${
                        isOpen 
                          ? "border-narrative-clay/40 ring-1 ring-narrative-clay/10 shadow-md" 
                          : "border-zinc-200/40 hover:border-zinc-300 hover:shadow-md"
                      }`}
                    >
                      <button
                        onClick={() => toggleAccordion(id)}
                        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                      >
                        <span className={`font-bold text-sm sm:text-base transition-colors ${isOpen ? "text-narrative-clay" : "text-narrative-forest"}`}>
                          {faq.q}
                        </span>
                        <div className={`h-8 w-8 flex items-center justify-center rounded-full border border-zinc-200/40 text-narrative-forest shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 bg-narrative-clay text-white border-narrative-clay" : ""}`}>
                          <ChevronDown size={16} />
                        </div>
                      </button>
                      
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div className="px-6 pb-6 text-narrative-forest/70 text-xs sm:text-sm leading-relaxed border-t border-zinc-100 pt-4 font-light bg-zinc-50/30">
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

        {/* Call To Action */}
        <div className="mt-24 bg-[#FAF6F0] rounded-[2rem] border border-zinc-200/40 p-8 sm:p-12 text-center shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 rounded-full bg-narrative-ochre/5 blur-2xl pointer-events-none" />
          
          <div className="h-14 w-14 mx-auto bg-white rounded-2xl border border-zinc-200/30 shadow-xs flex items-center justify-center mb-6">
            <MessageCircle size={26} className="text-narrative-clay" />
          </div>
          
          <h3 className="text-2xl font-bold font-serif text-narrative-forest mb-2">Still Have Questions?</h3>
          <p className="text-narrative-forest/70 text-sm mb-8 max-w-sm mx-auto font-light leading-relaxed">
            Can&apos;t find what you&apos;re looking for? Reach out to our customer support team directly.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href="https://wa.me/919632022529" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto h-12 px-8 rounded-full bg-narrative-forest hover:bg-narrative-clay text-white font-bold text-sm tracking-wide shadow-md transition-all duration-300">
                Chat on WhatsApp
              </button>
            </a>
            <a href="/contact" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto h-12 px-8 rounded-full bg-white hover:bg-zinc-50 text-narrative-forest font-semibold text-sm border border-zinc-300 transition-colors">
                Contact Form
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
