"use client";

import React from "react";

export default function MarqueeDivider() {
  const words = [
    "Crafted For You",
    "Bespoke Merchandise",
    "Estd 2026",
    "100% Eco-Friendly Inks",
    "Premium Materials",
    "Handmade Embroidery",
    "Zero Minimums",
    "Bespoke Craftsmanship",
  ];

  // Duplicate list to achieve continuous loop seamlessly
  const loopList = [...words, ...words, ...words];

  return (
    <div className="relative py-8 bg-zinc-950 overflow-hidden w-full select-none z-10 border-y border-zinc-800">
      {/* Decorative inner gradient overlay to mask edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-zinc-950 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-zinc-950 to-transparent z-20 pointer-events-none" />

      {/* Marquee Inner Flex */}
      <div className="flex w-max items-center">
        <div className="flex items-center gap-12 animate-marquee-loop whitespace-nowrap pr-12">
          {loopList.map((word, index) => (
            <div key={index} className="flex items-center gap-12">
              <span className="text-white/90 text-sm md:text-base font-serif font-light tracking-widest uppercase">
                {word}
              </span>
              <span className="text-brand-orange text-lg leading-none font-sans font-black select-none">
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
