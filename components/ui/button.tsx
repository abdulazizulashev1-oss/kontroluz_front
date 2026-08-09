import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "cta" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded";

    const variants = {
      // Primary Deep Blue (#004094)
      primary:
        "bg-industrial-blue text-white hover:bg-industrial-blue-dark focus:ring-industrial-blue shadow-sm",
      // High-Priority CTA Industrial Orange (#FF6B00)
      cta:
        "bg-industrial-orange text-white font-semibold hover:bg-industrial-orange-dark focus:ring-industrial-orange shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0",
      // Secondary Industrial Slate
      secondary:
        "bg-industrial-surface-low text-industrial-text hover:bg-industrial-surface-high border border-industrial-border",
      // Outline Primary
      outline:
        "bg-transparent text-industrial-blue border-2 border-industrial-blue hover:bg-industrial-blue hover:text-white",
      // Ghost
      ghost:
        "bg-transparent text-industrial-text hover:bg-industrial-surface-low hover:text-industrial-blue",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs tracking-wide",
      md: "h-10 px-5 text-sm tracking-wide",
      lg: "h-12 px-7 text-base font-semibold tracking-wide",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
