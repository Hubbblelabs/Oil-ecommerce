"use client";

import Link from "next/link";
import { ShoppingCart, Droplets, Package, Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/components/providers/CartProvider";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Products" },
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
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        setUser(data);
        setUserLoading(false);
      })
      .catch(() => setUserLoading(false));
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
    <header
      className="sticky top-0 z-50 w-full border-b border-border/60 glass"
      id="shop-navbar"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold text-xl"
          id="brand-logo"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
            <Droplets className="h-5 w-5" />
          </div>
          <span className="text-gradient-amber">OilMart</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              id={`nav-link-${label.toLowerCase()}`}
            >
              {label}
            </Link>
          ))}
          {dashboardHref && (
            <Link
              href={dashboardHref}
              className="text-sm font-medium text-amber-600 transition-colors hover:text-amber-700"
            >
              Dashboard
            </Link>
          )}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Cart */}
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="relative"
            id="cart-icon-button"
            aria-label={`Cart with ${itemCount} items`}
          >
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge
                  className="absolute -right-1 -top-1 h-5 w-5 justify-center rounded-full bg-amber-500 p-0 text-[10px] text-white"
                  id="cart-item-count-badge"
                >
                  {itemCount > 99 ? "99+" : itemCount}
                </Badge>
              )}
            </Link>
          </Button>

          {/* Auth buttons */}
          {!userLoading && (
            <>
              {user ? (
                <div className="hidden md:flex items-center gap-2">
                  <span className="text-xs text-muted-foreground max-w-[120px] truncate">
                    {user.email}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                    aria-label="Sign out"
                    title="Sign out"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/login">Sign in</Link>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    <Link href="/register">Register</Link>
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            id="mobile-menu-toggle"
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        className={cn(
          "border-t border-border/60 bg-background/95 backdrop-blur-sm md:hidden",
          mobileOpen ? "block" : "hidden"
        )}
        id="mobile-nav"
      >
        <nav className="flex flex-col gap-1 p-4" aria-label="Mobile navigation">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
          {dashboardHref && (
            <Link
              href={dashboardHref}
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-amber-600 transition-colors hover:bg-amber-50"
              onClick={() => setMobileOpen(false)}
            >
              Dashboard
            </Link>
          )}
          {user ? (
            <button
              onClick={() => { handleLogout(); setMobileOpen(false); }}
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-left text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600"
            >
              Sign out
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted"
                onClick={() => setMobileOpen(false)}
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-amber-600 hover:bg-amber-50"
                onClick={() => setMobileOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

