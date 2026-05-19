"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  light?: boolean;
}

export default function Logo({ className, light = false, ...props }: LogoProps) {
  const textColor = light ? "#FAFAFA" : "#0A0A0A";

  return (
    <svg
      viewBox="0 0 540 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("select-none w-full h-auto", className)}
      {...props}
    >
      <defs>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,600;0,6..96,700;1,6..96,400&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
            .serif-initial {
              font-family: 'Bodoni Moda', 'Playfair Display', Georgia, serif;
              font-weight: 400;
              fill: ${textColor};
              transition: fill 0.3s ease;
            }
            .serif-text {
              font-family: 'Bodoni Moda', 'Playfair Display', Georgia, serif;
              font-weight: 400;
              letter-spacing: 0.05em;
              fill: ${textColor};
              transition: fill 0.3s ease;
            }
          `}
        </style>
      </defs>

      {/* Large Initial 'C' */}
      <text
        x="20"
        y="215"
        fontSize="250"
        className="serif-initial"
        style={{ opacity: 1 }}
      >
        C
      </text>

      {/* Word 'USTOM' */}
      <text
        x="155"
        y="130"
        fontSize="78"
        className="serif-text"
      >
        USTOM
      </text>

      {/* Large Initial 'W' overlapping 'C' */}
      <text
        x="80"
        y="325"
        fontSize="240"
        className="serif-initial"
        style={{ opacity: 1 }}
      >
        W
      </text>

      {/* Word 'ØRKS' */}
      {/* We use unicode \u00D8 for the slashed O */}
      <text
        x="205"
        y="245"
        fontSize="78"
        className="serif-text"
      >
        ØRKS
      </text>
    </svg>
  );
}
