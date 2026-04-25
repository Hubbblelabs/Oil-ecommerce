"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, Loader2, AlertTriangle, ArrowRight, ShieldCheck, MapPin, Phone, CreditCard, Banknote, Smartphone, Wallet } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/components/providers/CartProvider";
import { cn } from "@/lib/utils";

interface OrderError {
  error: string;
}

interface OrderSuccess {
  id: string;
}

const PAYMENT_METHODS = [
  { id: "cod", label: "Cash on Delivery", icon: Banknote },
  { id: "upi", label: "UPI", icon: Smartphone },
  { id: "card", label: "Credit / Debit Card", icon: CreditCard },
  { id: "wallet", label: "Wallets", icon: Wallet },
];

export function CheckoutForm() {
  const { items, totalAmount, itemCount, clearCart } = useCart();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [shippingAddress, setShippingAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center bg-white dark:bg-zinc-900 rounded-3xl max-w-2xl mx-auto shadow-sm border border-border">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <p className="text-2xl font-bold tracking-tight mb-2">Your cart is empty.</p>
        <p className="text-muted-foreground mb-8">Add items to your cart to checkout.</p>
        <Button asChild size="lg" className="rounded-xl px-8 h-12 bg-amber-600 hover:bg-amber-700 text-white font-medium">
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

    if (paymentMethod !== "cod") {
      setErrorMsg("Only Cash on Delivery is available right now.");
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
  const mockSavings = subtotal * 0.25;
  const shipping = subtotal >= 499 ? 0 : 49;
  const total = subtotal + shipping;

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="checkout-form">
      
      {/* LEFT COLUMN: Shipping & Payment */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        
        {errorMsg && (
          <div className="flex items-start gap-3 rounded-xl border border-destructive bg-destructive/10 p-4 text-sm font-medium text-destructive" role="alert">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Address Selection / Input */}
        <section className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-border relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-amber-500"></div>
          <div className="flex items-center gap-3 mb-6">
             <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center text-amber-600">
                <MapPin className="w-5 h-5" />
             </div>
             <div>
               <h2 className="text-xl font-bold tracking-tight text-foreground">Delivery Address</h2>
               <p className="text-xs text-muted-foreground mt-0.5">Where should we deliver your order?</p>
             </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="checkout-address" className="text-sm font-semibold text-foreground">Complete Address</Label>
              <textarea
                id="checkout-address"
                name="address"
                placeholder="House/Flat No., Building Name, Street, City, State, PIN Code"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                required
                minLength={10}
                disabled={isPending}
                rows={3}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none transition-shadow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkout-phone" className="text-sm font-semibold text-foreground">Receiver's Contact</Label>
              <div className="flex items-center rounded-xl border border-border bg-background focus-within:ring-2 focus-within:ring-amber-500/50 transition-shadow overflow-hidden">
                <div className="flex items-center justify-center bg-muted/50 px-4 py-2.5 border-r border-border font-medium text-muted-foreground text-sm">
                  +91
                </div>
                <input
                  id="checkout-phone"
                  type="tel"
                  name="phone"
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  required
                  pattern="[6-9][0-9]{9}"
                  maxLength={10}
                  disabled={isPending}
                  className="w-full bg-transparent px-4 py-2.5 text-sm outline-none"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Payment Methods */}
        <section className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-border">
          <div className="flex items-center gap-3 mb-6">
             <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-foreground">
                <CreditCard className="w-5 h-5" />
             </div>
             <div>
               <h2 className="text-xl font-bold tracking-tight text-foreground">Payment Method</h2>
               <p className="text-xs text-muted-foreground mt-0.5">Select how you want to pay</p>
             </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PAYMENT_METHODS.map((method) => {
              const Icon = method.icon;
              const isSelected = paymentMethod === method.id;
              
              return (
                <div
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={cn(
                    "relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all",
                    isSelected 
                      ? "border-amber-500 bg-amber-50 dark:bg-amber-950/20" 
                      : "border-border hover:border-amber-500/50 bg-background"
                  )}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <Icon className={cn("w-5 h-5", isSelected ? "text-amber-600" : "text-muted-foreground")} />
                    <span className={cn("text-sm font-semibold", isSelected ? "text-foreground" : "text-muted-foreground")}>
                      {method.label}
                    </span>
                  </div>
                  
                  <div className={cn(
                    "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0",
                    isSelected ? "border-amber-500" : "border-muted-foreground/50"
                  )}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-amber-500" />}
                  </div>
                </div>
              );
            })}
          </div>
          
          {paymentMethod !== "cod" && (
            <p className="text-xs text-amber-600 font-medium mt-4 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
              Currently focusing on Cash on Delivery (COD) only to ensure seamless service. Please select COD.
            </p>
          )}
        </section>
      </div>

      {/* RIGHT COLUMN: Order summary */}
      <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
        <section className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-border">
          <h2 className="mb-6 text-lg font-extrabold tracking-tight uppercase">Order Summary</h2>
          
          <div className="space-y-4 mb-6 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
            {items.map((item) => (
              <div key={item.productId} className="flex gap-4">
                <div className="relative w-14 h-14 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-border/40 overflow-hidden shrink-0">
                   {item.image ? (
                     <Image src={item.image} alt={item.name} fill className="object-contain p-1"/>
                   ) : (
                     <div className="flex h-full items-center justify-center"><ShoppingBag className="w-5 h-5 text-muted-foreground opacity-50"/></div>
                   )}
                   <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-zinc-800 text-[9px] font-bold text-white flex items-center justify-center border-2 border-background">
                     {item.quantity}
                   </div>
                </div>
                <div className="flex flex-col justify-center flex-1 min-w-0">
                  <span className="text-sm font-semibold truncate text-foreground">{item.name}</span>
                  <span className="text-xs text-muted-foreground">{item.category}</span>
                </div>
                <div className="text-sm font-bold flex items-center">
                  ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-4 border-dashed border-border/60" />
          
          <div className="space-y-3 mb-4">
             <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Item Total</span>
                <span className="font-semibold text-foreground line-through decoration-muted-foreground/50">₹{(subtotal + mockSavings).toFixed(2)}</span>
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
          </div>

          <Separator className="my-4 border-dashed border-border/60" />

          <div className="flex items-center justify-between mb-8">
            <span className="text-base font-extrabold text-foreground uppercase">To Pay</span>
            <div className="text-right">
               <span className="text-3xl font-extrabold tracking-tight text-foreground">₹{total.toFixed(2)}</span>
               <p className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-widest">Incl. all taxes</p>
            </div>
          </div>

          <Button
            id="place-order-button"
            type="submit"
            size="lg"
            className="w-full gap-2 rounded-xl bg-green-600 hover:bg-green-700 text-white shadow-sm h-14 text-lg font-bold transition-transform hover:-translate-y-0.5"
            disabled={isPending || paymentMethod !== "cod"}
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
          
          <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
             <ShieldCheck className="h-3.5 w-3.5" />
             <span>Secure Checkout</span>
          </div>
        </section>
      </div>
    </form>
  );
}
