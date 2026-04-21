import Link from "next/link";
import { Suspense } from "react";
import { Droplet, Sprout, ShieldCheck, ArrowRight, Flame, Leaf, Star, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ProductGridSkeleton } from "@/components/shop/ProductGridSkeleton";
import { PaginationControls } from "@/components/shop/PaginationControls";
import { productService } from "@/server/services/product.service";
import { cacheTag, cacheLife } from "next/cache";
import { cn } from "@/lib/utils";
import type { Category } from "@/server/types";

const CATEGORIES: { value: string; label: string; icon: React.ElementType; color: string }[] = [
  { value: "", label: "All", icon: Package, color: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300" },
  { value: "COOKING", label: "Cooking", icon: Flame, color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" },
  { value: "PREMIUM", label: "Premium", icon: Star, color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  { value: "ORGANIC", label: "Organic", icon: Leaf, color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
  { value: "INDUSTRIAL", label: "Bulk", icon: Package, color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
];

async function ProductsContent({
  category,
  page,
}: {
  category?: string;
  page: number;
}) {
  "use cache";
  cacheTag("products");
  cacheLife("minutes");

  const result = await productService.getProducts(
    page,
    12,
    category || undefined
  );

  return (
    <>
      <ProductGrid products={result.data} />
      {result.totalPages > 1 && (
        <div className="mt-10">
          <PaginationControls
            currentPage={result.page}
            totalPages={result.totalPages}
          />
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

  return (
    <div className="flex flex-col">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[560px] flex items-center overflow-hidden bg-zinc-950">
        {/* Amber radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-500/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-600/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold tracking-widest uppercase mb-6">
              <Leaf className="h-3 w-3" />
              100% Pure &amp; Cold-Pressed
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05] mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Liquid Gold,<br />
              <span className="text-gradient-amber">Farm to Table.</span>
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed mb-8 max-w-lg">
              Premium, unrefined oils sourced from sustainable Indian farms. No additives, no compromise — just pure nature in every drop.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 px-7 rounded-xl gradient-amber text-white border-0 btn-shine shadow-amber-glow hover:shadow-amber-glow-lg transition-all font-semibold">
                <Link href="#products">Shop Collection</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-7 rounded-xl border-white/15 text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm font-medium">
                <Link href="/about">Our Story <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
              </Button>
            </div>

            {/* Social proof row */}
            <div className="mt-10 flex items-center gap-6 flex-wrap">
              <div>
                <p className="text-2xl font-bold text-white">10k+</p>
                <p className="text-xs text-zinc-500">Happy customers</p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <p className="text-2xl font-bold text-white">50+</p>
                <p className="text-xs text-zinc-500">Premium SKUs</p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-zinc-400">4.9/5</p>
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 rounded-full gradient-amber opacity-20 blur-3xl animate-pulse" />
              <div className="relative flex h-full w-full items-center justify-center">
                <div className="flex h-48 w-48 items-center justify-center rounded-full border border-amber-500/20 bg-amber-500/10 backdrop-blur-xl shadow-amber-glow-lg">
                  <Droplet className="h-24 w-24 text-amber-400/80 fill-amber-500/20" />
                </div>
              </div>
              {/* Orbiting badge */}
              <div className="absolute top-4 right-0 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2.5 text-center shadow-xl">
                <p className="text-xs text-zinc-400">FSSAI Certified</p>
                <p className="text-sm font-bold text-white mt-0.5">✓ Verified</p>
              </div>
              <div className="absolute bottom-8 left-0 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2.5 text-center shadow-xl">
                <p className="text-xs text-zinc-400">Free Delivery</p>
                <p className="text-sm font-bold text-white mt-0.5">Above ₹499</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY OILMART ──────────────────────────────────────── */}
      <section className="py-16 bg-amber-50/60 dark:bg-zinc-950 border-y border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Droplet, title: "First Cold-Pressed", sub: "Extracted at low temperatures to preserve every nutrient, flavor, and aroma." },
              { icon: Sprout, title: "Sustainably Sourced", sub: "Direct partnerships with organic farmers across India — traceable to the farm." },
              { icon: ShieldCheck, title: "Purity Guaranteed", sub: "Zero additives, zero chemicals, zero blends. Just pure oil in every bottle." },
            ].map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex gap-4 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-border/40 shadow-sm hover:shadow-md transition-shadow">
                <div className="shrink-0 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/30">
                  <Icon className="h-5 w-5 text-amber-700 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT LISTING ──────────────────────────────────── */}
      <section id="products" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                {category ? `${activeLabel} Oils` : "Our Collection"}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {category ? `Showing ${activeLabel.toLowerCase()} range` : "All premium, cold-pressed varieties"}
              </p>
            </div>
          </div>

          {/* Category filter pills */}
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
                      ? "gradient-amber text-white shadow-amber-glow"
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
      </section>

      {/* ── BULK / B2B CTA ───────────────────────────────────── */}
      <section className="py-20 bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-amber-500/8 rounded-full blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold tracking-widest uppercase mb-6">
            <Package className="h-3 w-3" />
            Bulk &amp; B2B Orders
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Buying in bulk?<br />
            <span className="text-gradient-amber">We have you covered.</span>
          </h2>
          <p className="text-zinc-400 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Special pricing for restaurants, hotels, and retailers. FSSAI-certified, private-label options available.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg" className="h-12 px-7 rounded-xl gradient-amber text-white border-0 btn-shine shadow-amber-glow font-semibold">
              <Link href="/?category=INDUSTRIAL">View Bulk Products</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-7 rounded-xl border-white/15 text-white bg-white/5 hover:bg-white/10 font-medium">
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}

