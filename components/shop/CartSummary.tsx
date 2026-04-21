"use client";

import Link from "next/link";
import { ShoppingCart, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/components/providers/CartProvider";

export function CartSummary() {
  const { itemCount, totalAmount, items } = useCart();

  const subtotal = parseFloat(totalAmount);
  const shipping = subtotal >= 499 ? 0 : 49;
  const total = subtotal + shipping;

  return (
    <div className="sticky top-24 rounded-3xl glass-panel p-8 shadow-[0_8px_40px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_40px_rgba(255,255,255,0.02)]">
      <h2 className="text-2xl font-bold tracking-tight mb-6">Order Summary</h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
          <span className="font-semibold text-foreground">₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Delivery</span>
          <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : 'text-foreground'}`}>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
        </div>
        {shipping > 0 && (
          <p className="text-xs text-muted-foreground">Add ₹{(499 - subtotal).toFixed(0)} more for free delivery</p>
        )}
      </div>

      <Separator className="my-6" />

      <div className="flex justify-between items-end mb-8">
        <span className="text-lg font-semibold text-foreground">Total</span>
        <div className="text-right">
          <span className="text-3xl font-extrabold tracking-tight text-foreground">₹{total.toFixed(2)}</span>
          <p className="text-xs text-muted-foreground mt-1 text-right">Inclusive of all taxes</p>
        </div>
      </div>

      <Button
        id="proceed-to-checkout"
        className="w-full gap-2 rounded-xl gradient-amber text-white border-0 btn-shine shadow-amber-glow hover:shadow-amber-glow-lg h-14 text-base font-semibold transition-all"
        asChild
        disabled={itemCount === 0}
      >
        <Link href="/checkout">
          Checkout securely <ArrowRight className="h-5 w-5 ml-1" />
        </Link>
      </Button>

      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="h-4 w-4" />
        <span>Secure encrypted checkout</span>
      </div>
    </div>
  );
}
