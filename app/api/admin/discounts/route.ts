import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/server/auth";
import { discountService } from "@/server/services/discount.service";
import { Role } from "@prisma/client";

export async function GET() {
  try {
    await requireRole([Role.ADMIN]);
    const discounts = await discountService.listDiscounts();
    return NextResponse.json({ discounts });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch discounts";
    if (message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (message === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireRole([Role.ADMIN]);
    const { description, percentage } = await req.json();
    if (!description || !percentage) {
      return NextResponse.json({ error: "Description and percentage are required." }, { status: 400 });
    }
    const discount = await discountService.createDiscount(description, Number(percentage));
    return NextResponse.json({ discount }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create discount";
    if (message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (message === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
