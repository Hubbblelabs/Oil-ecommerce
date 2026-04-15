import { notFound } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";
import { cacheLife, cacheTag } from "next/cache";
import type { Metadata } from "next";
import { Droplets, Tag, Package, Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { productService } from "@/server/services/product.service";
import { AddToCartButton } from "@/components/shop/AddToCartButton";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Generate metadata server-side from cached product data
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getCachedProduct(id);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetail id={id} />
      </Suspense>
    </div>
  );
}

async function ProductDetail({ id }: { id: string }) {
  "use cache";
  cacheLife("hours");
  cacheTag(`product-${id}`, "products");

  const product = await getCachedProduct(id);
  if (!product) notFound();

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 10;

  return (
    <div className="grid gap-10 md:grid-cols-2">
      {/* Image panel */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/60 dark:from-amber-950/20 dark:to-amber-900/10">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Droplets className="h-28 w-28 text-amber-300/60" />
          </div>
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <span className="rounded-full bg-white/90 px-6 py-2 text-lg font-bold text-gray-800">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Info panel */}
      <div className="flex flex-col gap-5">
        <div>
          <Badge className="mb-3 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
            {product.category}
          </Badge>
          <h1 className="text-3xl font-extrabold leading-tight">{product.name}</h1>
          <p className="mt-1 text-muted-foreground">{product.unit}</p>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-extrabold text-amber-600">
            ${product.price.toString()}
          </span>
          <span className="text-sm text-muted-foreground">/ {product.unit}</span>
        </div>

        {/* Stock indicator */}
        <div className="flex items-center gap-2 text-sm">
          <Package className="h-4 w-4 text-muted-foreground" />
          {isOutOfStock ? (
            <span className="text-destructive font-medium">Out of stock</span>
          ) : isLowStock ? (
            <span className="text-yellow-600 font-medium">
              Only {product.stock} left — order soon
            </span>
          ) : (
            <span className="text-green-600 font-medium">
              In stock ({product.stock} available)
            </span>
          )}
        </div>

        <Separator />

        <p className="leading-relaxed text-muted-foreground">{product.description}</p>

        {/* Quality badges */}
        <div className="flex flex-wrap gap-2">
          {["Cold-Pressed", "Natural", "No Additives"].map((badge) => (
            <span
              key={badge}
              className="flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800 dark:border-amber-800/30 dark:bg-amber-900/20 dark:text-amber-300"
            >
              <Star className="h-3 w-3" />
              {badge}
            </span>
          ))}
          <span className="flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800 dark:border-amber-800/30 dark:bg-amber-900/20 dark:text-amber-300">
            <Tag className="h-3 w-3" />
            {product.category}
          </span>
        </div>

        <Separator />

        {/* Add to cart — client component island */}
        <AddToCartButton product={product} disabled={isOutOfStock} />
      </div>
    </div>
  );
}

// Extract to helper function so it can be shared between page and generateMetadata
async function getCachedProduct(id: string) {
  return productService.getProductById(id);
}

function ProductDetailSkeleton() {
  return (
    <div className="grid gap-10 md:grid-cols-2">
      <Skeleton className="aspect-square w-full rounded-2xl" />
      <div className="flex flex-col gap-5">
        <div className="space-y-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-9 w-3/4" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-px w-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
    </div>
  );
}
