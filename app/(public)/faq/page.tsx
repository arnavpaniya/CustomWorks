"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    category: "Customization",
    items: [
      { q: "What file formats can I upload for my design?", a: "We accept JPG, PNG, and SVG files up to 10MB. For best print quality, use high-resolution images (300 DPI or higher) or vector SVG files." },
      { q: "Can I use my own logo for corporate orders?", a: "Absolutely! Upload your logo directly in the customization wizard. For vector files, SVG gives the sharpest results. For bulk orders, contact us via WhatsApp for dedicated support." },
      { q: "Is there a limit to how much text I can add?", a: "No strict limit, but we recommend keeping text concise for best visual impact. Our live preview will show you exactly how it looks before you order." },
      { q: "Can I preview my design before ordering?", a: "Yes! Our customization wizard includes a live preview at every step and a dedicated preview step where you can review and confirm your design before adding to cart." },
    ],
  },
  {
    category: "Orders & Delivery",
    items: [
      { q: "How long does production take?", a: "Standard orders are produced within 3–5 business days. Bulk orders (50+ pieces) may take 5–10 business days. We'll confirm your timeline when you place the order." },
      { q: "Do you ship all over India?", a: "Yes, we ship pan-India via trusted courier partners. Free shipping on orders above ₹999. Standard shipping is ₹99 for smaller orders." },
      { q: "Can I track my order?", a: "Yes! Once your order is dispatched, you'll receive a tracking link via email and SMS. You can also check your order status on your account dashboard." },
      { q: "Can I modify my order after placing it?", a: "Orders can be modified before production starts (typically within 12 hours). Use the 'Modification Request' button on your order detail page to message us directly on WhatsApp." },
    ],
  },
  {
    category: "Returns & Refunds",
    items: [
      { q: "What is your return policy for custom orders?", a: "Since all products are made-to-order, we don't accept returns for change-of-mind. However, if there's a quality issue or we made an error in your design, we'll replace it or refund — no questions asked." },
      { q: "How do I raise a return request?", a: "Go to your order detail page and click 'Return/Exchange Request'. Attach photos of the issue and we'll get back to you within 24 hours." },
      { q: "When will I get my refund?", a: "Refunds are processed within 5–7 business days after we receive and inspect the returned item (or approve a quality claim without return)." },
    ],
  },
  {
    category: "Payments",
    items: [
      { q: "What payment methods do you accept?", a: "We accept all major payment methods — Credit/Debit cards, UPI (GPay, PhonePe, Paytm), Net Banking, and EMI options on select cards." },
      { q: "Is my payment information secure?", a: "Yes. We use industry-standard SSL encryption and our payment gateway is PCI-DSS compliant. We never store your card details." },
      { q: "Do you offer COD (Cash on Delivery)?", a: "COD is not available for custom orders due to the made-to-order nature. We accept all digital payment methods." },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-brand-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-4 text-left gap-4 hover:text-brand-black hover:opacity-80 transition-colors"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-brand-black leading-snug">{q}</span>
        <ChevronDown
          size={16}
          className={cn("shrink-0 text-brand-muted transition-transform duration-200", open && "rotate-180")}
        />
      </button>
      {open && (
        <p className="text-sm text-brand-muted leading-relaxed pb-4 pr-8">{a}</p>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <div className="inline-block mb-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-black bg-brand-black/5 px-2.5 py-0.5 rounded-full border border-brand-black/10">
            Help Center
          </span>
        </div>
        <h1 className="text-4xl font-black text-brand-black">Frequently Asked Questions</h1>
        <p className="text-brand-muted mt-3">Can&apos;t find your answer? Chat with us on WhatsApp.</p>
      </div>

      <div className="space-y-8">
        {faqs.map((section) => (
          <div key={section.category} className="bg-white rounded-2xl border border-brand-border overflow-hidden">
            <div className="px-6 py-4 border-b border-brand-border bg-brand-white">
              <h2 className="font-bold text-sm text-brand-black">{section.category}</h2>
            </div>
            <div className="px-6">
              {section.items.map((item) => (
                <FAQItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
