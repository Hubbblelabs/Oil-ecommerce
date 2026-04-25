"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Tag, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/components/providers/CartProvider";

export function CartSummary() {
  const { itemCount, totalAmount, items } = useCart();

  const subtotal = parseFloat(totalAmount);
  // Mock savings
  const mockSavings = subtotal * 0.25; 
  const shipping = subtotal >= 499 ? 0 : 49;
  const total = subtotal + shipping;

  return (
    <div className="sticky top-24 space-y-4">
      {/* Coupon Box */}
      <div className="rounded-2xl border border-border bg-white dark:bg-zinc-900 p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center shrink-0">
            <Tag className="h-5 w-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-sm text-foreground">Apply Coupon</h3>
            <p className="text-xs text-muted-foreground">Login to see best offers</p>
          </div>
          <ChevronRightIcon className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-white dark:bg-zinc-900 p-5 sm:p-6 shadow-sm">
        <h2 className="text-lg font-extrabold tracking-tight mb-4 uppercase text-foreground">Bill Details</h2>

        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1.5">
              Item Total <span className="text-[10px] bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-foreground font-semibold">{itemCount} items</span>
            </span>
            <span className="font-bold text-foreground line-through decoration-muted-foreground/50">₹{(subtotal + mockSavings).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Item Discount</span>
            <span className="font-bold text-green-600 dark:text-green-400">- ₹{mockSavings.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Delivery Fee</span>
            <span className={`font-bold ${shipping === 0 ? 'text-green-600 dark:text-green-400' : 'text-foreground'}`}>
              {shipping === 0 ? 'FREE' : `₹${shipping}`}
            </span>
          </div>
          {shipping > 0 && (
            <p className="text-xs text-amber-600 font-semibold bg-amber-50 dark:bg-amber-950/30 px-2 py-1 rounded inline-block mt-1">
              Add ₹{(499 - subtotal).toFixed(0)} more for FREE Delivery
            </p>
          )}
        </div>

        <Separator className="my-4 border-dashed border-border/60" />

        <div className="flex justify-between items-center mb-4">
          <span className="text-base font-extrabold text-foreground uppercase">To Pay</span>
          <div className="text-right">
            <span className="text-2xl font-extrabold tracking-tight text-foreground">₹{total.toFixed(2)}</span>
            <p className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-widest">Incl. all taxes</p>
          </div>
        </div>

        {/* Savings Ribbon */}
        <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-3 rounded-xl flex items-center gap-2 mb-6 border border-green-100 dark:border-green-900/50">
          <Zap className="h-4 w-4 fill-green-600 dark:fill-green-500" />
          <span className="text-xs font-bold uppercase tracking-wider">Total Savings ₹{mockSavings.toFixed(2)}</span>
        </div>

        <Button
          id="proceed-to-checkout"
          className="w-full gap-2 rounded-xl bg-green-600 hover:bg-green-700 text-white h-14 text-base font-bold transition-all shadow-sm"
          asChild
          disabled={itemCount === 0}
        >
          <Link href="/checkout">
            Proceed to Pay <ArrowRight className="h-5 w-5 ml-1" />
          </Link>
        </Button>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Secure Checkout</span>
        </div>
      </div>
    </div>
  );
}

function ChevronRightIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
