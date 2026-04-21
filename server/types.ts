import type { Prisma, OrderStatus, Category } from '@prisma/client';
export type { OrderStatus, Category };
export interface ProductSummary {
  id: string;
  name: string;
  price: Prisma.Decimal;
  stock: number;
  image: string | null;
  category: Category;
  sellerId: string;
}
export interface ProductDetail extends ProductSummary {
  isActive: boolean;
  createdAt: Date;
}
export interface OrderItemInput {
  productId: string;
  quantity: number;
}
export interface CreateOrderInput {
  items: OrderItemInput[];
}
export interface OrderItemSummary {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: Prisma.Decimal;
}
export interface OrderSummary {
  id: string;
  status: OrderStatus;
  totalAmount: Prisma.Decimal;
  userId: string;
  createdAt: Date;
  items: OrderItemSummary[];
}
export interface PaginationOptions {
  page: number;
  limit: number;
}
export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}