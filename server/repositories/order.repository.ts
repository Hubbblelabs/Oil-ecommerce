import type { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import type {
  OrderSummary,
  PaginationOptions,
  PaginatedResult,
} from "@/server/types";

// Select shape for orders — avoids fetching unnecessary relations
const orderSelect = {
  id: true,
  status: true,
  totalAmount: true,
  userId: true,
  createdAt: true,
  items: {
    select: {
      id: true,
      productId: true,
      quantity: true,
      price: true,
      product: {
        select: { name: true },
      },
    },
  },
} satisfies Prisma.OrderSelect;

// Map raw DB result to our OrderSummary DTO
function toOrderSummary(
  raw: Prisma.OrderGetPayload<{ select: typeof orderSelect }>
): OrderSummary {
  return {
    id: raw.id,
    status: raw.status,
    totalAmount: raw.totalAmount,
    userId: raw.userId,
    createdAt: raw.createdAt,
    items: raw.items.map((item) => ({
      id: item.id,
      productId: item.productId,
      productName: item.product.name,
      quantity: item.quantity,
      price: item.price,
    })),
  };
}

export const orderRepository = {
  async findMany(
    options: PaginationOptions & { userId?: string }
  ): Promise<PaginatedResult<OrderSummary>> {
    const { page, limit, userId } = options;
    const skip = (page - 1) * limit;

    const where: Prisma.OrderWhereInput = {
      ...(userId ? { userId } : {}),
    };

    const [rawOrders, total] = await db.$transaction([
      db.order.findMany({
        where,
        select: orderSelect,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      db.order.count({ where }),
    ]);

    return {
      data: rawOrders.map(toOrderSummary),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  },

  async findById(id: string): Promise<OrderSummary | null> {
    const raw = await db.order.findUnique({
      where: { id },
      select: orderSelect,
    });

    return raw ? toOrderSummary(raw) : null;
  },

  /** Must be called inside a Prisma $transaction */
  async createWithItems(
    tx: Prisma.TransactionClient,
    data: {
      userId: string;
      totalAmount: Prisma.Decimal;
      items: Array<{ productId: string; quantity: number; price: Prisma.Decimal }>;
    }
  ) {
    return tx.order.create({
      data: {
        userId: data.userId,
        totalAmount: data.totalAmount,
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      select: { id: true, status: true, totalAmount: true, createdAt: true },
    });
  },
};
