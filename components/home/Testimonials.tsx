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
    rating: 4,
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
    <section className="py-20 bg-white border-t border-brand-border" aria-labelledby="testimonials-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-block mb-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-black bg-brand-black/5 px-2.5 py-0.5 rounded-full border border-brand-black/10">
            Customer Love
          </span>
        </div>
        <h2 id="testimonials-heading" className="text-3xl sm:text-4xl font-black text-brand-black mb-14">
          What Our Customers Say
        </h2>
 
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-brand-border rounded-3xl p-8 sm:p-12 shadow-md hover:shadow-lg transition-shadow duration-250"
            >
              <Quote size={32} className="text-brand-black/10 mx-auto mb-6" />
 
              <p className="text-brand-black/95 text-lg sm:text-xl leading-relaxed mb-8 font-light">
                &ldquo;{t.review}&rdquo;
              </p>
 
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={18}
                    className={s <= t.rating ? "fill-amber-400 text-amber-400" : "fill-brand-black/10 text-brand-black/10"}
                  />
                ))}
              </div>
 
              {/* Author */}
              <div className="flex items-center justify-center gap-3">
                <div className="h-10 w-10 rounded-full bg-brand-black text-white flex items-center justify-center text-sm font-bold shadow-md">
                  {t.avatar}
                </div>
                <div className="text-left">
                  <p className="text-brand-black font-semibold text-sm">{t.name}</p>
                  <p className="text-brand-muted text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
 
          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="h-10 w-10 flex items-center justify-center rounded-full border border-brand-border text-brand-black hover:bg-brand-surface transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? "w-8 bg-brand-black" : "w-2 bg-brand-black/20"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="h-10 w-10 flex items-center justify-center rounded-full border border-brand-border text-brand-black hover:bg-brand-surface transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
