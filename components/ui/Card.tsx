import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Radius default 24px sesuai DESIGN.md §5.4 / §5.5 */
  radius?: "card" | "skill";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, radius = "card", ...props }, ref) => {
    const radiusClass =
      radius === "card" ? "rounded-[24px]" : "rounded-[12px]";
    return (
      <div
        ref={ref}
        className={cn(
          "bg-[var(--color-surface)] border border-[var(--color-line)] overflow-hidden transition-colors duration-200 hover:border-[var(--color-ink-muted)] focus-within:outline-none focus-within:ring-2 focus-within:ring-[var(--color-ink)] focus-within:ring-offset-2 focus-within:ring-offset-[var(--color-bg)]",
          radiusClass,
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";
