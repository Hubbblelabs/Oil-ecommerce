"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Droplets } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/components/providers/CartProvider";
import type { ProductSummary } from "@/server/types";

interface ProductCardProps {
  product: ProductSummary;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price.toString(),
      imageUrl: product.imageUrl,
      unit: product.unit,
    });
  };

  const isOutOfStock = product.stock === 0;

  return (
    <Card className="group flex flex-col overflow-hidden border-amber-100/20 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 hover:-translate-y-0.5">
      {/* Product image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/20 dark:to-amber-900/10">
        <Link href={`/products/${product.id}`} id={`product-link-${product.id}`}>
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Droplets className="h-16 w-16 text-amber-400/60" />
            </div>
          )}
        </Link>

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <Badge variant="destructive" className="text-sm font-semibold">
              Out of Stock
            </Badge>
          </div>
        )}

        <Badge
          className="absolute left-2 top-2 bg-amber-500/90 text-white backdrop-blur-sm"
          id={`product-category-${product.id}`}
        >
          {product.category}
        </Badge>
      </div>

      <CardContent className="flex flex-1 flex-col gap-2 p-4">
        <Link
          href={`/products/${product.id}`}
          className="line-clamp-2 font-semibold leading-snug text-foreground hover:text-amber-600 transition-colors"
          id={`product-name-link-${product.id}`}
        >
          {product.name}
        </Link>
        <span className="text-sm text-muted-foreground">{product.unit}</span>

        <div className="mt-auto flex items-baseline gap-1">
          <span className="text-2xl font-bold text-amber-600">
            ${product.price.toString()}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          id={`add-to-cart-${product.id}`}
          className="w-full gap-2 bg-amber-600 hover:bg-amber-700 text-white transition-colors"
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingCart className="h-4 w-4" />
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}
