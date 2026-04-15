import { NextRequest } from "next/server";
import {
  orderService,
  InsufficientStockError,
  ProductNotFoundError,
} from "@/server/services/order.service";
import type { CreateOrderInput } from "@/server/types";

// GET /api/orders?page=1&limit=10&email=user@example.com
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
  const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit") ?? "10")));
  const guestEmail = searchParams.get("email") ?? undefined;

  const orders = await orderService.getOrders(page, limit, guestEmail);

  return Response.json(orders);
}

// POST /api/orders
// Body: { items: [{ productId, quantity }], guestEmail }
export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // Basic input validation — no zod to keep dependencies minimal
  if (!isValidCreateOrderInput(body)) {
    return Response.json(
      {
        error:
          "Invalid request. Required: { guestEmail: string, items: [{ productId: string, quantity: number }] }",
      },
      { status: 400 }
    );
  }

  try {
    const order = await orderService.createOrder(body);
    return Response.json(order, { status: 201 });
  } catch (err) {
    if (err instanceof InsufficientStockError) {
      return Response.json({ error: err.message }, { status: 409 });
    }
    if (err instanceof ProductNotFoundError) {
      return Response.json({ error: err.message }, { status: 404 });
    }
    console.error("[POST /api/orders]", err);
    return Response.json({ error: "Internal server error." }, { status: 500 });
  }
}

// ─────────────────────────────────────────────
// Type guard — runtime validation
// ─────────────────────────────────────────────
function isValidCreateOrderInput(body: unknown): body is CreateOrderInput {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;

  if (typeof b.guestEmail !== "string" || !b.guestEmail.includes("@"))
    return false;

  if (!Array.isArray(b.items) || b.items.length === 0) return false;

  return b.items.every((item: unknown) => {
    if (typeof item !== "object" || item === null) return false;
    const i = item as Record<string, unknown>;
    const qty = i.quantity;
    return (
      typeof i.productId === "string" &&
      typeof qty === "number" &&
      qty > 0
    );
  });
}
