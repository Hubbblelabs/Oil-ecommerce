import { NextResponse } from "next/server";
import { requireRole } from "@/server/auth";
import { adminService } from "@/server/services/admin.service";
import { Role } from "@prisma/client";

export async function GET() {
  try {
    await requireRole([Role.ADMIN]);
    const stats = await adminService.getStats();
    return NextResponse.json(stats);
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (error.message === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
