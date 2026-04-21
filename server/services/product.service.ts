import { productRepository } from "@/server/repositories/product.repository";
import type {
  ProductSummary,
  ProductDetail,
  PaginatedResult,
} from "@/server/types";
import { Category } from "@prisma/client";

const DEFAULT_PAGE_LIMIT = 12;

export class ProductAccessError extends Error {
  constructor() {
    super("You do not have permission to modify this product.");
    this.name = "ProductAccessError";
  }
}

export const productService = {
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

  // ── Seller operations ───────────────────────────────────────────────────

  async getSellerProducts(
    sellerId: string,
    page = 1,
    limit = DEFAULT_PAGE_LIMIT
  ): Promise<PaginatedResult<ProductDetail>> {
    return productRepository.findBySeller(sellerId, {
      page: Math.max(1, page),
      limit: Math.min(limit, 100),
    });
  },

  async createProduct(
    sellerId: string,
    data: {
      name: string;
      price: number;
      stock: number;
      image?: string;
      category: Category;
    }
  ): Promise<ProductDetail> {
    return productRepository.create({ ...data, sellerId });
  },

  async updateProduct(
    id: string,
    sellerId: string,
    isAdmin: boolean,
    data: Partial<{
      name: string;
      price: number;
      stock: number;
      image: string | null;
      category: Category;
      isActive: boolean;
    }>
  ): Promise<ProductDetail> {
    const product = await productRepository.findByIdAny(id);
    if (!product) throw new Error("Product not found.");
    if (!isAdmin && product.sellerId !== sellerId) throw new ProductAccessError();
    return productRepository.update(id, data);
  },

  async deleteProduct(
    id: string,
    sellerId: string,
    isAdmin: boolean
  ): Promise<ProductDetail> {
    const product = await productRepository.findByIdAny(id);
    if (!product) throw new Error("Product not found.");
    if (!isAdmin && product.sellerId !== sellerId) throw new ProductAccessError();
    return productRepository.softDelete(id);
  },

  async getLowStockAlerts(sellerId: string) {
    return productRepository.getLowStock(sellerId);
  },

  // ── Admin operations ────────────────────────────────────────────────────

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
};

