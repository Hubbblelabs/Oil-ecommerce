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
    categoryImage: "/site_assets/category_groundnut.png",
    color: "#D97706",
    colorLight: "rgba(217,119,6,0.08)",
    colorBorder: "rgba(217,119,6,0.25)",
    tagline: "Heart-healthy powerhouse for everyday Indian cooking",
    description:
      "Rich in MUFA and natural Vitamin E, our cold-pressed groundnut oil brings out the authentic flavour in every Indian dish. Cold pressed at low temperatures to retain every nutrient nature intended.",
    nutrients: [
      { name: "Vitamin E", amount: "~11mg/100g" },
      { name: "MUFA", amount: "~46%" },
      { name: "PUFA", amount: "~32%" },
      { name: "SFA", amount: "~17%" },
    ],
    benefits: [
      "Boosts heart health with high MUFA content",
      "Natural Vitamin E antioxidant",
      "High smoke point — ideal for deep frying",
      "Resveratrol supports anti-ageing",
    ],
    cookingUse: "Deep frying, daily cooking, Indian curries",
    href: "/?category=COOKING",
  },
  {
    id: "sesame",
    name: "Sesame Oil",
    tamil: "Nallennai / Gingelly",
    image: "/site_assets/hero_gingelly_oil.png",
    categoryImage: "/site_assets/category_sesame.png",
    color: "#b45309",
    colorLight: "rgba(180,83,9,0.08)",
    colorBorder: "rgba(180,83,9,0.25)",
    tagline: "Ancient remedy with powerful heat-stable antioxidants",
    description:
      "Sesamol — a unique, heat-stable antioxidant found only in sesame — makes this oil a powerhouse of anti-inflammatory compounds. Traditional Tamil households have trusted this for generations.",
    nutrients: [
      { name: "Sesamol", amount: "High" },
      { name: "Vitamin E", amount: "~1.4mg/100g" },
      { name: "Calcium", amount: "~13mg/100g" },
      { name: "MUFA", amount: "~41%" },
    ],
    benefits: [
      "Sesamol — a powerful heat-stable antioxidant",
      "Anti-inflammatory (sesamin compound)",
      "Supports bone density via natural calcium",
      "Traditional remedy for joint pain",
    ],
    cookingUse: "Tempering, traditional cooking, marinades, massage oil",
    href: "/?category=COOKING",
  },
  {
    id: "coconut",
    name: "Coconut Oil",
    tamil: "Thengai Ennai",
    image: "/site_assets/hero_coconut_oil.png",
    categoryImage: "/site_assets/category_coconut.png",
    color: "#16a34a",
    colorLight: "rgba(22,163,74,0.08)",
    colorBorder: "rgba(22,163,74,0.25)",
    tagline: "MCT-rich immunity booster from Kerala's finest coconuts",
    description:
      "Lauric acid in coconut oil converts to monolaurin — a powerful anti-microbial agent. Our wood-pressed extraction retains full MCT content for quick, clean energy and immune support.",
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
    href: "/?category=PREMIUM",
  },
  {
    id: "sunflower",
    name: "Sunflower Oil",
    tamil: "Suryakanthi Ennai",
    image: "/site_assets/hero_sunflower_oil.png",
    categoryImage: "/site_assets/category_groundnut.png",
    color: "#ca8a04",
    colorLight: "rgba(202,138,4,0.08)",
    colorBorder: "rgba(202,138,4,0.25)",
    tagline: "Exceptionally high Vitamin E for cell protection",
    description:
      "With the highest Vitamin E content of all cooking oils (~41mg/100g), sunflower oil provides superior cell protection. Light, neutral taste makes it perfect for all cuisines without overpowering flavours.",
    nutrients: [
      { name: "Vitamin E", amount: "~41mg/100g" },
      { name: "PUFA (ω-6)", amount: "~65%" },
      { name: "MUFA", amount: "~19%" },
      { name: "SFA", amount: "~10%" },
    ],
    benefits: [
      "Highest Vitamin E of any cooking oil",
      "Light neutral taste for all cuisines",
      "Reduces LDL cholesterol levels",
      "Skin barrier protection topically",
    ],
    cookingUse: "Daily cooking, baking, salad dressings, sautéing",
    href: "/?category=ORGANIC",
  },
];

