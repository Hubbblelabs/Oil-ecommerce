"use client";

import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/providers/CartProvider";
import type { ProductDetail } from "@/server/types";

interface AddToCartButtonProps {
  product: ProductDetail;
  disabled?: boolean;
}

export function AddToCartButton({ product, disabled }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price.toString(),
      image: product.image,
      category: product.category,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Button
      id={`product-add-to-cart-${product.id}`}
      size="lg"
      className="w-full gap-2 bg-amber-600 hover:bg-amber-700 text-white text-base transition-all"
      onClick={handleClick}
      disabled={disabled || added}
      aria-label={`Add ${product.name} to cart`}
    >
      {added ? (
        <>
          <Check className="h-5 w-5" />
          Added to Cart!
        </>
      ) : (
        <>
          <ShoppingCart className="h-5 w-5" />
          Add to Cart
        </>
      )}
    </Button>
  );
}
