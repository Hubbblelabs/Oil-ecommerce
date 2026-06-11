"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const CATEGORIES = [
  { name: "Groundnut", image: "/site_assets/category_groundnut.png", href: "/?category=COOKING", note: "Heart healthy" },
  { name: "Coconut", image: "/site_assets/category_coconut.png", href: "/?category=PREMIUM", note: "Energy & immunity" },
  { name: "Gingelly", image: "/site_assets/category_sesame.png", href: "/?category=COOKING", note: "Rich antioxidants" },
  { name: "Sunflower", image: "/site_assets/hero_sunflower_oil.png", href: "/?category=ORGANIC", note: "High vitamin E" },
  { name: "Combo Packs", image: "/site_assets/product_combo.png", href: "/?category=INDUSTRIAL", note: "Save more" },
  { name: "Bulk Orders", image: "/site_assets/product_groundnut_5l.png", href: "/?category=INDUSTRIAL", note: "For restaurants" },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function CategoryGridSection() {
  return (
    <section className="bg-background py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-2xl">
          <p className="eyebrow mb-4 flex items-center gap-3">
            <span className="font-display italic text-muted-foreground">06</span>
            <span className="inline-block h-px w-10 bg-primary" />
            Browse
          </p>
          <h2 className="text-display-hero text-4xl text-foreground sm:text-5xl">
            Shop by <em className="text-display-italic text-primary">category</em>
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 sm:gap-5">
          {CATEGORIES.map(({ name, image, href, note }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.55, ease: EASE }}
            >
              <Link href={href} className="card-editorial group block overflow-hidden focus-ring">
                <div className="relative aspect-[4/5] overflow-hidden bg-paper-deep">
                  <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute right-3 top-3 flex h-8 w-8 -translate-y-1 items-center justify-center rounded-full bg-card text-foreground opacity-0 shadow-premium transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
                <div className="border-t border-border p-4">
                  <p className="font-display text-sm font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-base">
                    {name}
                  </p>
                  <p className="label-tiny mt-1">{note}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
