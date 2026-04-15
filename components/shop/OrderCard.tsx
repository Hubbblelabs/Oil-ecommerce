import Link from "next/link";
import { Package } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { OrderStatusBadge } from "@/components/shop/OrderStatusBadge";
import type { OrderSummary } from "@/server/types";

interface OrderCardProps {
  order: OrderSummary;
}

export function OrderCard({ order }: OrderCardProps) {
  const formatted = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(order.createdAt));

  return (
    <Card
      className="transition-all hover:shadow-md hover:shadow-amber-500/10"
      id={`order-card-${order.id}`}
    >
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-2">
        <div>
          <Link
            href={`/orders/${order.id}`}
            className="font-mono text-sm text-muted-foreground hover:text-amber-600 transition-colors"
            id={`order-id-link-${order.id}`}
          >
            #{order.id.slice(0, 8).toUpperCase()}
          </Link>
          <p className="text-xs text-muted-foreground mt-0.5">{formatted}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Items summary */}
        <div className="flex flex-wrap gap-1">
          {order.items.slice(0, 3).map((item) => (
            <span
              key={item.id}
              className="rounded-full bg-amber-50 px-2 py-0.5 text-xs text-amber-800 dark:bg-amber-950/30 dark:text-amber-300"
            >
              {item.productName} × {item.quantity}
            </span>
          ))}
          {order.items.length > 3 && (
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              +{order.items.length - 3} more
            </span>
          )}
        </div>

        {/* Total */}
        <div className="flex items-center justify-between border-t border-border/60 pt-3">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Package className="h-4 w-4" />
            {order.items.length} item{order.items.length !== 1 ? "s" : ""}
          </div>
          <span className="text-lg font-bold text-amber-600">
            ${order.totalAmount.toString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
