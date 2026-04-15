import { productRepository } from "@/server/repositories/product.repository";
import type {
  ProductSummary,
  ProductDetail,
  PaginatedResult,
} from "@/server/types";

const DEFAULT_PAGE_LIMIT = 12;

export const productService = {
  async getProducts(
    page = 1,
    limit = DEFAULT_PAGE_LIMIT,
    category?: string
  ): Promise<PaginatedResult<ProductSummary>> {
    return productRepository.findAll({
      page: Math.max(1, page),
      limit: Math.min(limit, 100), // cap to prevent abuse
      category,
    });
  },

  async getProductById(id: string): Promise<ProductDetail | null> {
    return productRepository.findById(id);
  },
};
