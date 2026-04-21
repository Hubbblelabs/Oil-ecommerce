import { Suspense } from "react";
import { cacheLife, cacheTag } from "next/cache";
import type { Metadata } from "next";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ProductGridSkeleton } from "@/components/shop/ProductGridSkeleton";
import { PaginationControls } from "@/components/shop/PaginationControls";
import { productService } from "@/server/services/product.service";
import { Filter, SlidersHorizontal, ArrowDownAZ } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse our curated collection of premium cold-pressed, extra virgin, and specialty oils.",
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Premium Toolbar */}
      <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border/60 pb-6 pt-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
             {activeCategory ? CATEGORIES.find(c => c.value === activeCategory)?.label || activeCategory : "All Products"}
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
             Explore our selection of the finest natural oils.
          </p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
          <Button variant="outline" size="sm" className="rounded-full shadow-sm whitespace-nowrap">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm" className="rounded-full shadow-sm whitespace-nowrap">
            <ArrowDownAZ className="w-4 h-4 mr-2" />
            Sort by: Featured
          </Button>
          <Button variant="outline" size="icon" className="rounded-full shadow-sm hidden sm:inline-flex">
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Sidebar Filters */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-8 glass-panel p-6 rounded-2xl">
            {/* Category Filter */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Categories</h3>
              <ul className="space-y-3">
                {CATEGORIES.map((cat) => {
                  const isActive = cat.value === "All" ? !activeCategory : activeCategory === cat.value;
                  const href = cat.value === "All" ? "/products?page=1" : `/products?category=${encodeURIComponent(cat.value)}&page=1`;
                  
                  return (
                    <li key={cat.value}>
                      <a
                        href={href}
                        className={`text-sm flex items-center transition-colors ${
                          isActive 
                            ? "font-semibold text-amber-600" 
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full mr-2 ${isActive ? "bg-amber-600" : "bg-transparent"}`} />
                        {cat.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            
            <div className="border-t border-border/40 pt-6">
              <h3 className="font-semibold text-foreground mb-4">Price Range</h3>
              <div className="space-y-4">
                <input type="range" className="w-full accent-amber-500" />
                <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
                  <span>$0</span>
                  <span>$250+</span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-border/40 pt-6">
               <h3 className="font-semibold text-foreground mb-4">Rating</h3>
               {/* Mock Rating Filters */}
               <ul className="space-y-3">
                  {[4, 3, 2, 1].map((rating) => (
                    <li key={rating} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                      <input type="checkbox" className="rounded accent-amber-500 border-border" />
                      <div className="flex text-amber-400">
                        {Array.from({length: 5}).map((_, i) => (
                          <span key={i} className={i < rating ? "text-amber-500" : "text-border"}>★</span>
                        ))}
                      </div>
                      <span className="text-xs">& up</span>
                    </li>
                  ))}
               </ul>
            </div>
          </div>
        </aside>

        {/* Main Product Area */}
        <main className="flex-1">
          <Suspense fallback={<ProductGridSkeleton count={PAGE_SIZE} />}>
            <ProductsContent page={page} category={activeCategory} />
          </Suspense>
        </main>
      </div>
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
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-muted-foreground">
          Showing <strong className="text-foreground">{result.data.length}</strong> of <strong className="text-foreground">{result.total}</strong> products
        </p>
      </div>

      <ProductGrid products={result.data} />

      {result.totalPages > 1 && (
        <div className="mt-12 flex justify-center border-t border-border/40 pt-8">
          <PaginationControls
            currentPage={result.page}
            totalPages={result.totalPages}
          />
        </div>
      )}
    </div>
  );
}
