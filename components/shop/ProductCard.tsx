"use client";

import Image from "next/image";
import Link from "next/link";
import { Droplets, Heart, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/components/providers/CartProvider";
import type { ProductSummary } from "@/server/types";
import { useState, useEffect } from "react";

interface ProductCardProps {
  product: ProductSummary;
}

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

  // Mocked old price for discount display
  const oldPrice = Number(product.price) * 1.25;
  const discountPercent = 20; // 20% off

  return (
    <Link href={`/products/${product.id}`} className="group block focus-ring rounded-2xl h-full" id={`product-link-${product.id}`}>
      <div className="relative flex flex-col h-full bg-white dark:bg-zinc-900/80 rounded-2xl transition-all duration-300 hover:shadow-lift border border-border overflow-hidden">
        
        {/* Top Badges */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1.5">
          <Badge className="bg-green-600/90 hover:bg-green-600 text-white border-0 font-bold px-2 py-0.5 rounded shadow-sm text-[10px] uppercase tracking-wide">
            {discountPercent}% OFF
          </Badge>
          {product.category === "ORGANIC" && (
            <Badge className="bg-amber-500/90 hover:bg-amber-500 text-white border-0 font-bold px-2 py-0.5 rounded shadow-sm text-[10px] uppercase tracking-wide">
              Organic
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={handleWishlist}
          className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur shadow-sm text-zinc-400 hover:text-red-500 transition-colors"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
        </button>

        {/* Image Area */}
        <div className="relative w-full pt-[100%] overflow-hidden bg-zinc-50 dark:bg-zinc-950/50">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-4 mix-blend-multiply dark:mix-blend-normal transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Droplets className="h-16 w-16 text-amber-500/20" />
            </div>
          )}
          
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-black/50 backdrop-blur-[2px]">
              <Badge variant="destructive" className="font-bold text-xs rounded-full px-3 py-1 shadow-sm uppercase tracking-widest">
                Sold Out
              </Badge>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="flex flex-col flex-1 p-3.5">
          {/* Timeline / Time to deliver mockup */}
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold text-green-600 dark:text-green-400 uppercase tracking-wider">
              12 MINS
            </span>
          </div>

          <h3
            className="font-semibold text-sm leading-snug text-foreground line-clamp-2 mb-1 group-hover:text-amber-600 transition-colors"
            id={`product-name-link-${product.id}`}
          >
            {product.name}
          </h3>

          <div className="text-xs text-muted-foreground mb-3">
            {product.category === "INDUSTRIAL" ? "15 Ltr" : "1 Ltr"}
          </div>

          <div className="mt-auto flex items-end justify-between gap-2">
            <div className="flex flex-col">
              <span className="text-[11px] text-muted-foreground line-through decoration-muted-foreground/50">
                ₹{oldPrice.toFixed(2)}
              </span>
              <span className="font-bold text-base text-foreground leading-none">
                ₹{product.price.toString()}
              </span>
            </div>

            {/* Instamart Style Add Button */}
            <div className="relative z-10 w-[72px]">
              {quantity > 0 ? (
                <div className="flex items-center justify-between bg-green-600 text-white rounded-lg h-8 px-1 shadow-sm font-semibold border border-green-700">
                  <button onClick={handleDecrement} className="p-1 hover:bg-green-700 rounded transition-colors flex-shrink-0">
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm px-1 text-center w-full">{quantity}</span>
                  <button onClick={handleIncrement} className="p-1 hover:bg-green-700 rounded transition-colors flex-shrink-0">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <Button
                  id={`add-to-cart-${product.id}`}
                  className="w-full h-8 rounded-lg bg-green-50 hover:bg-green-100 dark:bg-green-900/30 dark:hover:bg-green-900/50 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 shadow-sm font-bold text-sm transition-all"
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                >
                  ADD
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
