import { adminService } from "@/server/services/admin.service";
import { OrderStatusBadge } from "@/components/shop/OrderStatusBadge";
import { Users, Package, ShoppingCart, TrendingUp } from "lucide-react";
import { getCurrentUser } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/login");

  const stats = await adminService.getStats();

  const cards = [
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Total Sellers",
      value: stats.totalSellers,
      icon: Users,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      label: "Active Products",
      value: stats.totalProducts,
      icon: Package,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: "text-green-600",
      bg: "bg-green-50",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Platform overview</p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-border/60 bg-card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{card.label}</p>
                <p className="mt-1 text-3xl font-bold">{card.value.toLocaleString()}</p>
              </div>
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.bg}`}>
                <card.icon className={`h-5 w-5 ${card.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue card */}
      <div className="rounded-xl border border-border/60 bg-card p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
            <TrendingUp className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Platform Revenue</p>
            <p className="text-3xl font-bold text-amber-600">
              ₹{Number(stats.totalRevenue).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="rounded-xl border border-border/60 bg-card">
        <div className="border-b border-border/60 px-6 py-4">
          <h2 className="font-semibold">Recent Orders</h2>
        </div>
        <div className="divide-y divide-border/60">
          {stats.recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between px-6 py-4">
              <div>
                <p className="font-mono text-sm font-medium">
                  #{order.id.slice(0, 8).toUpperCase()}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(
                    new Date(order.createdAt)
                  )}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <OrderStatusBadge status={order.status} />
                <span className="font-semibold text-amber-600">
                  ₹{Number(order.totalAmount).toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          ))}
          {stats.recentOrders.length === 0 && (
            <p className="px-6 py-8 text-center text-muted-foreground">No orders yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
