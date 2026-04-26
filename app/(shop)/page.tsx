import Link from "next/link";
import { Suspense } from "react";
import { Flame, Leaf, Star, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ProductGridSkeleton } from "@/components/shop/ProductGridSkeleton";
import { PaginationControls } from "@/components/shop/PaginationControls";
import { productService } from "@/server/services/product.service";
import { cacheTag, cacheLife } from "next/cache";
import { cn } from "@/lib/utils";
import { ProductLane } from "@/components/shop/ProductLane";

// ── Premium homepage sections ─────────────────────────
import { HeroSection } from "@/components/shop/HeroSection";
import { BestSellersSection } from "@/components/shop/BestSellersSection";
import { WhyChooseUsSection } from "@/components/shop/WhyChooseUsSection";
import { OilUsageSection } from "@/components/shop/OilUsageSection";
import { HealthBenefitsSection } from "@/components/shop/HealthBenefitsSection";
import { ComparisonSection } from "@/components/shop/ComparisonSection";
import { BrandStorySection } from "@/components/shop/BrandStorySection";
import { TestimonialsSection } from "@/components/shop/TestimonialsSection";
import { WhatsAppCTASection } from "@/components/shop/WhatsAppCTASection";
import { CategoryGridSection } from "@/components/shop/CategoryGridSection";
import { FAQSection } from "@/components/shop/FAQSection";

const CATEGORIES = [
  { value: "", label: "All", icon: Package, color: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300" },
  { value: "COOKING", label: "Cooking", icon: Flame, color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" },
  { value: "PREMIUM", label: "Premium", icon: Star, color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  { value: "ORGANIC", label: "Organic", icon: Leaf, color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
  { value: "INDUSTRIAL", label: "Bulk", icon: Package, color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
];

async function ProductsContent({ category, page }: { category?: string; page: number }) {
  "use cache";
  cacheTag("products");
  cacheLife("minutes");

  const result = await productService.getProducts(page, 12, category || undefined);

  return (
    <>
      <ProductGrid products={result.data} />
      {result.totalPages > 1 && (
        <div className="mt-10">
          <PaginationControls currentPage={result.page} totalPages={result.totalPages} />
        </div>
      )}
    </>
  );
}

async function LiveProductLanes() {
  const result = await productService.getProducts(1, 16);
  const products = result.data;
  if (!products || products.length === 0) return null;

  const bestSellers = [...products].sort(() => 0.5 - Math.random()).slice(0, 8);
  const todaysDeals = [...products].sort(() => 0.5 - Math.random()).slice(0, 8);
  const healthyOils = [...products]
    .filter((p) => p.category === "ORGANIC" || p.category === "PREMIUM")
    .slice(0, 8);

  return (
    <div className="flex flex-col gap-2 bg-[#FAF8F2]/70 dark:bg-black/50 py-8">
      <ProductLane title="Best Sellers" subtitle="Loved by thousands of households" products={bestSellers} />
      <ProductLane title="Today's Deals" subtitle="Unbeatable prices on premium oils" products={todaysDeals} />
      {healthyOils.length > 0 && (
        <ProductLane title="Healthy Alternatives" subtitle="Cold-pressed organic goodness" products={healthyOils} />
      )}
    </div>
  );
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const params = await searchParams;
  const category = params.category ?? "";
  const page = Math.max(1, Number(params.page ?? "1"));
  const activeLabel = CATEGORIES.find((c) => c.value === category)?.label ?? "All";

  // ── Category / pagination view ─────────────────────
  if (category || page > 1) {
    return (
      <div className="flex flex-col py-8 bg-[#FAF8F2] dark:bg-zinc-950 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          {/* Heading */}
          <div className="mb-8">
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#3B2416] dark:text-white">
              {activeLabel} Oils
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Showing {activeLabel.toLowerCase()} range</p>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = category === cat.value;
              return (
                <Link
                  key={cat.value}
                  href={cat.value ? `/?category=${cat.value}` : "/"}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all",
                    isActive
                      ? "bg-[#D97706] text-white shadow-[0_4px_12px_rgba(217,119,6,0.35)]"
                      : `${cat.color} hover:opacity-80`
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {cat.label}
                </Link>
              );
            })}
          </div>

          <Suspense fallback={<ProductGridSkeleton />} key={`${category}-${page}`}>
            <ProductsContent category={category} page={page} />
          </Suspense>
        </div>
      </div>
    );
  }

  // ── Premium Homepage ───────────────────────────────
  return (
    <div className="flex flex-col bg-[#FAF8F2] dark:bg-zinc-950">

      {/* 1. Cinematic Hero */}
      <HeroSection />

      {/* 2. Best Sellers (static cards — always visible) */}
      <BestSellersSection />

      {/* 3. Live product lanes from DB (graceful fallback when DB offline) */}
      <Suspense fallback={null}>
        <LiveProductLanes />
      </Suspense>

      {/* 4. Why Choose Us */}
      <WhyChooseUsSection />

      {/* 5. Which Oil for Which Use */}
      <OilUsageSection />

      {/* 6. Health Benefits — tabbed per oil */}
      <HealthBenefitsSection />

      {/* 7. Comparison: Wood Pressed vs Refined */}
      <ComparisonSection />

      {/* 8. Brand Story */}
      <BrandStorySection />

      {/* 9. Customer Testimonials */}
      <TestimonialsSection />

      {/* 10. Category Grid */}
      <CategoryGridSection />

      {/* 11. WhatsApp CTA */}
      <WhatsAppCTASection />

      {/* 12. FAQ */}
      <FAQSection />

    </div>
  );
}
