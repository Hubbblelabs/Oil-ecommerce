import type { Metadata } from "next";
import { CheckoutForm } from "@/components/shop/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your oil order securely.",
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold">Checkout</h1>
        <p className="mt-1 text-muted-foreground">
          Complete your order below. Your total is calculated on the server.
        </p>
      </div>
      <CheckoutForm />
    </div>
  );
}
