import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/server/auth";
import { sellerService } from "@/server/services/seller.service";
import { Role } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const user = await requireRole([Role.SELLER]);
    const { searchParams } = request.nextUrl;
    const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
    const limit = Math.min(100, Number(searchParams.get("limit") ?? "20"));

    const orders = await sellerService.getOrders(user.id, page, limit);
    return NextResponse.json(orders);
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (error.message === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
