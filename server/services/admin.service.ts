import { db } from "@/lib/db";
import { userRepository } from "@/server/repositories/user.repository";
import { orderRepository } from "@/server/repositories/order.repository";
import { Prisma, Role } from "@prisma/client";
import type { AdminStats, PaginatedResult, UserSummary, OrderSummary } from "@/server/types";

export const adminService = {
  async getStats(): Promise<AdminStats> {
    const { totalUsers, totalSellers } = await userRepository.countByRole();
    const totalProducts = await db.product.count({ where: { isActive: true } });

    const [totalOrders, revenueResult] = await db.$transaction([
      db.order.count(),
      db.order.aggregate({ _sum: { totalAmount: true } }),
    ]);

    const totalRevenue = revenueResult._sum.totalAmount ?? new Prisma.Decimal(0);

    const recentOrdersResult = await orderRepository.findMany({
      page: 1,
      limit: 5,
    });

    return {
      totalUsers,
      totalSellers,
      totalProducts,
      totalOrders,
      totalRevenue,
      recentOrders: recentOrdersResult.data,
    };
  },

  async getUsers(page = 1, limit = 20, role?: Role): Promise<PaginatedResult<UserSummary>> {
    return userRepository.findMany({
      page: Math.max(1, page),
      limit: Math.min(limit, 100),
      role,
    });
  },

  async updateUser(id: string, data: { role?: Role; isActive?: boolean }) {
    return userRepository.updateUser(id, data);
  },

  async getOrders(page = 1, limit = 20): Promise<PaginatedResult<OrderSummary>> {
    return orderRepository.findMany({
      page: Math.max(1, page),
      limit: Math.min(limit, 100),
    });
  },

  async updateOrderStatus(id: string, status: string) {
    return orderRepository.updateStatus(id, status);
  },
};
