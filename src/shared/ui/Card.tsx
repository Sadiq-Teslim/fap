import React from "react";
import { cn } from "../utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined";
  padding?: "sm" | "md" | "lg";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", padding = "md", ...props }, ref) => {
    const variantStyles = {
      default: "bg-white rounded-xl border border-neutral-light",
      elevated: "bg-white rounded-xl shadow-lg border border-neutral-light",
      outlined: "bg-white rounded-xl border-2 border-primary border-opacity-30",
    };

    const paddingStyles = {
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    return (
      <div
        ref={ref}
        className={cn(
          variantStyles[variant],
          paddingStyles[padding],
          className,
        )}
        {...props}
      />
    );
  },
);

Card.displayName = "Card";
