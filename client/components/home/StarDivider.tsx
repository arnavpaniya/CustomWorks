"use client";

import React from "react";

export default function StarDivider() {
  return (
    <div className="bg-[#FAF6F0] py-16 flex items-center justify-center gap-6 select-none w-full">
      <div className="h-px bg-narrative-forest/15 flex-1 max-w-[250px]" />
      <div className="flex items-center gap-4 text-narrative-clay">
        <span className="text-xs select-none">✦</span>
        <span className="text-xl font-serif italic font-normal tracking-wide text-narrative-forest">Custom Crafted</span>
        <span className="text-xs select-none">✦</span>
      </div>
      <div className="h-px bg-narrative-forest/15 flex-1 max-w-[250px]" />
    </div>
  );
}
