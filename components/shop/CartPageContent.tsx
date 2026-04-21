"use client";

import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/components/shop/CartItem";
import { CartSummary } from "@/components/shop/CartSummary";
import { useCart } from "@/components/providers/CartProvider";

export function CartPageContent() {
  const { items } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center max-w-lg mx-auto">
        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-amber-50 dark:bg-amber-950 shadow-inner">
          <ShoppingBag className="h-10 w-10 text-amber-500" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight mb-3">Your bag is empty</h2>
        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
          Looks like you haven't added any of our premium oils to your cart yet. Let's fix that.
        </p>
        <Button
          asChild
          size="lg"
          className="rounded-xl h-14 px-8 bg-foreground text-background hover:bg-foreground/90 font-medium text-base shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
          id="cart-empty-shop-button"
        >
          <Link href="/products">
            Start Shopping <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-12 items-start">
      {/* Cart items */}
      <div className="space-y-6 lg:col-span-7 xl:col-span-8" id="cart-items-list">
        {items.map((item) => (
          <CartItem key={item.productId} item={item} />
        ))}
      </div>

      {/* Summary sidebar */}
      <div className="lg:col-span-5 xl:col-span-4">
        <CartSummary />
      </div>
    </div>
  );
}
