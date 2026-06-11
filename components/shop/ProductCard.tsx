"use client";

import Image from "next/image";
import Link from "next/link";
import { Droplets, Heart, Plus, Minus } from "lucide-react";
import { useCart } from "@/components/providers/CartProvider";
import type { ProductSummary } from "@/server/types";
import { useState, useEffect } from "react";

interface ProductCardProps {
  product: ProductSummary;
}

const CATEGORY_TAGS: Record<string, string> = {
  COOKING: "Wood Pressed",
  PREMIUM: "Premium Cold",
  ORGANIC: "Certified Organic",
  INDUSTRIAL: "Bulk Value",
};

export function ProductCard({ product }: ProductCardProps) {
  const { items, addItem, updateQuantity } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartItem = items.find((i) => i.productId === product.id);
  const quantity = mounted ? (cartItem?.quantity || 0) : 0;
  const isOutOfStock = product.stock === 0;
  const tag = CATEGORY_TAGS[product.category] ?? "Pure Natural";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price.toString(),
      image: product.image,
      category: product.category,
    });
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    updateQuantity(product.id, quantity - 1);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block h-full focus-ring rounded-2xl"
      id={`product-link-${product.id}`}
    >
      <div className="card-editorial relative flex h-full flex-col overflow-hidden">
        {/* Tag */}
        <span className="label-tiny absolute left-4 top-4 z-10 rounded-full border border-border bg-card/85 px-3 py-1.5 text-foreground backdrop-blur-sm">
          {tag}
        </span>

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/85 text-muted-foreground backdrop-blur-sm transition-colors hover:text-destructive"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? "fill-destructive text-destructive" : ""}`} />
        </button>

        {/* Image */}
        <div className="relative aspect-square w-full overflow-hidden bg-paper-deep">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-7 transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Droplets className="h-16 w-16 text-primary/15" />
            </div>
          )}

          {isOutOfStock && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-[2px]">
              <span className="label-xs rounded-full border border-border bg-card px-4 py-2 text-foreground">
                Sold out
              </span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col border-t border-border p-4">
          <h3
            className="font-display text-base font-semibold leading-snug tracking-tight text-foreground line-clamp-2 transition-colors group-hover:text-primary"
            id={`product-name-link-${product.id}`}
          >
            {product.name}
          </h3>

          <p className="label-tiny mt-1.5">
            {product.category === "INDUSTRIAL" ? "15 litre" : "1 litre"} · chekku pressed
          </p>

          <div className="mt-auto flex items-end justify-between gap-3 pt-4">
            <span className="font-display text-xl font-semibold tracking-tight text-foreground">
              ₹{product.price.toString()}
            </span>

            {/* Add / stepper */}
            <div className="relative z-10">
              {quantity > 0 ? (
                <div className="flex h-10 items-center gap-0.5 rounded-full bg-secondary px-1 text-secondary-foreground">
                  <button
                    onClick={handleDecrement}
                    className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-secondary-foreground/10"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-6 text-center text-sm font-bold">{quantity}</span>
                  <button
                    onClick={handleIncrement}
                    className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-secondary-foreground/10"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  id={`add-to-cart-${product.id}`}
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="flex h-10 items-center gap-1.5 rounded-full border border-border bg-card px-5 text-xs font-bold uppercase tracking-wide text-foreground transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
