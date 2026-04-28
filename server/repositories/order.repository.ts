import type { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import type {
  OrderSummary,
  PaginationOptions,
  PaginatedResult,
} from "@/server/types";
import type { PrismaClientExtended } from "@/lib/db";

// Select shape for orders — avoids fetching unnecessary relations
const orderSelect = {
  id: true,
  status: true,
  totalAmount: true,
  userId: true,
  shippingAddress: true,
  phone: true,
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
function toOrderSummary(raw: any): OrderSummary {
  return {
    id: raw.id,
    status: raw.status,
    totalAmount: Number(raw.totalAmount.toString()),
    userId: raw.userId,
    shippingAddress: raw.shippingAddress,
    phone: raw.phone,
    createdAt: raw.createdAt,
    items: raw.items.map((item: any) => ({
      id: item.id,
      productId: item.productId,
      productName: item.product.name,
      quantity: item.quantity,
      price: Number(item.price.toString()),
    })),
  };
}

export const orderRepository = {
  async findMany(
    options: PaginationOptions & { userId?: string; sellerId?: string }
  ): Promise<PaginatedResult<OrderSummary>> {
    const { page, limit, userId, sellerId } = options;
    const skip = (page - 1) * limit;

    const where: Prisma.OrderWhereInput = {
      ...(userId ? { userId } : {}),
      ...(sellerId
        ? { items: { some: { product: { sellerId } } } }
        : {}),
    };

    const [rawOrders, total] = await Promise.all([
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
    tx: any, // Using any for transaction client to support extended Prisma client types
    data: {
      userId: string;
      totalAmount: number;
      shippingAddress: string;
      phone: string;
      items: Array<{ productId: string; quantity: number; price: number }>;
    }
  ) {
    return tx.order.create({
      data: {
        userId: data.userId,
        totalAmount: data.totalAmount,
        shippingAddress: data.shippingAddress,
        phone: data.phone,
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

  async updateStatus(id: string, status: string) {
    return db.order.update({
      where: { id },
      data: { status: status as any },
      select: { id: true, status: true },
    });
  },
};
