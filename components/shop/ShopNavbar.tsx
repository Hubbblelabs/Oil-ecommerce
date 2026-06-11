"use client";

import Link from "next/link";
import {
  ShoppingBag, Menu, X, LogOut, Sparkles, Phone, ArrowUpRight,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useCart } from "@/components/providers/CartProvider";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Orders", href: "/orders" },
  { label: "Contact", href: "/contact" },
];

const MOBILE_CATEGORIES = [
  { label: "Groundnut Oil", href: "/?category=COOKING" },
  { label: "Coconut Oil", href: "/?category=PREMIUM" },
  { label: "Gingelly Oil", href: "/?category=COOKING" },
  { label: "Sunflower Oil", href: "/?category=ORGANIC" },
  { label: "Bulk / Industrial", href: "/?category=INDUSTRIAL" },
];

interface CurrentUser {
  id: string;
  email: string;
  role: "ADMIN" | "USER";
}

function Wordmark() {
  return (
    <Link href="/" className="group flex flex-col leading-none shrink-0">
      <span className="font-display text-lg sm:text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
        Shri Sameya
      </span>
      <span className="label-tiny text-primary mt-0.5">Village · Wood Pressed</span>
    </Link>
  );
}

export function ShopNavbar() {
  const { itemCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then(setUser)
      .catch(() => {});
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
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

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setUserMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  const dashboardHref = user?.role === "ADMIN" ? "/admin/dashboard" : null;

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "glass border-b border-border/60"
          : "bg-background/0 border-b border-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-6">
          {/* Brand */}
          <Wordmark />

          {/* Center nav */}
          <nav className="hidden lg:flex items-center gap-9">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  data-active={isActive}
                  className={cn(
                    "link-underline text-[13px] font-semibold tracking-wide uppercase transition-colors",
                    isActive ? "text-primary" : "text-foreground/70 hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            {user ? (
              <div className="relative hidden sm:block" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-xs font-bold uppercase text-foreground transition-colors hover:border-primary/50 hover:text-primary"
                  aria-label="Account menu"
                >
                  {user.email[0]}
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.16 }}
                      className="absolute right-0 top-full mt-3 w-56 rounded-2xl bg-popover border border-border shadow-lift p-1.5 z-50"
                    >
                      <div className="px-3 py-2.5 mb-1 border-b border-border">
                        <p className="text-[11px] text-muted-foreground truncate">{user.email}</p>
                        <p className="label-tiny text-primary mt-0.5">{user.role.toLowerCase()}</p>
                      </div>
                      {dashboardHref && (
                        <Link
                          href={dashboardHref}
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium hover:bg-accent transition-colors"
                        >
                          <Sparkles className="h-3.5 w-3.5 text-primary" /> Dashboard
                        </Link>
                      )}
                      <Link
                        href="/orders"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium hover:bg-accent transition-colors"
                      >
                        My Orders
                      </Link>
                      <div className="my-1 h-px bg-border" />
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <LogOut className="h-3.5 w-3.5" /> Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden sm:inline-flex link-underline text-[13px] font-semibold uppercase tracking-wide text-foreground/70 hover:text-foreground transition-colors mr-2"
              >
                Sign in
              </Link>
            )}

            {/* Cart */}
            <button
              onClick={() => router.push("/cart")}
              className="btn-shine group relative flex h-11 items-center gap-2.5 rounded-full bg-secondary pl-4 pr-5 text-secondary-foreground transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
              aria-label={`Cart, ${itemCount} items`}
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="text-xs font-bold tracking-wide">Cart</span>
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {itemCount}
              </span>
            </button>

            {/* Mobile toggle */}
            <button
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile full-screen editorial menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-20 z-40 overflow-y-auto bg-background lg:hidden"
          >
            <nav className="flex min-h-full flex-col px-6 pt-8 pb-12">
              <p className="eyebrow-muted mb-5">Menu</p>
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="group flex items-center justify-between border-b border-border py-4"
                    >
                      <span className="font-display text-3xl font-medium tracking-tight text-foreground group-hover:text-primary transition-colors">
                        {link.label}
                      </span>
                      <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </Link>
                  </motion.div>
                ))}
                {dashboardHref && (
                  <Link
                    href={dashboardHref}
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-center justify-between border-b border-border py-4"
                  >
                    <span className="font-display text-3xl font-medium tracking-tight text-primary">
                      Dashboard
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-primary" />
                  </Link>
                )}
              </div>

              <p className="eyebrow-muted mt-10 mb-4">Oils</p>
              <div className="flex flex-wrap gap-2">
                {MOBILE_CATEGORIES.map((c) => (
                  <Link
                    key={c.label}
                    href={c.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-3">
                {user ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileOpen(false);
                    }}
                    className="w-full rounded-full border border-border py-3.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-destructive"
                  >
                    Sign out
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="flex-1 rounded-full border border-border py-3.5 text-center text-sm font-semibold transition-colors hover:border-primary/50 hover:text-primary"
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/products"
                      onClick={() => setMobileOpen(false)}
                      className="flex-1 rounded-full bg-secondary py-3.5 text-center text-sm font-bold text-secondary-foreground"
                    >
                      Shop now
                    </Link>
                  </div>
                )}
                <a
                  href="https://wa.me/917305212759"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full border border-[#25D366]/40 py-3.5 text-sm font-semibold text-[#1fa855] transition-colors hover:bg-[#25D366]/10"
                >
                  <Phone className="h-4 w-4" /> WhatsApp us
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
