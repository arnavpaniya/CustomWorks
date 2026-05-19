"use client";

import { motion } from "framer-motion";
import { MousePointerClick, Palette, Package } from "lucide-react";

const steps = [
  {
    icon: MousePointerClick,
    step: "01",
    title: "Choose Your Product",
    description:
      "Browse our curated catalogue of premium apparel, high-grade ceramic mugs, and custom accessories.",
    gradient: "from-[#FF5E36] to-amber-500",
  },
  {
    icon: Palette,
    step: "02",
    title: "Customize & Design",
    description:
      "Upload your artwork or compose custom text layouts using our live browser mockup customization interface.",
    gradient: "from-indigo-500 to-[#EC4899]",
  },
  {
    icon: Package,
    step: "03",
    title: "We Deliver",
    description:
      "Our master printing technicians craft your custom products and ship them direct to your doorstep.",
    gradient: "from-emerald-400 to-[#0D9488]",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white" aria-labelledby="how-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-18">
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-orange bg-brand-orange/5 border border-brand-orange/10 px-3.5 py-1.5 rounded-full select-none">
            Simple Process
          </span>
          <h2 id="how-heading" className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-brand-black mt-4 tracking-tight">
            How It <span className="italic font-normal">Works</span>
          </h2>
          <p className="text-sm text-brand-muted mt-3 max-w-md mx-auto leading-relaxed">
            From design to delivery, we've streamlined custom ordering in three effortless steps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
          
          {/* Decorative Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-[52px] left-[15%] right-[15%] h-[2px] bg-linear-to-r from-brand-orange/20 via-[#EC4899]/30 to-[#0D9488]/20 z-0" />

          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="relative flex flex-col items-center text-center bg-white rounded-3xl border border-brand-border/60 p-8 shadow-xs hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 group overflow-hidden z-10"
            >
              {/* Massive Low-Opacity Step Digit Overlay for visual depth */}
              <span className="absolute -bottom-6 right-2 text-9xl font-black text-brand-black/3 select-none pointer-events-none tracking-tighter">
                {step.step}
              </span>

              {/* Glowing Pill Step Indicator */}
              <span className="absolute -top-3 left-8 text-[9px] font-black text-white bg-brand-black px-3 py-1 rounded-full border border-brand-border/20 shadow-xs uppercase tracking-wider">
                Step {step.step}
              </span>

              {/* Icon Container with subtle inner glow */}
              <div className={`h-14 w-14 flex items-center justify-center rounded-2xl bg-linear-to-br ${step.gradient} text-white mb-6 shadow-sm transform transition-transform duration-300 group-hover:scale-105`}>
                <step.icon size={26} className="stroke-[2.5]" />
              </div>

              <h3 className="text-lg font-bold text-brand-black mb-3 group-hover:text-brand-orange transition-colors">
                {step.title}
              </h3>
              <p className="text-brand-muted text-xs sm:text-sm leading-relaxed font-medium">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
