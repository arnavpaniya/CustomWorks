"use client";

import React from "react";

interface MultiRowMarqueeProps {
  text?: string;
}

export default function MultiRowMarquee({ text = "CUSTOMWORKS." }: MultiRowMarqueeProps) {
  const brandWords = Array(12).fill(text);
  const displayWords = [...brandWords, ...brandWords];

  return (
    <div className="relative py-3.5 bg-narrative-forest overflow-hidden w-full select-none z-10 flex flex-col gap-1.5 border-y border-white/5">
      {/* Row 1: Left scrolling sand text */}
      <div className="flex w-max items-center overflow-hidden">
        <div className="flex items-center gap-6 animate-marquee-loop whitespace-nowrap pr-6">
          {displayWords.map((word, index) => (
            <span
              key={index}
              className="text-[#FAF6F0] text-sm sm:text-lg md:text-xl font-black tracking-tight uppercase font-sans"
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Row 2: Right scrolling ochre text (slanted/italic) */}
      <div className="flex w-max items-center overflow-hidden">
        <div className="flex items-center gap-6 animate-marquee-loop-reverse whitespace-nowrap pr-6">
          {displayWords.map((word, index) => (
            <span
              key={index}
              className="text-narrative-ochre text-sm sm:text-lg md:text-xl font-black tracking-tight uppercase font-sans italic"
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Row 3: Left scrolling sage outline text */}
      <div className="flex w-max items-center overflow-hidden">
        <div className="flex items-center gap-6 animate-marquee-loop whitespace-nowrap pr-6">
          {displayWords.map((word, index) => (
            <span
              key={index}
              className="text-transparent text-sm sm:text-lg md:text-xl font-black tracking-tight uppercase font-sans select-none"
              style={{ WebkitTextStroke: "1px rgba(143, 168, 155, 0.6)" }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
