import { NextRequest } from "next/server";
import { cacheLife, cacheTag } from "next/cache";
import { productService } from "@/server/services/product.service";

// GET /api/products?page=1&limit=12&category=olive
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
  const limit = Math.min(
    100,
    Math.max(1, Number(searchParams.get("limit") ?? "12"))
  );
  const category = searchParams.get("category") ?? undefined;

  const products = await getCachedProducts(page, limit, category);

  return Response.json(products);
}

// 'use cache' cannot be placed directly in a Route Handler body —
// extract to a helper function per Next.js 16 docs.
async function getCachedProducts(
  page: number,
  limit: number,
  category: string | undefined
) {
  "use cache";
  cacheLife("hours");
  cacheTag("products");
  return productService.getProducts(page, limit, category);
}
