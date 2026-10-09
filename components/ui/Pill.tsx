import React from "react";
import { cn } from "@/lib/utils";

interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  dot?: boolean;
  children: React.ReactNode;
}

export const Pill = React.forwardRef<HTMLSpanElement, PillProps>(
  ({ className, dot = true, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 px-4 py-1.5 rounded-[999px] bg-[var(--color-surface)] border border-[var(--color-line)] text-[0.78rem] font-[600] text-[var(--color-ink)] transition-colors duration-200 hover:border-[var(--color-ink-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ink)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-bg)] disabled:opacity-50",
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className="w-1.5 h-1.5 rounded-full bg-[var(--color-highlight)] inline-block flex-shrink-0"
            aria-hidden="true"
          />
        )}
        {children}
      </span>
    );
  }
);

Pill.displayName = "Pill";
