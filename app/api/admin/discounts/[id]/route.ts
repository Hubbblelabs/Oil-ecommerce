import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/server/auth";
import { discountService } from "@/server/services/discount.service";

export async function PATCH(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const { id } = await params;
    const discount = await discountService.toggleDiscount(id);
    return NextResponse.json({ discount });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to toggle discount";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const { id } = await params;
    await discountService.deleteDiscount(id);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete discount";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
