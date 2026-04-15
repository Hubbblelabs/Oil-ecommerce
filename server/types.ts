import type { Prisma, OrderStatus } from "@prisma/client";

// ─────────────────────────────────────────────
// Shared value types
// ─────────────────────────────────────────────

export type { OrderStatus };

// ─────────────────────────────────────────────
// Product types
// ─────────────────────────────────────────────

/** Minimal product fields used on listing pages */
export interface ProductSummary {
  id: string;
  name: string;
  price: Prisma.Decimal;
  stock: number;
  imageUrl: string | null;
  category: string;
  unit: string;
}

/** Full product details for product detail page */
export interface ProductDetail extends ProductSummary {
  description: string;
  isActive: boolean;
  createdAt: Date;
}

// ─────────────────────────────────────────────
// Order input types
// ─────────────────────────────────────────────

export interface OrderItemInput {
  productId: string;
  quantity: number;
}

export interface CreateOrderInput {
  items: OrderItemInput[];
  guestEmail: string;
}

// ─────────────────────────────────────────────
// Order response types
// ─────────────────────────────────────────────

export interface OrderItemSummary {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: Prisma.Decimal;
}

export interface OrderSummary {
  id: string;
  status: OrderStatus;
  totalAmount: Prisma.Decimal;
  guestEmail: string | null;
  createdAt: Date;
  items: OrderItemSummary[];
}

// ─────────────────────────────────────────────
// Pagination types
// ─────────────────────────────────────────────

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

export interface PaginationOptions {
  page: number;
  limit: number;
}
