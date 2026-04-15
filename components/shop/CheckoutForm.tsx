"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, Loader2, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/components/providers/CartProvider";

interface OrderError {
  error: string;
}

interface OrderSuccess {
  id: string;
}

export function CheckoutForm() {
  const { items, totalAmount, itemCount, clearCart } = useCart();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <ShoppingBag className="mb-4 h-12 w-12 text-muted-foreground" />
        <p className="text-lg font-semibold">Your cart is empty.</p>
        <Button asChild className="mt-4 bg-amber-600 hover:bg-amber-700 text-white">
          <Link href="/">Browse Products</Link>
        </Button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            guestEmail: email,
            items: items.map((i) => ({
              productId: i.productId,
              quantity: i.quantity,
            })),
          }),
        });

        const data = (await res.json()) as OrderSuccess | OrderError;

        if (!res.ok) {
          setErrorMsg((data as OrderError).error ?? "Something went wrong. Please try again.");
          return;
        }

        // Clear cart and redirect to orders
        clearCart();
        router.push(`/orders/${(data as OrderSuccess).id}?placed=true`);
      } catch {
        setErrorMsg("Network error. Please check your connection and try again.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8" id="checkout-form">
      {/* Contact */}
      <section className="rounded-2xl border border-border/60 bg-card/80 p-6 backdrop-blur-sm">
        <h2 className="mb-4 text-lg font-bold">Contact Information</h2>
        <div className="space-y-2">
          <Label htmlFor="checkout-email">Email address</Label>
          <Input
            id="checkout-email"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isPending}
            className="max-w-sm"
            aria-describedby="email-hint"
          />
          <p id="email-hint" className="text-xs text-muted-foreground">
            Your order confirmation will be sent to this address.
          </p>
        </div>
      </section>

      {/* Order summary */}
      <section className="rounded-2xl border border-border/60 bg-card/80 p-6 backdrop-blur-sm">
        <h2 className="mb-4 text-lg font-bold">Order Summary</h2>
        <div className="space-y-3">
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
        <div className="flex justify-between text-base font-bold">
          <span>Total</span>
          <span className="text-amber-600">${totalAmount}</span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Final total is verified server-side before your order is confirmed.
        </p>
      </section>

      {/* Error */}
      {errorMsg && (
        <div
          className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
          id="checkout-error"
          role="alert"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Submit */}
      <Button
        id="place-order-button"
        type="submit"
        size="lg"
        className="w-full gap-2 bg-amber-600 hover:bg-amber-700 text-white text-base"
        disabled={isPending}
        aria-busy={isPending}
      >
        {isPending ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Placing Order…
          </>
        ) : (
          <>
            <ShoppingBag className="h-5 w-5" />
            Place Order — {itemCount} item{itemCount !== 1 ? "s" : ""}
          </>
        )}
      </Button>
    </form>
  );
}
