"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Plus } from "lucide-react";
import { useCart } from "@/components/providers/CartProvider";

const BEST_SELLERS = [
  {
    id: "groundnut-1l",
    name: "Groundnut Oil",
    tamil: "Kadalai Ennai",
    tagline: "Heart-healthy MUFA rich",
    price: 299,
    mrp: 349,
    size: "1 Litre",
    rating: 4.8,
    reviews: 1240,
    badge: "Best Seller",
    badgeColor: "bg-[#D97706]",
    image: "/site_assets/product_groundnut_1l.png",
    href: "/products?category=COOKING",
  },
  {
    id: "coconut-1l",
    name: "Coconut Oil",
    tamil: "Thengai Ennai",
    tagline: "MCT-rich, boosts immunity",
    price: 349,
    mrp: 399,
    size: "1 Litre",
    rating: 4.9,
    reviews: 980,
    badge: "Premium",
    badgeColor: "bg-emerald-600",
    image: "/site_assets/product_coconut_1l.png",
    href: "/products?category=PREMIUM",
  },
  {
    id: "gingelly-1l",
    name: "Gingelly Oil",
    tamil: "Nallennai",
    tagline: "Antioxidant powerhouse",
    price: 399,
    mrp: 459,
    size: "1 Litre",
    rating: 4.9,
    reviews: 1560,
    badge: "Traditional Favourite",
    badgeColor: "bg-orange-600",
    image: "/site_assets/hero_gingelly_oil.png",
    href: "/products?category=COOKING",
  },
  {
    id: "groundnut-5l",
    name: "Groundnut Oil",
    tamil: "Family Pack",
    tagline: "Save more, cook healthy",
    price: 1199,
    mrp: 1499,
    size: "5 Litres",
    rating: 4.8,
    reviews: 620,
    badge: "20% OFF",
    badgeColor: "bg-rose-600",
    image: "/site_assets/product_groundnut_5l.png",
    href: "/products?category=INDUSTRIAL",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i <= Math.floor(rating) ? "fill-[#D97706] text-[#D97706]" : "fill-zinc-200 text-zinc-200"}`}
        />
      ))}
    </div>
  );
}

export function BestSellersSection() {
  return (
    <section className="py-20 bg-[#FAF8F2] dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#D97706] text-sm font-bold uppercase tracking-widest mb-2">Our Oils</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#3B2416] dark:text-white">
              Best Sellers
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden sm:flex items-center gap-1.5 text-[#D97706] font-semibold text-sm hover:gap-2.5 transition-all"
          >
            View All Products →
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BEST_SELLERS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* Mobile view all */}
        <div className="sm:hidden mt-8 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-[#D97706] font-semibold text-sm border border-[#D97706]/30 rounded-xl px-6 py-2.5"
          >
            View All Products →
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: typeof BEST_SELLERS[0] }) {
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className="group relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-[#E9D8A6]/60 dark:border-zinc-800 shadow-[0_2px_16px_rgba(59,36,22,0.06)] hover:shadow-[0_8px_40px_rgba(59,36,22,0.12)] transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Badge */}
      <div className={`absolute top-3 left-3 z-10 ${product.badgeColor} text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide`}>
        {product.badge}
      </div>
      {/* Discount */}
      {discount > 0 && (
        <div className="absolute top-3 right-3 z-10 bg-white dark:bg-zinc-900 text-rose-600 text-[10px] font-bold px-2 py-1 rounded-full border border-rose-200">
          -{discount}%
        </div>
      )}

      {/* Image */}
      <Link href={product.href} className="block relative h-52 bg-[#FAF8F2] dark:bg-zinc-800 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain object-center p-4 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </Link>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">{product.tamil}</p>
        <h3 className="font-heading font-bold text-[#3B2416] dark:text-white text-base leading-tight mb-1">
          {product.name} <span className="text-xs text-muted-foreground font-normal">· {product.size}</span>
        </h3>
        <p className="text-xs text-muted-foreground mb-3">{product.tagline}</p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <Stars rating={product.rating} />
          <span className="text-xs font-semibold text-foreground">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4 mt-auto">
          <span className="text-xl font-bold text-[#3B2416] dark:text-white">₹{product.price}</span>
          <span className="text-sm text-muted-foreground line-through">₹{product.mrp}</span>
        </div>

        {/* Add to cart */}
        <Link
          href={product.href}
          className="flex items-center justify-center gap-2 bg-[#3B2416] hover:bg-[#D97706] text-white font-semibold text-sm py-2.5 rounded-xl transition-all duration-200 group/btn"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Link>
      </div>
    </div>
  );
}
