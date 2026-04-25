import { ShopNavbar } from "@/components/shop/ShopNavbar";
import { MobileBottomNav } from "@/components/shop/MobileBottomNav";
import Link from "next/link";
import { Droplets, Share2, MessageSquare, PlaySquare, ShieldCheck, Truck, Leaf, Award } from "lucide-react";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-amber-500/30 selection:text-amber-900 pb-16 md:pb-0">
      <ShopNavbar />

      <main className="flex-1 pt-16">{children}</main>

      {/* Trust bar */}
      <div className="border-t border-border/40 bg-amber-50/60 dark:bg-amber-950/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: "Free Delivery", sub: "Orders above ₹499" },
              { icon: ShieldCheck, title: "100% Authentic", sub: "FSSAI certified" },
              { icon: Leaf, title: "Pure & Natural", sub: "No additives" },
              { icon: Award, title: "Premium Quality", sub: "Cold-pressed oils" },
            ].map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800">
                  <Icon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground uppercase tracking-wider">{title}</p>
                  <p className="text-xs font-semibold text-muted-foreground mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-zinc-950 dark:bg-zinc-950 text-zinc-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

            {/* Brand column */}
            <div className="md:col-span-4">
              <Link href="/" className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-600 text-white shadow-amber-glow">
                  <Droplets className="h-5 w-5 fill-white/30" />
                </div>
                <span className="font-serif text-xl font-bold tracking-tight text-white uppercase leading-tight">
                  Shri Sameya <span className="text-amber-500">Village</span>
                </span>
              </Link>
              <p className="text-sm font-medium leading-relaxed text-zinc-400 mb-8 max-w-sm">
                Pure Taste of Tradition. Premium wood pressed oils from sustainable Indian farms. Pure. Natural. Traceable.
              </p>
              <div className="flex items-center gap-3">
                {[Share2, MessageSquare, PlaySquare].map((Icon, i) => (
                  <Link key={i} href="#" className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 hover:bg-amber-500 hover:text-white transition-colors">
                    <Icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Shop */}
            <div className="md:col-span-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-5">Shop</h4>
              <ul className="space-y-4">
                {[
                  { label: "All Products", href: "/" },
                  { label: "Cooking Oils", href: "/?category=COOKING" },
                  { label: "Premium", href: "/?category=PREMIUM" },
                  { label: "Organic", href: "/?category=ORGANIC" },
                  { label: "Bulk / Industrial", href: "/?category=INDUSTRIAL" },
                ].map(({ label, href }) => (
                  <li key={href}><Link href={href} className="text-sm font-semibold hover:text-amber-500 transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Account */}
            <div className="md:col-span-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-5">Account</h4>
              <ul className="space-y-4">
                {[
                  { label: "My Orders", href: "/orders" },
                  { label: "Cart", href: "/cart" },
                  { label: "Sign in", href: "/login" },
                  { label: "Register", href: "/register" },
                ].map(({ label, href }) => (
                  <li key={href}><Link href={href} className="text-sm font-semibold hover:text-amber-500 transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="md:col-span-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-5">Company</h4>
              <ul className="space-y-4">
                {[
                  { label: "About Us", href: "/about" },
                  { label: "Contact", href: "/contact" },
                  { label: "FAQ", href: "/faq" },
                ].map(({ label, href }) => (
                  <li key={href}><Link href={href} className="text-sm font-semibold hover:text-amber-500 transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="md:col-span-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-5">Newsletter</h4>
              <p className="text-sm font-medium text-zinc-400 mb-4 leading-relaxed">Deals, recipes & wellness tips.</p>
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm font-semibold text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
                />
                <button className="w-full rounded-xl bg-amber-600 hover:bg-amber-700 py-3 text-sm font-bold text-white transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">© 2026 Shri Sameya Village. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-6 text-xs font-bold text-zinc-500 uppercase tracking-wider">
              <Link href="/privacy" className="hover:text-zinc-300 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-zinc-300 transition-colors">Terms</Link>
              <span className="text-zinc-600">FSSAI Lic. 12345678901234</span>
            </div>
          </div>
        </div>
      </footer>
      
      <MobileBottomNav />
    </div>
  );
}
