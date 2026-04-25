"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Package, Flame, Star, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const QUICK_CATEGORIES = [
  { label: "Groundnut", image: "/site_assets/category_groundnut.png", icon: Leaf, color: "bg-amber-100 text-amber-700", route: "/?category=COOKING" },
  { label: "Coconut", image: "/site_assets/category_coconut.png", icon: Leaf, color: "bg-zinc-100 text-zinc-700", route: "/?category=PREMIUM" },
  { label: "Gingelly", image: "/site_assets/category_sesame.png", icon: Flame, color: "bg-orange-100 text-orange-700", route: "/?category=COOKING" },
  { label: "Sunflower", icon: Star, color: "bg-yellow-100 text-yellow-700", route: "/?category=ORGANIC" },
  { label: "Mustard", icon: Leaf, color: "bg-yellow-200 text-yellow-800", route: "/?category=COOKING" },
  { label: "Combo Packs", image: "/site_assets/product_combo.png", icon: Package, color: "bg-blue-100 text-blue-700", route: "/?category=INDUSTRIAL" },
];

export function CategoryCircles() {
  return (
    <section className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 gap-6 hide-scrollbar snap-x">
          {QUICK_CATEGORIES.map((cat) => (
            <Link key={cat.label} href={cat.route} className="flex flex-col items-center gap-2 group snap-start min-w-[72px]">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "relative w-20 h-20 rounded-full flex items-center justify-center shadow-sm border border-black/5 transition-shadow group-hover:shadow-md overflow-hidden bg-white",
                  !cat.image && cat.color
                )}
              >
                {cat.image ? (
                  <Image src={cat.image} alt={cat.label} fill className="object-cover" sizes="80px" />
                ) : (
                  <cat.icon className="w-8 h-8 opacity-80" />
                )}
              </motion.div>
              <span className="text-xs font-semibold text-center text-zinc-700 dark:text-zinc-300 group-hover:text-foreground leading-tight">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
