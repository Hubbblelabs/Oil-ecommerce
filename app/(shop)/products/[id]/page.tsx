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
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

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
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="flex items-center text-sm font-medium text-muted-foreground mb-8">
          <a href="/" className="hover:text-foreground transition-colors">Home</a>
          <ChevronRight className="h-4 w-4 mx-2 opacity-50" />
          <a href="/products" className="hover:text-foreground transition-colors">Shop</a>
          <ChevronRight className="h-4 w-4 mx-2 opacity-50" />
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
      <div className="grid gap-12 lg:grid-cols-2 mb-20 relative">
        {/* LEFT: Image Gallery */}
        <div className="space-y-4 lg:sticky lg:top-24 h-max">
          <div className="relative aspect-[4/5] sm:aspect-square overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-border/40 group cursor-zoom-in">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/20 dark:to-amber-900/10">
                <Droplets className="h-32 w-32 text-amber-500/20" />
              </div>
            )}
            
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button className="w-10 h-10 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-md flex items-center justify-center text-foreground hover:bg-white dark:hover:bg-black transition-colors shadow-sm">
                <Heart className="h-5 w-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-md flex items-center justify-center text-foreground hover:bg-white dark:hover:bg-black transition-colors shadow-sm">
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
                 <Badge variant="destructive" className="bg-red-500/90 text-white backdrop-blur-md border-0 uppercase tracking-widest text-xs px-3 py-1">
                   Only {product.stock} left
                 </Badge>
              </div>
            )}
          </div>
          
          {/* Thumbnails placeholder */}
          <div className="grid grid-cols-4 gap-4">
            {[1,2,3,4].map(i => (
              <div key={i} className={`aspect-square rounded-xl bg-muted overflow-hidden border-2 cursor-pointer transition-colors ${i === 1 ? 'border-amber-500' : 'border-transparent hover:border-amber-500/50'}`}>
                {/* Mock thumbnails */}
                 {product.image ? (
                   <div className="w-full h-full relative opacity-60 hover:opacity-100 transition-opacity">
                      <Image src={product.image} alt={product.name} fill className="object-cover" />
                   </div>
                 ) : (
                   <div className="w-full h-full bg-amber-50 dark:bg-amber-950 flex items-center justify-center">
                     <Droplets className="w-6 h-6 text-amber-400 opacity-50" />
                   </div>
                 )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Product Info */}
        <div className="flex flex-col pt-4 lg:pt-8">
          <Badge className="w-fit mb-4 bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 font-semibold tracking-wider uppercase text-xs px-3 py-1 border-0">
            {product.category}
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-4 text-foreground">
            {product.name}
          </h1>
          
          {/* Rating */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex text-amber-500">
               <Star className="h-5 w-5 fill-amber-500"/>
               <Star className="h-5 w-5 fill-amber-500"/>
               <Star className="h-5 w-5 fill-amber-500"/>
               <Star className="h-5 w-5 fill-amber-500"/>
               <Star className="h-5 w-5 fill-amber-500 opacity-40"/>
            </div>
            <span className="text-sm font-medium text-muted-foreground underline decoration-border hover:decoration-foreground cursor-pointer transition-colors">
              (128 Reviews)
            </span>
          </div>

          <div className="text-3xl font-bold text-foreground mb-8">
            ₹{product.price.toString()}
            <span className="text-sm font-normal text-muted-foreground ml-2">incl. taxes</span>
          </div>

          <Separator className="my-2" />
          
          {/* Benefits chips */}
          <div className="flex flex-wrap gap-2 my-6">
            <span className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2 text-xs font-semibold text-foreground border border-border/50">
              <Leaf className="h-4 w-4 text-green-500" /> All Natural
            </span>
            <span className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2 text-xs font-semibold text-foreground border border-border/50">
              <Droplets className="h-4 w-4 text-blue-500" /> First Cold Pressed
            </span>
            <span className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2 text-xs font-semibold text-foreground border border-border/50">
              <ShieldCheck className="h-4 w-4 text-amber-500" /> Quality Tested
            </span>
          </div>
          
          {/* Quantity Selector - visual representation only for now in Next.js Server Component */}
          <div className="flex flex-col gap-3 my-4">
             <span className="text-sm font-semibold text-foreground">Quantity</span>
             <div className="flex items-center w-36 h-12 bg-background border border-border rounded-xl">
               <button className="w-10 h-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors text-xl font-light">-</button>
               <input type="text" value="1" readOnly className="w-full h-full bg-transparent text-center font-semibold text-foreground focus:outline-none" />
               <button className="w-10 h-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors text-xl font-light">+</button>
             </div>
          </div>

          <AddToCartButton product={product} disabled={isOutOfStock} />
          
          <div className="mt-8 space-y-4">
             <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 border border-border/50">
               <Truck className="h-6 w-6 text-foreground mt-0.5" />
               <div>
                  <h4 className="font-semibold text-sm">Free Express Delivery</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1">Get it between <strong className="text-foreground">Tomorrow</strong> and <strong className="text-foreground">Friday</strong> with premium shipping.</p>
               </div>
             </div>
             
             <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 border border-border/50">
               <Tag className="h-6 w-6 text-foreground mt-0.5" />
               <div>
                  <h4 className="font-semibold text-sm">Seller Information</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1">Sold by <strong className="text-foreground">OilMart Naturals</strong> (Verified Brand)</p>
               </div>
             </div>
          </div>

        </div>
      </div>
      
      {/* TABS SECTION */}
      <div className="border-t border-border/60 pt-16">
         <div className="flex items-center space-x-8 border-b border-border mb-8 overflow-x-auto no-scrollbar">
            <button className="pb-4 font-bold text-amber-600 border-b-2 border-amber-600 text-lg whitespace-nowrap">Description</button>
            <button className="pb-4 font-medium text-muted-foreground hover:text-foreground transition-colors text-lg whitespace-nowrap">Nutrition Details</button>
            <button className="pb-4 font-medium text-muted-foreground hover:text-foreground transition-colors text-lg whitespace-nowrap">Reviews (128)</button>
            <button className="pb-4 font-medium text-muted-foreground hover:text-foreground transition-colors text-lg whitespace-nowrap">Shipping & Returns</button>
         </div>
         
         <div className="max-w-3xl space-y-6 text-muted-foreground leading-relaxed text-lg font-light">
            <p>
              Experience the pinnacle of culinary excellence with our premium {product.name.toLowerCase()}. 
              Sourced directly from sustainable artisanal farms, this extraordinary oil is carefully cold-pressed within hours of harvest to preserve its robust flavor profile, rich aroma, and dense nutritional benefits.
            </p>
            <p>
              With its vibrant golden hue and remarkably smooth finish, it serves as the perfect foundational ingredient for your gourmet dishes. Whether drizzled over fresh greens, used as a luxurious dipping oil, or seamlessly incorporated into your daily wellness routine, you'll taste the unmistakable purity in every drop.
            </p>
            <ul className="space-y-4 pt-4 text-foreground font-normal">
              <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-amber-500" /> Extracted without heat or harsh chemicals.</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-amber-500" /> Naturally rich in antioxidants and healthy fats.</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-amber-500" /> Packaged in protective, dark-tinted UV glass.</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-amber-500" /> Verified organically grown.</li>
            </ul>
         </div>
      </div>
    </>
  );
}

async function getCachedProduct(id: string) {
  return productService.getProductById(id);
}

function ProductDetailSkeleton() {
  return (
    <div className="grid gap-12 lg:grid-cols-2">
      <Skeleton className="aspect-square w-full rounded-3xl" />
      <div className="flex flex-col gap-6 pt-4 lg:pt-8 py-2">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-10 w-32 mt-4" />
        <Skeleton className="h-px w-full my-4" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-28 rounded-lg" />
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>
        <Skeleton className="h-14 w-full mt-6 rounded-xl" />
        <Skeleton className="h-14 w-full rounded-xl" />
        <Skeleton className="h-24 w-full mt-4 rounded-xl" />
      </div>
    </div>
  );
}
