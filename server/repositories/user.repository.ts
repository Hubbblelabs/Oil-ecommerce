import { db } from "@/lib/db";
import type { UserSummary, PaginatedResult } from "@/server/types";
import type { Role } from "@prisma/client";

const userSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  isActive: true,
  createdAt: true,
} as const;

export const userRepository = {
  async findMany(options: {
    page: number;
    limit: number;
    role?: Role;
  }): Promise<PaginatedResult<UserSummary>> {
    const { page, limit, role } = options;
    const skip = (page - 1) * limit;
    const where = role ? { role } : {};

    const [data, total] = await db.$transaction([
      db.user.findMany({
        where,
        select: userSelect,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      db.user.count({ where }),
    ]);

    return { data, total, page, totalPages: Math.ceil(total / limit) };
  },

  async findById(id: string): Promise<UserSummary | null> {
    return db.user.findUnique({ where: { id }, select: userSelect });
  },

  async updateUser(id: string, data: { role?: Role; isActive?: boolean }) {
    return db.user.update({
      where: { id },
      data,
      select: userSelect,
    });
  },

  async countByRole() {
    const [totalUsers, totalSellers, totalAdmins] = await db.$transaction([
      db.user.count({ where: { role: "USER" } }),
      db.user.count({ where: { role: "SELLER" } }),
      db.user.count({ where: { role: "ADMIN" } }),
    ]);
    return { totalUsers, totalSellers, totalAdmins };
  },
};
