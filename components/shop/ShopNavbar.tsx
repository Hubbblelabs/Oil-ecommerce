"use client";

import Link from "next/link";
import {
  ShoppingCart, Droplets, Menu, X, LogOut, ChevronDown,
  Sparkles, Search, Phone,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/providers/CartProvider";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Orders", href: "/orders" },
  { label: "Contact", href: "/contact" },
];

const CATEGORY_LINKS = [
  { label: "Groundnut Oil", href: "/?category=COOKING", sub: "Heart-healthy MUFA rich" },
  { label: "Coconut Oil", href: "/?category=PREMIUM", sub: "MCT-rich, immunity boost" },
  { label: "Gingelly Oil", href: "/?category=COOKING", sub: "Powerful antioxidants" },
  { label: "Sunflower Oil", href: "/?category=ORGANIC", sub: "High Vitamin E" },
  { label: "Bulk / Industrial", href: "/?category=INDUSTRIAL", sub: "For restaurants & retail" },
];

interface CurrentUser {
  id: string;
  email: string;
  role: "ADMIN" | "SELLER" | "USER";
}

export function ShopNavbar() {
  const { itemCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const userMenuRef = useRef<HTMLDivElement>(null);
  const shopMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then(setUser)
      .catch(() => {});
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
      if (shopMenuRef.current && !shopMenuRef.current.contains(e.target as Node)) {
        setShopOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setUserMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  const dashboardHref =
    user?.role === "ADMIN" ? "/admin/dashboard"
    : user?.role === "SELLER" ? "/seller/dashboard"
    : null;

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white dark:bg-[#1a0e04] border-b border-border dark:border-[#3a2010] shadow-[0_2px_16px_rgba(59,36,22,0.06)]">
      

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Left: Brand Logo */}
          <div className="flex-1 flex justify-start">
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-primary text-white shadow-[0_0_15px_rgba(217,119,6,0.4)] transition-all duration-300 group-hover:scale-105 border border-border">
                <Droplets className="h-4 w-4 fill-white/30 text-white" />
              </div>
              <div className="flex flex-col justify-center leading-none">
                <span className="font-heading text-sm sm:text-base font-bold tracking-tight text-foreground dark:text-white">
                  Shri Sameya Village
                </span>
                <span className="text-[8px] font-bold tracking-[0.2em] uppercase text-primary">
                  Wood Pressed Oils
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Desktop Nav */}
          <nav className="hidden lg:flex items-center justify-center gap-1 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-1.5 rounded-full border border-border/50 shadow-sm flex-none">
            {NAV_LINKS.map((link) => {
               const isActive = pathname === link.href || (pathname.startsWith('/services') && link.label === 'Services');
               return (
                 <Link
                   key={link.label}
                   href={link.href}
                   className={cn(
                     "px-5 py-2 text-[13px] font-bold rounded-full transition-all duration-300",
                     isActive 
                       ? "bg-primary text-primary-foreground shadow-[0_2px_10px_rgba(249,115,22,0.3)]" 
                       : "text-foreground hover:text-primary hover:bg-muted"
                   )}
                 >
                   {link.label}
                 </Link>
               );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="flex-1 flex items-center justify-end gap-3">
             <button className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-border/50 hover:bg-muted transition-colors">
               <Search className="h-4 w-4" />
             </button>
             
             {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button onClick={() => setUserMenuOpen((v) => !v)} className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-border/50 hover:bg-muted transition-colors">
                    <span className="text-xs font-bold uppercase">{user.email[0]}</span>
                  </button>
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-52 rounded-2xl bg-white dark:bg-zinc-900 border border-border shadow-lg p-1.5 z-50"
                      >
                        <div className="px-3 py-2 mb-1 border-b border-border">
                          <p className="text-[11px] text-muted-foreground truncate">{user.email}</p>
                          <p className="text-xs font-bold text-primary capitalize">{user.role.toLowerCase()}</p>
                        </div>
                        {dashboardHref && (
                          <Link href={dashboardHref} onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors">
                            <Sparkles className="h-3.5 w-3.5" /> Dashboard
                          </Link>
                        )}
                        <Link href="/orders" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors">
                          My Orders
                        </Link>
                        <div className="my-1 h-px bg-border" />
                        <button onClick={handleLogout} className="flex w-full items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors">
                          <LogOut className="h-3.5 w-3.5" /> Sign out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
             ) : (
                <Button asChild variant="ghost" size="sm" className="hidden sm:flex h-10 rounded-full text-[13px] font-bold hover:bg-muted transition-colors">
                  <Link href="/login">Sign In</Link>
                </Button>
             )}

             <button onClick={() => router.push("/cart")} className="flex items-center gap-2 h-10 px-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-[0_4px_12px_rgba(249,115,22,0.3)]">
               <ShoppingCart className="h-4 w-4" />
               <span className="text-xs font-bold hidden sm:inline-block">{itemCount} items</span>
             </button>

          {/* Mobile toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-[10px] hover:bg-primary/10 lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5 text-foreground dark:text-white" /> : <Menu className="h-5 w-5 text-foreground dark:text-white" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.25, 0.25, 0, 1] }}
            className="overflow-hidden bg-white dark:bg-[#1a0e04] border-t border-border lg:hidden"
          >
            <nav className="flex flex-col p-4 gap-0.5">
              <Link href="/" className="px-4 py-2.5 rounded-xl text-sm font-semibold text-foreground dark:text-white hover:text-primary hover:bg-primary/8 transition-colors" onClick={() => setMobileOpen(false)}>Home</Link>
              <Link href="/products" className="px-4 py-2.5 rounded-xl text-sm font-semibold text-foreground dark:text-white hover:text-primary hover:bg-primary/8 transition-colors" onClick={() => setMobileOpen(false)}>All Products</Link>
              {CATEGORY_LINKS.map((c) => (
                <Link key={c.label} href={c.href} className="px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/8 transition-colors" onClick={() => setMobileOpen(false)}>{c.label}</Link>
              ))}
              <Link href="/?category=INDUSTRIAL" className="px-4 py-2.5 rounded-xl text-sm font-semibold text-foreground dark:text-white hover:text-primary hover:bg-primary/8 transition-colors" onClick={() => setMobileOpen(false)}>Bulk Orders</Link>
              <Link href="/about" className="px-4 py-2.5 rounded-xl text-sm font-semibold text-foreground dark:text-white hover:text-primary hover:bg-primary/8 transition-colors" onClick={() => setMobileOpen(false)}>About</Link>
              <Link href="/contact" className="px-4 py-2.5 rounded-xl text-sm font-semibold text-foreground dark:text-white hover:text-primary hover:bg-primary/8 transition-colors" onClick={() => setMobileOpen(false)}>Contact</Link>
              {dashboardHref && (
                <Link href={dashboardHref} className="px-4 py-2.5 rounded-xl text-sm font-semibold text-primary hover:bg-primary/8 transition-colors" onClick={() => setMobileOpen(false)}>Dashboard</Link>
              )}
              <div className="mt-3 pt-3 border-t border-border flex gap-2">
                {user ? (
                  <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-center text-muted-foreground hover:text-red-600 hover:bg-red-50 transition-colors">
                    Sign out
                  </button>
                ) : (
                  <>
                    <Link href="/login" className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-center border border-[#E9D8A6] hover:border-[#D97706] hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>
                      Sign In
                    </Link>
                    <Link href="/products" className="flex-1 py-2.5 rounded-xl text-sm font-bold text-center bg-primary text-white" onClick={() => setMobileOpen(false)}>
                      Shop Now
                    </Link>
                  </>
                )}
              </div>
              {/* WhatsApp quick contact */}
              <a
                href="https://wa.me/917305212759"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366]/8 transition-colors"
              >
                <Phone className="h-4 w-4" /> WhatsApp Us
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
