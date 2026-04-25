"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid, ShoppingCart, Clock, User } from "lucide-react";
import { useCart } from "@/components/providers/CartProvider";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { itemCount } = useCart();

  const navItems = [
    { label: "Home", icon: Home, href: "/" },
    { label: "Categories", icon: Grid, href: "/?category=COOKING" },
    { label: "Cart", icon: ShoppingCart, href: "/cart", badge: itemCount },
    { label: "Orders", icon: Clock, href: "/orders" },
    { label: "Account", icon: User, href: "/login" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-zinc-950 border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-safe md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.label}
              href={item.href}
              className="relative flex flex-col items-center justify-center w-full h-full gap-1 group"
            >
              <div
                className={cn(
                  "relative flex items-center justify-center transition-all duration-200",
                  isActive ? "text-amber-600 dark:text-amber-500 scale-110" : "text-muted-foreground group-hover:text-foreground"
                )}
              >
                <item.icon className={cn("w-6 h-6", isActive && "fill-amber-100 dark:fill-amber-900/40")} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-green-600 text-white text-[10px] font-bold px-1.5 min-w-[18px] h-[18px] rounded-full flex items-center justify-center shadow-sm">
                    {item.badge > 99 ? "99+" : item.badge}
                  </span>
                )}
              </div>
              <span
                className={cn(
                  "text-[10px] font-bold tracking-wide transition-colors duration-200",
                  isActive ? "text-amber-600 dark:text-amber-500" : "text-muted-foreground"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
