"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Marketing Manager",
    review:
      "Ordered custom hoodies for our entire team of 40. The quality was exceptional and delivery was right on time. Will definitely order again!",
    rating: 5,
    avatar: "PS",
    gradient: "from-[#FF5E36] to-amber-500",
  },
  {
    name: "Rahul Mehta",
    role: "Startup Founder",
    review:
      "The design tool is super intuitive. I created a full custom mug design in minutes. The print quality is exactly what I expected — crisp and vibrant.",
    rating: 5,
    avatar: "RM",
    gradient: "from-indigo-500 to-[#EC4899]",
  },
  {
    name: "Anjali Desai",
    role: "Event Coordinator",
    review:
      "Used CustomWorks for corporate gifting. The packaging was premium, the products were spot-on. Our clients absolutely loved them.",
    rating: 5,
    avatar: "AD",
    gradient: "from-emerald-400 to-[#0D9488]",
  },
  {
    name: "Vikram Singh",
    role: "Personal Customer",
    review:
      "Got a custom T-shirt for my dad's birthday with a family photo print. He was thrilled! Fast delivery and excellent print quality.",
    rating: 5,
    avatar: "VS",
    gradient: "from-blue-500 to-indigo-600",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="py-24 bg-zinc-50/30 border-t border-brand-border/40 relative overflow-hidden" aria-labelledby="testimonials-heading">
      {/* Subtle background decoration */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-linear-to-r from-transparent via-brand-border/30 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-block mb-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-orange bg-brand-orange/5 border border-brand-orange/10 px-3.5 py-1.5 rounded-full select-none">
            Customer Love
          </span>
        </div>
        <h2 id="testimonials-heading" className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-brand-black mb-16 tracking-tight">
          What Our Customers <span className="italic font-normal">Say</span>
        </h2>
 
        <div className="relative max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white/80 backdrop-blur-md border border-brand-border/60 rounded-3xl p-8 sm:p-14 shadow-xs hover:shadow-md transition-all duration-300"
            >
              {/* Quote Mark Icon with brand orange accent */}
              <div className="w-12 h-12 rounded-full bg-brand-orange/5 flex items-center justify-center mx-auto mb-6">
                <Quote size={20} className="text-brand-orange stroke-[2.5]" />
              </div>
 
              <p className="text-brand-black/90 text-lg sm:text-xl leading-relaxed mb-8 font-semibold tracking-tight">
                &ldquo;{t.review}&rdquo;
              </p>
 
              {/* Rating Stars with animate-pulse-slow spacing */}
              <div className="flex justify-center gap-1.5 mb-8">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={16}
                    className="fill-amber-400 text-amber-400 stroke-[1.5]"
                  />
                ))}
              </div>
 
              {/* User Identity Card */}
              <div className="flex items-center justify-center gap-4 bg-brand-surface/40 px-5 py-3.5 rounded-2xl border border-brand-border/30 w-fit mx-auto shadow-2xs">
                <div className={`h-11 w-11 rounded-full bg-linear-to-br ${t.gradient} text-white flex items-center justify-center text-sm font-black shadow-sm`}>

                  {t.avatar}
                </div>
                <div className="text-left">
                  <p className="text-brand-black font-black text-sm">{t.name}</p>
                  <p className="text-brand-muted text-xs font-semibold">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
 
          {/* Custom controls with animated pill dots */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="h-10 w-10 flex items-center justify-center rounded-full border border-brand-border/60 text-brand-black hover:text-brand-orange hover:bg-white hover:border-brand-orange/30 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-2xs bg-white/50"
            >
              <ChevronLeft size={18} className="stroke-[2.5]" />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                    i === current ? "w-8 bg-brand-black" : "w-2 bg-brand-black/20 hover:bg-brand-black/45"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="h-10 w-10 flex items-center justify-center rounded-full border border-brand-border/60 text-brand-black hover:text-brand-orange hover:bg-white hover:border-brand-orange/30 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-2xs bg-white/50"
            >
              <ChevronRight size={18} className="stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
