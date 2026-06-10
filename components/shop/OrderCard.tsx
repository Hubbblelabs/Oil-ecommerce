import Link from "next/link";
import Image from "next/image";
import { Package, ChevronRight, Truck, Calendar, MapPin } from "lucide-react";
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

  // Placeholder for first product image
  const firstItem = order.items[0];
  const imageUrl = "/site_assets/product_groundnut_1l.png";

  return (
    <div className="bg-card rounded-2xl p-5 border border-border/50 hover:border-primary/30 transition-colors shadow-sm flex flex-col sm:flex-row gap-5 items-center sm:items-start">
      
      {/* Product Thumbnail */}
      <div className="w-24 h-24 sm:w-32 sm:h-32 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-border/50 flex-shrink-0 relative overflow-hidden flex items-center justify-center p-2">
        {firstItem ? (
           <Image src={imageUrl} alt={firstItem.productName} fill className="object-contain p-2" />
        ) : (
           <Package className="w-8 h-8 text-muted-foreground" />
        )}
      </div>

      {/* Order Details */}
      <div className="flex-1 w-full">
         <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
            <div>
               <Link href={`/orders/${order.id}`} className="text-lg font-bold text-foreground hover:text-primary transition-colors">
                 Order #{order.id.slice(0, 8).toUpperCase()}
               </Link>
               <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                 <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5"/> {formatted}</span>
                 <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5"/> Home Delivery</span>
               </div>
            </div>
            
            <div className="flex flex-col sm:items-end">
               <OrderStatusBadge status={order.status} />
               <span className="text-lg font-extrabold text-foreground mt-2">
                 ₹{order.totalAmount.toString()}
               </span>
            </div>
         </div>

         <div className="bg-muted/50 rounded-xl p-3 border border-border/50">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Items</h4>
            <div className="flex flex-wrap gap-2">
               {order.items.slice(0, 3).map((item) => (
                 <span key={item.id} className="text-sm font-medium text-foreground bg-background px-2 py-1 rounded-md border border-border/50 shadow-sm">
                   {item.quantity}x {item.productName}
                 </span>
               ))}
               {order.items.length > 3 && (
                 <span className="text-sm font-medium text-muted-foreground px-2 py-1">
                   +{order.items.length - 3} more
                 </span>
               )}
            </div>
         </div>
      </div>

    </div>
  );
}
