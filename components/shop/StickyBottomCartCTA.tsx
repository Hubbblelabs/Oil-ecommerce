"use client";

import { useCart } from "@/components/providers/CartProvider";
import { ProductDetail } from "@/server/types";
import { ChevronUp, Plus, Minus, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function StickyBottomCartCTA({ product }: { product: ProductDetail }) {
  const { items, addItem, updateQuantity } = useCart();
  const [isVisible, setIsVisible] = useState(false);

  const cartItem = items.find((i) => i.productId === product.id);
  const quantity = cartItem?.quantity || 0;

  // Only show on mobile/tablet when scrolling past the main add to cart button
  useEffect(() => {
    const handleScroll = () => {
      const mainBtn = document.getElementById(`product-add-to-cart-${product.id}`);
      if (mainBtn) {
        const rect = mainBtn.getBoundingClientRect();
        // Show sticky CTA if main button is above viewport
        setIsVisible(rect.bottom < 0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [product.id]);

  if (!isVisible) return null;

  const handleAdd = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price.toString(),
      image: product.image,
      category: product.category,
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white dark:bg-zinc-950 border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.05)] md:hidden transform transition-transform duration-300">
      <div className="flex items-center gap-4 max-w-lg mx-auto">
        <div className="flex-1 flex flex-col">
          <span className="font-semibold text-sm truncate">{product.name}</span>
          <span className="font-bold text-amber-600">₹{product.price.toString()}</span>
        </div>
        
        <div className="w-[120px]">
          {quantity > 0 ? (
            <div className="flex items-center justify-between bg-green-600 text-white rounded-lg h-10 px-2 shadow-sm font-semibold">
              <button onClick={() => updateQuantity(product.id, quantity - 1)} className="p-1 hover:bg-green-700 rounded">
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-sm">{quantity}</span>
              <button onClick={() => updateQuantity(product.id, quantity + 1)} className="p-1 hover:bg-green-700 rounded">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Button
              className="w-full h-10 rounded-lg bg-amber-600 hover:bg-amber-700 text-white shadow-sm font-bold text-sm"
              onClick={handleAdd}
            >
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
