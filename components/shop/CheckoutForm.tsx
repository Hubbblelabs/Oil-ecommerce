"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ShoppingBag, Loader2, AlertTriangle, ArrowRight, ShieldCheck,
  MapPin, Phone, Tag, X, Check, Smartphone, CreditCard, Banknote,
  Wallet, Zap,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/components/providers/CartProvider";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

interface OrderError { error: string }
interface OrderSuccess { id: string }

interface Discount {
  id: string;
  code: string;
  description: string;
  percentage: number;
}

const PAYMENT_METHODS = [
  { id: "razorpay", label: "Razorpay (UPI / Card / Wallet)", icon: Zap, sub: "Powered by Razorpay — all payment modes" },
  { id: "cod", label: "Cash on Delivery", icon: Banknote, sub: "Pay when delivered" },
];

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-script")) { resolve(true); return; }
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function CheckoutForm() {
  const { items, totalAmount, clearCart } = useCart();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [shippingAddress, setShippingAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Discount state
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<Discount | null>(null);
  const [discountError, setDiscountError] = useState<string | null>(null);
  const [validatingCode, setValidatingCode] = useState(false);

  // Pre-load Razorpay script
  useEffect(() => { loadRazorpayScript(); }, []);

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

  const subtotal = parseFloat(totalAmount);
  const discountAmount = appliedDiscount ? (subtotal * appliedDiscount.percentage) / 100 : 0;
  const shipping = subtotal >= 499 ? 0 : 49;
  const total = subtotal - discountAmount + shipping;

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) return;
    setValidatingCode(true);
    setDiscountError(null);
    try {
      const res = await fetch("/api/discounts/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: discountCode.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setAppliedDiscount(data);
    } catch (err: unknown) {
      setDiscountError(err instanceof Error ? err.message : "Invalid code");
    } finally {
      setValidatingCode(false);
    }
  };

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
        // 1. Create our internal order first
        const orderRes = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            shippingAddress: shippingAddress.trim(),
            phone: phone.trim(),
            discountId: appliedDiscount?.id,
            discountAmount: discountAmount,
            items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
          }),
        });

        const orderData = (await orderRes.json()) as OrderSuccess | OrderError;
        if (!orderRes.ok) {
          if (orderRes.status === 401) { router.push("/login?redirect=/checkout"); return; }
          setErrorMsg((orderData as OrderError).error ?? "Something went wrong.");
          return;
        }

        const orderId = (orderData as OrderSuccess).id;

        if (paymentMethod === "cod") {
          clearCart();
          router.push(`/orders/${orderId}?placed=true`);
          return;
        }

        // 2. Razorpay flow
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          setErrorMsg("Failed to load payment gateway. Please try again.");
          return;
        }

        // 3. Create Razorpay order
        const rzpRes = await fetch("/api/payments/razorpay/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: total, receipt: orderId }),
        });
        const rzpData = await rzpRes.json();
        if (!rzpRes.ok) {
          setErrorMsg(rzpData.error ?? "Payment gateway error.");
          return;
        }

        // 4. Open Razorpay modal
        const rzp = new window.Razorpay({
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: rzpData.amount,
          currency: rzpData.currency,
          name: "Shri Sameya Village Oils",
          description: "Pure Wood Pressed Oils",
          order_id: rzpData.razorpay_order_id,
          prefill: { contact: phone },
          theme: { color: "#D97706" },
          handler: async (response: {
            razorpay_order_id: string;
            razorpay_payment_id: string;
            razorpay_signature: string;
          }) => {
            // 5. Verify payment
            const verifyRes = await fetch("/api/payments/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...response, our_order_id: orderId }),
            });
            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) {
              setErrorMsg(verifyData.error ?? "Payment verification failed.");
              return;
            }
            clearCart();
            router.push(`/orders/${orderId}?placed=true&paid=true`);
          },
          modal: {
            ondismiss: () => {
              setErrorMsg("Payment was cancelled. Your order is saved — you can pay later.");
            },
          },
        });
        rzp.open();
      } catch {
        setErrorMsg("Network error. Please check your connection and try again.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="checkout-form">

      {/* LEFT: Shipping & Payment */}
      <div className="lg:col-span-7 flex flex-col gap-6">

        {errorMsg && (
          <div className="flex items-start gap-3 rounded-xl border border-destructive bg-destructive/10 p-4 text-sm font-medium text-destructive" role="alert">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Address */}
        <section className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-border relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-amber-500" />
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
              <Label htmlFor="checkout-phone" className="text-sm font-semibold text-foreground">
                <Phone className="inline h-3.5 w-3.5 mr-1" />Receiver&apos;s Contact
              </Label>
              <div className="flex items-center rounded-xl border border-border bg-background focus-within:ring-2 focus-within:ring-amber-500/50 transition-shadow overflow-hidden">
                <div className="flex items-center justify-center bg-muted/50 px-4 py-2.5 border-r border-border font-medium text-muted-foreground text-sm">
                  +91
                </div>
                <input
                  id="checkout-phone"
                  type="tel"
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

        {/* Discount Code */}
        <section className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-border">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-950/30 flex items-center justify-center text-red-600">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">Discount Code</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Have a promo code? Apply it here.</p>
            </div>
          </div>

          {appliedDiscount ? (
            <div className="flex items-center justify-between p-4 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-black text-green-800 dark:text-green-400 font-mono tracking-widest">
                    {appliedDiscount.code}
                  </p>
                  <p className="text-xs text-green-700 dark:text-green-500">
                    {appliedDiscount.percentage}% off — {appliedDiscount.description}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => { setAppliedDiscount(null); setDiscountCode(""); }}
                className="text-green-700 hover:text-red-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter discount code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-red-500/30 transition uppercase"
              />
              <button
                type="button"
                onClick={handleApplyDiscount}
                disabled={validatingCode || !discountCode.trim()}
                className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold text-sm transition-colors flex items-center gap-2"
              >
                {validatingCode ? <Loader2 className="h-4 w-4 animate-spin" /> : <Tag className="h-4 w-4" />}
                Apply
              </button>
            </div>
          )}
          {discountError && (
            <p className="mt-2 text-xs font-semibold text-red-600 flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" /> {discountError}
            </p>
          )}
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

          <div className="flex flex-col gap-3">
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
                    <div>
                      <span className={cn("text-sm font-bold", isSelected ? "text-foreground" : "text-muted-foreground")}>
                        {method.label}
                      </span>
                      <p className="text-xs text-muted-foreground">{method.sub}</p>
                    </div>
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

          {paymentMethod === "razorpay" && (
            <p className="mt-3 text-xs text-amber-700 dark:text-amber-500 font-medium p-3 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-900">
              🔒 Powered by Razorpay — supports UPI, Credit/Debit Cards, Net Banking, and Wallets.
            </p>
          )}
        </section>
      </div>

      {/* RIGHT: Order Summary */}
      <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
        <section className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-border">
          <h2 className="mb-6 text-lg font-extrabold tracking-tight uppercase">Order Summary</h2>

          <div className="space-y-4 mb-6 max-h-[250px] overflow-y-auto pr-2">
            {items.map((item) => (
              <div key={item.productId} className="flex gap-4">
                <div className="relative w-14 h-14 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-border/40 overflow-hidden shrink-0">
                  {item.image ? (
                    <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-muted-foreground opacity-50" />
                    </div>
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
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold text-foreground">₹{subtotal.toFixed(2)}</span>
            </div>
            {appliedDiscount && (
              <div className="flex justify-between text-sm">
                <span className="text-green-600 font-medium flex items-center gap-1">
                  <Tag className="h-3 w-3" /> {appliedDiscount.code} ({appliedDiscount.percentage}%)
                </span>
                <span className="font-bold text-green-600">- ₹{discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Delivery Fee</span>
              <span className={`font-bold ${shipping === 0 ? "text-green-600 dark:text-green-400" : "text-foreground"}`}>
                {shipping === 0 ? "FREE" : `₹${shipping}`}
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
            className={cn(
              "w-full gap-2 rounded-xl text-white shadow-sm h-14 text-lg font-bold transition-transform hover:-translate-y-0.5",
              paymentMethod === "razorpay"
                ? "bg-[#D97706] hover:bg-[#b86004] shadow-[0_4px_20px_rgba(217,119,6,0.35)]"
                : "bg-green-600 hover:bg-green-700"
            )}
            disabled={isPending}
            aria-busy={isPending}
          >
            {isPending ? (
              <><Loader2 className="h-5 w-5 animate-spin" /> Processing...</>
            ) : paymentMethod === "razorpay" ? (
              <><Zap className="h-5 w-5" /> Pay ₹{total.toFixed(2)} with Razorpay</>
            ) : (
              <>Place Order (COD) <ArrowRight className="h-5 w-5 ml-1" /></>
            )}
          </Button>

          <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>SSL Encrypted · Secure Checkout</span>
          </div>
        </section>
      </div>
    </form>
  );
}
