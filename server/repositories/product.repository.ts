import { db } from "@/lib/db";
import type {
  ProductSummary,
  ProductDetail,
  PaginationOptions,
  PaginatedResult,
} from "@/server/types";

// Select only the fields we need — never fetch unnecessary columns
const productSummarySelect = {
  id: true,
  name: true,
  price: true,
  stock: true,
  imageUrl: true,
  category: true,
  unit: true,
} as const;

const productDetailSelect = {
  ...productSummarySelect,
  description: true,
  isActive: true,
  createdAt: true,
} as const;

export const productRepository = {
  async findAll(
    options: PaginationOptions & { category?: string }
  ): Promise<PaginatedResult<ProductSummary>> {
    const { page, limit, category } = options;
    const skip = (page - 1) * limit;

    const where = {
      isActive: true,
      ...(category ? { category } : {}),
    };

    const [data, total] = await db.$transaction([
      db.product.findMany({
        where,
        select: productSummarySelect,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      db.product.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  },

  async findById(id: string): Promise<ProductDetail | null> {
    return db.product.findUnique({
      where: { id, isActive: true },
      select: productDetailSelect,
    });
  },

  async findByIds(ids: string[]): Promise<ProductSummary[]> {
    return db.product.findMany({
      where: { id: { in: ids }, isActive: true },
      select: productSummarySelect,
    });
  },
};
