import { NextRequest, NextResponse } from "next/server";
import { discountService } from "@/server/services/discount.service";

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();
    if (!code || typeof code !== "string") {
      return NextResponse.json({ error: "Discount code is required." }, { status: 400 });
    }

    const discount = await discountService.validateDiscount(code);
    return NextResponse.json({
      id: discount.id,
      code: discount.code,
      description: discount.description,
      percentage: discount.percentage,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Invalid discount code";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
