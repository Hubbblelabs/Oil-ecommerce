"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const OILS = [
  {
    id: "groundnut",
    name: "Groundnut Oil",
    tamil: "Kadalai Ennai",
    image: "/site_assets/hero_groundnut_oil.png",
    color: "#E08A2E",
    tagline: "Heart-healthy powerhouse for everyday Indian cooking",
    description:
      "Rich in MUFA and natural Vitamin E, our cold-pressed groundnut oil brings out the authentic flavour in every Indian dish. Pressed at low temperatures to retain every nutrient nature intended.",
    nutrients: [
      { name: "Vitamin E", amount: "~11mg/100g" },
      { name: "MUFA", amount: "~46%" },
      { name: "PUFA", amount: "~32%" },
      { name: "SFA", amount: "~17%" },
    ],
    benefits: [
      "Boosts heart health with high MUFA content",
      "Natural Vitamin E antioxidant",
      "High smoke point â€” ideal for deep frying",
      "Resveratrol supports anti-ageing",
    ],
    cookingUse: "Deep frying, daily cooking, Indian curries",
    href: "/products?category=COOKING",
  },
  {
    id: "sesame",
    name: "Sesame Oil",
    tamil: "Nallennai / Gingelly",
    image: "/site_assets/hero_gingelly_oil.png",
    color: "#C97B3D",
    tagline: "Ancient remedy with powerful heat-stable antioxidants",
    description:
      "Sesamol â€” a unique, heat-stable antioxidant found only in sesame â€” makes this oil a powerhouse of anti-inflammatory compounds. Traditional Tamil households have trusted it for generations.",
    nutrients: [
      { name: "Sesamol", amount: "High" },
      { name: "Vitamin E", amount: "~1.4mg/100g" },
      { name: "Calcium", amount: "~13mg/100g" },
      { name: "MUFA", amount: "~41%" },
    ],
    benefits: [
      "Sesamol â€” a powerful heat-stable antioxidant",
      "Anti-inflammatory (sesamin compound)",
      "Supports bone density via natural calcium",
      "Traditional remedy for joint pain",
    ],
    cookingUse: "Tempering, traditional cooking, marinades, massage oil",
    href: "/products?category=COOKING",
  },
  {
    id: "coconut",
    name: "Coconut Oil",
    tamil: "Thengai Ennai",
    image: "/site_assets/hero_coconut_oil.png",
    color: "#7FB069",
    tagline: "MCT-rich immunity booster from the finest coconuts",
    description:
      "Lauric acid in coconut oil converts to monolaurin â€” a powerful anti-microbial agent. Our wood-pressed extraction retains full MCT content for quick, clean energy and immune support.",
    nutrients: [
      { name: "MCT", amount: "~62%" },
      { name: "Lauric Acid", amount: "~49%" },
      { name: "SFA", amount: "~91%" },
      { name: "Vitamin K", amount: "Trace" },
    ],
    benefits: [
      "MCT fats provide quick, clean energy",
      "Lauric acid boosts immunity",
      "Supports thyroid function",
      "Excellent for hair and skin hydration",
    ],
    cookingUse: "Light cooking, Kerala cuisine, hair oil, skin moisturiser",
    href: "/products?category=PREMIUM",
  },
  {
    id: "sunflower",
    name: "Sunflower Oil",
    tamil: "Suryakanthi Ennai",
    image: "/site_assets/hero_sunflower_oil.png",
    color: "#E5B94E",
    tagline: "Exceptionally high Vitamin E for cell protection",
    description:
      "With the highest Vitamin E content of all cooking oils (~41mg/100g), sunflower oil provides superior cell protection. A light, neutral taste makes it perfect for all cuisines.",
    nutrients: [
      { name: "Vitamin E", amount: "~41mg/100g" },
      { name: "PUFA (Ï‰-6)", amount: "~65%" },
      { name: "MUFA", amount: "~19%" },
      { name: "SFA", amount: "~10%" },
    ],
    benefits: [
      "Highest Vitamin E of any cooking oil",
      "Light neutral taste for all cuisines",
      "Reduces LDL cholesterol levels",
      "Skin barrier protection topically",
    ],
    cookingUse: "Daily cooking, baking, salad dressings, sautÃ©ing",
    href: "/products?category=ORGANIC",
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function HealthBenefitsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const oil = OILS[activeIdx];

  const prev = () => setActiveIdx((i) => (i - 1 + OILS.length) % OILS.length);
  const next = () => setActiveIdx((i) => (i + 1) % OILS.length);

  return (
    <section className="grain relative overflow-hidden bg-secondary py-24 text-secondary-foreground sm:py-28">
      {/* Ambient glow that follows the active oil */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08] transition-all duration-700"
        style={{ background: `radial-gradient(ellipse at 75% 45%, ${oil.color} 0%, transparent 55%)` }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header row */}
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4 flex items-center gap-3">
              <span className="font-display italic opacity-50">03</span>
              <span className="inline-block h-px w-10 bg-primary" />
              Know Your Oil
            </p>
            <h2 className="text-display-hero text-4xl sm:text-5xl">
              The goodness of{" "}
              <em className="text-display-italic" style={{ color: oil.color }}>
                {oil.name.split(" ")[0].toLowerCase()}
              </em>
            </h2>
          </div>

          {/* Index + arrows */}
          <div className="flex items-center gap-5">
            <span className="label-xs opacity-60">
              {String(activeIdx + 1).padStart(2, "0")} / {String(OILS.length).padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-secondary-foreground/20 transition-colors hover:border-secondary-foreground/60"
                aria-label="Previous oil"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={next}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-secondary-foreground/20 transition-colors hover:border-secondary-foreground/60"
                aria-label="Next oil"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          {/* LEFT â€” copy */}
          <AnimatePresence mode="wait">
            <motion.div
              key={oil.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <p className="eyebrow mb-3" style={{ color: oil.color }}>
                {oil.tamil}
              </p>
              <p className="mb-3 font-display text-2xl font-medium tracking-tight">{oil.tagline}</p>
              <p className="mb-8 max-w-lg text-sm leading-relaxed opacity-70 sm:text-base">
                {oil.description}
              </p>

              {/* Nutrients â€” tabular editorial list */}
              <dl className="mb-8 grid max-w-md grid-cols-2 gap-px overflow-hidden rounded-2xl border border-secondary-foreground/15 bg-secondary-foreground/15">
                {oil.nutrients.map(({ name, amount }) => (
                  <div key={name} className="bg-secondary px-5 py-4">
                    <dt className="label-tiny opacity-60">{name}</dt>
                    <dd className="mt-1 font-display text-lg font-semibold" style={{ color: oil.color }}>
                      {amount}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Benefits */}
              <ul className="mb-10 space-y-2.5">
                {oil.benefits.map((b, i) => (
                  <li key={b} className="flex items-start gap-3 text-sm font-medium opacity-85">
                    <span className="label-tiny mt-0.5 shrink-0" style={{ color: oil.color }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              <Link
                href={oil.href}
                className="btn-shine group inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-bold text-white transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: oil.color }}
              >
                Shop {oil.name.split(" ")[0]}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* RIGHT â€” imagery */}
          <div className="relative">
            <div className="grain relative mx-auto aspect-[3/4] max-w-sm overflow-hidden rounded-[2rem] border border-secondary-foreground/15">
              <AnimatePresence mode="wait">
                <motion.div
                  key={oil.id + "-img"}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="absolute inset-0"
                >
                  <Image src={oil.image} alt={oil.name} fill className="object-cover" sizes="420px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <span
                    className="label-tiny absolute bottom-5 left-5 rounded-full border px-4 py-2 backdrop-blur-md"
                    style={{ borderColor: `${oil.color}50`, background: `${oil.color}22`, color: oil.color }}
                  >
                    {oil.cookingUse.split(",")[0]}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnail selector */}
            <div className="mt-5 flex justify-center gap-3">
              {OILS.map((o, i) => (
                <button
                  key={o.id}
                  onClick={() => setActiveIdx(i)}
                  className="relative h-14 w-14 overflow-hidden rounded-2xl border-2 transition-all duration-300"
                  style={{
                    borderColor: i === activeIdx ? o.color : "transparent",
                    opacity: i === activeIdx ? 1 : 0.45,
                    transform: i === activeIdx ? "scale(1.08)" : "scale(1)",
                  }}
                  aria-label={`Show ${o.name}`}
                >
                  <Image src={o.image} alt="" fill className="object-cover" sizes="56px" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
