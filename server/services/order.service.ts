import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { orderRepository } from "@/server/repositories/order.repository";
import type {
  CreateOrderInput,
  OrderSummary,
  PaginatedResult,
} from "@/server/types";

const DEFAULT_PAGE_LIMIT = 10;

// ─────────────────────────────────────────────
// Custom error types
// ─────────────────────────────────────────────

export class InsufficientStockError extends Error {
  constructor(public readonly productName: string) {
    super(`Insufficient stock for product: ${productName}`);
    this.name = "InsufficientStockError";
  }
}

export class ProductNotFoundError extends Error {
  constructor(public readonly productId: string) {
    super(`Product not found: ${productId}`);
    this.name = "ProductNotFoundError";
  }
}

// ─────────────────────────────────────────────
// Order Service
// ─────────────────────────────────────────────

export const orderService = {
  /**
   * Creates an order atomically:
   * 1. Row-locks all product rows to prevent race conditions (SELECT FOR UPDATE)
   * 2. Validates stock for every item
   * 3. Calculates total server-side (never trust frontend prices)
   * 4. Creates the Order + OrderItems
   * 5. Atomically decrements stock
   */
  async createOrder(input: CreateOrderInput): Promise<{ id: string }> {
    const { items, guestEmail } = input;

    if (items.length === 0) {
      throw new Error("Order must contain at least one item.");
    }

    const productIds = items.map((i) => i.productId);

    const result = await db.$transaction(async (tx) => {
      // Step 1: SELECT FOR UPDATE — row-level lock prevents concurrent stock depletion
      // Using $queryRaw because Prisma does not expose FOR UPDATE via the query builder
      const lockedProducts = await tx.$queryRaw<
        Array<{ id: string; name: string; price: Prisma.Decimal; stock: number }>
      >`
        SELECT id, name, price, stock
        FROM "Product"
        WHERE id = ANY(${productIds}::text[])
          AND "isActive" = true
        FOR UPDATE
      `;

      // Step 2: Validate — every requested product must exist and have sufficient stock
      const productMap = new Map(lockedProducts.map((p) => [p.id, p]));

      for (const item of items) {
        const product = productMap.get(item.productId);
        if (!product) {
          throw new ProductNotFoundError(item.productId);
        }
        if (product.stock < item.quantity) {
          throw new InsufficientStockError(product.name);
        }
      }

      // Step 3: Calculate total server-side using DB price snapshot
      let totalAmount = new Prisma.Decimal(0);
      const orderItems = items.map((item) => {
        const product = productMap.get(item.productId)!;
        const lineTotal = product.price.mul(item.quantity);
        totalAmount = totalAmount.add(lineTotal);
        return {
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: product.price,
        };
      });

      // Step 4: Create the order with items
      const order = await orderRepository.createWithItems(tx, {
        guestEmail,
        totalAmount,
        items: orderItems,
      });

      // Step 5: Atomically decrement stock for each product
      await Promise.all(
        items.map((item) =>
          tx.product.update({
            where: { id: item.productId },
            data: { stock: { decrement: item.quantity } },
          })
        )
      );

      return order;
    });

    return { id: result.id };
  },

  async getOrders(
    page = 1,
    limit = DEFAULT_PAGE_LIMIT,
    guestEmail?: string
  ): Promise<PaginatedResult<OrderSummary>> {
    return orderRepository.findMany({
      page: Math.max(1, page),
      limit: Math.min(limit, 50),
      guestEmail,
    });
  },

  async getOrderById(id: string): Promise<OrderSummary | null> {
    return orderRepository.findById(id);
  },
};
