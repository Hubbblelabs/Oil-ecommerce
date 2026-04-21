import { ShopNavbar } from "@/components/shop/ShopNavbar";
import Link from "next/link";
import { Droplets, Share2, MessageSquare, PlaySquare, ShieldCheck, Truck, Leaf, Award } from "lucide-react";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-amber-500/30 selection:text-amber-900">
      <ShopNavbar />

      <main className="flex-1 pt-16">{children}</main>

      {/* Trust bar */}
      <div className="border-t border-border/40 bg-amber-50/60 dark:bg-amber-950/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, title: "Free Delivery", sub: "Orders above ₹499" },
              { icon: ShieldCheck, title: "100% Authentic", sub: "FSSAI certified" },
              { icon: Leaf, title: "Pure & Natural", sub: "No additives" },
              { icon: Award, title: "Premium Quality", sub: "Cold-pressed oils" },
            ].map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/30">
                  <Icon className="h-4.5 w-4.5 text-amber-700 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{title}</p>
                  <p className="text-xs text-muted-foreground">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-zinc-950 dark:bg-zinc-950 text-zinc-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

            {/* Brand column */}
            <div className="md:col-span-4">
              <Link href="/" className="flex items-center gap-2.5 mb-5">
                <div className="flex h-8 w-8 items-center justify-center rounded-[10px] gradient-amber text-white shadow-amber-glow">
                  <Droplets className="h-4 w-4 fill-white/30" />
                </div>
                <span className="text-[17px] font-bold tracking-tight text-white">
                  Oil<span className="text-amber-400">Mart</span>
                </span>
              </Link>
              <p className="text-sm leading-relaxed text-zinc-500 mb-6 max-w-xs">
                Premium, cold-pressed oils from sustainable Indian farms. Pure. Natural. Traceable.
              </p>
              <div className="flex items-center gap-3">
                {[Share2, MessageSquare, PlaySquare].map((Icon, i) => (
                  <Link key={i} href="#" className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 hover:bg-amber-500/20 hover:text-amber-400 transition-all">
                    <Icon className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Shop */}
            <div className="md:col-span-2">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">Shop</h4>
              <ul className="space-y-3">
                {[
                  { label: "All Products", href: "/" },
                  { label: "Cooking Oils", href: "/?category=COOKING" },
                  { label: "Premium", href: "/?category=PREMIUM" },
                  { label: "Organic", href: "/?category=ORGANIC" },
                  { label: "Bulk / Industrial", href: "/?category=INDUSTRIAL" },
                ].map(({ label, href }) => (
                  <li key={href}><Link href={href} className="text-sm hover:text-white transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Account */}
            <div className="md:col-span-2">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">Account</h4>
              <ul className="space-y-3">
                {[
                  { label: "My Orders", href: "/orders" },
                  { label: "Cart", href: "/cart" },
                  { label: "Sign in", href: "/login" },
                  { label: "Register", href: "/register" },
                ].map(({ label, href }) => (
                  <li key={href}><Link href={href} className="text-sm hover:text-white transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="md:col-span-2">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">Company</h4>
              <ul className="space-y-3">
                {[
                  { label: "About Us", href: "/about" },
                  { label: "Contact", href: "/contact" },
                  { label: "FAQ", href: "/faq" },
                ].map(({ label, href }) => (
                  <li key={href}><Link href={href} className="text-sm hover:text-white transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="md:col-span-2">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">Newsletter</h4>
              <p className="text-sm text-zinc-500 mb-3 leading-relaxed">Deals, recipes & wellness tips.</p>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/60 transition-colors"
                />
                <button className="w-full rounded-xl gradient-amber py-2 text-sm font-medium text-white btn-shine">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-zinc-800/60 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-xs text-zinc-600">© 2026 OilMart. All rights reserved.</p>
            <div className="flex gap-5 text-xs text-zinc-600">
              <Link href="/privacy" className="hover:text-zinc-400 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-zinc-400 transition-colors">Terms</Link>
              <span>FSSAI Lic. 12345678901234</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
