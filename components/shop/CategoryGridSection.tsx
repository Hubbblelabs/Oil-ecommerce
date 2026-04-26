"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const CATEGORIES = [
  { name: "Groundnut", image: "/site_assets/category_groundnut.png", href: "/?category=COOKING", count: "Heart Healthy" },
  { name: "Coconut", image: "/site_assets/category_coconut.png", href: "/?category=PREMIUM", count: "Energy & Immunity" },
  { name: "Gingelly", image: "/site_assets/category_sesame.png", href: "/?category=COOKING", count: "Rich Antioxidants" },
  { name: "Sunflower", image: "/site_assets/hero_sunflower_oil.png", href: "/?category=ORGANIC", count: "High Vitamin E" },
  { name: "Combo Packs", image: "/site_assets/product_combo.png", href: "/?category=INDUSTRIAL", count: "Save More" },
  { name: "Bulk Orders", image: "/site_assets/product_groundnut_5l.png", href: "/?category=INDUSTRIAL", count: "For Restaurants" },
];

export function CategoryGridSection() {
  return (
    <section className="py-20 bg-white dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#D97706] text-sm font-bold uppercase tracking-widest mb-3">Browse</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#3B2416] dark:text-white">
            Shop by Category
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map(({ name, image, href, count }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
            >
              <Link href={href} className="group flex flex-col items-center gap-3">
                {/* Circular image */}
                <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-full overflow-hidden border-4 border-[#E9D8A6]/60 dark:border-zinc-700 group-hover:border-[#D97706] transition-all duration-300 shadow-[0_4px_20px_rgba(59,36,22,0.10)] group-hover:shadow-[0_8px_30px_rgba(217,119,6,0.22)] group-hover:scale-105 bg-[#FAF8F2] dark:bg-zinc-800">
                  <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    sizes="128px"
                  />
                </div>
                <div className="text-center">
                  <p className="font-bold text-[#3B2416] dark:text-white text-sm group-hover:text-[#D97706] transition-colors">{name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{count}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
