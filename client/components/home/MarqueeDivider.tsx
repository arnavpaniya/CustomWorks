"use client";

import React from "react";

interface MarqueeDividerProps {
  words?: string[];
  bgClass?: string;
  textClass?: string;
  starClass?: string;
  reverse?: boolean;
}

export default function MarqueeDivider({
  words = [
    "Crafted For You",
    "Bespoke Custom Products",
    "Estd 2026",
    "Premium Materials",
    "Bespoke Craftsmanship",
  ],
  bgClass = "bg-narrative-forest",
  textClass = "text-white/90",
  starClass = "text-narrative-ochre",
  reverse = false,
}: MarqueeDividerProps) {
  // Duplicate list to achieve continuous loop seamlessly
  const loopList = [...words, ...words, ...words];

  return (
    <div className={`relative py-6 ${bgClass} overflow-hidden w-full select-none z-10 border-y border-white/5`}>
      {/* Decorative inner gradient overlays */}
      <div className={`absolute inset-y-0 left-0 w-24 bg-linear-to-r from-current to-transparent opacity-10 z-20 pointer-events-none ${bgClass}`} />
      <div className={`absolute inset-y-0 right-0 w-24 bg-linear-to-l from-current to-transparent opacity-10 z-20 pointer-events-none ${bgClass}`} />

      {/* Marquee Inner Flex */}
      <div className="flex w-max items-center">
        <div className={`flex items-center gap-12 ${reverse ? "animate-marquee-loop-reverse" : "animate-marquee-loop"} whitespace-nowrap pr-12`}>
          {loopList.map((word, index) => (
            <div key={index} className="flex items-center gap-12">
              <span className={`text-xs md:text-sm font-serif font-light tracking-widest uppercase ${textClass}`}>
                {word}
              </span>
              <span className={`text-sm leading-none font-sans font-black select-none ${starClass}`}>
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
