"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, Zap, Leaf, Droplets, ArrowRight } from "lucide-react";

const OILS = [
  {
    name: "Groundnut Oil",
    tamil: "Kadalai Ennai",
    icon: Flame,
    accent: "#D97706",
    accentBg: "bg-amber-50 dark:bg-amber-950/20",
    accentBorder: "border-amber-200 dark:border-amber-800",
    accentText: "text-[#D97706]",
    image: "/site_assets/product_groundnut_1l.png",
    bestFor: ["Deep Frying", "Daily Cooking", "Indian Curries"],
    highlight: "High smoke point — perfect for high-heat Indian cooking.",
    href: "/?category=COOKING",
  },
  {
    name: "Sesame Oil",
    tamil: "Nallennai / Gingelly",
    icon: Zap,
    accent: "#b45309",
    accentBg: "bg-orange-50 dark:bg-orange-950/20",
    accentBorder: "border-orange-200 dark:border-orange-800",
    accentText: "text-orange-700 dark:text-orange-400",
    image: "/site_assets/hero_gingelly_oil.png",
    bestFor: ["Traditional Cooking", "Antioxidant Rich", "Tempering"],
    highlight: "Powerhouse of sesamol — the antioxidant that never breaks down.",
    href: "/?category=COOKING",
  },
  {
    name: "Coconut Oil",
    tamil: "Thengai Ennai",
    icon: Leaf,
    accent: "#16a34a",
    accentBg: "bg-green-50 dark:bg-green-950/20",
    accentBorder: "border-green-200 dark:border-green-800",
    accentText: "text-green-700 dark:text-green-400",
    image: "/site_assets/product_coconut_1l.png",
    bestFor: ["Light Cooking", "Energy Boost", "Hair & Skin Care"],
    highlight: "MCT-rich formula — fuels energy and supports immunity.",
    href: "/?category=PREMIUM",
  },
  {
    name: "Sunflower Oil",
    tamil: "Suryakanthi Ennai",
    icon: Droplets,
    accent: "#ca8a04",
    accentBg: "bg-yellow-50 dark:bg-yellow-950/20",
    accentBorder: "border-yellow-200 dark:border-yellow-800",
    accentText: "text-yellow-700 dark:text-yellow-400",
    image: "/site_assets/hero_sunflower_oil.png",
    bestFor: ["Daily Cooking", "High Vitamin E", "Light Frying"],
    highlight: "Rich in Vitamin E — a daily essential for every kitchen.",
    href: "/?category=ORGANIC",
  },
];

export function OilUsageSection() {
  return (
    <section className="py-20 bg-[#FAF8F2] dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#D97706] text-sm font-bold uppercase tracking-widest mb-3">Usage Guide</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#3B2416] dark:text-white">
            Which Oil for Which Use?
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto text-base">
            Every oil has a purpose. Find the right one for your kitchen.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {OILS.map(({ name, tamil, icon: Icon, accent, accentBg, accentBorder, accentText, image, bestFor, highlight, href }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`group relative bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border ${accentBorder} shadow-[0_2px_16px_rgba(59,36,22,0.06)] hover:shadow-[0_8px_40px_rgba(59,36,22,0.12)] transition-all duration-300 hover:-translate-y-1 flex flex-col`}
            >
              {/* Image area */}
              <div className={`relative h-44 ${accentBg} flex items-center justify-center overflow-hidden`}>
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-contain object-center p-6 transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-heading font-bold text-[#3B2416] dark:text-white text-lg leading-tight">{name}</h3>
                    <p className={`text-[11px] font-bold uppercase tracking-wider ${accentText} mt-0.5`}>{tamil}</p>
                  </div>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${accentBg} border ${accentBorder}`}>
                    <Icon className={`h-5 w-5 ${accentText}`} />
                  </div>
                </div>

                {/* Best for chips */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {bestFor.map((use) => (
                    <span
                      key={use}
                      className={`${accentBg} ${accentBorder} border ${accentText} text-[10px] font-bold px-2.5 py-1 rounded-full`}
                    >
                      {use}
                    </span>
                  ))}
                </div>

                {/* Highlight */}
                <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">
                  {highlight}
                </p>

                {/* CTA */}
                <Link
                  href={href}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-bold transition-all"
                  style={{ background: `${accent}15`, color: accent, border: `1px solid ${accent}30` }}
                >
                  Shop {name.split(" ")[0]} Oil <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
