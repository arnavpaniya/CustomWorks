"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface StickerProps {
  text: string;
  emoji?: string;
  variant?: "orange" | "green" | "black" | "gold" | "purple";
  shape?: "pill" | "circle" | "badge";
  className?: string;
}

export default function Sticker({
  text,
  emoji,
  variant = "orange",
  shape = "pill",
  className,
}: StickerProps) {
  const variantStyles = {
    orange: "bg-brand-orange text-white shadow-brand-orange/20",
    green: "bg-emerald-600 text-white shadow-emerald-700/20",
    black: "bg-brand-black text-white shadow-black/25",
    gold: "bg-amber-500 text-zinc-950 shadow-amber-600/20",
    purple: "bg-indigo-600 text-white shadow-indigo-700/20",
  };

  const shapeStyles = {
    pill: "rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider",
    circle: "rounded-full w-20 h-20 flex flex-col items-center justify-center text-center text-[10px] font-black leading-tight p-2 aspect-square",
    badge: "rounded-xl px-4 py-2.5 text-xs font-black uppercase tracking-widest",
  };

  return (
    <div
      className={cn(
        "select-none cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300",
        "border-[3px] border-white outline-1 outline-black/10",
        "shadow-lg hover:shadow-xl",
        variantStyles[variant],
        shapeStyles[shape],
        className
      )}
    >
      {shape === "circle" ? (
        <div className="flex flex-col items-center justify-center gap-1.5">
          {emoji && <span className="text-lg leading-none filter drop-shadow-sm">{emoji}</span>}
          <span className="hyphens-auto wrap-break-word leading-[1.1]">{text}</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {emoji && <span className="text-sm filter drop-shadow-sm">{emoji}</span>}
          <span>{text}</span>
        </div>
      )}
    </div>
  );
}
