"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Droplets } from "lucide-react";

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

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const CATEGORY_TAGS: Record<string, string> = {
  COOKING: "Wood Pressed",
  PREMIUM: "Premium Cold",
  ORGANIC: "Certified Organic",
  INDUSTRIAL: "Bulk Value",
};

export function BestSellersSection({ products }: BestSellersSectionProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="bg-background py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Editorial header */}
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div>
            <p className="eyebrow mb-4 flex items-center gap-3">
              <span className="font-display italic text-muted-foreground">01</span>
              <span className="inline-block h-px w-10 bg-primary" />
              The Collection
            </p>
            <h2 className="text-display-hero text-4xl text-foreground sm:text-5xl">
              Best <em className="text-display-italic text-primary">sellers</em>
            </h2>
          </div>
          <Link
            href="/products"
            className="group hidden items-center gap-2 text-sm font-semibold text-foreground sm:inline-flex"
          >
            <span className="link-underline">View all products</span>
            <ArrowRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
              className="h-full"
            >
              <EditorialProductCard product={product} index={i} />
            </motion.div>
          ))}
        </div>

        {/* Mobile view-all */}
        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            View all products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function EditorialProductCard({ product, index }: { product: DBProduct; index: number }) {
  const price = Number(product.price);
  const tag = CATEGORY_TAGS[product.category] ?? "Pure Natural";

  return (
    <Link
      href={`/products/${product.id}`}
      className="card-editorial group flex h-full flex-col overflow-hidden focus-ring"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-paper-deep">
        <span className="label-tiny absolute left-4 top-4 z-10 text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="label-tiny absolute right-4 top-4 z-10 rounded-full border border-border bg-card/80 px-3 py-1.5 text-foreground backdrop-blur-sm">
          {tag}
        </span>

        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-8 transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Droplets className="h-16 w-16 text-primary/15" />
          </div>
        )}

        {product.stock === 0 && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-[2px]">
            <span className="label-xs rounded-full border border-border bg-card px-4 py-2 text-foreground">
              Sold out
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col border-t border-border p-5">
        <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
          {product.name}
        </h3>
        <p className="label-tiny mt-1.5">Traditional chekku · cold pressed</p>

        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="font-display text-xl font-semibold tracking-tight text-foreground">
            ₹{price}
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
