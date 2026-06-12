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
  },
  {
    name: "Rahul Mehta",
    role: "Startup Founder",
    review:
      "The design tool is super intuitive. I created a full custom mug design in minutes. The print quality is exactly what I expected — crisp and vibrant.",
    rating: 5,
    avatar: "RM",
  },
  {
    name: "Anjali Desai",
    role: "Event Coordinator",
    review:
      "Used CustomWorks for corporate gifting. The packaging was premium, the products were spot-on. Our clients absolutely loved them.",
    rating: 5,
    avatar: "AD",
  },
  {
    name: "Vikram Singh",
    role: "Personal Customer",
    review:
      "Got a custom T-shirt for my dad's birthday with a family photo print. He was thrilled! Fast delivery and excellent print quality.",
    rating: 5,
    avatar: "VS",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="py-24 bg-[#FAFAFA] border-b border-zinc-200/60 relative overflow-hidden" aria-labelledby="testimonials-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Header Block */}
        <div className="inline-block mb-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-orange bg-brand-orange/5 border border-brand-orange/10 px-3.5 py-1.5 rounded-full select-none">
            Customer Love
          </span>
        </div>
        <h2 id="testimonials-heading" className="text-4xl sm:text-5xl font-serif font-light text-brand-black mb-16 tracking-tight">
          What Our Customers <span className="italic font-normal">Say</span>
        </h2>
 
        <div className="relative max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.99, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.99, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white border border-zinc-200/60 p-8 sm:p-14 shadow-sm"
            >
              {/* Quote Mark Icon with brand orange accent */}
              <div className="w-10 h-10 border border-zinc-200/60 flex items-center justify-center mx-auto mb-6 bg-zinc-50">
                <Quote size={16} className="text-brand-orange stroke-[2.5]" />
              </div>
 
              <p className="text-brand-black/95 text-lg sm:text-xl leading-relaxed mb-8 font-light tracking-tight max-w-xl mx-auto">
                &ldquo;{t.review}&rdquo;
              </p>
 
              {/* Rating Stars */}
              <div className="flex justify-center gap-1.5 mb-8">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={14}
                    className="fill-amber-400 text-amber-400 stroke-[1.5]"
                  />
                ))}
              </div>
 
              {/* User Identity Card */}
              <div className="flex items-center justify-center gap-4 bg-zinc-50 border border-zinc-200/60 px-5 py-3.5 w-fit mx-auto">
                <div className="h-10 w-10 bg-zinc-950 text-white flex items-center justify-center text-xs font-bold tracking-wider">
                  {t.avatar}
                </div>
                <div className="text-left select-none">
                  <p className="text-brand-black font-bold text-xs">{t.name}</p>
                  <p className="text-brand-muted text-[10px] uppercase tracking-wider font-bold mt-0.5">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
 
          {/* Custom controls with animated pill dots */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="h-10 w-10 flex items-center justify-center border border-zinc-200/80 text-brand-black hover:text-brand-orange hover:bg-zinc-50 hover:border-brand-orange/30 transition-all duration-200 cursor-pointer bg-white"
            >
              <ChevronLeft size={16} className="stroke-[2.5]" />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-1.5 transition-all duration-300 cursor-pointer ${
                    i === current ? "w-6 bg-brand-black" : "w-2 bg-zinc-300 hover:bg-zinc-450"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="h-10 w-10 flex items-center justify-center border border-zinc-200/80 text-brand-black hover:text-brand-orange hover:bg-zinc-50 hover:border-brand-orange/30 transition-all duration-200 cursor-pointer bg-white"
            >
              <ChevronRight size={16} className="stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
