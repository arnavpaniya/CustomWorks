"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    headline: "Design What You Wear",
    sub: "Premium custom products made-to-order. Your vision, our craft.",
    bg: "from-[#FFFFFF] to-[#FFFFFF]",
    accent: "#6366F1", // Indigo
  },
  {
    headline: "Stand Out. Be Custom.",
    sub: "T-shirts, mugs, caps and more. Fully personalized, uniquely yours.",
    bg: "from-[#FFFFFF] to-[#FFFFFF]",
    accent: "#EC4899", // Pink
  },
  {
    headline: "Bulk Orders? We Got You.",
    sub: "Corporate gifting, team merchandise, events — we scale with you.",
    bg: "from-[#FFFFFF] to-[#FFFFFF]",
    accent: "#14B8A6", // Teal
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[current];

  return (
    <section
      className={`relative min-h-[88vh] flex items-center bg-linear-to-br ${slide.bg} transition-all duration-700 overflow-hidden`}
      aria-label="Hero banner"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Animated accent blob */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-10 transition-colors duration-700"
        style={{ background: slide.accent }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            key={current + "badge"}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-border bg-brand-surface text-brand-black text-xs font-medium mb-6 shadow-sm"
          >
            <Sparkles size={12} style={{ color: slide.accent }} />
            Premium Made-to-Order Products
          </motion.div>

          {/* Headline */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={current + "headline"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-brand-black leading-[1.05] tracking-tight mb-6"
            >
              {slide.headline}
            </motion.h1>
          </AnimatePresence>

          {/* Sub */}
          <AnimatePresence mode="wait">
            <motion.p
              key={current + "sub"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-brand-muted mb-10 max-w-xl leading-relaxed"
            >
              {slide.sub}
            </motion.p>
          </AnimatePresence>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/products">
              <Button
                variant="accent"
                size="lg"
                className="group"
              >
                Customize Now
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </Link>
            <Link href="/products">
              <Button
                variant="outline"
                size="lg"
                className="border-brand-border text-brand-black hover:bg-brand-surface"
              >
                Browse Products
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-brand-black" : "w-2 bg-brand-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
