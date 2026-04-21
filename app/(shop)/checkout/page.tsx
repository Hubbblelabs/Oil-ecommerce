import type { Metadata } from "next";
import { CheckoutForm } from "@/components/shop/CheckoutForm";
import { Lock, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your oil order securely.",
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="border-b border-border/40 bg-zinc-50 dark:bg-zinc-950/50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
             <div>
               <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">Secure Checkout</h1>
               <div className="flex items-center gap-2 mt-2 text-sm text-green-600 font-medium">
                  <Lock className="w-4 h-4" />
                  <span>SSL Encrypted Connection</span>
               </div>
             </div>
             
             {/* Progress Stepper */}
             <div className="flex items-center gap-3 text-sm font-semibold tracking-wide">
                <span className="text-muted-foreground">Cart</span>
                <span className="w-8 h-px bg-border"></span>
                <span className="text-amber-600">Details & Payment</span>
                <span className="w-8 h-px bg-border"></span>
                <span className="text-muted-foreground opacity-50">Confirm</span>
             </div>
          </div>
        </div>
      </div>
      
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <CheckoutForm />
      </div>
    </div>
  );
}
