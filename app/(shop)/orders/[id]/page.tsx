import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
import { CheckCircle2, ArrowLeft, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderStatusBadge } from "@/components/shop/OrderStatusBadge";
import { orderService } from "@/server/services/order.service";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ placed?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Order #${id.slice(0, 8).toUpperCase()}`,
    description: "View your order details and status.",
  };
}

export default async function OrderDetailPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { placed } = await searchParams;
  const justPlaced = placed === "true";

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Success banner shown immediately after checkout */}
      {justPlaced && (
        <div
          className="mb-8 flex items-start gap-4 rounded-2xl border border-green-200 bg-green-50 p-6 dark:border-green-800/30 dark:bg-green-900/10"
          id="order-success-banner"
          role="status"
        >
          <CheckCircle2 className="mt-0.5 h-7 w-7 shrink-0 text-green-600" />
          <div>
            <p className="text-lg font-bold text-green-800 dark:text-green-400">
              Order placed successfully!
            </p>
            <p className="mt-0.5 text-sm text-green-700 dark:text-green-500">
              Thank you for your purchase. We&apos;ll begin processing it shortly.
            </p>
          </div>
        </div>
      )}

      <div className="mb-6 flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          asChild
          id="back-to-orders"
          className="gap-1.5 text-muted-foreground hover:text-foreground"
        >
          <Link href="/orders">
            <ArrowLeft className="h-4 w-4" />
            All Orders
          </Link>
        </Button>
      </div>

      <Suspense fallback={<OrderDetailSkeleton />}>
        <OrderDetail id={id} />
      </Suspense>
    </div>
  );
}

async function OrderDetail({ id }: { id: string }) {
  const order = await orderService.getOrderById(id);
  if (!order) notFound();

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(order.createdAt));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-mono text-lg font-bold text-muted-foreground">
            #{order.id.slice(0, 8).toUpperCase()}
          </h1>
          <p className="text-sm text-muted-foreground">{formattedDate}</p>
          {order.userId && (
            <p className="mt-1 text-sm text-muted-foreground">
              {order.userId}
            </p>
          )}
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <Separator />

      {/* Items */}
      <section>
        <h2 className="mb-4 font-semibold text-sm uppercase tracking-wider text-muted-foreground">
          Items
        </h2>
        <div className="space-y-3">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-card/60 p-4"
              id={`order-item-${item.id}`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-900/20">
                  <Droplets className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <p className="font-medium leading-tight">{item.productName}</p>
                  <p className="text-sm text-muted-foreground">
                    ${item.price.toString()} each
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">× {item.quantity}</p>
                <p className="font-semibold text-amber-600">
                  ${(
                    parseFloat(item.price.toString()) * item.quantity
                  ).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Total */}
      <div className="flex items-center justify-between text-xl font-bold">
        <span>Total</span>
        <span className="text-amber-600">${order.totalAmount.toString()}</span>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 pt-2">
        <Button
          asChild
          className="bg-amber-600 hover:bg-amber-700 text-white"
          id="continue-shopping-button"
        >
          <Link href="/">Continue Shopping</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          id="view-all-orders-button"
        >
          <Link href="/orders">View All Orders</Link>
        </Button>
      </div>
    </div>
  );
}

function OrderDetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between gap-3">
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <Skeleton className="h-px w-full" />
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}
