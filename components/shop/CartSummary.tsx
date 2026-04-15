"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/components/providers/CartProvider";

export function CartSummary() {
  const { itemCount, totalAmount, items } = useCart();

  return (
    <div className="sticky top-24 rounded-2xl border border-amber-200/30 bg-card/80 p-6 backdrop-blur-sm shadow-lg">
      <h2 className="text-xl font-bold">Order Summary</h2>

      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.productId} className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {item.name} × {item.quantity}
            </span>
            <span className="font-medium">
              ${(parseFloat(item.price) * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between text-lg font-bold">
        <span>Total</span>
        <span className="text-amber-600">${totalAmount}</span>
      </div>

      <p className="mt-1 text-xs text-muted-foreground">
        {itemCount} item{itemCount !== 1 ? "s" : ""}
      </p>

      <Button
        id="proceed-to-checkout"
        className="mt-6 w-full gap-2 bg-amber-600 hover:bg-amber-700 text-white"
        asChild
        disabled={itemCount === 0}
      >
        <Link href="/checkout">
          <ShoppingCart className="h-4 w-4" />
          Proceed to Checkout
        </Link>
      </Button>
    </div>
  );
}
