import { z } from "zod";

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2).optional(),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const CreateProductSchema = z.object({
  name: z.string().min(2),
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),
  image: z.string().url().optional().or(z.literal("")),
  category: z.enum(["COOKING", "PREMIUM", "ORGANIC", "INDUSTRIAL"]),
});

export const UpdateProductSchema = CreateProductSchema.partial();

export const OrderItemSchema = z.object({
  productId: z.string().cuid(),
  quantity: z.number().int().positive(),
});

export const CreateOrderSchema = z.object({
  items: z.array(OrderItemSchema).min(1, "At least one item is required"),
  shippingAddress: z.string().min(10, "Shipping address is required"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
});

export const UpdateOrderStatusSchema = z.object({
  status: z.enum(["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"]),
});

export const UpdateUserSchema = z.object({
  role: z.enum(["ADMIN", "SELLER", "USER"]).optional(),
  isActive: z.boolean().optional(),
});

