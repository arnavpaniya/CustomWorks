"use client";

import { motion } from "framer-motion";
import { MousePointerClick, Palette, Package } from "lucide-react";

const steps = [
  {
    icon: MousePointerClick,
    step: "01",
    title: "Choose Your Product",
    description:
      "Browse our catalogue of premium products — tees, mugs, caps, bags and more. Pick what fits your vision.",
  },
  {
    icon: Palette,
    step: "02",
    title: "Customize & Design",
    description:
      "Use our live canvas tool to add your text, logo, or artwork. See a real-time preview of your final product.",
  },
  {
    icon: Package,
    step: "03",
    title: "We Deliver",
    description:
      "Place your order. Our team reviews, crafts, and ships your custom product right to your doorstep.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white" aria-labelledby="how-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent mb-2">
            Simple Process
          </p>
          <h2 id="how-heading" className="text-3xl sm:text-4xl font-black text-brand-black">
            How It Works
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-px bg-brand-border z-0" />

          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative flex flex-col items-center text-center bg-white rounded-2xl border border-brand-border p-8 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              {/* Step number */}
              <span className="absolute -top-3 left-8 text-xs font-black text-brand-white bg-brand-black px-2.5 py-0.5 rounded-full border border-brand-border">
                {step.step}
              </span>

              {/* Icon */}
              <div className="h-14 w-14 flex items-center justify-center rounded-2xl bg-brand-black text-white mb-5">
                <step.icon size={26} />
              </div>

              <h3 className="text-lg font-bold text-brand-black mb-3">{step.title}</h3>
              <p className="text-brand-muted text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
