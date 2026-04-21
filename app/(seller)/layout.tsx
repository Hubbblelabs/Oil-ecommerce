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
  BarChart,
  Settings,
  Bell
} from "lucide-react";

const NAV = [
  { href: "/seller/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/seller/products", label: "Inventory", icon: Package },
  { href: "/seller/orders", label: "Orders", icon: ShoppingCart },
  { href: "#", label: "Analytics", icon: BarChart },
];

export default async function SellerLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user || (user.role !== "SELLER" && user.role !== "ADMIN")) redirect("/login");

  return (
    <div className="flex h-screen bg-muted/30 overflow-hidden">
      {/* Sidebar */}
      <aside className="flex w-64 shrink-0 flex-col border-r border-border/40 bg-zinc-950 text-zinc-300 transition-all z-10">
        <Link href="/seller/dashboard" className="flex items-center gap-3 px-6 h-16 border-b border-white/10 hover:bg-white/5 transition-colors">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500 text-white shadow-lg shadow-amber-500/20">
            <Droplets className="h-4 w-4" />
          </div>
          <div>
            <p className="font-bold text-sm tracking-tight text-white">OilMart</p>
            <p className="text-[10px] uppercase font-bold tracking-widest text-amber-500">Partner Portal</p>
          </div>
        </Link>
        
        <div className="px-4 py-6">
           <Link
             href="/seller/products/new"
             className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-amber-600 shadow-md shadow-amber-500/20 mb-6"
           >
             <Plus className="h-4 w-4" />
             New Product
           </Link>

          <nav className="space-y-1">
            {NAV.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-white/10 hover:text-white"
              >
                <Icon className="h-4 w-4 opacity-70" />
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-auto border-t border-white/10 p-4 space-y-1">
          <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-white/10 hover:text-white">
            <Settings className="h-4 w-4 opacity-70" />
            Settings
          </Link>
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-red-500/10 text-red-400 hover:text-red-300"
            >
              <LogOut className="h-4 w-4 opacity-70" />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 flex items-center justify-between px-8 bg-background border-b border-border/40 shrink-0">
           <h1 className="text-xl font-bold tracking-tight">Dashboard Overview</h1>
           <div className="flex items-center gap-4">
              <button className="relative p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors">
                 <Bell className="w-5 h-5"/>
                 <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 border border-background"></span>
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-border">
                 <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-xs uppercase">
                    {user.email.substring(0,2)}
                 </div>
                 <div className="hidden md:block text-sm">
                    <p className="font-semibold leading-none">{user.email.split('@')[0]}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Verified Partner</p>
                 </div>
              </div>
           </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto bg-muted/20">
          <div className="mx-auto max-w-7xl p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
