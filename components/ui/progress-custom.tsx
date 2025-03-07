"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface ProgressProps {
  value?: number;
  max?: number;
  className?: string;
}

export function Progress({
  value = 0,
  max = 100,
  className,
  ...props
}: ProgressProps) {
  const percentage =
    value !== null ? Math.max(0, Math.min(100, (value / max) * 100)) : 0;

  return (
    <div
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    >
      <div
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </div>
  );
}
