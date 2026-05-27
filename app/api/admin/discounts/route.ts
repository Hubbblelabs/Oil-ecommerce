import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/server/auth";
import { discountService } from "@/server/services/discount.service";

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const discounts = await discountService.listDiscounts();
    return NextResponse.json({ discounts });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch discounts";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const { description, percentage } = await req.json();
    if (!description || !percentage) {
      return NextResponse.json({ error: "Description and percentage are required." }, { status: 400 });
    }
    const discount = await discountService.createDiscount(description, Number(percentage));
    return NextResponse.json({ discount }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create discount";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
