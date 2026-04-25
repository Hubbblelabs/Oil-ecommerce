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
    <div className="space-y-6 pb-20">
      
      {/* Key Metrics */}
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-3xl border border-border bg-white dark:bg-zinc-900 p-6 shadow-sm relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 bg-amber-600/10 w-32 h-32 rounded-full blur-2xl group-hover:bg-amber-600/20 transition-colors"></div>
          <p className="text-sm font-bold text-muted-foreground mb-1 uppercase tracking-wider">Total Revenue</p>
          <div className="flex items-end justify-between">
            <h3 className="text-4xl font-extrabold tracking-tight text-foreground">
              ₹{Number(stats.totalRevenue).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </h3>
            <div className="flex items-center gap-1 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2.5 py-1 rounded-lg text-xs font-bold mb-1 border border-green-200 dark:border-green-800">
               <TrendingUp className="w-3 h-3" /> +12.5%
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-white dark:bg-zinc-900 p-6 shadow-sm">
          <p className="text-sm font-bold text-muted-foreground mb-1 uppercase tracking-wider">Active Products</p>
          <div className="flex items-end justify-between">
            <h3 className="text-4xl font-extrabold tracking-tight text-foreground">{stats.totalProducts}</h3>
            <div className="flex items-center gap-1 text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2.5 py-1 rounded-lg text-xs font-bold mb-1 border border-amber-200 dark:border-amber-800">
               <Package className="w-3 h-3" /> Catalog
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-white dark:bg-zinc-900 p-6 shadow-sm">
          <p className="text-sm font-bold text-muted-foreground mb-1 uppercase tracking-wider">Pending Orders</p>
          <div className="flex items-end justify-between">
            <h3 className="text-4xl font-extrabold tracking-tight text-foreground">{stats.pendingOrders}</h3>
            <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-lg text-xs font-bold mb-1 border border-blue-200 dark:border-blue-800">
               <ShoppingCart className="w-3 h-3" /> To Process
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Top Products */}
        <div className="rounded-3xl border border-border bg-white dark:bg-zinc-900 shadow-sm lg:col-span-8 flex flex-col">
          <div className="px-8 py-6 flex items-center justify-between border-b border-border/50">
            <div>
              <h2 className="text-lg font-extrabold tracking-tight uppercase">Top Selling Assets</h2>
              <p className="text-xs text-muted-foreground mt-1 font-medium">Your highest converting products this month.</p>
            </div>
            <button className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 uppercase tracking-wider">
               View All <ArrowUpRight className="w-4 h-4"/>
            </button>
          </div>
          <div className="flex-1 p-8">
            {stats.topProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-border/60 rounded-2xl p-8 text-center bg-zinc-50 dark:bg-zinc-950/50">
                 <Package className="w-8 h-8 text-muted-foreground mb-3" />
                 <p className="text-sm font-bold text-foreground">No sales data yet.</p>
                 <p className="text-xs text-muted-foreground mt-1">Once customers buy your products, they will appear here.</p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40 text-left text-muted-foreground uppercase tracking-wider text-[10px] font-bold">
                    <th className="pb-3">Product Name</th>
                    <th className="pb-3 text-center">Units Sold</th>
                    <th className="pb-3 text-right">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {stats.topProducts.map((product, i) => (
                    <tr key={i} className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                      <td className="py-4 font-semibold text-foreground group-hover:text-amber-600 transition-colors">{product.name}</td>
                      <td className="py-4 text-center font-bold">{product.totalSold}</td>
                      <td className="py-4 text-right font-extrabold text-foreground">
                        ₹{Number(product.revenue).toLocaleString("en-IN")}
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
           
           <div className="rounded-3xl border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-900/10 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-800 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-inner">
                   <AlertTriangle className="h-5 w-5" />
                </div>
                <h2 className="font-extrabold tracking-tight text-amber-900 dark:text-amber-100 uppercase">Inventory Alerts</h2>
              </div>
              <div className="space-y-3">
                {stats.lowStockProducts.length === 0 ? (
                  <p className="text-sm font-medium text-amber-700/70 dark:text-amber-300/70">All products are well stocked.</p>
                ) : (
                  stats.lowStockProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between bg-white dark:bg-zinc-900 px-4 py-3 rounded-xl border border-amber-200/50 shadow-sm">
                      <p className="text-sm font-bold truncate max-w-[150px] text-foreground">{product.name}</p>
                      <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2 py-1 rounded-md ${product.stock === 0 ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`}>
                        {product.stock === 0 ? "Sold out" : `${product.stock} left`}
                      </span>
                    </div>
                  ))
                )}
              </div>
           </div>

           <div className="rounded-3xl border border-border bg-white dark:bg-zinc-900 shadow-sm p-6 flex flex-col justify-center">
              <h2 className="font-extrabold tracking-tight mb-4 uppercase">Quick Actions</h2>
              <div className="space-y-3">
                 <Link href="/seller/products/new" className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors border border-border group shadow-sm">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform"><Package className="w-4 h-4"/></div>
                       <span className="font-bold text-sm text-foreground">Add New Product</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                 </Link>
                 <Link href="/seller/orders" className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors border border-border group shadow-sm">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 flex items-center justify-center group-hover:scale-110 transition-transform"><ShoppingCart className="w-4 h-4"/></div>
                       <span className="font-bold text-sm text-foreground">Fulfill Orders</span>
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
