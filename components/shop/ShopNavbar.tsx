"use client";

import Link from "next/link";
import { ShoppingCart, Droplets, Package, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/components/providers/CartProvider";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Products" },
  { href: "/cart", label: "Cart" },
  { href: "/orders", label: "Orders" },
] as const;

export function ShopNavbar() {
  const { itemCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

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
        </nav>

        {/* Cart icon */}
        <div className="flex items-center gap-3">
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

          <Button
            asChild
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            id="orders-icon-button"
            aria-label="View orders"
          >
            <Link href="/orders">
              <Package className="h-5 w-5" />
            </Link>
          </Button>

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

      {/* Mobile nav dropdown */}
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
              id={`mobile-nav-link-${label.toLowerCase()}`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
