import { getCurrentUser } from "@/server/auth";
import { redirect } from "next/navigation";
import { sellerService } from "@/server/services/seller.service";
import { TrendingUp, Package, ShoppingCart, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default async function SellerDashboardPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "SELLER") redirect("/login");

  const stats = await sellerService.getStats(user.id);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Seller Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user.email}</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border/60 bg-card p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
              <TrendingUp className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold text-amber-600">
                ₹{Number(stats.totalRevenue).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border/60 bg-card p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Products</p>
              <p className="text-2xl font-bold">{stats.totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border/60 bg-card p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-50">
              <ShoppingCart className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending Orders</p>
              <p className="text-2xl font-bold">{stats.pendingOrders}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Products */}
        <div className="rounded-xl border border-border/60 bg-card">
          <div className="border-b border-border/60 px-6 py-4 flex items-center justify-between">
            <h2 className="font-semibold">Top Selling Products</h2>
          </div>
          <div className="divide-y divide-border/60">
            {stats.topProducts.length === 0 ? (
              <p className="px-6 py-6 text-sm text-muted-foreground">No sales data yet.</p>
            ) : (
              stats.topProducts.map((product, i) => (
                <div key={i} className="flex items-center justify-between px-6 py-3">
                  <div>
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.totalSold} units sold</p>
                  </div>
                  <span className="text-sm font-semibold text-amber-600">
                    ₹{Number(product.revenue).toLocaleString("en-IN")}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="rounded-xl border border-amber-200/60 bg-card">
          <div className="border-b border-amber-200/60 px-6 py-4 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <h2 className="font-semibold">Low Stock Alerts</h2>
          </div>
          <div className="divide-y divide-border/60">
            {stats.lowStockProducts.length === 0 ? (
              <p className="px-6 py-6 text-sm text-muted-foreground">All products are well stocked.</p>
            ) : (
              stats.lowStockProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between px-6 py-3">
                  <p className="text-sm font-medium">{product.name}</p>
                  <span className={`text-sm font-bold ${product.stock === 0 ? "text-red-600" : "text-amber-600"}`}>
                    {product.stock === 0 ? "Out of stock" : `${product.stock} left`}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          href="/seller/products/new"
          className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700 transition-colors"
        >
          + Add Product
        </Link>
        <Link
          href="/seller/orders"
          className="rounded-lg border border-border/60 px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
        >
          View Orders
        </Link>
      </div>
    </div>
  );
}
