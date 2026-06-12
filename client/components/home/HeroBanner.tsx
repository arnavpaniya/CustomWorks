"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Scissors, ShieldCheck, Zap } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#FAFAFA] overflow-hidden pt-[88px] pb-12 border-b border-zinc-200/60" aria-label="Hero banner">
      
      {/* Background grid canvas */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-40 animate-pulse-slow"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(10, 10, 10, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(10, 10, 10, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        
        {/* Gapless Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-t border-l border-zinc-200/60 shadow-sm bg-white mt-8 sm:mt-12">
          
          {/* Left Column: Heading and Brand Details */}
          <div className="lg:col-span-7 p-8 sm:p-14 md:p-16 border-r border-b border-zinc-200/60 bg-white flex flex-col justify-between min-h-[500px] sm:min-h-[600px] lg:min-h-[700px]">
            
            {/* Badge & Title */}
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-orange bg-brand-orange/5 border border-brand-orange/10 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-8 select-none">
                <span className="text-[12px] leading-none text-brand-orange animate-pulse">✦</span>
                Premium Custom Manufacturing
              </span>
              
              <h1 className="text-4xl sm:text-6xl md:text-7.5xl font-serif font-light text-brand-black leading-[1.08] tracking-tight mb-8 select-none">
                We <span className="italic font-normal text-brand-orange">manufacture</span> custom <span className="italic font-normal">artifacts</span> that define your brand.
              </h1>
              
              <p className="text-sm sm:text-base text-brand-muted leading-relaxed max-w-xl font-medium">
                CustomWorks is a dedicated industrial partner. We craft premium apparel, corporate stationery, bespoke packaging, and promotional accessories with raw precision and meticulous detail.
              </p>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-zinc-100/80 my-8 sm:my-12">
              <div className="flex gap-3 items-start">
                <div className="p-2 border border-zinc-200 bg-zinc-50 text-brand-black">
                  <Scissors size={14} className="stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-brand-black">Bespoke Specs</h4>
                  <p className="text-[10px] text-brand-muted mt-0.5 font-bold">100% custom layouts</p>
                </div>
              </div>
              
              <div className="flex gap-3 items-start">
                <div className="p-2 border border-zinc-200 bg-zinc-50 text-brand-black">
                  <ShieldCheck size={14} className="stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-brand-black">Tiered Pricing</h4>
                  <p className="text-[10px] text-brand-muted mt-0.5 font-bold">Pay less for volume</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="p-2 border border-zinc-200 bg-zinc-50 text-brand-black">
                  <Zap size={14} className="stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-brand-black">Factory Direct</h4>
                  <p className="text-[10px] text-brand-muted mt-0.5 font-bold">Raw industrial speed</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="/products" className="w-full sm:w-auto">
                <button className="w-full h-13 px-8 rounded-md bg-brand-black hover:bg-brand-orange text-white text-xs font-bold uppercase tracking-wider transition-colors duration-200 flex items-center justify-center gap-2 group cursor-pointer border border-transparent shadow-xs">
                  Start Customizing
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </Link>
              <Link href="/products" className="w-full sm:w-auto">
                <button className="w-full h-13 px-8 rounded-md bg-transparent hover:bg-zinc-50 text-brand-black text-xs font-bold uppercase tracking-wider transition-colors duration-200 border border-zinc-200/80 flex items-center justify-center gap-2 cursor-pointer shadow-2xs">
                  Explore Catalog
                </button>
              </Link>
            </div>

          </div>

          {/* Right Column: Gapless Vertical Stack of Product Showcase Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 grid-rows-3 h-full min-h-[600px] lg:min-h-0 bg-zinc-50">
            
            {/* Card 1: Apparel */}
            <div className="relative group overflow-hidden border-r border-b border-zinc-200/60 bg-white flex flex-col justify-between p-6 sm:p-8 min-h-[200px] lg:min-h-[233px]">
              {/* Image Background */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/hero_apparel_mockup.png"
                  alt="Embroidered hoodie manufacturing"
                  fill
                  className="object-cover opacity-90 group-hover:scale-[1.03] transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/10 to-transparent pointer-events-none" />
              </div>

              {/* Tag Overlays */}
              <div className="relative z-10 flex items-center justify-between select-none">
                <span className="text-[9px] font-mono font-bold text-white bg-zinc-950/85 px-2 py-0.5 border border-zinc-800">
                  [ 01 / APPAREL ]
                </span>
                <span className="text-[8px] font-mono font-bold text-zinc-300">
                  ACTIVE RUN
                </span>
              </div>
              
              <div className="relative z-10 text-white">
                <h3 className="text-sm font-bold leading-none tracking-wide uppercase">
                  Custom Apparel
                </h3>
                <p className="text-[10px] text-zinc-200/90 mt-1.5 font-medium leading-relaxed max-w-xs">
                  Organic cotton tees, heavy fleece hoodies, and corporate uniforms.
                </p>
              </div>
            </div>

            {/* Card 2: Stationery */}
            <div className="relative group overflow-hidden border-r border-b border-zinc-200/60 bg-white flex flex-col justify-between p-6 sm:p-8 min-h-[200px] lg:min-h-[233px]">
              {/* Image Background */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/hero_stationery_mockup.png"
                  alt="Corporate stationery printing"
                  fill
                  className="object-cover opacity-90 group-hover:scale-[1.03] transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/10 to-transparent pointer-events-none" />
              </div>

              {/* Tag Overlays */}
              <div className="relative z-10 flex items-center justify-between select-none">
                <span className="text-[9px] font-mono font-bold text-white bg-zinc-950/85 px-2 py-0.5 border border-zinc-800">
                  [ 02 / IDENTITY ]
                </span>
                <span className="text-[8px] font-mono font-bold text-zinc-300">
                  METALLIC INK
                </span>
              </div>
              
              <div className="relative z-10 text-white">
                <h3 className="text-sm font-bold leading-none tracking-wide uppercase">
                  Corporate Identity
                </h3>
                <p className="text-[10px] text-zinc-200/90 mt-1.5 font-medium leading-relaxed max-w-xs">
                  Matte cardstock visiting cards, letterheads, and DL envelopes.
                </p>
              </div>
            </div>

            {/* Card 3: Hangtags */}
            <div className="relative group overflow-hidden border-r border-b border-zinc-200/60 bg-white flex flex-col justify-between p-6 sm:p-8 min-h-[200px] lg:min-h-[233px]">
              {/* Image Background */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/products/hang-tags/hangtag.png"
                  alt="Custom tags and stickers"
                  fill
                  className="object-cover opacity-90 group-hover:scale-[1.03] transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/10 to-transparent pointer-events-none" />
              </div>

              {/* Tag Overlays */}
              <div className="relative z-10 flex items-center justify-between select-none">
                <span className="text-[9px] font-mono font-bold text-white bg-zinc-950/85 px-2 py-0.5 border border-zinc-800">
                  [ 03 / ACCESSORIES ]
                </span>
                <span className="text-[8px] font-mono font-bold text-zinc-300">
                  SWAG TAGS
                </span>
              </div>
              
              <div className="relative z-10 text-white">
                <h3 className="text-sm font-bold leading-none tracking-wide uppercase">
                  Tags & Accessories
                </h3>
                <p className="text-[10px] text-zinc-200/90 mt-1.5 font-medium leading-relaxed max-w-xs">
                  High-fidelity clothing hangtags, textured stickers, and keychains.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
