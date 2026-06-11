import { Suspense } from "react";
import { cacheLife, cacheTag } from "next/cache";
import type { Metadata } from "next";
import Link from "next/link";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ProductGridSkeleton } from "@/components/shop/ProductGridSkeleton";
import { PaginationControls } from "@/components/shop/PaginationControls";
import { productService } from "@/server/services/product.service";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse our curated collection of premium cold-pressed, wood-pressed, and specialty oils.",
};

const CATEGORIES = [
  { value: "All", label: "All Products" },
  { value: "COOKING", label: "Cooking Oils" },
  { value: "PREMIUM", label: "Premium Cold-Pressed" },
  { value: "ORGANIC", label: "Certified Organic" },
  { value: "INDUSTRIAL", label: "Industrial & Bulk" },
] as const;

const PAGE_SIZE = 12;

interface SearchParams {
  page?: string;
  category?: string;
}

export default async function ProductsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const { page: pageStr, category } = await searchParams;
  const page = Math.max(1, Number(pageStr ?? "1"));
  const activeCategory = category && category !== "All" ? category : undefined;
  const activeLabel =
    CATEGORIES.find((c) => c.value === (activeCategory ?? "All"))?.label ?? "All Products";

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Editorial header */}
      <div className="mb-12 border-b border-border pb-10">
        <p className="eyebrow mb-4 flex items-center gap-3">
          <span className="inline-block h-px w-10 bg-primary" />
          The Collection
        </p>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h1 className="text-display-hero text-4xl text-foreground sm:text-5xl lg:text-6xl">
            {activeCategory ? (
              activeLabel
            ) : (
              <>
                Every <em className="text-display-italic text-primary">drop</em>, pure
              </>
            )}
          </h1>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Slow-pressed in wooden chekku mills. No heat, no chemicals — browse the
            full range of our village-made oils.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-12 lg:flex-row">
        {/* Sidebar — category index */}
        <aside className="lg:w-60 lg:flex-shrink-0">
          <div className="lg:sticky lg:top-28">
            <h3 className="label-xs mb-5 hidden lg:block">Categories</h3>

            {/* Mobile: horizontal pills / Desktop: editorial list */}
            <nav className="scrollbar-hide flex gap-2.5 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0">
              {CATEGORIES.map((cat, i) => {
                const isActive = cat.value === "All" ? !activeCategory : activeCategory === cat.value;
                const href =
                  cat.value === "All"
                    ? "/products?page=1"
                    : `/products?category=${encodeURIComponent(cat.value)}&page=1`;

                return (
                  <Link
                    key={cat.value}
                    href={href}
                    className={cn(
                      "group whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300",
                      "lg:flex lg:items-center lg:justify-between lg:rounded-none lg:border-x-0 lg:border-t-0 lg:border-b lg:border-border lg:bg-transparent lg:px-0 lg:py-4",
                      isActive
                        ? "border-secondary bg-secondary text-secondary-foreground lg:bg-transparent lg:text-primary"
                        : "border-border bg-card text-foreground/70 hover:border-primary/50 hover:text-primary lg:text-foreground/70"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span className="label-tiny hidden lg:inline">{String(i).padStart(2, "0")}</span>
                      {cat.label}
                    </span>
                    <span
                      className={cn(
                        "hidden h-1.5 w-1.5 rounded-full transition-all duration-300 lg:block",
                        isActive ? "bg-primary" : "bg-transparent group-hover:bg-primary/40"
                      )}
                    />
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Product grid */}
        <main className="flex-1">
          <Suspense fallback={<ProductGridSkeleton count={PAGE_SIZE} />} key={`${activeCategory}-${page}`}>
            <ProductsContent page={page} category={activeCategory} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

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
    <div>
      <p className="label-xs mb-6">
        Showing {result.data.length} of {result.total} products
      </p>

      <ProductGrid products={result.data} />

      {result.totalPages > 1 && (
        <div className="mt-14 flex justify-center border-t border-border pt-10">
          <PaginationControls currentPage={result.page} totalPages={result.totalPages} />
        </div>
      )}
    </div>
  );
}
