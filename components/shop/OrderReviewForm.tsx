"use client";

import { useState, useEffect } from "react";
import { Star, MessageSquare, Check, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { isFeatureEnabled } from "@/lib/features";

interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

interface OrderReviewFormProps {
  orderId: string;
  items: OrderItem[];
}

export function OrderReviewForm({ orderId, items }: OrderReviewFormProps) {
  const [reviewsState, setReviewsState] = useState<Record<string, { rating: number; comment: string; loading: boolean; submitted: boolean }>>({});
  const [feedbackEnabled, setFeedbackEnabled] = useState(true);

  useEffect(() => {
    setFeedbackEnabled(isFeatureEnabled("feedback"));
    
    // Initialize reviews state for each product
    const initial: typeof reviewsState = {};
    items.forEach((item) => {
      initial[item.productId] = {
        rating: 5,
        comment: "",
        loading: false,
        submitted: false,
      };
    });
    setReviewsState(initial);
  }, [items]);

  if (!feedbackEnabled) return null;

  const handleRatingChange = (productId: string, rating: number) => {
    setReviewsState((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        rating,
      },
    }));
  };

  const handleCommentChange = (productId: string, comment: string) => {
    setReviewsState((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        comment,
      },
    }));
  };

  const handleSubmit = async (productId: string) => {
    const state = reviewsState[productId];
    if (state.comment.trim().length < 5) {
      toast.error("Feedback comment must be at least 5 characters long.");
      return;
    }

    setReviewsState((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], loading: true },
    }));

    try {
      const res = await fetch(`/api/products/${productId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating: state.rating,
          comment: state.comment.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "Failed to submit review.");
        setReviewsState((prev) => ({
          ...prev,
          [productId]: { ...prev[productId], loading: false },
        }));
        return;
      }

      toast.success("Feedback submitted successfully! Thank you!");
      setReviewsState((prev) => ({
        ...prev,
        [productId]: { ...prev[productId], loading: false, submitted: true },
      }));
    } catch {
      toast.error("Network error. Please try again.");
      setReviewsState((prev) => ({
        ...prev,
        [productId]: { ...prev[productId], loading: false },
      }));
    }
  };

  return (
    <section className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-[#E9D8A6]/60 dark:border-zinc-800 shadow-sm relative overflow-hidden mt-8">
      {/* Dynamic Gold Glow */}
      <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-amber-400 to-[#D97706]"></div>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-950/20 text-amber-600 flex items-center justify-center">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">Verified Purchase Feedback</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Share your experience with Shri Sameya Traditional Oils</p>
        </div>
      </div>

      <div className="space-y-6">
        {items.map((item) => {
          const state = reviewsState[item.productId] || { rating: 5, comment: "", loading: false, submitted: false };

          return (
            <div
              key={item.productId}
              className="p-5 rounded-2xl border border-border/50 bg-[#FAF8F2]/50 dark:bg-zinc-950/20 flex flex-col gap-4"
            >
              <div className="flex justify-between items-center gap-4 border-b border-border/40 pb-3">
                <span className="font-bold text-sm text-[#3B2416] dark:text-white uppercase tracking-wider">
                  {item.productName}
                </span>
                <span className="text-xs text-muted-foreground font-semibold">Qty: {item.quantity}</span>
              </div>

              {state.submitted ? (
                <div className="flex items-center gap-2 text-green-600 font-bold text-sm py-4 animate-in zoom-in duration-200">
                  <div className="w-7 h-7 rounded-full bg-green-50 dark:bg-green-950/30 flex items-center justify-center text-green-600">
                    <Check className="w-4 h-4" />
                  </div>
                  <span>Verified Purchase Review Submitted. Thank you!</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Rating selection */}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                      Rate Product
                    </span>
                    <div className="flex text-zinc-300 gap-1.5">
                      {[1, 2, 3, 4, 5].map((stars) => {
                        const active = stars <= state.rating;
                        return (
                          <button
                            key={stars}
                            type="button"
                            disabled={state.loading}
                            onClick={() => handleRatingChange(item.productId, stars)}
                            className="focus:outline-none hover:scale-110 transition-transform"
                          >
                            <Star
                              className={`h-7 w-7 ${
                                active ? "fill-amber-500 text-amber-500" : "text-zinc-300 dark:text-zinc-700"
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Comment input */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                      Share your experience
                    </label>
                    <textarea
                      placeholder="How did you like the aroma, color, and taste of this wood pressed oil? (at least 5 characters)"
                      value={state.comment}
                      onChange={(e) => handleCommentChange(item.productId, e.target.value)}
                      disabled={state.loading}
                      rows={3}
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none transition-shadow"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="button"
                    onClick={() => handleSubmit(item.productId)}
                    disabled={state.loading || state.comment.trim().length < 5}
                    className="h-10 px-5 rounded-xl text-xs font-bold bg-[#3B2416] hover:bg-[#D97706] text-white flex items-center justify-center gap-1.5 transition-colors self-start shadow-sm disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
                  >
                    {state.loading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <MessageSquare className="w-3.5 h-3.5" />
                        Submit Verified Review
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
