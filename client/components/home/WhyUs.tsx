"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Paintbrush, CreditCard } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Quality Guaranteed",
    description: "Premium materials, professional printing. Every single product is inspected before dispatch.",
    cardClass: "bg-narrative-forest text-white rounded-2xl p-6 sm:p-8",
    iconClass: "bg-white/20 text-white",
    titleClass: "text-white",
    descClass: "text-white/70",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description: "Most orders are produced and shipped within 3–5 business days.",
    cardClass: "bg-narrative-clay/10 text-narrative-forest rounded-2xl p-6 sm:p-8 border border-narrative-clay/15",
    iconClass: "bg-narrative-clay text-white",
    titleClass: "text-narrative-forest",
    descClass: "text-narrative-forest/60",
  },
  {
    icon: Paintbrush,
    title: "100% Customizable",
    description: "Full creative control. Choose your own design, colors, placement and style details.",
    cardClass: "bg-narrative-ochre/10 text-narrative-forest rounded-2xl p-6 sm:p-8 border border-narrative-ochre/15",
    iconClass: "bg-narrative-ochre text-white",
    titleClass: "text-narrative-forest",
    descClass: "text-narrative-forest/60",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description: "Encrypted checkouts. Multiple secure payment options, keeping your data protected.",
    cardClass: "bg-narrative-sage/10 text-narrative-forest rounded-2xl p-6 sm:p-8 border border-narrative-sage/15",
    iconClass: "bg-narrative-sage text-white",
    titleClass: "text-narrative-forest",
    descClass: "text-narrative-forest/60",
  },
];

export default function WhyUs() {
  return (
    <section className="py-24 bg-[#FAF6F0]" aria-labelledby="why-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center mb-16 select-none">
          <span className="text-[10px] font-black uppercase tracking-widest text-narrative-clay bg-narrative-clay/5 border border-narrative-clay/20 px-3.5 py-1.5 rounded-full">
            Why Choose Us
          </span>
          <h2 id="why-heading" className="text-4xl sm:text-5xl font-serif font-light text-narrative-forest mt-4 tracking-tight">
            Why <span className="italic font-normal text-narrative-clay">CustomWorks?</span>
          </h2>
          <p className="text-sm text-narrative-forest/60 mt-2 max-w-md mx-auto leading-relaxed">
            We merge cutting-edge print quality with effortless design tools to deliver bespoke custom items.
          </p>
        </div>

        {/* Spaced Grid with Unique Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`flex flex-col items-start text-left hover:scale-[1.02] hover:shadow-md transition-all duration-300 group ${f.cardClass}`}
            >
              {/* Icon Container */}
              <div className={`h-12 w-12 flex items-center justify-center rounded-xl mb-6 group-hover:scale-105 transition-transform duration-300 ${f.iconClass}`}>
                <f.icon size={20} className="stroke-[2.5]" />
              </div>
              
              <h3 className={`text-sm font-bold mb-2 ${f.titleClass}`}>
                {f.title}
              </h3>
              <p className={`text-xs leading-relaxed font-medium ${f.descClass}`}>
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
