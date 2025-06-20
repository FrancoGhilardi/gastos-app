import { cn } from "@shared/lib/utils";
import { CardProps } from "@shared/types/types";
import React from "react";

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  )
);

Card.displayName = "Card";
