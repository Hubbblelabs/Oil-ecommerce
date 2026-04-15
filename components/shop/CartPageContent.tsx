"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/components/shop/CartItem";
import { CartSummary } from "@/components/shop/CartSummary";
import { useCart } from "@/components/providers/CartProvider";

export function CartPageContent() {
  const { items } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <p className="mt-2 text-muted-foreground">
          Discover our premium oils and add them to your cart.
        </p>
        <Button
          asChild
          className="mt-6 bg-amber-600 hover:bg-amber-700 text-white"
          id="cart-empty-shop-button"
        >
          <Link href="/">Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Cart items — 2/3 width */}
      <div className="space-y-4 lg:col-span-2" id="cart-items-list">
        {items.map((item) => (
          <CartItem key={item.productId} item={item} />
        ))}
      </div>

      {/* Summary sidebar — 1/3 width */}
      <div className="lg:col-span-1">
        <CartSummary />
      </div>
    </div>
  );
}
