"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Paintbrush, CreditCard } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Quality Guaranteed",
    description: "Premium materials, professional printing. Every single product is inspected before dispatch.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description: "Most orders are produced and shipped within 3–5 business days.",
  },
  {
    icon: Paintbrush,
    title: "100% Customizable",
    description: "Full creative control. Choose your own design, colors, placement and style details.",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description: "Encrypted checkouts. Multiple secure payment options, keeping your data protected.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-24 bg-white border-b border-zinc-200/60" aria-labelledby="why-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center mb-16 select-none">
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-orange bg-brand-orange/5 border border-brand-orange/10 px-3.5 py-1.5 rounded-full">
            Why Choose Us
          </span>
          <h2 id="why-heading" className="text-4xl sm:text-5xl font-serif font-light text-brand-black mt-4 tracking-tight">
            Why <span className="italic font-normal">CustomWorks?</span>
          </h2>
          <p className="text-sm text-brand-muted mt-2 max-w-md mx-auto leading-relaxed">
            We merge cutting-edge print quality with effortless design tools to deliver bespoke custom items.
          </p>
        </div>

        {/* 4-Grid Column Row Border-Joined */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-zinc-200/60 shadow-sm">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-start text-left p-8 bg-white border-b border-r border-zinc-200/60 hover:bg-zinc-50/10 transition-colors duration-300 group"
            >
              {/* Icon Container */}
              <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-zinc-950 text-white mb-6 group-hover:scale-105 transition-transform duration-300 shadow-xs">
                <f.icon size={18} className="stroke-[2.5]" />
              </div>
              
              <h3 className="text-sm font-bold text-brand-black mb-2">
                {f.title}
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed font-medium">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
