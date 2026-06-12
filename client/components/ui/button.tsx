"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "accent";
type Size = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  asChild?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-black text-brand-white hover:bg-[#2A2A2A] active:scale-[0.98]",
  secondary:
    "bg-brand-surface text-brand-black hover:bg-brand-border active:scale-[0.98]",
  outline:
    "border border-brand-black bg-transparent text-brand-black hover:bg-brand-black hover:text-brand-white active:scale-[0.98]",
  ghost:
    "bg-transparent text-brand-black hover:bg-brand-surface active:scale-[0.98]",
  accent:
    "bg-brand-black text-brand-white hover:bg-[#2A2A2A] border border-black/10 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.2),_inset_-1px_-1px_2px_rgba(0,0,0,0.4),_0_4px_12px_rgba(0,0,0,0.12)] active:scale-[0.96]",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-8 px-3 text-xs rounded-md",
  md: "h-10 px-5 text-sm rounded-lg",
  lg: "h-12 px-8 text-base rounded-lg",
  icon: "h-10 w-10 rounded-lg",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 cursor-pointer select-none",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-black",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";
