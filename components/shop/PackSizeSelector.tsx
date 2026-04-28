"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface PackSizeSelectorProps {
  sizes?: string[];
  defaultSize?: string;
}

export function PackSizeSelector({ 
  sizes = ["1 Litre", "5 Litres", "15 Litres"],
  defaultSize = "15 Litres"
}: PackSizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState(defaultSize);

  return (
    <div className="flex flex-wrap gap-3">
      {sizes.map((size) => {
        const isSelected = size === selectedSize;
        return (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={cn(
              "px-4 py-2 rounded-xl border-2 font-bold text-sm transition-all duration-200",
              isSelected 
                ? "border-amber-600 bg-amber-50 dark:bg-amber-900/10 text-amber-700 dark:text-amber-400 shadow-sm" 
                : "border-border bg-background text-muted-foreground hover:border-amber-600/50 hover:text-foreground"
            )}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}
