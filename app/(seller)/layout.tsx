import Link from "next/link";
import { getCurrentUser } from "@/server/auth";
import { redirect } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Droplets,
  LogOut,
  Plus,
} from "lucide-react";

const NAV = [
  { href: "/seller/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/seller/products", label: "My Products", icon: Package },
  { href: "/seller/orders", label: "My Orders", icon: ShoppingCart },
];

export default async function SellerLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user || (user.role !== "SELLER" && user.role !== "ADMIN")) redirect("/login");

  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Sidebar */}
      <aside className="sticky top-0 flex h-screen w-60 shrink-0 flex-col border-r border-border/60 bg-card">
        <Link href="/seller/dashboard" className="flex items-center gap-2.5 px-6 py-5 border-b border-border/60">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
            <Droplets className="h-4 w-4" />
          </div>
          <div>
            <p className="font-bold text-sm">OilMart</p>
            <p className="text-xs text-muted-foreground">Seller Portal</p>
          </div>
        </Link>

        <nav className="flex-1 space-y-1 p-4">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-amber-50 hover:text-amber-700"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}

          <Link
            href="/seller/products/new"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-amber-600 transition-colors hover:bg-amber-50"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
        </nav>

        <div className="border-t border-border/60 p-4">
          <p className="mb-3 px-3 text-xs text-muted-foreground truncate">{user.email}</p>
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-7xl p-8">{children}</div>
      </main>
    </div>
  );
}
