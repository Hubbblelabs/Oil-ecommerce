"use client";

import Link from "next/link";
import { ShoppingCart, Droplets, Menu, X, LogOut, ChevronDown, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/providers/CartProvider";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  { value: "COOKING", label: "Cooking" },
  { value: "PREMIUM", label: "Premium" },
  { value: "ORGANIC", label: "Organic" },
  { value: "INDUSTRIAL", label: "Bulk" },
];

interface CurrentUser {
  id: string;
  email: string;
  role: "ADMIN" | "SELLER" | "USER";
}

export function ShopNavbar() {
  const { itemCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const router = useRouter();
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then(setUser)
      .catch(() => {});
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
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
        scrolled
          ? "bg-white/90 dark:bg-zinc-950/90 backdrop-blur-2xl border-b border-border/50 shadow-[0_1px_0_0_oklch(0_0_0/0.06)]"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-[10px] gradient-amber text-white shadow-amber-glow transition-all duration-300 group-hover:shadow-amber-glow-lg group-hover:scale-105">
              <Droplets className="h-4 w-4 fill-white/30" />
            </div>
            <span className="text-[17px] font-bold tracking-tight">
              Oil<span className="text-gradient-amber">Mart</span>
            </span>
          </Link>

          {/* Center nav — desktop */}
          <nav className="hidden lg:flex items-center gap-0.5">
            <Link href="/" className="px-3 py-1.5 rounded-lg text-[13px] font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-all">All</Link>
            {CATEGORIES.map((cat) => (
              <Link key={cat.value} href={`/?category=${cat.value}`} className="px-3 py-1.5 rounded-lg text-[13px] font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-all">
                {cat.label}
              </Link>
            ))}
            <Link href="/orders" className="px-3 py-1.5 rounded-lg text-[13px] font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-all">Orders</Link>
          </nav>

          {/* Right */}
          <div className="flex items-center gap-1">

            {/* Cart */}
            <button
              onClick={() => router.push("/cart")}
              className="relative h-9 w-9 flex items-center justify-center rounded-[10px] hover:bg-accent/60 transition-colors"
              aria-label={`Cart (${itemCount} items)`}
            >
              <ShoppingCart className="h-[18px] w-[18px]" />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full gradient-amber px-1 text-[10px] font-bold text-white shadow-amber-glow"
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
                  className="flex items-center gap-1.5 h-9 px-2.5 rounded-[10px] text-sm font-medium hover:bg-accent/60 transition-all"
                >
                  <span className="h-6 w-6 rounded-full gradient-amber flex items-center justify-center text-white text-[11px] font-bold uppercase shrink-0">
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
                      transition={{ duration: 0.15, ease: [0.25, 0.25, 0, 1] }}
                      className="absolute right-0 top-full mt-2 w-52 rounded-2xl bg-white dark:bg-zinc-900 border border-border/60 shadow-lift p-1.5 z-50"
                    >
                      <div className="px-3 py-2 mb-1 border-b border-border/40">
                        <p className="text-[11px] text-muted-foreground truncate">{user.email}</p>
                        <p className="text-xs font-semibold text-amber-600 capitalize">{user.role.toLowerCase()}</p>
                      </div>
                      {dashboardHref && (
                        <Link href={dashboardHref} onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium hover:bg-accent/60 transition-colors">
                          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                          Dashboard
                        </Link>
                      )}
                      <Link href="/orders" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium hover:bg-accent/60 transition-colors">
                        My Orders
                      </Link>
                      <div className="my-1 h-px bg-border/40" />
                      <button onClick={handleLogout} className="flex w-full items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors">
                        <LogOut className="h-3.5 w-3.5" />
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-1.5 ml-1">
                <Button asChild variant="ghost" size="sm" className="h-9 rounded-[10px] text-[13px] font-medium hover:bg-accent/60">
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button asChild size="sm" className="h-9 rounded-[10px] text-[13px] font-medium gradient-amber text-white border-0 btn-shine shadow-amber-glow hover:shadow-amber-glow-lg transition-all">
                  <Link href="/register">Get started</Link>
                </Button>
              </div>
            )}

            {/* Mobile toggle */}
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-[10px] hover:bg-accent/60 lg:hidden" onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu">
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.25, 0.25, 0, 1] }}
            className="overflow-hidden bg-white dark:bg-zinc-950 border-t border-border/50 lg:hidden"
          >
            <nav className="flex flex-col p-4 gap-0.5">
              <Link href="/" className="px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors" onClick={() => setMobileOpen(false)}>All Products</Link>
              {CATEGORIES.map((cat) => (
                <Link key={cat.value} href={`/?category=${cat.value}`} className="px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors" onClick={() => setMobileOpen(false)}>{cat.label}</Link>
              ))}
              <Link href="/orders" className="px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors" onClick={() => setMobileOpen(false)}>My Orders</Link>
              {dashboardHref && (
                <Link href={dashboardHref} className="px-4 py-2.5 rounded-xl text-sm font-medium text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-colors" onClick={() => setMobileOpen(false)}>Dashboard</Link>
              )}
              <div className="mt-2 pt-2 border-t border-border/40 flex gap-2">
                {user ? (
                  <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="flex-1 py-2.5 rounded-xl text-sm font-medium text-center text-muted-foreground hover:text-red-600 hover:bg-red-50 transition-colors">Sign out</button>
                ) : (
                  <>
                    <Link href="/login" className="flex-1 py-2.5 rounded-xl text-sm font-medium text-center border border-border/60 hover:bg-accent/60 transition-colors" onClick={() => setMobileOpen(false)}>Sign in</Link>
                    <Link href="/register" className="flex-1 py-2.5 rounded-xl text-sm font-medium text-center gradient-amber text-white" onClick={() => setMobileOpen(false)}>Register</Link>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

