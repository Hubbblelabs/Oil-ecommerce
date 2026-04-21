import { getCurrentUser } from "@/server/auth";
import { redirect } from "next/navigation";
import { sellerService } from "@/server/services/seller.service";
import { TrendingUp, Package, ShoppingCart, AlertTriangle, ArrowUpRight, CreditCard, ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function SellerDashboardPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "SELLER") redirect("/login");

  const stats = await sellerService.getStats(user.id);

  return (
    <div className="space-y-6">
      
      {/* Key Metrics */}
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-3xl border border-border/40 bg-background p-6 shadow-sm relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 bg-amber-500/10 w-32 h-32 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-colors"></div>
          <p className="text-sm font-medium text-muted-foreground mb-1">Total Revenue</p>
          <div className="flex items-end justify-between">
            <h3 className="text-4xl font-bold tracking-tight text-foreground">
              ${Number(stats.totalRevenue).toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </h3>
            <div className="flex items-center gap-1 text-green-500 bg-green-500/10 px-2 py-1 rounded-md text-xs font-bold mb-1">
               <TrendingUp className="w-3 h-3" /> +12.5%
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-border/40 bg-background p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground mb-1">Active Products</p>
          <div className="flex items-end justify-between">
            <h3 className="text-4xl font-bold tracking-tight text-foreground">{stats.totalProducts}</h3>
            <div className="flex items-center gap-1 text-amber-500 bg-amber-500/10 px-2 py-1 rounded-md text-xs font-bold mb-1">
               <Package className="w-3 h-3" /> Catalog
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-border/40 bg-background p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground mb-1">Orders Pending Fulfillment</p>
          <div className="flex items-end justify-between">
            <h3 className="text-4xl font-bold tracking-tight text-foreground">{stats.pendingOrders}</h3>
            <div className="flex items-center gap-1 text-blue-500 bg-blue-500/10 px-2 py-1 rounded-md text-xs font-bold mb-1">
               <ShoppingCart className="w-3 h-3" /> To Process
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Top Products */}
        <div className="rounded-3xl border border-border/40 bg-background shadow-sm lg:col-span-8 flex flex-col">
          <div className="px-8 py-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold tracking-tight">Top Selling Assets</h2>
              <p className="text-sm text-muted-foreground">Your highest converting products this month.</p>
            </div>
            <button className="text-sm font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1">
               View All <ArrowUpRight className="w-4 h-4"/>
            </button>
          </div>
          <div className="flex-1 px-8 pb-8">
            {stats.topProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-border/60 rounded-2xl p-8 text-center bg-muted/30">
                 <Package className="w-8 h-8 text-muted-foreground mb-3" />
                 <p className="text-sm font-medium text-foreground">No sales data yet.</p>
                 <p className="text-xs text-muted-foreground">Once customers buy your products, they will appear here.</p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40 text-left text-muted-foreground">
                    <th className="pb-3 font-medium">Product Name</th>
                    <th className="pb-3 font-medium">Units Sold</th>
                    <th className="pb-3 font-medium text-right">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {stats.topProducts.map((product, i) => (
                    <tr key={i} className="group hover:bg-muted/30 transition-colors">
                      <td className="py-4 font-semibold text-foreground group-hover:text-amber-600 transition-colors">{product.name}</td>
                      <td className="py-4 text-muted-foreground">{product.totalSold}</td>
                      <td className="py-4 text-right font-bold text-foreground">
                        ${Number(product.revenue).toLocaleString("en-US")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Action Center & Alerts */}
        <div className="lg:col-span-4 flex flex-col gap-6">
           
           <div className="rounded-3xl border border-amber-200/60 bg-amber-50/50 dark:bg-amber-950/20 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 flex items-center justify-center">
                   <AlertTriangle className="h-5 w-5" />
                </div>
                <h2 className="font-bold tracking-tight text-amber-900 dark:text-amber-100">Inventory Alerts</h2>
              </div>
              <div className="space-y-3">
                {stats.lowStockProducts.length === 0 ? (
                  <p className="text-sm text-amber-700/70 dark:text-amber-300/70">All products are well stocked.</p>
                ) : (
                  stats.lowStockProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between bg-white dark:bg-zinc-900 px-4 py-3 rounded-xl border border-amber-200/40">
                      <p className="text-sm font-semibold truncate max-w-[150px]">{product.name}</p>
                      <span className={`text-xs font-bold px-2 py-1 rounded-md ${product.stock === 0 ? "bg-red-100 text-red-600 dark:bg-red-900/30" : "bg-amber-100 text-amber-600 dark:bg-amber-900/30"}`}>
                        {product.stock === 0 ? "Out of stock" : `${product.stock} left`}
                      </span>
                    </div>
                  ))
                )}
              </div>
           </div>

           <div className="rounded-3xl border border-border/40 bg-background shadow-sm p-6 flex flex-col justify-center">
              <h2 className="font-bold tracking-tight mb-2">Quick Actions</h2>
              <div className="space-y-3 mt-2">
                 <Link href="/seller/products/new" className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors border border-transparent hover:border-border/60 group">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform"><Package className="w-4 h-4"/></div>
                       <span className="font-semibold text-sm">Create Product</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                 </Link>
                 <Link href="/seller/orders" className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors border border-transparent hover:border-border/60 group">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform"><ShoppingCart className="w-4 h-4"/></div>
                       <span className="font-semibold text-sm">Fulfill Orders</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                 </Link>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}
