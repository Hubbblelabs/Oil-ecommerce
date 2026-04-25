import { adminService } from "@/server/services/admin.service";
import { OrderStatusBadge } from "@/components/shop/OrderStatusBadge";
import { Users, Package, ShoppingCart, TrendingUp, Activity, ArrowUpRight, ShieldAlert } from "lucide-react";
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
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/30",
      borderColor: "border-blue-200 dark:border-blue-800"
    },
    {
      label: "Seller Accounts",
      value: stats.totalSellers,
      icon: Users,
      trend: "+4%",
      color: "text-indigo-600 dark:text-indigo-400",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/30",
      borderColor: "border-indigo-200 dark:border-indigo-800"
    },
    {
      label: "Active Products",
      value: stats.totalProducts,
      icon: Package,
      trend: "+28%",
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-900/30",
      borderColor: "border-amber-200 dark:border-amber-800"
    },
    {
      label: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      trend: "+15%",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/30",
      borderColor: "border-green-200 dark:border-green-800"
    },
  ];

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-zinc-950 p-6 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px]"></div>
        <div className="relative z-10">
          <h1 className="text-2xl font-extrabold tracking-tight text-white uppercase">Platform Command Center</h1>
          <p className="text-zinc-400 text-sm mt-1 font-medium">Real-time metrics and system overview</p>
        </div>
        <div className="relative z-10 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider px-4 py-2 rounded-xl bg-green-500/20 text-green-400 border border-green-500/30 shadow-inner">
           <Activity className="w-4 h-4 animate-pulse" />
           Systems Operational
        </div>
      </div>

      {/* KPI Row 1 */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-3xl border border-border bg-white dark:bg-zinc-900 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full ${card.bgColor} blur-2xl opacity-50 group-hover:opacity-100 transition-opacity`}></div>
            <div className="flex justify-between items-start mb-6 relative z-10">
               <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${card.bgColor} ${card.color} border ${card.borderColor} shadow-inner group-hover:scale-105 transition-transform`}>
                  <card.icon className="w-6 h-6" />
               </div>
               <span className="text-[10px] font-extrabold tracking-wider uppercase text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-md border border-green-200 dark:border-green-800">{card.trend}</span>
            </div>
            <div className="relative z-10">
               <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">{card.label}</p>
               <h3 className="text-3xl font-extrabold tracking-tight text-foreground">{card.value.toLocaleString()}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* GMV / Revenue */}
        <div className="rounded-3xl border border-border bg-white dark:bg-zinc-900 p-8 shadow-sm lg:col-span-5 flex flex-col justify-center relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8">
              <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/20 rounded-2xl flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-inner">
                 <TrendingUp className="w-8 h-8" />
              </div>
           </div>
           <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Total Gross Merchandize Value</p>
           <h2 className="text-5xl font-extrabold tracking-tight text-foreground mb-4">
             ₹{Number(stats.totalRevenue).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
           </h2>
           <div className="flex items-center gap-2">
             <span className="text-sm text-green-600 dark:text-green-400 font-bold bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded border border-green-200 dark:border-green-800">+18.2%</span>
             <span className="text-xs text-muted-foreground font-semibold">from last month</span>
           </div>
        </div>

        {/* Live Order Feed */}
        <div className="rounded-3xl border border-border bg-white dark:bg-zinc-900 shadow-sm lg:col-span-7 flex flex-col">
          <div className="px-8 py-6 border-b border-border flex items-center justify-between">
             <h2 className="text-lg font-extrabold uppercase tracking-tight text-foreground">Live Order Feed</h2>
             <button className="text-xs font-bold uppercase tracking-wider text-foreground hover:text-amber-600 flex items-center gap-1 transition-colors">
                View All <ArrowUpRight className="w-4 h-4"/>
             </button>
          </div>
          <div className="flex-1 overflow-auto max-h-[350px] p-2 custom-scrollbar">
            {stats.recentOrders.length === 0 ? (
               <div className="h-full flex items-center justify-center p-8 text-muted-foreground text-sm font-bold">No recent orders on the platform.</div>
            ) : (
               <table className="w-full text-sm">
                  <tbody className="divide-y divide-border/50">
                     {stats.recentOrders.map((order) => (
                       <tr key={order.id} className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                         <td className="px-6 py-4">
                           <p className="font-mono text-xs font-extrabold text-foreground bg-zinc-100 dark:bg-zinc-800 w-fit px-2 py-0.5 rounded">
                             #{order.id.slice(0, 8).toUpperCase()}
                           </p>
                           <p className="text-xs font-medium text-muted-foreground mt-2">
                             {new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(
                               new Date(order.createdAt)
                             )}
                           </p>
                         </td>
                         <td className="px-6 py-4 text-right">
                           <OrderStatusBadge status={order.status} />
                         </td>
                         <td className="px-6 py-4 text-right font-extrabold text-foreground text-base">
                           ₹{Number(order.totalAmount).toLocaleString("en-IN")}
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
