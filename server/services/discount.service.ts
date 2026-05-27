import { db } from "@/lib/db";

// Generate a random 8-character uppercase alphanumeric code
function generateDiscountCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export const discountService = {
  async createDiscount(description: string, percentage: number) {
    if (percentage <= 0 || percentage > 100) {
      throw new Error("Discount percentage must be between 1 and 100.");
    }

    // Generate a unique code (retry if collision)
    let code = generateDiscountCode();
    let attempts = 0;
    while (attempts < 5) {
      const existing = await db.discount.findUnique({ where: { code } });
      if (!existing) break;
      code = generateDiscountCode();
      attempts++;
    }

    return db.discount.create({
      data: { code, description, percentage },
    });
  },

  async listDiscounts() {
    return db.discount.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { orders: true } },
      },
    });
  },

  async validateDiscount(code: string) {
    const discount = await db.discount.findUnique({
      where: { code: code.trim().toUpperCase() },
    });

    if (!discount) {
      throw new Error("Invalid discount code.");
    }
    if (!discount.isActive) {
      throw new Error("This discount code is no longer active.");
    }

    return discount;
  },

  async toggleDiscount(id: string) {
    const discount = await db.discount.findUnique({ where: { id } });
    if (!discount) throw new Error("Discount not found.");
    return db.discount.update({
      where: { id },
      data: { isActive: !discount.isActive },
    });
  },

  async deleteDiscount(id: string) {
    return db.discount.delete({ where: { id } });
  },

  async incrementUsage(id: string) {
    return db.discount.update({
      where: { id },
      data: { usageCount: { increment: 1 } },
    });
  },
};
