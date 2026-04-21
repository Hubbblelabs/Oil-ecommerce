import Link from "next/link";
import { Package, ChevronRight, Truck, Calendar, ArrowUpRight } from "lucide-react";
import { OrderStatusBadge } from "@/components/shop/OrderStatusBadge";
import type { OrderSummary } from "@/server/types";
import { Button } from "@/components/ui/button";

interface OrderCardProps {
  order: OrderSummary;
}

export function OrderCard({ order }: OrderCardProps) {
  const formatted = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(order.createdAt));

  return (
    <div
      className="group glass-panel rounded-3xl p-6 transition-all hover:bg-white dark:hover:bg-zinc-900 shadow-sm border border-border/40 relative overflow-hidden"
      id={`order-card-${order.id}`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Left Side: Order Meta */}
        <div className="flex items-start gap-4 flex-1">
           <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950 flex items-center justify-center shrink-0 border border-amber-100 dark:border-amber-900 text-amber-600">
             <Package className="w-6 h-6" />
           </div>
           <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                 <Link
                   href={`/orders/${order.id}`}
                   className="font-semibold text-lg hover:text-amber-600 transition-colors tracking-tight text-foreground"
                   id={`order-id-link-${order.id}`}
                 >
                   Order #{order.id.slice(0, 8).toUpperCase()}
                 </Link>
                 <OrderStatusBadge status={order.status} />
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                 <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4"/> {formatted}</span>
                 <span className="flex items-center gap-1.5"><Truck className="w-4 h-4"/> Estimated delivery in 3 days</span>
              </div>
           </div>
        </div>
        
        {/* Right Side: Total & Action */}
        <div className="flex items-center justify-between md:justify-end gap-6 flex-shrink-0">
           <div className="flex flex-col md:items-end">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Total Amount</span>
              <span className="text-xl font-bold text-foreground">
                ${order.totalAmount.toString()}
              </span>
           </div>
           
           <Button variant="outline" asChild className="rounded-xl h-12 w-12 p-0 group-hover:bg-amber-50 group-hover:text-amber-600 group-hover:border-amber-200 transition-colors">
              <Link href={`/orders/${order.id}`}>
                 <ArrowUpRight className="w-5 h-5" />
                 <span className="sr-only">View Details</span>
              </Link>
           </Button>
        </div>

      </div>

      {/* Track progress mock bar */}
      <div className="mt-8 border-t border-border/60 pt-6">
        <p className="text-sm font-semibold mb-3">Items in this order ({order.items.length})</p>
        <div className="flex flex-wrap gap-2">
          {order.items.slice(0, 4).map((item) => (
            <span
              key={item.id}
              className="rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-foreground border border-border/50"
            >
              {item.productName} <span className="text-muted-foreground ml-1">× {item.quantity}</span>
            </span>
          ))}
          {order.items.length > 4 && (
            <span className="rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground border border-border/50">
              +{order.items.length - 4} more items
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
