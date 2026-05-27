import { notFound } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";
import { cacheLife, cacheTag } from "next/cache";
import type { Metadata } from "next";
import { Droplets, ShieldCheck, Leaf, Truck, Tag, Star, ChevronRight, Share, Heart, CheckCircle2, ShoppingBag } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { productService } from "@/server/services/product.service";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { TrustBadges } from "@/components/shop/TrustBadges";
import { StickyBottomCartCTA } from "@/components/shop/StickyBottomCartCTA";
import { PackSizeSelector } from "@/components/shop/PackSizeSelector";
import { ProductTabs } from "@/components/shop/ProductTabs";
import { RelatedProductsCarousel } from "@/components/shop/RelatedProductsCarousel";

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
    <div className="bg-background pb-20 pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center text-xs font-semibold text-muted-foreground mb-8">
          <a href="/" className="hover:text-primary transition-colors">Home</a>
          <ChevronRight className="h-3 w-3 mx-2 opacity-50" />
          <a href="/products" className="hover:text-primary transition-colors">Shop</a>
          <ChevronRight className="h-3 w-3 mx-2 opacity-50" />
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

  // Fetch related products (using same category or just random for now)
  const relatedResult = await productService.getProducts(1, 8, product.category);
  const relatedProducts = relatedResult.data.filter((p) => p.id !== product.id);

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 10;

  return (
    <>
      <div className="grid gap-10 lg:gap-16 lg:grid-cols-2 mb-20 relative">
        {/* LEFT: Image Gallery */}
        <div className="flex flex-col gap-4 lg:sticky lg:top-28 h-max">
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-card border border-border/50 group cursor-zoom-in shadow-sm">
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
              <div className="flex h-full items-center justify-center bg-zinc-50 dark:bg-zinc-900">
                <Droplets className="h-32 w-32 text-muted" />
              </div>
            )}
            
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button className="w-10 h-10 rounded-full bg-white dark:bg-black border border-border/50 shadow-sm flex items-center justify-center text-muted-foreground hover:text-red-500 hover:border-red-500/50 transition-colors">
                <Heart className="h-5 w-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white dark:bg-black border border-border/50 shadow-sm flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors">
                <Share className="h-5 w-5" />
              </button>
            </div>
            
            {isOutOfStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                <span className="rounded-full bg-background px-6 py-2 tracking-widest text-sm font-bold text-foreground shadow-xl uppercase border border-border">
                  Out of Stock
                </span>
              </div>
            )}
            
            {!isOutOfStock && isLowStock && (
              <div className="absolute bottom-4 left-4">
                 <Badge variant="destructive" className="bg-red-500 text-white border-0 uppercase tracking-widest text-[10px] px-2.5 py-1">
                   Only {product.stock} left
                 </Badge>
              </div>
            )}
          </div>
          
          {/* Thumbnails */}
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
            {[1,2,3,4].map((i) => (
              <div key={i} className={`relative w-20 h-20 rounded-xl bg-card border flex-shrink-0 cursor-pointer transition-colors ${i === 1 ? 'border-primary ring-2 ring-primary/20' : 'border-border/50 hover:border-primary/50'}`}>
                {product.image && (
                   <Image src={product.image} alt={product.name} fill className="object-contain p-2 mix-blend-multiply dark:mix-blend-normal" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Product Info */}
        <div className="flex flex-col">
          <Badge className="w-fit mb-4 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 font-bold tracking-wider uppercase text-[10px] px-3 py-1 rounded-md">
            {product.category}
          </Badge>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] mb-4 text-foreground">
            {product.name}
          </h1>
          
          {/* Rating */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(i => (
                 <Star key={i} className={`h-4 w-4 ${i === 5 ? 'fill-muted text-muted' : 'fill-amber-500 text-amber-500'}`}/>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
               <span className="text-foreground">4.8</span>
               <span>(128 Reviews)</span>
            </div>
          </div>

          <div className="flex items-end gap-3 mb-2">
            <span className="text-4xl font-extrabold text-foreground">
              ₹{product.price.toString()}
            </span>
            <span className="text-lg font-bold text-muted-foreground line-through decoration-muted-foreground/50 mb-1">
              ₹{(Number(product.price) * 1.25).toFixed(2)}
            </span>
            <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-950/30 px-2 py-1 rounded-md mb-1 ml-2">
              Save 20%
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-8 font-medium">inclusive of all taxes</p>

          <Separator className="mb-8 opacity-50" />
          
          {/* Variants / Pack sizes */}
          <div className="mb-8">
            <div className="flex justify-between items-end mb-4">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Select Size</h3>
              <a href="#" className="text-xs font-semibold text-primary hover:underline">Size Guide</a>
            </div>
            <PackSizeSelector />
          </div>

          <div className="flex gap-4 mb-10">
            <AddToCartButton product={product} disabled={isOutOfStock} />
            <button className="flex-1 bg-foreground text-background font-bold text-sm rounded-xl hover:bg-foreground/90 transition-colors shadow-md">
              Buy Now
            </button>
          </div>
          
          <TrustBadges />

          <div className="mt-10 space-y-4">
             <div className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50 shadow-sm">
               <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                 <Truck className="h-5 w-5 text-primary" />
               </div>
               <div>
                  <h4 className="font-bold text-sm text-foreground">Free Express Delivery</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Order within 2 hours to get it by tomorrow.</p>
               </div>
             </div>
             
             <div className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50 shadow-sm">
               <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                 <ShieldCheck className="h-5 w-5 text-primary" />
               </div>
               <div>
                  <h4 className="font-bold text-sm text-foreground">100% Secure Payment</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Your payment information is safe with us.</p>
               </div>
             </div>
          </div>

        </div>
      </div>
      
      <ProductTabs
        productId={product.id}
        productName={product.name}
        description={
          <div className="max-w-3xl space-y-6 text-muted-foreground leading-relaxed text-sm font-medium">
             {product.description ? (
               <div className="whitespace-pre-line leading-relaxed text-base text-foreground/80 font-medium">
                 {product.description}
               </div>
             ) : (
               <>
                 <p className="text-base text-foreground/80">
                   Experience the pinnacle of culinary excellence with our premium {product.name.toLowerCase()}. 
                   Sourced directly from sustainable Indian village farms, this extraordinary oil is carefully wood-pressed within hours of harvest to preserve its robust flavor profile, rich aroma, and dense nutritional benefits.
                 </p>
                 <p className="text-base text-foreground/80">
                   With its vibrant golden hue and remarkably smooth finish, it serves as the perfect foundational ingredient for your gourmet dishes.
                 </p>
               </>
             )}
            
            <div className="grid grid-cols-2 gap-6 my-10">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-card border border-border/50 shadow-sm">
                <Image src="/site_assets/lifestyle_pouring.png" alt="Pouring oil" fill className="object-cover" />
              </div>
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-card border border-border/50 shadow-sm">
                <Image src="/site_assets/lifestyle_kitchen_shelf.png" alt="Kitchen lifestyle" fill className="object-cover" />
              </div>
            </div>
            
            <ul className="grid sm:grid-cols-2 gap-4 text-foreground font-semibold">
              <li className="flex items-center gap-3 p-4 bg-card rounded-2xl border border-border/50 shadow-sm"><CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" /> No Heat Extraction</li>
              <li className="flex items-center gap-3 p-4 bg-card rounded-2xl border border-border/50 shadow-sm"><CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" /> Zero Chemicals</li>
              <li className="flex items-center gap-3 p-4 bg-card rounded-2xl border border-border/50 shadow-sm"><CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" /> UV Protected Glass</li>
              <li className="flex items-center gap-3 p-4 bg-card rounded-2xl border border-border/50 shadow-sm"><CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" /> Farm Sourced</li>
            </ul>
         </div>
        }
      />

      <Separator className="my-16 opacity-50" />
      
      <RelatedProductsCarousel products={relatedProducts} />
      
      <StickyBottomCartCTA product={product} />
    </>
  );
}

async function getCachedProduct(id: string) {
  return productService.getProductById(id);
}

function ProductDetailSkeleton() {
  return (
    <div className="grid gap-10 lg:gap-16 lg:grid-cols-2">
      <Skeleton className="aspect-square w-full rounded-3xl" />
      <div className="flex flex-col pt-2">
        <Skeleton className="h-6 w-24 rounded-md mb-4" />
        <Skeleton className="h-12 w-3/4 mb-6" />
        <Skeleton className="h-8 w-1/3 mb-8" />
        <Skeleton className="h-20 w-full mt-4 rounded-xl" />
        <Skeleton className="h-14 w-full mt-8 rounded-xl" />
        <div className="flex gap-4 mt-8">
          <Skeleton className="h-14 w-full rounded-xl" />
          <Skeleton className="h-14 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
