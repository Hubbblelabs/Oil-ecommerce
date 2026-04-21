import type { Metadata } from "next";
import { CartPageContent } from "@/components/shop/CartPageContent";

export const metadata: Metadata = {
  title: "Your Cart",
  description: "Review the items in your shopping cart before checkout.",
};

export default function CartPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="mb-10 text-4xl font-extrabold tracking-tight md:text-5xl">Your Shopping Bag</h1>
        <CartPageContent />
      </div>
    </div>
  );
}
