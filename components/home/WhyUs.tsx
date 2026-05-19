"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Paintbrush, CreditCard, RotateCcw } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Quality Guaranteed",
    description: "Premium materials, professional printing. Every single product is inspected before dispatch.",
    gradient: "from-[#FF5E36] to-[#EC4899]",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description: "Most orders are produced and shipped within 3–5 business days.",
    gradient: "from-amber-500 to-[#FF5E36]",
  },
  {
    icon: Paintbrush,
    title: "100% Customizable",
    description: "Full creative control. Choose your own design, colors, placement and style details.",
    gradient: "from-[#EC4899] to-indigo-500",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description: "Encrypted checkouts. Multiple secure payment options, keeping your data protected.",
    gradient: "from-emerald-400 to-teal-600",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "If we made a production error, we'll fix it instantly — no questions asked.",
    gradient: "from-blue-500 to-indigo-600",
  },
];

export default function WhyUs() {
  return (
    <section className="py-24 bg-linear-to-b from-white via-zinc-50/40 to-white border-y border-brand-border/30" aria-labelledby="why-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-orange bg-brand-orange/5 border border-brand-orange/10 px-3.5 py-1.5 rounded-full select-none">
            Why Choose Us
          </span>
          <h2 id="why-heading" className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-brand-black mt-4 tracking-tight">
            Why <span className="italic font-normal">CustomWorks?</span>
          </h2>
          <p className="text-sm text-brand-muted mt-3 max-w-md mx-auto leading-relaxed">
            We merge cutting-edge print quality with effortless design tools to deliver bespoke custom items.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-brand-border/60 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Feature Icon with unique gradient backing */}
              <div className={`h-12 w-12 flex items-center justify-center rounded-xl bg-linear-to-br ${f.gradient} text-white mb-5 transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                <f.icon size={22} className="stroke-[2.5]" />
              </div>
              <h3 className="text-sm font-bold text-brand-black mb-2 group-hover:text-brand-orange transition-colors">
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
