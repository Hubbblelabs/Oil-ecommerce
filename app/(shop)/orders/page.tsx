import { Suspense } from "react";
import type { Metadata } from "next";
import { Package, Search, Filter, LayoutGrid, ChevronRight, PackageCheck, Truck, XCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderCard } from "@/components/shop/OrderCard";
import { PaginationControls } from "@/components/shop/PaginationControls";
import { orderService } from "@/server/services/order.service";
import { requireAuth } from "@/server/auth";

export const metadata: Metadata = {
  title: "My Orders",
  description: "Track and review your past orders.",
};

interface PageProps {
  searchParams: Promise<{ page?: string; tab?: string }>;
}

export default async function OrdersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page ?? "1"));
  const tab = params.tab ?? "all";
  const user = await requireAuth();

  return (
    <div className="bg-background min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Order History</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage and track your recent orders.</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
               <input 
                 type="text" 
                 placeholder="Search orders..." 
                 className="pl-9 pr-4 py-2 bg-card border border-border/50 rounded-full text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary w-full md:w-64 transition-all"
               />
             </div>
             <button className="h-9 w-9 rounded-full border border-border/50 flex items-center justify-center bg-card hover:bg-muted transition-colors">
               <Filter className="h-4 w-4" />
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Stats */}
          <aside className="lg:col-span-1 space-y-6">
             <div className="bg-card rounded-3xl p-6 border border-border/50 shadow-sm">
                <h3 className="font-bold text-foreground mb-4">Order Summary</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <LayoutGrid className="h-4 w-4" />
                      <span className="text-sm font-medium">Total Orders</span>
                    </div>
                    <span className="font-bold text-foreground">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-amber-600 dark:text-amber-500">
                      <Truck className="h-4 w-4" />
                      <span className="text-sm font-medium">Ongoing</span>
                    </div>
                    <span className="font-bold text-foreground">2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-green-600 dark:text-green-500">
                      <PackageCheck className="h-4 w-4" />
                      <span className="text-sm font-medium">Completed</span>
                    </div>
                    <span className="font-bold text-foreground">10</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-red-600 dark:text-red-500">
                      <XCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Cancelled</span>
                    </div>
                    <span className="font-bold text-foreground">0</span>
                  </div>
                </div>
             </div>

             {/* Track Order Widget */}
             <div className="bg-primary/5 rounded-3xl p-6 border border-primary/20">
                <h3 className="font-bold text-foreground mb-2">Track an Order</h3>
                <p className="text-xs text-muted-foreground mb-4">Enter your tracking ID to see real-time updates.</p>
                <div className="flex gap-2">
                  <input type="text" placeholder="Tracking ID" className="w-full px-3 py-2 rounded-xl text-sm border border-primary/20 bg-background outline-none" />
                  <button className="bg-primary text-primary-foreground px-3 py-2 rounded-xl text-sm font-bold shadow-sm">Track</button>
                </div>
             </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-3">
            {/* Tabs */}
            <div className="flex items-center gap-6 border-b border-border mb-6 overflow-x-auto pb-1 scrollbar-thin">
              {['All Orders', 'Ongoing', 'Completed', 'Cancelled'].map((t) => {
                 const tKey = t.toLowerCase().replace(' ', '-');
                 const isActive = tab === tKey || (tab === 'all' && t === 'All Orders');
                 return (
                   <a 
                     key={t}
                     href={`?tab=${tKey}`} 
                     className={`text-sm font-bold pb-2 border-b-2 whitespace-nowrap transition-colors ${isActive ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                   >
                     {t}
                   </a>
                 )
              })}
            </div>

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
      <div className="flex flex-col items-center justify-center py-20 text-center bg-card rounded-3xl border border-border/50">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Package className="h-8 w-8 text-primary" />
        </div>
        <p className="text-xl font-bold mb-1">No orders found</p>
        <p className="text-sm text-muted-foreground mb-6">
          You don't have any orders matching this category.
        </p>
        <a href="/products" className="rounded-full px-6 py-2.5 bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors shadow-sm text-sm">
          Shop Now
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {result.data.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}

      {result.totalPages > 1 && (
        <div className="mt-8 pt-6 flex justify-center">
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
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-32 w-full rounded-2xl" />
      ))}
    </div>
  );
}
