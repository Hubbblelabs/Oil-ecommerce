"use client";

import React, { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ProductCard } from "./ProductCard";
import type { ProductSummary } from "@/server/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProductLane({ title, subtitle, products }: { title: string; subtitle?: string; products: ProductSummary[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 2,
    containScroll: "trimSnaps"
  });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  if (!products || products.length === 0) return null;

  return (
    <section className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">{title}</h2>
            {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
          </div>
          <div className="hidden sm:flex gap-2">
            <Button variant="outline" size="icon" className="w-8 h-8 rounded-full border-border/60 hover:bg-accent/60" onClick={scrollPrev}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" className="w-8 h-8 rounded-full border-border/60 hover:bg-accent/60" onClick={scrollNext}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="overflow-hidden -mx-4 px-4 sm:mx-0 sm:px-0" ref={emblaRef}>
          <div className="flex gap-4 sm:gap-6 pb-4">
            {products.map((product) => (
              <div key={product.id} className="flex-[0_0_240px] sm:flex-[0_0_280px] min-w-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
