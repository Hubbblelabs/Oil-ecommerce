import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/server/auth";
import { z } from "zod";

const CreateReviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(5, "Review comment must be at least 5 characters"),
});

// GET /api/products/[id]/reviews - List all reviews
export async function GET(
  _request: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const { id: productId } = await ctx.params;

    const reviews = await db.review.findMany({
      where: { productId },
      select: {
        id: true,
        rating: true,
        comment: true,
        createdAt: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    // Format reviews for UI consumption
    const formattedReviews = reviews.map((r) => ({
      id: r.id,
      rating: r.rating,
      comment: r.comment,
      createdAt: r.createdAt.toISOString(),
      userName: r.user.name ?? r.user.email.split("@")[0],
    }));

    return NextResponse.json({ reviews: formattedReviews });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load reviews" }, { status: 500 });
  }
}

// POST /api/products/[id]/reviews - Create a new review
export async function POST(
  request: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: productId } = await ctx.params;
    const body = await request.json();
    const parsed = CreateReviewSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // 1. Verify that the user has actually purchased this product in a completed/paid order
    const purchase = await db.order.findFirst({
      where: {
        userId: user.id,
        status: { in: ["PAID", "SHIPPED", "DELIVERED"] },
        items: {
          some: {
            productId,
          },
        },
      },
    });

    if (!purchase) {
      return NextResponse.json(
        { error: "You can only leave feedback on products you have actually purchased." },
        { status: 403 }
      );
    }

    // 2. Check if they have already reviewed this product to avoid duplicate reviews
    const existingReview = await db.review.findFirst({
      where: {
        productId,
        userId: user.id,
      },
    });

    if (existingReview) {
      return NextResponse.json(
        { error: "You have already left feedback for this product." },
        { status: 409 }
      );
    }

    // 3. Create the review
    const review = await db.review.create({
      data: {
        productId,
        userId: user.id,
        rating: parsed.data.rating,
        comment: parsed.data.comment,
      },
      select: {
        id: true,
        rating: true,
        comment: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        ...review,
        userName: user.email.split("@")[0],
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }
}
