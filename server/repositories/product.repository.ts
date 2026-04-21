import { db } from '@/lib/db';
import type {
  ProductSummary,
  ProductDetail,
  PaginationOptions,
  PaginatedResult,
} from '@/server/types';
import { Category } from '@prisma/client';

const productSummarySelect = {
  id: true,
  name: true,
  price: true,
  stock: true,
  image: true,
  category: true,
  sellerId: true,
} as const;

const productDetailSelect = {
  ...productSummarySelect,
  isActive: true,
  createdAt: true,
} as const;

export const productRepository = {
  async findAll(
    options: PaginationOptions & { category?: Category; search?: string; includeInactive?: boolean }
  ): Promise<PaginatedResult<ProductSummary>> {
    const { page, limit, category, search, includeInactive } = options;
    const skip = (page - 1) * limit;

    const where = {
      ...(includeInactive ? {} : { isActive: true }),
      ...(category ? { category } : {}),
      ...(search
        ? { name: { contains: search, mode: 'insensitive' as const } }
        : {}),
    };

    const [data, total] = await db.$transaction([
      db.product.findMany({
        where,
        select: productSummarySelect,
        orderBy: { createdAt: 'desc' },
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

  async findBySeller(
    sellerId: string,
    options: PaginationOptions
  ): Promise<PaginatedResult<ProductDetail>> {
    const { page, limit } = options;
    const skip = (page - 1) * limit;
    const where = { sellerId };

    const [data, total] = await db.$transaction([
      db.product.findMany({
        where,
        select: productDetailSelect,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      db.product.count({ where }),
    ]);

    return { data, total, page, totalPages: Math.ceil(total / limit) };
  },

  async findById(id: string): Promise<ProductDetail | null> {
    return db.product.findUnique({
      where: { id, isActive: true },
      select: productDetailSelect,
    });
  },

  async findByIdAny(id: string): Promise<ProductDetail | null> {
    return db.product.findUnique({
      where: { id },
      select: productDetailSelect,
    });
  },

  async findByIds(ids: string[]): Promise<ProductSummary[]> {
    return db.product.findMany({
      where: { id: { in: ids }, isActive: true },
      select: productSummarySelect,
    });
  },

  async create(data: {
    name: string;
    price: number;
    stock: number;
    image?: string;
    category: Category;
    sellerId: string;
  }): Promise<ProductDetail> {
    return db.product.create({
      data: {
        name: data.name,
        price: data.price,
        stock: data.stock,
        image: data.image ?? null,
        category: data.category,
        sellerId: data.sellerId,
      },
      select: productDetailSelect,
    });
  },

  async update(
    id: string,
    data: Partial<{
      name: string;
      price: number;
      stock: number;
      image: string | null;
      category: Category;
      isActive: boolean;
    }>
  ): Promise<ProductDetail> {
    return db.product.update({
      where: { id },
      data,
      select: productDetailSelect,
    });
  },

  async softDelete(id: string): Promise<ProductDetail> {
    return db.product.update({
      where: { id },
      data: { isActive: false },
      select: productDetailSelect,
    });
  },

  async getLowStock(sellerId: string, threshold = 10) {
    return db.product.findMany({
      where: { sellerId, stock: { lte: threshold }, isActive: true },
      select: { id: true, name: true, stock: true },
      orderBy: { stock: 'asc' },
      take: 10,
    });
  },
};

