import type { NextRequest } from "next/server";
import { orderService } from "@/server/services/order.service";
import { getCurrentUser } from "@/server/auth";

// GET /api/orders/[id]
export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;
  const user = await getCurrentUser();

  if (!user) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  const order = await orderService.getOrderById(id);

  if (!order) {
    return Response.json({ error: "Order not found." }, { status: 404 });
  }

  // Non-admins can only view their own orders
  if (user.role !== "ADMIN" && order.userId !== user.id) {
    return Response.json({ error: "Forbidden." }, { status: 403 });
  }

  return Response.json(order);
}
