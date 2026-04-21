"use client";

import Link from "next/link";
import { ShoppingCart, Droplets, Menu, X, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/components/providers/CartProvider";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/motion";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/orders", label: "Orders" },
] as const;

interface CurrentUser {
  id: string;
  email: string;
  role: "ADMIN" | "SELLER" | "USER";
}

export function ShopNavbar() {
  const { itemCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        setUser(data);
        setUserLoading(false);
      })
      .catch(() => setUserLoading(false));

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
    router.refresh();
  };

  const dashboardHref =
    user?.role === "ADMIN"
      ? "/admin/dashboard"
      : user?.role === "SELLER"
      ? "/seller/dashboard"
      : null;

  return (
    <FadeIn>
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          scrolled ? "glass-panel border-b" : "bg-transparent py-2"
        )}
        id="shop-navbar"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 transition-transform hover:scale-105"
            id="brand-logo"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-amber text-white shadow-lg shadow-amber-500/20">
              <Droplets className="h-5 w-5 fill-white/20" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              OilMart
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex absolute left-1/2 -translate-x-1/2" aria-label="Main navigation">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground relative group"
                id={`nav-link-${label.toLowerCase()}`}
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full rounded-full"></span>
              </Link>
            ))}
            {dashboardHref && (
              <Link
                href={dashboardHref}
                className="text-sm font-medium text-amber-600 transition-colors hover:text-amber-700 relative group"
              >
                Dashboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all group-hover:w-full rounded-full"></span>
              </Link>
            )}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="relative rounded-full hover:bg-black/5 dark:hover:bg-white/10"
              id="cart-icon-button"
              aria-label={`Cart with ${itemCount} items`}
            >
              <Link href="/cart">
                <ShoppingCart className="h-[18px] w-[18px] text-foreground" />
                {itemCount > 0 && (
                  <Badge
                    className="absolute -right-1 -top-1 h-4.5 w-4.5 flex items-center justify-center rounded-full bg-amber-500 p-0 text-[9px] font-bold text-white border-2 border-background shadow-sm"
                    id="cart-item-count-badge"
                  >
                    {itemCount > 99 ? "99+" : itemCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Auth buttons */}
            {!userLoading && (
              <div className="hidden md:flex items-center gap-3 ml-2">
                {user ? (
                  <>
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted border border-border">
                      <span className="text-xs font-medium text-muted-foreground uppercase">
                        {user.email.charAt(0)}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-destructive/10 hover:text-destructive"
                      onClick={handleLogout}
                      aria-label="Sign out"
                      title="Sign out"
                    >
                      <LogOut className="h-[18px] w-[18px]" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="ghost" size="sm" className="rounded-full text-sm font-medium">
                      <Link href="/login">Log in</Link>
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      className="rounded-full bg-foreground text-background hover:bg-foreground/90 shadow-sm"
                    >
                      <Link href="/register">Sign up</Link>
                    </Button>
                  </>
                )}
              </div>
            )}

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full"
              onClick={() => setMobileOpen((o) => !o)}
              id="mobile-menu-toggle"
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile nav dropdown */}
        <div
          className={cn(
            "absolute top-full left-0 w-full glass-panel border-t md:hidden transition-all duration-300 origin-top overflow-hidden",
            mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 border-transparent"
          )}
          id="mobile-nav"
        >
          <nav className="flex flex-col gap-1 p-4 shadow-xl" aria-label="Mobile navigation">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ))}
            {dashboardHref && (
              <Link
                href={dashboardHref}
                className="rounded-xl px-4 py-3 text-sm font-medium text-amber-600 transition-colors hover:bg-amber-50 dark:hover:bg-amber-500/10"
                onClick={() => setMobileOpen(false)}
              >
                Dashboard
              </Link>
            )}
            <div className="h-px bg-border my-2" />
            {user ? (
              <button
                onClick={() => { handleLogout(); setMobileOpen(false); }}
                className="rounded-xl px-4 py-3 text-sm font-medium text-left text-destructive transition-colors hover:bg-destructive/10"
              >
                Sign out ({user.email})
              </button>
            ) : (
              <div className="flex flex-col gap-2 mt-2">
                <Button asChild variant="outline" className="w-full justify-center rounded-xl">
                  <Link href="/login" onClick={() => setMobileOpen(false)}>Log in</Link>
                </Button>
                <Button asChild className="w-full justify-center rounded-xl bg-foreground text-background">
                  <Link href="/register" onClick={() => setMobileOpen(false)}>Sign up</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      </header>
    </FadeIn>
  );
}

