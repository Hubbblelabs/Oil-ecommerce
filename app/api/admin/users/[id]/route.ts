import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/server/auth";
import { adminService } from "@/server/services/admin.service";
import { UpdateUserSchema } from "@/server/validations";
import { Role } from "@prisma/client";

export async function PATCH(
  request: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    await requireRole([Role.ADMIN]);
    const { id } = await ctx.params;
    const body = await request.json();
    const parsed = UpdateUserSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data", details: parsed.error.flatten() }, { status: 400 });
    }

    const user = await adminService.updateUser(id, parsed.data);
    return NextResponse.json(user);
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (error.message === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
