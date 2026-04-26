import { ShopNavbar } from "@/components/shop/ShopNavbar";
import { MobileBottomNav } from "@/components/shop/MobileBottomNav";
import { WhatsAppFAB } from "@/components/shop/WhatsAppFAB";
import Link from "next/link";
import { Droplets, Share2, MessageCircle, PlayCircle, ShieldCheck, Truck, Leaf, Award, Phone } from "lucide-react";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAF8F2] dark:bg-zinc-950 selection:bg-[#D97706]/30 selection:text-[#3B2416] pb-16 md:pb-0">
      <ShopNavbar />

      <main className="flex-1 pt-24">{children}</main>

      <WhatsAppFAB />

      {/* ── Trust bar ── */}
      <div className="border-t border-[#E9D8A6]/60 bg-white dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: "Free Delivery", sub: "Orders above ₹499" },
              { icon: ShieldCheck, title: "100% Authentic", sub: "FSSAI certified" },
              { icon: Leaf, title: "Pure & Natural", sub: "Zero chemicals" },
              { icon: Award, title: "Premium Quality", sub: "Traditional Chekku" },
            ].map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#D97706]/10 border border-[#E9D8A6]">
                  <Icon className="h-6 w-6 text-[#D97706]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#3B2416] dark:text-white uppercase tracking-wider">{title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="bg-[#1a0e04] text-zinc-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

            {/* Brand */}
            <div className="md:col-span-4">
              <Link href="/" className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D97706] text-white shadow-[0_0_16px_rgba(217,119,6,0.4)]">
                  <Droplets className="h-5 w-5 fill-white/30" />
                </div>
                <div>
                  <span className="font-heading text-lg font-bold tracking-tight text-white block">
                    Shri Sameya Village
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#D97706] uppercase">
                    Wood Pressed Oils
                  </span>
                </div>
              </Link>
              <p className="text-sm leading-relaxed text-zinc-400 mb-5 max-w-sm">
                Pure Taste of Tradition. Premium wood pressed oils from sustainable Indian farms — pure, natural, and traceable.
              </p>
              {/* Location */}
              <p className="text-xs text-zinc-500 mb-5">
                📍 Coimbatore, Ramanathapuram, Trichy Road, Tamil Nadu
              </p>
              {/* WhatsApp */}
              <a
                href="https://wa.me/917305212759"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] rounded-xl px-4 py-2.5 text-sm font-semibold hover:bg-[#25D366]/25 transition-colors mb-6"
              >
                <Phone className="h-4 w-4" /> +91 73052 12759
              </a>
              {/* Social */}
              <div className="flex items-center gap-3">
                {[Share2, MessageCircle, PlayCircle].map((Icon, i) => (
                  <Link
                    key={i}
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 hover:bg-[#D97706] hover:text-white text-zinc-400 transition-all duration-200"
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Shop */}
            <div className="md:col-span-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-5">Shop</h4>
              <ul className="space-y-3.5">
                {[
                  { label: "All Products", href: "/products" },
                  { label: "Groundnut Oil", href: "/?category=COOKING" },
                  { label: "Coconut Oil", href: "/?category=PREMIUM" },
                  { label: "Gingelly Oil", href: "/?category=COOKING" },
                  { label: "Bulk Orders", href: "/?category=INDUSTRIAL" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-sm font-semibold hover:text-[#D97706] transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Account */}
            <div className="md:col-span-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-5">Account</h4>
              <ul className="space-y-3.5">
                {[
                  { label: "My Orders", href: "/orders" },
                  { label: "Cart", href: "/cart" },
                  { label: "Sign In", href: "/login" },
                  { label: "Register", href: "/register" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-sm font-semibold hover:text-[#D97706] transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="md:col-span-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-5">Company</h4>
              <ul className="space-y-3.5">
                {[
                  { label: "About Us", href: "/about" },
                  { label: "Contact", href: "/contact" },
                  { label: "FAQ", href: "/contact" },
                  { label: "Blog", href: "#" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-sm font-semibold hover:text-[#D97706] transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="md:col-span-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-5">Newsletter</h4>
              <p className="text-sm text-zinc-400 mb-4 leading-relaxed">Deals, recipes & wellness tips.</p>
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm font-semibold text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#D97706] transition-colors"
                />
                <button className="w-full rounded-xl bg-[#D97706] hover:bg-[#b86004] py-3 text-sm font-bold text-white transition-colors shadow-[0_4px_12px_rgba(217,119,6,0.3)]">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-16 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                © 2026 Shri Sameya Village Wood Pressed Oils. All rights reserved.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-xs font-bold text-zinc-500 uppercase tracking-wider">
              <Link href="/privacy" className="hover:text-zinc-300 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-zinc-300 transition-colors">Terms</Link>
              <Link href="/refund-policy" className="hover:text-zinc-300 transition-colors">Refund Policy</Link>
              <span className="text-zinc-600">FSSAI Lic. 12345678901234</span>
            </div>
          </div>
        </div>
      </footer>

      <MobileBottomNav />
    </div>
  );
}
