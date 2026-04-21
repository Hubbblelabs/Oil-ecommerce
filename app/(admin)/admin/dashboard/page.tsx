import { adminService } from "@/server/services/admin.service";
import { OrderStatusBadge } from "@/components/shop/OrderStatusBadge";
import { Users, Package, ShoppingCart, TrendingUp, Activity, ArrowUpRight } from "lucide-react";
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
      trend: "+12%",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    },
    {
      label: "Seller Accounts",
      value: stats.totalSellers,
      icon: Users,
      trend: "+4%",
      color: "text-violet-500",
      bgColor: "bg-violet-500/10",
      borderColor: "border-violet-500/20"
    },
    {
      label: "Active Products",
      value: stats.totalProducts,
      icon: Package,
      trend: "+28%",
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20"
    },
    {
      label: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      trend: "+15%",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20"
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Platform Command Center</h1>
          <p className="text-muted-foreground text-sm mt-1">Real-time metrics and system overview</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-green-500/10 text-green-600 border border-green-500/20">
           <Activity className="w-3.5 h-3.5 animate-pulse" />
           Systems Operational
        </div>
      </div>

      {/* KPI Row 1 */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-border/40 bg-background p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full ${card.bgColor} blur-2xl opacity-50 group-hover:opacity-100 transition-opacity`}></div>
            <div className="flex justify-between items-start mb-6 relative z-10">
               <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.bgColor} ${card.color} border ${card.borderColor}`}>
                  <card.icon className="w-5 h-5" />
               </div>
               <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-md">{card.trend}</span>
            </div>
            <div className="relative z-10">
               <p className="text-sm font-semibold text-muted-foreground mb-1">{card.label}</p>
               <h3 className="text-3xl font-extrabold tracking-tight text-foreground">{card.value.toLocaleString()}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* GMV / Revenue */}
        <div className="rounded-3xl border border-border/40 bg-background p-8 shadow-sm lg:col-span-5 flex flex-col justify-center relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8">
              <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500">
                 <TrendingUp className="w-8 h-8" />
              </div>
           </div>
           <p className="text-sm font-semibold text-muted-foreground mb-2">Total Gross Merchandize Value</p>
           <h2 className="text-5xl font-extrabold tracking-tight text-foreground mb-4">
             ${Number(stats.totalRevenue).toLocaleString("en-US", { minimumFractionDigits: 2 })}
           </h2>
           <p className="text-sm text-green-600 font-medium">+18.2% from last month</p>
        </div>

        {/* Live Order Feed */}
        <div className="rounded-3xl border border-border/40 bg-background shadow-sm lg:col-span-7 flex flex-col">
          <div className="px-8 py-6 border-b border-border/40 flex items-center justify-between">
             <h2 className="text-lg font-bold tracking-tight">Live Order Feed</h2>
             <button className="text-sm font-semibold text-foreground hover:text-amber-600 flex items-center gap-1 transition-colors">
                View All <ArrowUpRight className="w-4 h-4"/>
             </button>
          </div>
          <div className="flex-1 overflow-auto max-h-[300px] p-2 custom-scrollbar">
            {stats.recentOrders.length === 0 ? (
               <div className="h-full flex items-center justify-center p-8 text-muted-foreground text-sm font-medium">No recent orders on the platform.</div>
            ) : (
               <table className="w-full text-sm">
                  <tbody className="divide-y divide-border/40">
                     {stats.recentOrders.map((order) => (
                       <tr key={order.id} className="group hover:bg-muted/30 transition-colors">
                         <td className="px-6 py-4">
                           <p className="font-mono text-xs font-bold text-foreground">
                             #{order.id.slice(0, 8).toUpperCase()}
                           </p>
                           <p className="text-xs text-muted-foreground mt-1">
                             {new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(
                               new Date(order.createdAt)
                             )}
                           </p>
                         </td>
                         <td className="px-6 py-4 text-right">
                           <OrderStatusBadge status={order.status} />
                         </td>
                         <td className="px-6 py-4 text-right font-bold text-foreground">
                           ${Number(order.totalAmount).toLocaleString("en-US")}
                         </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
