import type { Prisma, OrderStatus, Category, Role } from '@prisma/client';
export type { OrderStatus, Category, Role };

export interface UserSummary {
  id: string;
  name: string | null;
  email: string;
  role: Role;
  isActive: boolean;
  createdAt: Date;
}

export interface ProductSummary {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string | null;
  category: Category;
  createdByAdminId: string;
  createdByAdminName?: string | null;
}

export interface ProductDetail extends ProductSummary {
  description: string | null;
  isActive: boolean;
  createdAt: Date;
}

export interface OrderItemInput {
  productId: string;
  quantity: number;
}

export interface CreateOrderInput {
  items: OrderItemInput[];
  shippingAddress: string;
  phone: string;
  discountId?: string;
  discountAmount?: number;
}

export interface OrderItemSummary {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface OrderSummary {
  id: string;
  status: OrderStatus;
  totalAmount: number;
  userId: string;
  shippingAddress: string;
  phone: string;
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

export interface AdminStats {
  totalUsers: number;
  totalAdmins: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  recentOrders: OrderSummary[];
}