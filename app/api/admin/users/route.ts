import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/server/auth";
import { adminService } from "@/server/services/admin.service";
import { Role } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    await requireRole([Role.ADMIN]);
    const { searchParams } = request.nextUrl;
    const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
    const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit") ?? "20")));
    const role = searchParams.get("role") as Role | null;

    const users = await adminService.getUsers(page, limit, role ?? undefined);
    return NextResponse.json(users);
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (error.message === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
