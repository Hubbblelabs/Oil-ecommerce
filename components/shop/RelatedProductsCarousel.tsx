"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Heart, ShoppingBag, Star } from "lucide-react";
import type { ProductSummary } from "@/server/types";

interface RelatedProductsCarouselProps {
  products: ProductSummary[];
}

export function RelatedProductsCarousel({ products }: RelatedProductsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setPrevBtnEnabled(emblaApi.canScrollPrev());
      setNextBtnEnabled(emblaApi.canScrollNext());
    };
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
  }, [emblaApi]);

  if (!products || products.length === 0) return null;

  return (
    <section className="py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
          Explore Related <span className="text-primary">Products</span>
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!prevBtnEnabled}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            disabled={!nextBtnEnabled}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {products.map((product) => (
            <div key={product.id} className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%] pl-4">
              <div className="group relative bg-card rounded-2xl border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col p-4">
                
                {/* Image & Badges */}
                <div className="relative aspect-square w-full rounded-xl bg-zinc-50 dark:bg-zinc-900 mb-4 overflow-hidden flex items-center justify-center">
                  <div className="absolute top-2 left-2 z-10">
                    <span className="bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md shadow-sm">
                      Best Seller
                    </span>
                  </div>
                  <button className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-md flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-white transition-colors border border-border/50 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 shadow-sm">
                    <Heart className="w-4 h-4" />
                  </button>

                  <Image
                    src={product.image || "/site_assets/product_groundnut_1l.png"}
                    alt={product.name}
                    fill
                    className="object-contain p-4 mix-blend-multiply dark:mix-blend-normal transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Add to Cart Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-background/90 to-transparent">
                    <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg text-xs font-bold shadow-md hover:bg-primary/90 flex items-center justify-center gap-2">
                      <ShoppingBag className="w-4 h-4" /> Add to Cart
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1">
                  <Link href={`/products/${product.id}`} className="block mt-auto">
                    <h3 className="font-bold text-foreground hover:text-primary transition-colors line-clamp-1 mb-1">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span className="text-xs font-bold text-foreground">4.8</span>
                    <span className="text-xs text-muted-foreground">(124)</span>
                  </div>
                  <div className="flex items-end justify-between mt-auto">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-muted-foreground line-through">₹{(Number(product.price) * 1.2).toFixed(2)}</span>
                      <span className="text-lg font-extrabold text-foreground">₹{product.price.toString()}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
