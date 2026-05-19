"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Paintbrush, CreditCard, RotateCcw } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Quality Guaranteed",
    description: "Premium materials, professional printing. Every product inspected before dispatch.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description: "Most orders produced and shipped within 3–5 business days.",
  },
  {
    icon: Paintbrush,
    title: "100% Customizable",
    description: "Full creative control. Your design, your colors, your placement.",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description: "Multiple payment options. Encrypted checkout. Your data stays safe.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "If we made an error, we'll fix it — no questions asked.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-20 bg-white" aria-labelledby="why-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent mb-2">
            Why Choose Us
          </p>
          <h2 id="why-heading" className="text-3xl sm:text-4xl font-black text-brand-black">
            Why CustomWorks?
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-brand-border shadow-md hover:shadow-lg hover:-translate-y-1 transition-all group"
            >
              <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-brand-black group-hover:bg-brand-accent text-white mb-4 transition-all">
                <f.icon size={22} />
              </div>
              <h3 className="text-sm font-bold text-brand-black mb-2">{f.title}</h3>
              <p className="text-xs text-brand-muted leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
