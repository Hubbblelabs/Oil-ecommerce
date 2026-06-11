import Link from "next/link";
import { Suspense } from "react";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ProductGridSkeleton } from "@/components/shop/ProductGridSkeleton";
import { PaginationControls } from "@/components/shop/PaginationControls";
import { productService } from "@/server/services/product.service";
import { cacheTag, cacheLife } from "next/cache";
import { cn } from "@/lib/utils";

// ── Editorial homepage sections ───────────────────────
import { HeroSection } from "@/components/shop/HeroSection";
import { BestSellersSection } from "@/components/shop/BestSellersSection";
import { WhyChooseUsSection } from "@/components/shop/WhyChooseUsSection";
import { HealthBenefitsSection } from "@/components/shop/HealthBenefitsSection";
import { BrandStorySection } from "@/components/shop/BrandStorySection";
import { TestimonialsSection } from "@/components/shop/TestimonialsSection";
import { WhatsAppCTASection } from "@/components/shop/WhatsAppCTASection";
import { CategoryGridSection } from "@/components/shop/CategoryGridSection";

const CATEGORIES = [
  { value: "", label: "All" },
  { value: "COOKING", label: "Cooking" },
  { value: "PREMIUM", label: "Premium" },
  { value: "ORGANIC", label: "Organic" },
  { value: "INDUSTRIAL", label: "Bulk" },
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
        <div className="mt-12">
          <PaginationControls currentPage={result.page} totalPages={result.totalPages} />
        </div>
      )}
    </>
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
      <div className="min-h-screen bg-background">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="mb-10 border-b border-border pb-8">
            <p className="eyebrow mb-4 flex items-center gap-3">
              <span className="inline-block h-px w-10 bg-primary" />
              The Collection
            </p>
            <h1 className="text-display-hero text-4xl text-foreground sm:text-5xl">
              {activeLabel} <em className="text-display-italic text-primary">oils</em>
            </h1>
          </div>

          {/* Filter pills */}
          <div className="mb-10 flex flex-wrap gap-2.5">
            {CATEGORIES.map((cat) => {
              const isActive = category === cat.value;
              return (
                <Link
                  key={cat.value}
                  href={cat.value ? `/?category=${cat.value}` : "/"}
                  className={cn(
                    "rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300",
                    isActive
                      ? "bg-secondary text-secondary-foreground"
                      : "border border-border bg-card text-foreground/70 hover:border-primary/50 hover:text-primary"
                  )}
                >
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

  // ── Editorial homepage ─────────────────────────────
  const bestSellersResult = await productService.getProducts(1, 4);
  const bestSellers = bestSellersResult.data;

  return (
    <div className="flex flex-col bg-background">
      <HeroSection />
      <BestSellersSection products={bestSellers} />
      <WhyChooseUsSection />
      <HealthBenefitsSection />
      <BrandStorySection />
      <TestimonialsSection />
      <CategoryGridSection />
      <WhatsAppCTASection />
    </div>
  );
}
