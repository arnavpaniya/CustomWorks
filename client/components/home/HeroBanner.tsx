"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroBanner() {
  const heroRef = useRef<HTMLElement>(null);

  // Mouse coordinate mapping for interactive card floating parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for card translations
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  // Displacements for different layers (creates depth)
  const apparelX = useTransform(springX, [-0.5, 0.5], [-25, 25]);
  const apparelY = useTransform(springY, [-0.5, 0.5], [-25, 25]);

  const stationeryX = useTransform(springX, [-0.5, 0.5], [15, -15]);
  const stationeryY = useTransform(springY, [-0.5, 0.5], [15, -15]);

  const hangtagX = useTransform(springX, [-0.5, 0.5], [-40, 40]);
  const hangtagY = useTransform(springY, [-0.5, 0.5], [-40, 40]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(relativeX);
    mouseY.set(relativeY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center bg-[#FAF6F0] overflow-hidden pt-[88px] pb-16 border-b border-zinc-200/40 select-none"
      aria-label="Hero banner"
    >
      
      {/* Narrative Shifting Backdrop Blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        
        {/* Shimmering Clay Blob */}
        <motion.div
          animate={{
            x: [0, 60, -30, 0],
            y: [0, -40, 50, 0],
            scale: [1, 1.12, 0.95, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-10 left-10 w-[450px] h-[450px] rounded-full bg-narrative-clay/10 blur-[110px]"
        />

        {/* Shimmering Sage Blob */}
        <motion.div
          animate={{
            x: [0, -50, 40, 0],
            y: [0, 50, -40, 0],
            scale: [1, 0.9, 1.15, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-10 right-10 w-[550px] h-[550px] rounded-full bg-narrative-sage/15 blur-[120px]"
        />

        {/* Shimmering Ochre Blob */}
        <motion.div
          animate={{
            x: [0, 40, -40, 0],
            y: [0, 40, 30, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 right-1/4 w-[380px] h-[380px] rounded-full bg-narrative-ochre/12 blur-[100px]"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          {/* Left Column: Brand Story Intro */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col items-start text-left"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-light text-narrative-forest leading-[1.08] tracking-tight mb-8">
              From your <span className="italic font-normal text-narrative-clay">mind</span> to their <span className="italic font-normal text-narrative-ochre">hands</span>
            </h1>

            <p className="text-base sm:text-lg text-narrative-forest/80 leading-relaxed max-w-xl font-medium mb-12">
              Every brand is a living narrative. CustomWorks is your physical fabrication partner. We take your digital designs and manufacture them into tactile, high-grade apparel, letterpressed stationery, and custom branded packaging.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="/products" className="w-full sm:w-auto">
                <button className="w-full h-14 px-8 rounded-full bg-narrative-clay hover:bg-narrative-clay/90 text-white text-xs font-bold uppercase tracking-wider transition-colors duration-250 flex items-center justify-center gap-2 group cursor-pointer border border-transparent shadow-md hover:shadow-lg">
                  Start Your Design
                  <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-250" />
                </button>
              </Link>
              <Link href="/about" className="w-full sm:w-auto">
                <button className="w-full h-14 px-8 rounded-full bg-transparent hover:bg-narrative-clay/5 text-narrative-forest text-xs font-bold uppercase tracking-wider transition-colors duration-250 border border-narrative-forest/30 flex items-center justify-center gap-2 cursor-pointer">
                  Read Our Story
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Asymmetrical Product Collage */}
          <div className="lg:col-span-6 relative flex items-center justify-center h-[520px] sm:h-[620px] w-full">
            
            {/* Background Blob Frame */}
            <div className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-narrative-sage/30 rounded-[6rem] -rotate-12 blur-xs z-0" />
            
            {/* Product 1: Custom Apparel (Center, Mid-Layer) */}
            <motion.div
              style={{ x: apparelX, y: apparelY }}
              className="absolute left-6 sm:left-12 bottom-20 sm:bottom-28 w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] z-20"
            >
              <div className="relative w-full h-full border-[10px] border-white bg-white rounded-[2rem] shadow-xl overflow-hidden rotate-6 hover:rotate-0 transition-transform duration-500 group">
                <Image
                  src="/images/hero_apparel_mockup.png"
                  alt="Premium custom hoodie"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 220px, 280px"
                  priority
                />

              </div>
            </motion.div>

            {/* Product 2: Stationery (Right, Back-Layer) */}
            <motion.div
              style={{ x: stationeryX, y: stationeryY }}
              className="absolute right-4 sm:right-8 top-16 sm:top-24 w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] z-10"
            >
              <div className="relative w-full h-full border-[10px] border-white bg-white rounded-[2rem] shadow-lg overflow-hidden -rotate-12 hover:rotate-0 transition-transform duration-500 group">
                <Image
                  src="/images/hero_stationery_mockup.png"
                  alt="High-end stationery set"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 200px, 260px"
                  priority
                />

              </div>
            </motion.div>

            {/* Product 3: Hangtags (Top-Left, Fore-Layer) */}
            <motion.div
              style={{ x: hangtagX, y: hangtagY }}
              className="absolute left-16 sm:left-24 top-20 sm:top-28 w-[130px] h-[130px] sm:w-[170px] sm:h-[170px] z-30"
            >
              <div className="relative w-full h-full border-[6px] border-white bg-white rounded-[1.5rem] shadow-2xl overflow-hidden rotate-12 hover:rotate-0 transition-transform duration-500 group">
                <Image
                  src="/products/hang-tags/hangtag.png"
                  alt="Custom apparel hangtag"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 130px, 170px"
                />

              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
