"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Priya Sundaram",
    location: "Chennai",
    avatar: "P",
    rating: 5,
    text: "Switched to Shri Sameya groundnut oil six months ago and we can never go back. The aroma while cooking is incredible — exactly like my grandmother used to make. My whole family has noticed the difference in health.",
    product: "Groundnut Oil · 1L",
  },
  {
    name: "Rajan & Family",
    location: "Coimbatore",
    avatar: "R",
    rating: 5,
    text: "The gingelly oil from Shri Sameya is extraordinary. I use it for temple cooking and the taste and fragrance are unmatched. Pure, authentic, and delivered fresh. Will never order from anywhere else.",
    product: "Gingelly Oil · 1L",
  },
  {
    name: "Meena Krishnamurthy",
    location: "Bangalore",
    avatar: "M",
    rating: 5,
    text: "As someone who cares deeply about what goes into our food, I researched many brands. Shri Sameya stands out — zero adulteration, real cold pressing, and it genuinely tastes different from supermarket oils.",
    product: "Coconut Oil · 1L",
  },
  {
    name: "Suresh Iyer",
    location: "Mumbai",
    avatar: "S",
    rating: 5,
    text: "Ordering the 5L bulk pack for my restaurant was the best decision. My customers immediately noticed the improvement in taste. The oils perform beautifully at high heat too. Highly recommended!",
    product: "Groundnut Oil · 5L",
  },
];

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-[#D97706] text-[#D97706]" />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? TESTIMONIALS.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === TESTIMONIALS.length - 1 ? 0 : c + 1));
  const t = TESTIMONIALS[current];

  return (
    <section className="py-20 bg-[#FAF8F2] dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#D97706] text-sm font-bold uppercase tracking-widest mb-3">Reviews</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#3B2416] dark:text-white">
            What Our Families Say
          </h2>
          {/* Aggregate rating */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className={`h-5 w-5 ${i <= 4 ? "fill-[#D97706] text-[#D97706]" : "fill-[#D97706]/40 text-[#D97706]/40"}`} />
              ))}
            </div>
            <span className="text-2xl font-bold text-[#3B2416] dark:text-white">4.8</span>
            <span className="text-muted-foreground text-sm">from 3,800+ orders</span>
          </div>
        </div>

        {/* Testimonial slider */}
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white dark:bg-zinc-900 rounded-3xl p-8 sm:p-10 border border-[#E9D8A6]/60 dark:border-zinc-800 shadow-[0_8px_40px_rgba(59,36,22,0.08)] relative"
            >
              {/* Quote icon */}
              <Quote className="absolute top-6 right-8 h-12 w-12 text-[#D97706]/10" />

              <Stars count={t.rating} />

              <p className="text-[#3B2416] dark:text-white text-lg leading-relaxed mt-5 mb-7 font-medium">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="h-12 w-12 rounded-full bg-[#D97706] flex items-center justify-center text-white font-bold text-base shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-bold text-[#3B2416] dark:text-white text-sm">{t.name}</p>
                  <p className="text-muted-foreground text-xs">{t.location}</p>
                </div>
                <div className="ml-auto">
                  <span className="bg-[#D97706]/10 text-[#D97706] text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                    {t.product}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="h-10 w-10 rounded-full border border-[#E9D8A6] dark:border-zinc-700 flex items-center justify-center hover:bg-[#D97706] hover:border-[#D97706] hover:text-white transition-all"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${i === current ? "w-6 bg-[#D97706]" : "w-2 bg-[#E9D8A6] dark:bg-zinc-700"}`}
                  aria-label={`Review ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="h-10 w-10 rounded-full border border-[#E9D8A6] dark:border-zinc-700 flex items-center justify-center hover:bg-[#D97706] hover:border-[#D97706] hover:text-white transition-all"
              aria-label="Next review"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
