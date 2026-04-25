import { notFound } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";
import { cacheLife, cacheTag } from "next/cache";
import type { Metadata } from "next";
import { Droplets, ShieldCheck, Leaf, Truck, Tag, Star, ChevronRight, Share, Heart, CheckCircle2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { productService } from "@/server/services/product.service";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { TrustBadges } from "@/components/shop/TrustBadges";
import { StickyBottomCartCTA } from "@/components/shop/StickyBottomCartCTA";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getCachedProduct(id);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: '',
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="bg-background pb-20">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <nav className="flex items-center text-xs font-medium text-muted-foreground mb-6">
          <a href="/" className="hover:text-foreground transition-colors">Home</a>
          <ChevronRight className="h-3 w-3 mx-1 opacity-50" />
          <a href="/products" className="hover:text-foreground transition-colors">Shop</a>
          <ChevronRight className="h-3 w-3 mx-1 opacity-50" />
          <span className="text-foreground truncate max-w-[200px]">Product Details</span>
        </nav>
        
        <Suspense fallback={<ProductDetailSkeleton />}>
          <ProductDetail id={id} />
        </Suspense>
      </div>
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
    <>
      <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 mb-16 relative">
        {/* LEFT: Image Gallery */}
        <div className="space-y-4 lg:sticky lg:top-24 h-max">
          <div className="relative aspect-[4/5] sm:aspect-square overflow-hidden rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-border/40 group cursor-zoom-in">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-8 mix-blend-multiply dark:mix-blend-normal transition-transform duration-700 ease-out group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/20 dark:to-amber-900/10">
                <Droplets className="h-32 w-32 text-amber-500/20" />
              </div>
            )}
            
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button className="w-10 h-10 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-md flex items-center justify-center text-foreground hover:text-red-500 transition-colors shadow-sm border border-border/50">
                <Heart className="h-5 w-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-md flex items-center justify-center text-foreground hover:text-amber-600 transition-colors shadow-sm border border-border/50">
                <Share className="h-5 w-5" />
              </button>
            </div>
            
            {isOutOfStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                <span className="rounded-full bg-background px-6 py-2 tracking-widest text-sm font-bold text-foreground shadow-xl uppercase">
                  Out of Stock
                </span>
              </div>
            )}
            
            {!isOutOfStock && isLowStock && (
              <div className="absolute bottom-4 left-4">
                 <Badge variant="destructive" className="bg-red-500/90 text-white backdrop-blur-md border-0 uppercase tracking-widest text-[10px] px-2 py-1">
                   Only {product.stock} left
                 </Badge>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Product Info */}
        <div className="flex flex-col lg:pt-2">
          {/* Time to deliver mockup */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wider">
              Delivery in 12 MINS
            </span>
          </div>

          <Badge className="w-fit mb-3 bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 font-bold tracking-wider uppercase text-[10px] px-2.5 py-0.5 border-0 rounded">
            {product.category}
          </Badge>
          
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-[1.1] mb-3 text-foreground">
            {product.name}
          </h1>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-amber-500 bg-amber-50 dark:bg-amber-950/30 px-2 py-0.5 rounded-full items-center">
               <span className="font-bold text-xs mr-1 text-amber-700 dark:text-amber-400">4.9</span>
               <Star className="h-3.5 w-3.5 fill-amber-500"/>
            </div>
            <span className="text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
              128 Ratings
            </span>
          </div>

          <div className="text-3xl font-extrabold text-foreground mb-1">
            ₹{product.price.toString()}
            <span className="text-sm font-semibold text-muted-foreground ml-2 line-through decoration-muted-foreground/50">
              ₹{(Number(product.price) * 1.25).toFixed(2)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-6 font-medium">inclusive of all taxes</p>

          <Separator className="my-2 opacity-50" />
          
          {/* Variants / Pack sizes */}
          <div className="my-6">
            <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wider">Pack Size</h3>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 rounded-xl border-2 border-amber-600 bg-amber-50 dark:bg-amber-900/10 text-amber-700 dark:text-amber-400 font-bold text-sm">
                1 Litre
              </button>
              <button className="px-4 py-2 rounded-xl border-2 border-border bg-background text-foreground font-semibold text-sm hover:border-amber-600/50 transition-colors">
                5 Litres
              </button>
              <button className="px-4 py-2 rounded-xl border-2 border-border bg-background text-foreground font-semibold text-sm hover:border-amber-600/50 transition-colors">
                15 Litres
              </button>
            </div>
          </div>

          <TrustBadges />

          <AddToCartButton product={product} disabled={isOutOfStock} />
          
          <div className="mt-8 space-y-3">
             <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-border/50 shadow-sm">
               <Truck className="h-5 w-5 text-zinc-700 dark:text-zinc-300 shrink-0" />
               <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-foreground">Free Delivery</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-1 font-medium">Get it between <strong className="text-foreground">Tomorrow</strong> and <strong className="text-foreground">Friday</strong> with premium shipping.</p>
               </div>
             </div>
             
             <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-border/50 shadow-sm">
               <Tag className="h-5 w-5 text-zinc-700 dark:text-zinc-300 shrink-0" />
               <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-foreground">Seller Information</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-1 font-medium">Sold by <strong className="text-foreground">Shri Sameya Village</strong> (Verified Brand)</p>
               </div>
             </div>
          </div>

        </div>
      </div>
      
      {/* TABS SECTION */}
      <div className="border-t border-border/60 pt-10">
         <div className="flex items-center space-x-6 border-b border-border/50 mb-6 overflow-x-auto no-scrollbar pb-1">
            <button className="pb-3 font-bold text-amber-600 border-b-2 border-amber-600 text-sm uppercase tracking-wider whitespace-nowrap">Description</button>
            <button className="pb-3 font-semibold text-muted-foreground hover:text-foreground transition-colors text-sm uppercase tracking-wider whitespace-nowrap">Nutrition Details</button>
            <button className="pb-3 font-semibold text-muted-foreground hover:text-foreground transition-colors text-sm uppercase tracking-wider whitespace-nowrap">Reviews (128)</button>
            <button className="pb-3 font-semibold text-muted-foreground hover:text-foreground transition-colors text-sm uppercase tracking-wider whitespace-nowrap">Shipping</button>
         </div>
         
         <div className="max-w-3xl space-y-4 text-muted-foreground leading-relaxed text-sm font-medium">
            <p>
              Experience the pinnacle of culinary excellence with our premium {product.name.toLowerCase()}. 
              Sourced directly from sustainable Indian village farms, this extraordinary oil is carefully wood-pressed within hours of harvest to preserve its robust flavor profile, rich aroma, and dense nutritional benefits.
            </p>
            <p>
              With its vibrant golden hue and remarkably smooth finish, it serves as the perfect foundational ingredient for your gourmet dishes. Whether drizzled over fresh greens, used as a luxurious dipping oil, or seamlessly incorporated into your daily wellness routine, you'll taste the unmistakable purity in every drop.
            </p>
            
            <div className="grid grid-cols-2 gap-4 my-8">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-100">
                <Image src="/site_assets/lifestyle_pouring.png" alt="Pouring oil" fill className="object-cover" />
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-100">
                <Image src="/site_assets/lifestyle_kitchen_shelf.png" alt="Kitchen lifestyle" fill className="object-cover" />
              </div>
            </div>
            
            <ul className="space-y-3 pt-3 text-foreground font-semibold bg-zinc-50 dark:bg-zinc-900 p-5 rounded-2xl mt-4">
              <li className="flex items-start gap-3"><CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" /> Extracted without heat or harsh chemicals.</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" /> Naturally rich in antioxidants and healthy fats.</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" /> Packaged in protective, dark-tinted UV glass.</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" /> Verified organically grown.</li>
            </ul>
         </div>
      </div>
      
      <StickyBottomCartCTA product={product} />
    </>
  );
}

async function getCachedProduct(id: string) {
  return productService.getProductById(id);
}

function ProductDetailSkeleton() {
  return (
    <div className="grid gap-8 lg:gap-12 lg:grid-cols-2">
      <Skeleton className="aspect-[4/5] sm:aspect-square w-full rounded-3xl" />
      <div className="flex flex-col gap-4 pt-2">
        <Skeleton className="h-4 w-32 rounded-full mb-2" />
        <Skeleton className="h-10 w-3/4 mb-4" />
        <Skeleton className="h-8 w-1/3 mb-4" />
        <Skeleton className="h-12 w-full mt-4" />
        <Skeleton className="h-24 w-full mt-4 rounded-xl" />
        <Skeleton className="h-14 w-full mt-4 rounded-xl" />
        <Skeleton className="h-14 w-full mt-2 rounded-xl" />
      </div>
    </div>
  );
}
