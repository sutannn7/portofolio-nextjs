import React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const baseClasses =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-pill px-6 text-body font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-not-allowed disabled:opacity-40";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-ink text-surface hover:bg-highlight hover:text-ink",
  secondary: "border border-line bg-surface text-ink hover:bg-highlight",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], className)}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
