import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/server/auth";
import { discountService } from "@/server/services/discount.service";
import { Role } from "@prisma/client";

export async function PATCH(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireRole([Role.ADMIN]);
    const { id } = await params;
    const discount = await discountService.toggleDiscount(id);
    return NextResponse.json({ discount });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to toggle discount";
    if (message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (message === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireRole([Role.ADMIN]);
    const { id } = await params;
    await discountService.deleteDiscount(id);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete discount";
    if (message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (message === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
