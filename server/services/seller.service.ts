import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { orderRepository } from "@/server/repositories/order.repository";
import { productRepository } from "@/server/repositories/product.repository";
import type { SellerStats, PaginatedResult, OrderSummary } from "@/server/types";

export const sellerService = {
  async getStats(sellerId: string): Promise<SellerStats> {
    const [totalProducts, pendingOrders] = await db.$transaction([
      db.product.count({ where: { sellerId, isActive: true } }),
      db.order.count({
        where: {
          status: "PENDING",
          items: { some: { product: { sellerId } } },
        },
      }),
    ]);

    // Revenue for this seller (sum of orderItems where product.sellerId = sellerId)
    const revenueRaw = await db.orderItem.aggregate({
      where: { product: { sellerId } },
      _sum: { price: true },
    });
    const totalRevenue = revenueRaw._sum.price ?? new Prisma.Decimal(0);

    // Top selling products
    const topRaw = await db.orderItem.groupBy({
      by: ["productId"],
      where: { product: { sellerId } },
      _sum: { quantity: true, price: true },
      orderBy: { _sum: { quantity: "desc" } },
      take: 5,
    });

    const productIds = topRaw.map((r) => r.productId);
    const products = await db.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, name: true },
    });
    const nameMap = new Map(products.map((p) => [p.id, p.name]));

    const topProducts = topRaw.map((r) => ({
      name: nameMap.get(r.productId) ?? r.productId,
      totalSold: r._sum.quantity ?? 0,
      revenue: r._sum.price ?? new Prisma.Decimal(0),
    }));

    const lowStockProducts = await productRepository.getLowStock(sellerId);

    return { totalRevenue, totalProducts, pendingOrders, topProducts, lowStockProducts };
  },

  async getOrders(
    sellerId: string,
    page = 1,
    limit = 20
  ): Promise<PaginatedResult<OrderSummary>> {
    return orderRepository.findMany({
      page: Math.max(1, page),
      limit: Math.min(limit, 100),
      sellerId,
    });
  },
};
