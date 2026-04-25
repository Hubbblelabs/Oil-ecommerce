"use client";

import { ShoppingCart, Check, CreditCard, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/providers/CartProvider";
import type { ProductDetail } from "@/server/types";

interface AddToCartButtonProps {
  product: ProductDetail;
  disabled?: boolean;
}

export function AddToCartButton({ product, disabled }: AddToCartButtonProps) {
  const { items, addItem, updateQuantity } = useCart();
  const [added, setAdded] = useState(false);

  const cartItem = items.find((i) => i.productId === product.id);
  const quantity = cartItem?.quantity || 0;

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

  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = () => {
    updateQuantity(product.id, quantity - 1);
  };

  return (
    <div className="flex flex-col gap-3 mt-6">
      {quantity > 0 ? (
        <div className="flex items-center justify-between bg-green-600 text-white rounded-xl h-14 px-4 shadow-sm font-semibold border border-green-700 w-full">
          <button onClick={handleDecrement} className="p-3 hover:bg-green-700 rounded-lg transition-colors flex-shrink-0 active:scale-95">
            <Minus className="w-5 h-5" />
          </button>
          <span className="text-lg px-2 text-center w-full font-bold">{quantity} in Cart</span>
          <button onClick={handleIncrement} className="p-3 hover:bg-green-700 rounded-lg transition-colors flex-shrink-0 active:scale-95">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <Button
          id={`product-add-to-cart-${product.id}`}
          size="lg"
          className="w-full gap-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-base font-semibold border-0 shadow-amber-glow transition-all h-14"
          onClick={handleClick}
          disabled={disabled || added}
          aria-label={`Add ${product.name} to cart`}
        >
          {added ? (
            <>
              <Check className="h-5 w-5" />
              Added
            </>
          ) : (
            <>
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </>
          )}
        </Button>
      )}
      
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
