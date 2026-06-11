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
        <div className="mb-10">
          <p className="eyebrow mb-4 flex items-center gap-3">
            <span className="inline-block h-px w-10 bg-primary" />
            Almost there
          </p>
          <h1 className="text-display-hero text-4xl text-foreground md:text-5xl">
            Your shopping <em className="text-display-italic text-primary">bag</em>
          </h1>
        </div>
        <CartPageContent />
      </div>
    </div>
  );
}
