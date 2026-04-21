import { Suspense } from "react";
import type { Metadata } from "next";
import { Package } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderCard } from "@/components/shop/OrderCard";
import { PaginationControls } from "@/components/shop/PaginationControls";
import { orderService } from "@/server/services/order.service";
import { requireAuth } from "@/server/auth";

export const metadata: Metadata = {
  title: "Your Orders",
  description: "Track and review your past orders.",
};

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function OrdersPage({ searchParams }: PageProps) {
  const { page: pageStr } = await searchParams;
  const page = Math.max(1, Number(pageStr ?? "1"));
  const user = await requireAuth();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/30">
          <Package className="h-5 w-5 text-amber-600" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold">Your Orders</h1>
        </div>
      </div>

      <Suspense fallback={<OrdersListSkeleton />}>
        <OrdersList page={page} userId={user.id} />
      </Suspense>
    </div>
  );
}

async function OrdersList({
  page,
  userId,
}: {
  page: number;
  userId: string;
}) {
  const result = await orderService.getOrders(page, 10, userId);

  if (result.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <Package className="h-10 w-10 text-muted-foreground" />
        </div>
        <p className="text-xl font-semibold">No orders yet</p>
        <p className="mt-2 text-muted-foreground">
          Your orders will appear here after you checkout.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <p className="text-sm text-muted-foreground">
        {result.total} order{result.total !== 1 ? "s" : ""} found
      </p>

      <div className="space-y-4" id="orders-list">
        {result.data.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>

      {result.totalPages > 1 && (
        <PaginationControls
          currentPage={result.page}
          totalPages={result.totalPages}
        />
      )}
    </div>
  );
}

function OrdersListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-36 w-full rounded-xl" />
      ))}
    </div>
  );
}
