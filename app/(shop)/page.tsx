import { Suspense } from "react";
import { cacheLife, cacheTag } from "next/cache";
import type { Metadata } from "next";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ProductGridSkeleton } from "@/components/shop/ProductGridSkeleton";
import { PaginationControls } from "@/components/shop/PaginationControls";
import { productService } from "@/server/services/product.service";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse our curated collection of premium cold-pressed, extra virgin, and specialty oils.",
};

// Shared categories — single source of truth
const CATEGORIES = [
  "All",
  "Olive Oil",
  "Coconut Oil",
  "Avocado Oil",
  "Sesame Oil",
  "Argan Oil",
  "Essential Oil",
] as const;

const PAGE_SIZE = 12;

interface SearchParams {
  page?: string;
  category?: string;
}

interface ProductsPageProps {
  // In Next.js 16 App Router, searchParams is a Promise
  searchParams: Promise<SearchParams>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { page: pageStr, category } = await searchParams;
  const page = Math.max(1, Number(pageStr ?? "1"));
  const activeCategory = category && category !== "All" ? category : undefined;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Hero banner */}
      <section className="mb-10 overflow-hidden rounded-3xl gradient-amber p-8 text-white md:p-12">
        <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-amber-100/80">
          Premium Quality
        </p>
        <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
          Finest Oils,<br />From Source to Table
        </h1>
        <p className="mt-3 max-w-xl text-amber-50/80">
          Cold-pressed, unrefined, and traceable. Every bottle tells a story of craft and purity.
        </p>
      </section>

      {/* Category filter */}
      <nav
        className="mb-8 flex flex-wrap gap-2"
        aria-label="Category filter"
        id="category-filter"
      >
        {CATEGORIES.map((cat) => {
          const isActive =
            cat === "All" ? !activeCategory : activeCategory === cat;
          const href = cat === "All" ? "/?page=1" : `/?category=${encodeURIComponent(cat)}&page=1`;
          return (
            <a
              key={cat}
              href={href}
              id={`category-filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-amber-500 text-white shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-amber-100 hover:text-amber-800 dark:hover:bg-amber-900/30 dark:hover:text-amber-300"
              }`}
            >
              {cat}
            </a>
          );
        })}
      </nav>

      {/* Product grid with streaming skeleton */}
      <Suspense fallback={<ProductGridSkeleton count={PAGE_SIZE} />}>
        <ProductsContent page={page} category={activeCategory} />
      </Suspense>
    </div>
  );
}

// ─────────────────────────────────────────────
// Async streaming component with 'use cache'
// ─────────────────────────────────────────────
async function ProductsContent({
  page,
  category,
}: {
  page: number;
  category: string | undefined;
}) {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  const result = await productService.getProducts(page, PAGE_SIZE, category);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {result.total} product{result.total !== 1 ? "s" : ""} found
        </p>
      </div>

      <ProductGrid products={result.data} />

      {result.totalPages > 1 && (
        <div className="mt-10">
          <PaginationControls
            currentPage={result.page}
            totalPages={result.totalPages}
          />
        </div>
      )}
    </div>
  );
}
