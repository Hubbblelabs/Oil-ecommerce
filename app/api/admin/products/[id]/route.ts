import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/server/auth";
import { productService } from "@/server/services/product.service";
import { UpdateProductSchema } from "@/server/validations";
import { Role } from "@prisma/client";

export async function PATCH(
  request: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireRole([Role.ADMIN]);
    const { id } = await ctx.params;
    const body = await request.json();
    const parsed = UpdateProductSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data", details: parsed.error.flatten() }, { status: 400 });
    }

    const product = await productService.updateProduct(id, admin.id, true, parsed.data);
    return NextResponse.json(product);
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (error.message === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(
  _req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireRole([Role.ADMIN]);
    const { id } = await ctx.params;
    await productService.deleteProduct(id, admin.id, true);
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (error.message === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
