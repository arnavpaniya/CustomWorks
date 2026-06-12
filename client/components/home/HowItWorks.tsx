"use client";

import { motion } from "framer-motion";
import { MousePointerClick, Palette, Package } from "lucide-react";

const steps = [
  {
    icon: MousePointerClick,
    step: "01",
    title: "Choose Your Product",
    description:
      "Browse our curated catalogue of custom manufactured stationery, premium apparel, signs, and identity accessories.",
  },
  {
    icon: Palette,
    step: "02",
    title: "Customize & Design",
    description:
      "Upload your artwork or compose custom text layouts using our live browser mockup customization interface.",
  },
  {
    icon: Package,
    step: "03",
    title: "We Deliver",
    description:
      "Our advanced manufacturing facilities craft your bespoke designs with industrial-grade precision and ship them direct to your door.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white border-b border-zinc-200/60" aria-labelledby="how-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center mb-16 select-none">
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-orange bg-brand-orange/5 border border-brand-orange/10 px-3.5 py-1.5 rounded-full">
            Simple Process
          </span>
          <h2 id="how-heading" className="text-4xl sm:text-5xl font-serif font-light text-brand-black mt-4 tracking-tight">
            How It <span className="italic font-normal">Works</span>
          </h2>
          <p className="text-sm text-brand-muted mt-2 max-w-md mx-auto leading-relaxed">
            From custom design to industrial-scale manufacturing, ordering is completed in three refined steps.
          </p>
        </div>

        {/* 3-Column Border-Joined Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-zinc-200/60 shadow-sm">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative flex flex-col justify-between bg-white p-8 sm:p-10 border-b border-r border-zinc-200/60 hover:bg-zinc-50/10 transition-colors duration-300 group z-10 min-h-[260px]"
            >
              {/* Step number marker */}
              <span className="absolute top-8 sm:top-10 right-8 sm:right-10 text-[10px] font-mono font-bold text-zinc-300 group-hover:text-brand-orange transition-colors">
                [ {step.step} ]
              </span>

              {/* Icon Container */}
              <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-zinc-950 text-white mb-8 group-hover:scale-105 transition-transform duration-300">
                <step.icon size={18} className="stroke-[2.5]" />
              </div>

              {/* Text Area */}
              <div>
                <h3 className="text-base font-bold text-brand-black mb-3">
                  {step.title}
                </h3>
                <p className="text-brand-muted text-xs sm:text-sm leading-relaxed font-medium max-w-xs">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
