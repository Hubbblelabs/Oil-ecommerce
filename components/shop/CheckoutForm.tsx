"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, Loader2, AlertTriangle, ArrowRight, ShieldCheck, MapPin, Phone, CreditCard } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
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
  const [shippingAddress, setShippingAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center glass-panel rounded-3xl max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <p className="text-2xl font-bold tracking-tight mb-2">Your cart is empty.</p>
        <p className="text-muted-foreground mb-8">Add items to your cart to checkout.</p>
        <Button asChild size="lg" className="rounded-xl px-8 h-12 bg-foreground text-background hover:bg-foreground/90 font-medium">
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      setErrorMsg("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (shippingAddress.trim().length < 10) {
      setErrorMsg("Please enter a complete shipping address (at least 10 characters).");
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            shippingAddress: shippingAddress.trim(),
            phone: phone.trim(),
            items: items.map((i) => ({
              productId: i.productId,
              quantity: i.quantity,
            })),
          }),
        });

        const data = (await res.json()) as OrderSuccess | OrderError;

        if (!res.ok) {
          if (res.status === 401) {
            router.push("/login?redirect=/checkout");
            return;
          }
          setErrorMsg((data as OrderError).error ?? "Something went wrong. Please try again.");
          return;
        }

        clearCart();
        router.push(`/orders/${(data as OrderSuccess).id}?placed=true`);
      } catch {
        setErrorMsg("Network error. Please check your connection and try again.");
      }
    });
  };

  const subtotal = parseFloat(totalAmount);
  // Using fixed ₹ assuming it's INR
  const tax = subtotal * 0.05; // 5% tax mock
  const total = subtotal + tax;

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="checkout-form">
      
      {/* LEFT COLUMN: Shipping details */}
      <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-8">
        
        {errorMsg && (
          <div className="flex items-start gap-3 rounded-2xl border border-destructive bg-destructive/10 p-5 text-sm font-medium text-destructive" role="alert">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <section className="rounded-3xl glass-panel p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-amber-500"></div>
          <div className="flex items-center gap-3 mb-6">
             <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950 flex items-center justify-center">
                <MapPin className="text-amber-600 w-5 h-5" />
             </div>
             <h2 className="text-xl font-bold tracking-tight">Shipping Details</h2>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="checkout-address" className="text-sm font-semibold">Street Address *</Label>
              <textarea
                id="checkout-address"
                name="address"
                placeholder="House/Flat No., Street, City, State, PIN Code"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                required
                minLength={10}
                disabled={isPending}
                rows={4}
                className="w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none transition-shadow"
                aria-describedby="address-hint"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="checkout-phone" className="text-sm font-semibold">Mobile Number *</Label>
              <div className="flex items-center rounded-xl border border-input bg-background/50 focus-within:ring-2 focus-within:ring-amber-500/50 transition-shadow overflow-hidden">
                <div className="flex items-center justify-center bg-muted/50 px-4 py-3 border-r border-input font-medium text-muted-foreground">
                  +91
                </div>
                <input
                  id="checkout-phone"
                  type="tel"
                  name="phone"
                  placeholder="98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  required
                  pattern="[6-9][0-9]{9}"
                  maxLength={10}
                  disabled={isPending}
                  className="w-full bg-transparent px-4 py-3 text-base outline-none"
                  aria-describedby="phone-hint"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="rounded-3xl glass-panel p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
             <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                <CreditCard className="text-foreground w-5 h-5" />
             </div>
             <h2 className="text-xl font-bold tracking-tight">Payment Method</h2>
          </div>
          <div className="p-4 rounded-xl border border-border/60 bg-muted/30 flex items-center justify-between">
            <span className="font-medium text-foreground">Cash on Delivery (COD)</span>
            <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-amber-500 ring-4 ring-amber-500/20"></div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
             Currently focusing on COD only to ensure seamless service. Pay conveniently at your doorstep.
          </p>
        </section>
      </div>

      {/* RIGHT COLUMN: Order summary */}
      <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 space-y-6">
        <section className="rounded-3xl glass-panel p-8 shadow-[0_8px_40px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_40px_rgba(255,255,255,0.02)]">
          <h2 className="mb-6 text-xl font-bold tracking-tight">Order Summary</h2>
          
          <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {items.map((item) => (
              <div key={item.productId} className="flex gap-4 group">
                <div className="relative w-16 h-16 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-border/40 overflow-hidden shrink-0">
                   {item.image ? (
                     <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform"/>
                   ) : (
                     <div className="flex h-full items-center justify-center"><ShoppingBag className="w-6 h-6 text-muted-foreground opacity-50"/></div>
                   )}
                   <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-zinc-800 text-[10px] font-bold text-white flex items-center justify-center border-2 border-background">
                     {item.quantity}
                   </div>
                </div>
                <div className="flex flex-col justify-center flex-1 min-w-0">
                  <span className="text-sm font-semibold truncate text-foreground">{item.name}</span>
                  <span className="text-xs text-muted-foreground">{item.category}</span>
                </div>
                <div className="text-sm font-semibold flex items-center">
                  ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-6" />
          
          <div className="space-y-3 mb-6">
             <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium text-foreground">₹{subtotal.toFixed(2)}</span>
             </div>
             <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium text-foreground">Free</span>
             </div>
             <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Est. Taxes</span>
                <span className="font-medium text-foreground">₹{tax.toFixed(2)}</span>
             </div>
          </div>

          <Separator className="my-6" />

          <div className="flex items-end justify-between mb-8">
            <span className="text-lg font-bold text-foreground">Total</span>
            <div className="text-right">
               <span className="text-3xl font-extrabold tracking-tight text-foreground">₹{total.toFixed(2)}</span>
            </div>
          </div>

          <Button
            id="place-order-button"
            type="submit"
            size="lg"
            className="w-full gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white shadow-lg h-14 text-lg font-semibold transition-transform hover:-translate-y-0.5"
            disabled={isPending}
            aria-busy={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Place Order <ArrowRight className="h-5 w-5 ml-1" />
              </>
            )}
          </Button>
          
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
             <ShieldCheck className="h-4 w-4" />
             <span>Guaranteed safe & secure checkout</span>
          </div>
        </section>
      </div>
    </form>
  );
}
