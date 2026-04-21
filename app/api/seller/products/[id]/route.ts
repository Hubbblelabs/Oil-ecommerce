import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/server/auth";
import { productService, ProductAccessError } from "@/server/services/product.service";
import { UpdateProductSchema } from "@/server/validations";
import { Role, Category } from "@prisma/client";

export async function PUT(
  request: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireRole([Role.SELLER]);
    const { id } = await ctx.params;
    const body = await request.json();
    const parsed = UpdateProductSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data", details: parsed.error.flatten() }, { status: 400 });
    }

    const data = {
      ...parsed.data,
      category: parsed.data.category as Category | undefined,
      image: parsed.data.image === "" ? null : parsed.data.image,
    };

    const product = await productService.updateProduct(id, user.id, false, data);
    return NextResponse.json(product);
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (error.message === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    if (error instanceof ProductAccessError) return NextResponse.json({ error: error.message }, { status: 403 });
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(
  _req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireRole([Role.SELLER]);
    const { id } = await ctx.params;

    await productService.deleteProduct(id, user.id, false);
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (error.message === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    if (error instanceof ProductAccessError) return NextResponse.json({ error: error.message }, { status: 403 });
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
