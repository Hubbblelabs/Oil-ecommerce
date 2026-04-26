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
  { label: "Shop", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Bulk Orders", href: "/contact" },
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
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        (scrolled || !isHome)
          ? "bg-white/95 dark:bg-[#1a0e04]/95 backdrop-blur-2xl shadow-[0_1px_0_0_rgba(217,119,6,0.15),0_4px_24px_rgba(0,0,0,0.08)] border-b border-[#E9D8A6]/30"
          : "bg-transparent"
      )}
    >
      {/* Top announcement bar */}
      <div className="bg-[#3B2416] text-white py-1.5 text-center text-[11px] font-semibold tracking-wide">
        🌿 Free delivery on orders above ₹499 · Call us: +91 73052 12759
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Left: Brand Logo */}
          <div className="flex-1 flex justify-start">
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#D97706] text-white shadow-[0_0_15px_rgba(217,119,6,0.4)] transition-all duration-300 group-hover:scale-105 border border-[#E9D8A6]/30">
                <Droplets className="h-4 w-4 fill-white/30 text-white" />
              </div>
              <div className="flex flex-col justify-center leading-none">
                <span className={cn(
                  "font-heading text-sm sm:text-base font-bold tracking-tight",
                  (scrolled || !isHome) ? "text-[#3B2416] dark:text-white" : "text-white"
                )}>
                  Shri Sameya Village
                </span>
                <span className={cn(
                  "text-[8px] font-bold tracking-[0.2em] uppercase",
                  (scrolled || !isHome) ? "text-[#D97706]" : "text-[#E9D8A6]"
                )}>
                  Wood Pressed Oils
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Desktop Nav */}
          <nav className="hidden lg:flex items-center justify-center gap-4 flex-none">
            <Link
              href="/"
              className={cn(
                "px-2 py-1.5 text-[13px] font-bold transition-colors",
                (scrolled || !isHome) ? "text-[#3B2416]/80 dark:text-white/70 hover:text-[#D97706]" : "text-white/90 hover:text-white"
              )}
            >
              Home
            </Link>

            {/* Shop dropdown */}
            <div className="relative" ref={shopMenuRef}>
              <button
                onClick={() => setShopOpen((v) => !v)}
                className={cn(
                  "flex items-center gap-1 px-2 py-1.5 text-[13px] font-bold transition-colors",
                  (scrolled || !isHome) ? "text-[#3B2416]/80 dark:text-white/70 hover:text-[#D97706]" : "text-white/90 hover:text-white"
                )}
              >
                Categories
                <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", shopOpen && "rotate-180")} />
              </button>
              <AnimatePresence>
                {shopOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15, ease: [0.25, 0.25, 0, 1] }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 rounded-2xl bg-white dark:bg-zinc-900 border border-[#E9D8A6]/60 dark:border-zinc-700 shadow-[0_8px_40px_rgba(0,0,0,0.12)] p-2 z-50"
                  >
                    {CATEGORY_LINKS.map((c) => (
                      <Link
                        key={c.href + c.label}
                        href={c.href}
                        onClick={() => setShopOpen(false)}
                        className="flex flex-col gap-0.5 px-4 py-3 rounded-xl hover:bg-[#D97706]/8 hover:text-[#D97706] transition-colors group"
                      >
                        <span className="text-sm font-semibold text-[#3B2416] dark:text-white group-hover:text-[#D97706]">{c.label}</span>
                        <span className="text-[11px] text-muted-foreground">{c.sub}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/?category=INDUSTRIAL" className={cn(
              "px-2 py-1.5 text-[13px] font-bold transition-colors",
              (scrolled || !isHome) ? "text-[#3B2416]/80 dark:text-white/70 hover:text-[#D97706]" : "text-white/90 hover:text-white"
            )}>
              Bulk Orders
            </Link>
            <Link href="/about" className={cn(
              "px-2 py-1.5 text-[13px] font-bold transition-colors",
              (scrolled || !isHome) ? "text-[#3B2416]/80 dark:text-white/70 hover:text-[#D97706]" : "text-white/90 hover:text-white"
            )}>
              About
            </Link>
            <Link href="/contact" className={cn(
              "px-2 py-1.5 text-[13px] font-bold transition-colors",
              (scrolled || !isHome) ? "text-[#3B2416]/80 dark:text-white/70 hover:text-[#D97706]" : "text-white/90 hover:text-white"
            )}>
              Contact
            </Link>
          </nav>

          {/* Right: Actions */}
          <div className="flex-1 flex items-center justify-end gap-1.5">


            {/* Cart */}
            <button
              onClick={() => router.push("/cart")}
              className="relative h-9 w-9 flex items-center justify-center rounded-[10px] hover:bg-[#D97706]/10 transition-colors"
              aria-label={`Cart (${itemCount} items)`}
            >
              <ShoppingCart className={cn("h-[18px] w-[18px]", (scrolled || !isHome) ? "text-[#3B2416] dark:text-white" : "text-white")} />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#D97706] px-1 text-[10px] font-bold text-white shadow-[0_0_8px_rgba(217,119,6,0.5)]"
                  >
                    {itemCount > 99 ? "99+" : itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Auth — desktop */}
            {user ? (
              <div className="relative hidden md:block" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="flex items-center gap-1.5 h-9 px-2.5 rounded-[10px] text-sm font-medium hover:bg-[#D97706]/10 transition-all"
                >
                  <span className="h-6 w-6 rounded-full bg-[#D97706] flex items-center justify-center text-white text-[11px] font-bold uppercase shrink-0">
                    {user.email[0]}
                  </span>
                  <ChevronDown className={cn("h-3.5 w-3.5 text-muted-foreground transition-transform duration-200", userMenuOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-52 rounded-2xl bg-white dark:bg-zinc-900 border border-[#E9D8A6]/60 dark:border-zinc-700 shadow-[0_8px_40px_rgba(0,0,0,0.12)] p-1.5 z-50"
                    >
                      <div className="px-3 py-2 mb-1 border-b border-[#E9D8A6]/40 dark:border-zinc-700">
                        <p className="text-[11px] text-muted-foreground truncate">{user.email}</p>
                        <p className="text-xs font-bold text-[#D97706] capitalize">{user.role.toLowerCase()}</p>
                      </div>
                      {dashboardHref && (
                        <Link href={dashboardHref} onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium hover:bg-[#D97706]/8 hover:text-[#D97706] transition-colors">
                          <Sparkles className="h-3.5 w-3.5" /> Dashboard
                        </Link>
                      )}
                      <Link href="/orders" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium hover:bg-[#D97706]/8 hover:text-[#D97706] transition-colors">
                        My Orders
                      </Link>
                      <div className="my-1 h-px bg-[#E9D8A6]/40 dark:bg-zinc-700" />
                      <button onClick={handleLogout} className="flex w-full items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors">
                        <LogOut className="h-3.5 w-3.5" /> Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-1.5 ml-1">
                <Button asChild variant="ghost" size="sm" className={cn(
                  "h-9 rounded-[10px] text-[13px] font-semibold transition-colors",
                  (scrolled || !isHome) ? "text-[#3B2416] dark:text-white hover:bg-[#D97706]/10 hover:text-[#D97706]" : "text-white hover:bg-white/10"
                )}>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Link
                  href="/products"
                  className="h-9 px-4 rounded-[10px] text-[13px] font-bold bg-[#D97706] hover:bg-[#b86004] text-white transition-all shadow-[0_4px_12px_rgba(217,119,6,0.35)] hover:shadow-[0_6px_20px_rgba(217,119,6,0.5)] inline-flex items-center"
                >
                  Shop Now
                </Link>
              </div>
            )}

            {/* Mobile toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-[10px] hover:bg-[#D97706]/10 lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className={cn("h-5 w-5", (scrolled || !isHome) ? "" : "text-white")} /> : <Menu className={cn("h-5 w-5", (scrolled || !isHome) ? "" : "text-white")} />}
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
            className="overflow-hidden bg-white dark:bg-[#1a0e04] border-t border-[#E9D8A6]/40 lg:hidden"
          >
            <nav className="flex flex-col p-4 gap-0.5">
              <Link href="/" className="px-4 py-2.5 rounded-xl text-sm font-semibold text-[#3B2416] dark:text-white hover:text-[#D97706] hover:bg-[#D97706]/8 transition-colors" onClick={() => setMobileOpen(false)}>Home</Link>
              <Link href="/products" className="px-4 py-2.5 rounded-xl text-sm font-semibold text-[#3B2416] dark:text-white hover:text-[#D97706] hover:bg-[#D97706]/8 transition-colors" onClick={() => setMobileOpen(false)}>All Products</Link>
              {CATEGORY_LINKS.map((c) => (
                <Link key={c.label} href={c.href} className="px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-[#D97706] hover:bg-[#D97706]/8 transition-colors" onClick={() => setMobileOpen(false)}>{c.label}</Link>
              ))}
              <Link href="/?category=INDUSTRIAL" className="px-4 py-2.5 rounded-xl text-sm font-semibold text-[#3B2416] dark:text-white hover:text-[#D97706] hover:bg-[#D97706]/8 transition-colors" onClick={() => setMobileOpen(false)}>Bulk Orders</Link>
              <Link href="/about" className="px-4 py-2.5 rounded-xl text-sm font-semibold text-[#3B2416] dark:text-white hover:text-[#D97706] hover:bg-[#D97706]/8 transition-colors" onClick={() => setMobileOpen(false)}>About</Link>
              <Link href="/contact" className="px-4 py-2.5 rounded-xl text-sm font-semibold text-[#3B2416] dark:text-white hover:text-[#D97706] hover:bg-[#D97706]/8 transition-colors" onClick={() => setMobileOpen(false)}>Contact</Link>
              {dashboardHref && (
                <Link href={dashboardHref} className="px-4 py-2.5 rounded-xl text-sm font-semibold text-[#D97706] hover:bg-[#D97706]/8 transition-colors" onClick={() => setMobileOpen(false)}>Dashboard</Link>
              )}
              <div className="mt-3 pt-3 border-t border-[#E9D8A6]/40 flex gap-2">
                {user ? (
                  <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-center text-muted-foreground hover:text-red-600 hover:bg-red-50 transition-colors">
                    Sign out
                  </button>
                ) : (
                  <>
                    <Link href="/login" className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-center border border-[#E9D8A6] hover:border-[#D97706] hover:text-[#D97706] transition-colors" onClick={() => setMobileOpen(false)}>
                      Sign In
                    </Link>
                    <Link href="/products" className="flex-1 py-2.5 rounded-xl text-sm font-bold text-center bg-[#D97706] text-white" onClick={() => setMobileOpen(false)}>
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
