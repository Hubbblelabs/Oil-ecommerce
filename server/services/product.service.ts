import { productRepository } from "@/server/repositories/product.repository";
import type {
  ProductSummary,
  ProductDetail,
  PaginatedResult,
} from "@/server/types";
import { Category } from "@prisma/client";

const DEFAULT_PAGE_LIMIT = 12;

export const productService = {
  // ── Public operations ─────────────────────────────────────────────────────

  async getProducts(
    page = 1,
    limit = DEFAULT_PAGE_LIMIT,
    category?: string,
    search?: string
  ): Promise<PaginatedResult<ProductSummary>> {
    return productRepository.findAll({
      page: Math.max(1, page),
      limit: Math.min(limit, 100),
      category: category as Category | undefined,
      search,
    });
  },

  async getProductById(id: string): Promise<ProductDetail | null> {
    return productRepository.findById(id);
  },

  // ── Admin operations (caller must enforce ADMIN role) ────────────────────

  async getAllProducts(
    page = 1,
    limit = DEFAULT_PAGE_LIMIT,
    search?: string
  ): Promise<PaginatedResult<ProductSummary>> {
    return productRepository.findAll({
      page: Math.max(1, page),
      limit: Math.min(limit, 100),
      includeInactive: true,
      search,
    });
  },

  async createProduct(
    adminId: string,
    data: {
      name: string;
      price: number;
      stock: number;
      image?: string;
      description?: string;
      category: Category;
    }
  ): Promise<ProductDetail> {
    return productRepository.create({ ...data, createdByAdminId: adminId });
  },

  async updateProduct(
    id: string,
    data: Partial<{
      name: string;
      price: number;
      stock: number;
      image: string | null;
      description: string | null;
      category: Category;
      isActive: boolean;
    }>
  ): Promise<ProductDetail> {
    const product = await productRepository.findByIdAny(id);
    if (!product) throw new Error("Product not found.");
    return productRepository.update(id, data);
  },

  async deleteProduct(id: string): Promise<ProductDetail> {
    const product = await productRepository.findByIdAny(id);
    if (!product) throw new Error("Product not found.");
    return productRepository.softDelete(id);
  },

  async getLowStockAlerts() {
    return productRepository.getLowStock();
  },
};
