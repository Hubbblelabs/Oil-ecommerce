import Link from "next/link";
import { getCurrentUser } from "@/server/auth";
import { redirect } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Droplets,
  LogOut,
  Settings,
  ShieldCheck,
  Bell
} from "lucide-react";

const NAV = [
  { href: "/admin/dashboard", label: "Command Center", icon: LayoutDashboard },
  { href: "/admin/users", label: "User Management", icon: Users },
  { href: "/admin/products", label: "Global Catalog", icon: Package },
  { href: "/admin/orders", label: "All Orders", icon: ShoppingCart },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/login");

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      {/* Sidebar */}
      <aside className="flex w-[260px] shrink-0 flex-col border-r border-border/40 bg-zinc-100 dark:bg-zinc-900 transition-all z-10">
        <Link href="/admin/dashboard" className="flex items-center gap-3 px-6 h-[72px] border-b border-border/40">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-foreground text-background shadow-md">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="font-bold text-sm tracking-tight text-foreground">OilMart</p>
            <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Admin Ops</p>
          </div>
        </Link>
        
        <div className="px-4 py-8">
          <p className="px-3 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Menu</p>
          <nav className="space-y-1">
            {NAV.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors text-muted-foreground hover:bg-background hover:text-foreground shadow-sm"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-auto border-t border-border/40 p-4 space-y-1">
          <Link href="#" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors text-muted-foreground hover:bg-background hover:text-foreground">
            <Settings className="h-4 w-4" />
            System Settings
          </Link>
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
            >
              <LogOut className="h-4 w-4" />
              Terminate Session
            </button>
          </form>
        </div>
      </aside>

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-[72px] flex items-center justify-between px-8 bg-background border-b border-border/40 shrink-0">
           <h1 className="text-xl font-bold tracking-tight">Admin Ops Center</h1>
           <div className="flex items-center gap-6">
              <button className="relative text-muted-foreground hover:text-foreground transition-colors">
                 <Bell className="w-5 h-5"/>
                 <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500 border-2 border-background"></span>
              </button>
              <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800">
                 <div className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-xs">
                    {user.email.charAt(0).toUpperCase()}
                 </div>
                 <p className="hidden md:block text-xs font-semibold pr-2">{user.email.split('@')[0]}</p>
              </div>
           </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto relative">
          <div className="absolute inset-0 bg-[#f8f9fa] dark:bg-[#09090b] -z-10"></div>
          <div className="mx-auto max-w-7xl p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
