"use client";

import { ShoppingCart, Check, CreditCard } from "lucide-react";
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
    <div className="flex flex-col gap-3 mt-6">
      <Button
        id={`product-add-to-cart-${product.id}`}
        size="lg"
        className="w-full gap-2 rounded-xl gradient-amber text-white text-base font-semibold border-0 btn-shine shadow-amber-glow hover:shadow-amber-glow-lg transition-all h-14"
        onClick={handleClick}
        disabled={disabled || added}
        aria-label={`Add ${product.name} to cart`}
      >
        {added ? (
          <>
            <Check className="h-5 w-5" />
            Added to Cart successfully!
          </>
        ) : (
          <>
            <ShoppingCart className="h-5 w-5" />
            Add to Cart
          </>
        )}
      </Button>
      
      <Button
        variant="outline"
        size="lg"
        className="w-full gap-2 rounded-xl text-base font-semibold border-amber-500/20 text-foreground hover:bg-amber-50 hover:text-amber-700 transition-colors h-14"
        disabled={disabled}
      >
        <CreditCard className="h-5 w-5" />
        Buy it now
      </Button>
    </div>
  );
}
