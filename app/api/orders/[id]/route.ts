import type { NextRequest } from "next/server";
import { orderService } from "@/server/services/order.service";

// GET /api/orders/[id]
export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/orders/[id]">
) {
  const { id } = await ctx.params;

  const order = await orderService.getOrderById(id);

  if (!order) {
    return Response.json({ error: "Order not found." }, { status: 404 });
  }

  return Response.json(order);
}
