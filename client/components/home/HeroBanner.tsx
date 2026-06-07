"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Scissors, ShieldCheck, Box, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroBanner() {
  const { scrollY } = useScroll();

  // Premium scroll-linked parallax transforms (high-performance GPU layers)
  const bgY = useTransform(scrollY, [0, 800], ["0%", "15%"]);
  const bgScale = useTransform(scrollY, [0, 800], [1.0, 1.1]);
  const bgOpacity = useTransform(scrollY, [0, 800], [1, 0.9]);

  // Gentle layout scroll transform
  const textY = useTransform(scrollY, [0, 800], [0, -30]);

  return (
    <section
      className="relative min-h-[90vh] sm:min-h-screen flex items-center bg-white overflow-hidden px-4 sm:px-6 md:px-8 lg:px-20 mt-[-88px] pt-[88px]"
      aria-label="Hero banner"
    >
      {/* Full-screen Parallax Background Image Layer */}
      <motion.div
        style={{
          y: bgY,
          scale: bgScale,
          opacity: bgOpacity,
          backgroundImage: "url(/images/hero-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center right",
          backgroundRepeat: "no-repeat",
        }}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      />

      {/* Dark/White Fade Mask Overlay for Mobile/Tablet readability */}
      <div className="absolute inset-0 bg-linear-to-r from-white via-white/90 to-transparent pointer-events-none lg:hidden z-5" />

      {/* Hero Content Container with Parallax depth movement */}
      <motion.div 
        style={{ y: textY }}
        className="relative max-w-7xl mx-auto pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-32 lg:pb-36 w-full z-10"
      >
        <div className="max-w-3xl flex flex-col items-start text-left">
          
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-50 border border-zinc-200/60 text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-5 shadow-2xs select-none"
          >
            <span className="text-[12px] leading-none text-brand-orange animate-pulse">✦</span>
            <span>Premium Custom Products</span>
          </motion.div>

          {/* Headline with Elegant Editorial Serif & Cursive flourishes */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light text-brand-black leading-[1.12] tracking-tight mb-5"
          >
            <span className="italic font-normal">Custom</span> Made.<br />
            <span className="italic font-normal">Extraordinary.</span>
          </motion.h1>

          {/* Subtitle / Narrative */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-base sm:text-lg text-brand-muted leading-relaxed mb-8 max-w-md font-medium"
          >
            Your idea. Our craft.<br className="hidden sm:inline" />
            {" "}One-of-a-kind products,<br className="hidden sm:inline" />
            {" "}made to leave a mark.
          </motion.p>

          {/* Premium Call-to-Actions (CTAs) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            <Link href="/products">
              <Button
                variant="accent"
                size="lg"
                className="group px-8 py-6.5 rounded-full bg-brand-black text-white hover:bg-brand-orange hover:shadow-lg transition-all duration-300 font-bold uppercase tracking-wider text-xs flex items-center gap-3 border border-brand-black hover:border-brand-orange active:scale-98"
              >
                Start Your Design
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1.5 transition-transform duration-300"
                />
              </Button>
            </Link>
            <Link href="/products">
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6.5 rounded-full border border-zinc-300/80 bg-white/40 hover:bg-white text-brand-black hover:shadow-md transition-all duration-300 font-bold uppercase tracking-wider text-xs active:scale-98"
              >
                Explore Products
              </Button>
            </Link>
          </motion.div>

          {/* Bottom Custom Features Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="z-30 relative border border-zinc-200/80 rounded-3xl bg-white/80 backdrop-blur-md px-5 py-4 sm:px-8 sm:py-5 flex flex-wrap gap-x-8 gap-y-5 items-center shadow-xs w-full max-w-[85vw] sm:max-w-fit select-none"
          >
            {/* Feature 1 */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-200/50 flex items-center justify-center text-brand-black shrink-0">
                <Scissors size={14} className="stroke-2" />
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-wider text-brand-black">Bespoke</h4>
                <p className="text-[9px] text-zinc-500 font-bold mt-0.5">Built around you</p>
              </div>
            </div>

            <div className="hidden sm:block h-8 w-px bg-zinc-200/80" />

            {/* Feature 2 */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-200/50 flex items-center justify-center text-brand-black shrink-0">
                <ShieldCheck size={14} className="stroke-2" />
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-wider text-brand-black">Premium Quality</h4>
                <p className="text-[9px] text-zinc-500 font-bold mt-0.5">Made to last</p>
              </div>
            </div>

            <div className="hidden md:block h-8 w-px bg-zinc-200/80" />

            {/* Feature 3 */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-200/50 flex items-center justify-center text-brand-black shrink-0">
                <Box size={14} className="stroke-2" />
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-wider text-brand-black">No Minimums</h4>
                <p className="text-[9px] text-zinc-500 font-bold mt-0.5">Order what you need</p>
              </div>
            </div>

            <div className="hidden lg:block h-8 w-px bg-zinc-200/80" />

            {/* Feature 4 */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-200/50 flex items-center justify-center text-brand-black shrink-0">
                <Zap size={14} className="stroke-2" />
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-wider text-brand-black">Fast & Reliable</h4>
                <p className="text-[9px] text-zinc-500 font-bold mt-0.5">On-time, every time.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
