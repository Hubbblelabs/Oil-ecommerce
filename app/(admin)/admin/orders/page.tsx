"use client";

import { useState, useEffect, useTransition } from "react";
import { OrderStatusBadge } from "@/components/shop/OrderStatusBadge";
import { Button } from "@/components/ui/button";
import type { OrderStatus } from "@/server/types";

interface Order {
  id: string;
  status: OrderStatus;
  totalAmount: string;
  userId: string;
  shippingAddress: string;
  phone: string;
  createdAt: string;
  items: Array<{ id: string; productName: string; quantity: number; price: string }>;
}

const ALL_STATUSES: OrderStatus[] = ["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchOrders = async (p: number) => {
    setLoading(true);
    const res = await fetch(`/api/admin/orders?page=${p}&limit=20`);
    const data = await res.json();
    setOrders(data.data ?? []);
    setTotalPages(data.totalPages ?? 1);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  const handleStatusChange = (id: string, status: string) => {
    startTransition(async () => {
      await fetch(`/api/admin/orders/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      fetchOrders(page);
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-muted-foreground">Manage all platform orders</p>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="rounded-xl border border-border/60 bg-card px-4 py-8 text-center text-muted-foreground">
            Loading...
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-xl border border-border/60 bg-card px-4 py-8 text-center text-muted-foreground">
            No orders found.
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="rounded-xl border border-border/60 bg-card">
              <div
                className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 cursor-pointer"
                onClick={() => setExpanded(expanded === order.id ? null : order.id)}
              >
                <div>
                  <p className="font-mono text-sm font-bold">#{order.id.slice(0, 8).toUpperCase()}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(new Date(order.createdAt))}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{order.phone} · {order.shippingAddress.slice(0, 40)}…</p>
                </div>
                <div className="flex items-center gap-3">
                  <OrderStatusBadge status={order.status} />
                  <span className="font-bold text-amber-600">₹{Number(order.totalAmount).toLocaleString("en-IN")}</span>
                </div>
              </div>

              {expanded === order.id && (
                <div className="border-t border-border/60 px-6 py-4 space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">Items</p>
                    <div className="space-y-1">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>{item.productName} × {item.quantity}</span>
                          <span className="text-muted-foreground">₹{Number(item.price) * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">Update Status</p>
                    <div className="flex flex-wrap gap-2">
                      {ALL_STATUSES.map((s) => (
                        <Button
                          key={s}
                          size="sm"
                          variant={order.status === s ? "default" : "outline"}
                          className={`h-7 text-xs ${order.status === s ? "bg-amber-600 text-white hover:bg-amber-700" : ""}`}
                          disabled={isPending || order.status === s}
                          onClick={() => handleStatusChange(order.id, s)}
                        >
                          {s}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</Button>
          <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
          <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</Button>
        </div>
      )}
    </div>
  );
}
