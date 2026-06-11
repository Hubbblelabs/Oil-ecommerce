"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Priya Sundaram",
    location: "Chennai",
    rating: 5,
    text: "Switched to Shri Sameya groundnut oil six months ago and we can never go back. The aroma while cooking is incredible — exactly like my grandmother used to make.",
    product: "Groundnut Oil · 1L",
  },
  {
    name: "Rajan & Family",
    location: "Coimbatore",
    rating: 5,
    text: "The gingelly oil from Shri Sameya is extraordinary. I use it for temple cooking and the taste and fragrance are unmatched. Pure, authentic, and delivered fresh.",
    product: "Gingelly Oil · 1L",
  },
  {
    name: "Meena Krishnamurthy",
    location: "Bangalore",
    rating: 5,
    text: "As someone who cares deeply about what goes into our food, I researched many brands. Shri Sameya stands out — zero adulteration, real cold pressing, and it genuinely tastes different.",
    product: "Coconut Oil · 1L",
  },
  {
    name: "Suresh Iyer",
    location: "Mumbai",
    rating: 5,
    text: "Ordering the 5L bulk pack for my restaurant was the best decision. My customers immediately noticed the improvement in taste. The oils perform beautifully at high heat too.",
    product: "Groundnut Oil · 5L",
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
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
    <section className="bg-paper-deep py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* LEFT — header + controls */}
          <div className="lg:col-span-4 flex flex-col">
            <p className="eyebrow mb-4 flex items-center gap-3">
              <span className="font-display italic text-muted-foreground">05</span>
              <span className="inline-block h-px w-10 bg-primary" />
              Reviews
            </p>
            <h2 className="text-display-hero text-4xl text-foreground sm:text-5xl">
              Words from
              <br />
              <em className="text-display-italic text-primary">our families</em>
            </h2>

            <div className="mt-7 flex items-center gap-3">
              <Stars count={5} />
              <span className="font-display text-2xl font-semibold text-foreground">4.8</span>
              <span className="label-tiny">3,800+ orders</span>
            </div>

            <div className="mt-auto hidden items-center gap-3 pt-10 lg:flex">
              <button
                onClick={prev}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card transition-colors hover:border-primary hover:text-primary"
                aria-label="Previous review"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={next}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card transition-colors hover:border-primary hover:text-primary"
                aria-label="Next review"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
              <span className="label-xs ml-3">
                {String(current + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* RIGHT — big editorial quote */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.figure
                key={current}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="flex h-full flex-col border-l border-border pl-8 sm:pl-12"
              >
                <blockquote className="font-display text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                  &ldquo;{t.text}&rdquo;
                </blockquote>

                <figcaption className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-display text-lg italic text-primary-foreground">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{t.name}</p>
                    <p className="label-tiny mt-0.5">{t.location}</p>
                  </div>
                  <span className="label-tiny ml-auto rounded-full border border-border bg-card px-4 py-2 text-foreground/70">
                    {t.product}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            {/* Mobile controls */}
            <div className="mt-8 flex items-center gap-3 lg:hidden">
              <button
                onClick={prev}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card transition-colors hover:border-primary hover:text-primary"
                aria-label="Previous review"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={next}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card transition-colors hover:border-primary hover:text-primary"
                aria-label="Next review"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
              <div className="ml-2 flex gap-1.5">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === current ? "w-6 bg-primary" : "w-1.5 bg-border"
                    }`}
                    aria-label={`Review ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
