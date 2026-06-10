"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShoppingCart } from "lucide-react";

interface DBProduct {
  id: string;
  name: string;
  price: number;
  stock: number;
  image?: string | null;
  category: string;
}

interface BestSellersSectionProps {
  products: DBProduct[];
}

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

export function BestSellersSection({ products }: BestSellersSectionProps) {
  if (!products || products.length === 0) return null;

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
          {products.map((product, i) => (
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

function ProductCard({ product }: { product: DBProduct }) {
  const price = Number(product.price);
  const mrp = Math.round(price * 1.25);
  const discount = 20;

  // Elegant visual tags based on category
  const tags: Record<string, { label: string; bg: string }> = {
    COOKING: { label: "Wood Pressed", bg: "bg-[#D97706]" },
    PREMIUM: { label: "Premium Cold", bg: "bg-emerald-600" },
    ORGANIC: { label: "100% Organic", bg: "bg-green-600" },
    INDUSTRIAL: { label: "Bulk Value", bg: "bg-blue-600" },
  };

  const tag = tags[product.category] ?? { label: "Pure Natural", bg: "bg-[#D97706]" };

  return (
    <div className="group relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-[#E9D8A6]/60 dark:border-zinc-800 shadow-[0_2px_16px_rgba(59,36,22,0.06)] hover:shadow-[0_8px_40px_rgba(59,36,22,0.12)] transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      {/* Badge */}
      <div className={`absolute top-3 left-3 z-10 ${tag.bg} text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide`}>
        {tag.label}
      </div>
      {/* Discount */}
      <div className="absolute top-3 right-3 z-10 bg-white dark:bg-zinc-900 text-rose-600 text-[10px] font-bold px-2 py-1 rounded-full border border-rose-200">
        -{discount}%
      </div>

      {/* Image */}
      <Link href={`/products/${product.id}`} className="block relative h-52 bg-[#FAF8F2] dark:bg-zinc-800 overflow-hidden shrink-0">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain object-center p-4 transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-amber-50 dark:bg-amber-950/20 text-amber-500/20">
            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
        )}
      </Link>

      {/* Body */}
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">Traditional Chekku</p>
        <h3 className="font-heading font-bold text-[#3B2416] dark:text-white text-base leading-tight mb-1">
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground mb-3 truncate">{product.category.toLowerCase()} grade pure oil</p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <Stars rating={4.9} />
          <span className="text-xs font-semibold text-foreground">4.9</span>
          <span className="text-xs text-muted-foreground">(280+)</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4 mt-auto">
          <span className="text-xl font-bold text-[#3B2416] dark:text-white">₹{price}</span>
          <span className="text-sm text-muted-foreground line-through">₹{mrp}</span>
        </div>

        {/* Add to cart / View Details */}
        <Link
          href={`/products/${product.id}`}
          className="flex items-center justify-center gap-2 bg-[#3B2416] hover:bg-[#D97706] text-white font-semibold text-sm py-2.5 rounded-xl transition-all duration-200 group/btn"
        >
          <ShoppingCart className="h-4 w-4" />
          View Details
        </Link>
      </div>
    </div>
  );
}

