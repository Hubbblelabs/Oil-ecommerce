import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Package } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderCard } from "@/components/shop/OrderCard";
import { PaginationControls } from "@/components/shop/PaginationControls";
import { orderService } from "@/server/services/order.service";
import { requireAuth } from "@/server/auth";

export const metadata: Metadata = {
  title: "My Orders",
  description: "Track and review your past orders.",
};

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function OrdersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page ?? "1"));
  const user = await requireAuth();

  return (
    <div className="bg-background min-h-screen pb-20">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Editorial header */}
        <div className="mb-12 border-b border-border pb-10">
          <p className="eyebrow mb-4 flex items-center gap-3">
            <span className="inline-block h-px w-10 bg-primary" />
            Your account
          </p>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h1 className="text-display-hero text-4xl text-foreground sm:text-5xl">
              Order <em className="text-display-italic text-primary">history</em>
            </h1>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Every bottle, from press to porch — track and review your recent
              orders below.
            </p>
          </div>
        </div>

        <Suspense fallback={<OrdersListSkeleton />}>
          <OrdersList page={page} userId={user.id} />
        </Suspense>
      </div>
    </div>
  );
}

async function OrdersList({ page, userId }: { page: number; userId: string }) {
  const result = await orderService.getOrders(page, 10, userId);

  if (result.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-border bg-card py-20 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Package className="h-8 w-8 text-primary" />
        </div>
        <p className="mb-1 text-xl font-bold">No orders yet</p>
        <p className="mb-6 text-sm text-muted-foreground">
          When you place an order, it will appear here.
        </p>
        <Link
          href="/products"
          className="btn-shine rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground transition-transform duration-300 hover:scale-[1.03]"
        >
          Shop the collection
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="label-xs">
        Showing {result.data.length} of {result.total} orders
      </p>

      {result.data.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}

      {result.totalPages > 1 && (
        <div className="mt-10 flex justify-center border-t border-border pt-8">
          <PaginationControls currentPage={result.page} totalPages={result.totalPages} />
        </div>
      )}
    </div>
  );
}

function OrdersListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-32 w-full rounded-2xl" />
      ))}
    </div>
  );
}
