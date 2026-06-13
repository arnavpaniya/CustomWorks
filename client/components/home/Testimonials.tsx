"use client";

import { useState, useEffect } from "react";
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
const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 80 : -80,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -80 : 80,
    opacity: 0
  })
};

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 6000); // Cycles every 6 seconds
    return () => clearInterval(timer);
  }, [current]);

  const t = testimonials[current];

  return (
    <section
      className="py-20 sm:py-28 bg-white overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-block mb-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-narrative-ochre bg-narrative-ochre/5 border border-narrative-ochre/20 px-3.5 py-1.5 rounded-full select-none">
            Customer Love
          </span>
        </div>

        {/* Heading */}
        <h2
          id="testimonials-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-narrative-forest mb-14 sm:mb-16 tracking-tight"
        >
          What Our Customers{" "}
          <span className="italic font-normal text-narrative-ochre">Say</span>
        </h2>

        {/* Testimonial Card Slider */}
        <div className="relative max-w-2xl mx-auto px-4">
          <div className="overflow-hidden relative w-full rounded-[2rem] sm:rounded-[2.5rem]">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeOut" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(e, { offset }) => {
                  const swipe = Math.abs(offset.x) > 50;
                  if (swipe) {
                    if (offset.x > 0) {
                      prev();
                    } else {
                      next();
                    }
                  }
                }}
                className="bg-[#FAF6F0] p-8 sm:p-12 lg:p-14 border border-zinc-200/40 shadow-sm rounded-[2rem] sm:rounded-[2.5rem] cursor-grab active:cursor-grabbing select-none"
              >
                {/* Quote icon box */}
                <div className="w-12 h-12 rounded-xl bg-narrative-ochre/10 flex items-center justify-center mx-auto mb-7">
                  <Quote size={20} className="text-narrative-ochre stroke-[2]" />
                </div>

                {/* Review text */}
                <p className="text-narrative-forest/90 text-lg sm:text-xl leading-relaxed font-light tracking-tight max-w-xl mx-auto mb-8">
                  &ldquo;{t.review}&rdquo;
                </p>

                {/* Rating Stars */}
                <div className="flex justify-center gap-1.5 mb-8">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={15}
                      className="fill-amber-400 text-amber-400 stroke-[1.5]"
                    />
                  ))}
                </div>

                {/* User info */}
                <div className="flex items-center justify-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-narrative-clay text-white flex items-center justify-center text-sm font-bold">
                    {t.avatar}
                  </div>
                  <div className="text-left">
                    <p className="text-narrative-forest font-bold text-sm">
                      {t.name}
                    </p>
                    <p className="text-narrative-forest/60 text-xs uppercase tracking-wider font-medium mt-0.5">
                      {t.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation controls */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-zinc-200/60 bg-white hover:bg-narrative-forest hover:text-white hover:border-narrative-forest transition-all duration-200 flex items-center justify-center cursor-pointer text-narrative-forest"
            >
              <ChevronLeft size={18} className="stroke-[2]" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2.5 transition-all duration-300 cursor-pointer ${
                    i === current
                      ? "w-8 bg-narrative-forest rounded-full"
                      : "w-2.5 bg-zinc-300 rounded-full hover:bg-zinc-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-zinc-200/60 bg-white hover:bg-narrative-forest hover:text-white hover:border-narrative-forest transition-all duration-200 flex items-center justify-center cursor-pointer text-narrative-forest"
            >
              <ChevronRight size={18} className="stroke-[2]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
