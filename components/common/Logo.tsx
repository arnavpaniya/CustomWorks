"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps extends React.ComponentPropsWithoutRef<"div"> {
  light?: boolean;
}

export default function Logo({ className, ...props }: LogoProps) {
  return (
    <div className={cn("relative select-none flex items-center justify-center", className)} {...props}>
      <Image
        src="/images/Customworks light theme logo.png"
        alt="CustomWorks Logo"
        width={540}
        height={380}
        priority
        className="object-contain w-full h-full"
      />
    </div>
  );
}
