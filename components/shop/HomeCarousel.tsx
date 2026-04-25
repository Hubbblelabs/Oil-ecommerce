"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Droplet, Leaf, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

import Image from "next/image";

const BANNERS = [
  {
    id: 1,
    title: "Pure Taste of Tradition",
    subtitle: "Authentic wood pressed oils from village farms",
    image: "/site_assets/hero_groundnut_oil.png",
  },
  {
    id: 2,
    title: "Farm Fresh Seeds",
    subtitle: "Direct from sustainable Indian farms to your kitchen",
    image: "/site_assets/hero_coconut_oil.png",
  },
  {
    id: 3,
    title: "100% Adulteration Free",
    subtitle: "No chemicals, tested for purity and quality",
    image: "/site_assets/hero_gingelly_oil.png",
  },
  {
    id: 4,
    title: "Healthy Family Cooking",
    subtitle: "Premium wood-pressed oils for everyday meals",
    image: "/site_assets/hero_family_cooking.png",
  },
  {
    id: 5,
    title: "From Farm to Kitchen",
    subtitle: "Direct sourcing from our village chekku to you",
    image: "/site_assets/hero_farm_to_kitchen.png",
  },
];

export function HomeCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    
    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    
    return () => clearInterval(autoplay);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4 mb-8">
      <div className="overflow-hidden rounded-2xl shadow-premium" ref={emblaRef}>
        <div className="flex">
          {BANNERS.map((banner) => (
            <div
              key={banner.id}
              className={`relative flex-[0_0_100%] min-w-0 h-64 sm:h-80 flex items-center px-8 sm:px-16 overflow-hidden`}
            >
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                className="object-cover object-center"
                priority={banner.id === 1}
              />
              {/* Dark gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
              
              <div className="relative z-10 text-white max-w-lg mt-4">
                <h2 className="text-3xl sm:text-5xl font-serif font-extrabold tracking-tight mb-3 leading-[1.1] text-amber-50">
                  {banner.title}
                </h2>
                <p className="text-white/90 text-sm sm:text-lg font-medium mb-6 max-w-md">
                  {banner.subtitle}
                </p>
                <Button className="bg-amber-600 hover:bg-amber-700 text-white border-0 shadow-amber-glow rounded-xl px-8 h-12 font-bold text-base transition-all">
                  Shop Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur border-white/40 shadow-sm hidden sm:flex hover:bg-white"
        onClick={scrollPrev}
      >
        <ChevronLeft className="h-5 w-5 text-black" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur border-white/40 shadow-sm hidden sm:flex hover:bg-white"
        onClick={scrollNext}
      >
        <ChevronRight className="h-5 w-5 text-black" />
      </Button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {BANNERS.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === selectedIndex ? "bg-white w-4" : "bg-white/50"
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
