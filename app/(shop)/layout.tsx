import { ShopNavbar } from "@/components/shop/ShopNavbar";
import Link from "next/link";
import { Droplets, MessageCircle, Share2, Compass } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col selection:bg-amber-500/30 selection:text-amber-900 dark:selection:text-amber-100">
      <ShopNavbar />
      
      <main className="flex-1 pt-16">{children}</main>
      
      <footer className="mt-32 w-full border-t border-border/40 bg-zinc-50 dark:bg-zinc-950 px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-amber text-white">
                  <Droplets className="h-4 w-4 fill-white/20" />
                </div>
                <span className="text-xl font-bold tracking-tight text-foreground">
                  OilMart
                </span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Experience nature's purest essence. Premium, cold-pressed oils delivered directly from sustainable farms to your kitchen.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <Link href="#" className="text-muted-foreground hover:text-amber-600 transition-colors">
                  <Compass className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-amber-600 transition-colors">
                  <MessageCircle className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-amber-600 transition-colors">
                  <Share2 className="h-5 w-5" />
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Shop</h3>
              <ul className="space-y-3">
                <li><Link href="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">All Products</Link></li>
                <li><Link href="/products?category=cold-pressed" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cold Pressed</Link></li>
                <li><Link href="/products?category=essential" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Essential Oils</Link></li>
                <li><Link href="/products?category=cooking" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cooking Oils</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
                <li><Link href="/sustainability" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sustainability</Link></li>
                <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
                <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Subscribe</h3>
              <p className="text-sm text-muted-foreground mb-4">Stay updated with our latest offers and natural wellness tips.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="w-full bg-background border border-border/50 rounded-l-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <button className="bg-foreground text-background px-4 py-2 rounded-r-lg text-sm font-medium hover:bg-foreground/90 transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              © 2026 OilMart. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
