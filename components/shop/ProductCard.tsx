"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Droplets, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/components/providers/CartProvider";
import type { ProductSummary } from "@/server/types";

interface ProductCardProps {
  product: ProductSummary;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

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

  const isOutOfStock = product.stock === 0;

  return (
    <Link href={`/products/${product.id}`} className="group block focus-ring rounded-2xl" id={`product-link-${product.id}`}>
      <div className="relative flex flex-col h-full bg-card rounded-2xl transition-all duration-500 ease-out hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.02)] border border-border/40 hover:border-border/80 overflow-hidden group-hover:-translate-y-1">
        
        {/* Image Area */}
        <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100 dark:bg-zinc-900 border-b border-border/40">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/20 dark:to-amber-900/10">
              <Droplets className="h-12 w-12 text-amber-500/40" />
            </div>
          )}
          
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <Badge
              className="bg-background/80 backdrop-blur-md text-foreground border-border/50 hover:bg-background/90 font-medium px-2.5 py-0.5 rounded-md"
              id={`product-category-${product.id}`}
              variant="outline"
            >
              {product.category}
            </Badge>
          </div>

          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-[2px]">
              <Badge variant="destructive" className="font-semibold text-xs rounded-full px-3 py-1 shadow-sm uppercase tracking-wider">
                Sold Out
              </Badge>
            </div>
          )}

          {/* Quick Add Overlay */}
          {!isOutOfStock && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out px-4">
              <Button
                id={`add-to-cart-${product.id}`}
                className="w-full rounded-xl bg-foreground/95 backdrop-blur-sm text-background hover:bg-foreground shadow-lg flex items-center justify-center gap-2"
                onClick={handleAddToCart}
                aria-label={`Add ${product.name} to cart`}
              >
                <Plus className="h-4 w-4" />
                <span className="font-medium text-sm">Quick add</span>
              </Button>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="flex flex-col flex-1 p-5">
          <div className="flex justify-between items-start gap-4 mb-2">
            <h3
              className="font-semibold text-base leading-tight text-foreground line-clamp-2 transition-colors group-hover:text-amber-600"
              id={`product-name-link-${product.id}`}
            >
              {product.name}
            </h3>
            <span className="font-medium text-base text-foreground whitespace-nowrap">
              ${product.price.toString()}
            </span>
          </div>
          
          <div className="mt-auto pt-2 flex items-center text-sm text-muted-foreground">
            <span className="flex items-center">
              <span className="text-amber-500 mr-1 text-xs">★</span>
              {/* Mock rating data for UI demo */}
              4.9 <span className="opacity-60 ml-1">(120)</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
