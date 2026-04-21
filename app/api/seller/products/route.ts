import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/server/auth";
import { productService } from "@/server/services/product.service";
import { CreateProductSchema } from "@/server/validations";
import { Role, Category } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const user = await requireRole([Role.SELLER]);
    const { searchParams } = request.nextUrl;
    const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
    const limit = Math.min(100, Number(searchParams.get("limit") ?? "20"));

    const products = await productService.getSellerProducts(user.id, page, limit);
    return NextResponse.json(products);
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (error.message === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireRole([Role.SELLER]);
    const body = await request.json();
    const parsed = CreateProductSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data", details: parsed.error.flatten() }, { status: 400 });
    }

    const product = await productService.createProduct(user.id, {
      ...parsed.data,
      category: parsed.data.category as Category,
      image: parsed.data.image || undefined,
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (error.message === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
