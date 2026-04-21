import { Suspense } from "react";
import type { Metadata } from "next";
import { Package, User, Settings, Heart, Bell } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderCard } from "@/components/shop/OrderCard";
import { PaginationControls } from "@/components/shop/PaginationControls";
import { orderService } from "@/server/services/order.service";
import { requireAuth } from "@/server/auth";

export const metadata: Metadata = {
  title: "Your Orders",
  description: "Track and review your past orders.",
};

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function OrdersPage({ searchParams }: PageProps) {
  const { page: pageStr } = await searchParams;
  const page = Math.max(1, Number(pageStr ?? "1"));
  const user = await requireAuth();

  return (
    <div className="bg-background min-h-screen pb-20">
      <div className="border-b border-border/40 bg-zinc-50 dark:bg-zinc-950/50 pt-10 pb-20 -mb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">Welcome back, {user.email.split('@')[0]}</h1>
          <p className="text-muted-foreground text-lg mt-2 font-light">Manage your orders, profile, and preferences from here.</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
             <div className="sticky top-24 glass-panel rounded-3xl p-6 shadow-sm">
                <nav className="space-y-2">
                   <a href="/orders" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-500 text-white font-medium shadow-md shadow-amber-500/20">
                     <Package className="w-5 h-5" />
                     Order History
                   </a>
                   <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground font-medium transition-colors">
                     <User className="w-5 h-5" />
                     Profile Information
                   </a>
                   <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground font-medium transition-colors">
                     <Heart className="w-5 h-5" />
                     Saved Items
                   </a>
                   <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground font-medium transition-colors">
                     <Bell className="w-5 h-5" />
                     Notifications
                   </a>
                   <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground font-medium transition-colors">
                     <Settings className="w-5 h-5" />
                     Account Settings
                   </a>
                </nav>
             </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-3">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Recent Orders</h2>
            <Suspense fallback={<OrdersListSkeleton />}>
              <OrdersList page={page} userId={user.id} />
            </Suspense>
          </main>

        </div>
      </div>
    </div>
  );
}

async function OrdersList({
  page,
  userId,
}: {
  page: number;
  userId: string;
}) {
  const result = await orderService.getOrders(page, 10, userId);

  if (result.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center glass-panel rounded-3xl p-12 mt-6">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-950/50">
          <Package className="h-10 w-10 text-amber-500" />
        </div>
        <p className="text-2xl font-bold mb-2">No orders yet</p>
        <p className="text-muted-foreground max-w-sm mb-8">
          You haven't placed any orders yet. Discover our premium selection of pure oils.
        </p>
        <a href="/products" className="rounded-xl px-8 py-3 bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors shadow-lg">
          Start Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <p className="text-sm font-semibold text-muted-foreground">
          Showing {result.data.length} of {result.total} orders
        </p>
        {/* Simple mock filter */}
        <select className="bg-transparent border border-border/60 rounded-lg px-3 py-1.5 text-sm font-medium outline-none text-foreground focus:ring-2 focus:ring-amber-500/50">
           <option>All Time</option>
           <option>Last 30 Days</option>
           <option>Last 6 Months</option>
        </select>
      </div>

      <div className="space-y-6 pt-2" id="orders-list">
        {result.data.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>

      {result.totalPages > 1 && (
        <div className="mt-10 pt-6 border-t border-border/60 flex justify-center">
          <PaginationControls
            currentPage={result.page}
            totalPages={result.totalPages}
          />
        </div>
      )}
    </div>
  );
}

function OrdersListSkeleton() {
  return (
    <div className="space-y-6 mt-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-48 w-full rounded-3xl" />
      ))}
    </div>
  );
}