export function HealthBenefitsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const oil = OILS[activeIdx];

  const prev = () => setActiveIdx((i) => (i - 1 + OILS.length) % OILS.length);
  const next = () => setActiveIdx((i) => (i + 1) % OILS.length);

  return (
    <section className="py-0 bg-[#1a0e04] dark:bg-zinc-950 relative overflow-hidden">
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none transition-all duration-700"
        style={{ background: `radial-gradient(ellipse at 70% 50%, ${oil.color} 0%, transparent 60%)` }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT: Dynamic Text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={oil.id}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Counter */}
              <div className="flex items-center gap-3 mb-8">
                <span className="text-zinc-500 text-sm font-bold tracking-widest uppercase">Oil Types</span>
                <span className="text-sm font-black" style={{ color: oil.color }}>
                  {activeIdx + 1} / {OILS.length}
                </span>
                <div className="flex gap-1.5 ml-2">
                  {OILS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIdx(i)}
                      className="h-1 rounded-full transition-all duration-300"
                      style={{
                        width: i === activeIdx ? "24px" : "8px",
                        background: i === activeIdx ? oil.color : "rgba(255,255,255,0.2)",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Headline */}
              <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] mb-4">
                Together, let's
                <br />
                discover the{" "}
                <span style={{ color: oil.color }}>pure</span>
                <br />
                goodness of{" "}
                <span className="italic" style={{ color: oil.color }}>
                  {oil.name.split(" ")[0]}!
                </span>
              </h2>

              {/* Dynamic tagline */}
              <p className="text-[#ca8a04] text-sm font-bold uppercase tracking-widest mb-4">
                {oil.tamil}
              </p>

              {/* Dynamic description */}
              <p className="text-zinc-400 text-base leading-relaxed mb-8 max-w-lg">
                {oil.description}
              </p>

              {/* Nutrient pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {oil.nutrients.map(({ name, amount }) => (
                  <div
                    key={name}
                    className="flex items-center gap-2 rounded-full px-3 py-1.5 border text-sm font-semibold"
                    style={{ borderColor: oil.colorBorder, background: oil.colorLight, color: oil.color }}
                  >
                    <span className="text-zinc-300 text-xs">{name}</span>
                    <span className="font-black text-xs" style={{ color: oil.color }}>{amount}</span>
                  </div>
                ))}
              </div>

              {/* Benefits */}
              <div className="space-y-2 mb-10">
                {oil.benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-black shrink-0"
                      style={{ background: oil.color }}
                    >
                      {i + 1}
                    </div>
                    <p className="text-zinc-300 text-sm font-medium">{b}</p>
                  </div>
                ))}
              </div>

              {/* CTA + Arrows */}
              <div className="flex items-center gap-4">
                <Link
                  href={oil.href}
                  className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-2xl text-white transition-all shadow-lg hover:shadow-xl"
                  style={{ background: oil.color }}
                >
                  Shop {oil.name.split(" ")[0]} <ArrowRight className="h-4 w-4" />
                </Link>
                <div className="flex gap-2">
                  <button
                    onClick={prev}
                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-white/50 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={next}
                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-white/50 transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* RIGHT: Image Carousel — clicking changes left content */}
          <div className="relative">
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden aspect-[3/4] max-w-sm mx-auto shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={oil.id + "-img"}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={oil.image}
                    alt={oil.name}
                    fill
                    className="object-cover"
                    sizes="400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span
                      className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                      style={{ background: oil.color + "20", color: oil.color, border: `1px solid ${oil.colorBorder}` }}
                    >
                      {oil.cookingUse.split(",")[0]}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnail row */}
            <div className="flex gap-3 justify-center mt-4">
              {OILS.map((o, i) => (
                <button
                  key={o.id}
                  onClick={() => setActiveIdx(i)}
                  className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 transition-all duration-200"
                  style={{
                    borderColor: i === activeIdx ? o.color : "transparent",
                    opacity: i === activeIdx ? 1 : 0.5,
                    transform: i === activeIdx ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  <Image src={o.image} alt={o.name} fill className="object-cover" sizes="56px" />
                </button>
              ))}
            </div>

            {/* "Summer events" style counter badge */}
           
          </div>
        </div>
      </div>
    </section>
  );
}
