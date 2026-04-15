import type { Metadata } from "next";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartPageContent } from "@/components/shop/CartPageContent";

export const metadata: Metadata = {
  title: "Your Cart",
  description: "Review the items in your shopping cart before checkout.",
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-extrabold">Your Cart</h1>
      <CartPageContent />
    </div>
  );
}
