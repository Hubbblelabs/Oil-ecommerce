"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Droplets, Zap, Leaf, Sun } from "lucide-react";

const OILS = [
  {
    id: "groundnut",
    name: "Groundnut Oil",
    tamil: "Kadalai Ennai",
    icon: Droplets,
    color: "#D97706",
    colorLight: "rgba(217,119,6,0.08)",
    colorBorder: "rgba(217,119,6,0.25)",
    nutrients: [
      { name: "Vitamin E", amount: "~11mg/100g" },
      { name: "MUFA", amount: "~46%" },
      { name: "PUFA", amount: "~32%" },
      { name: "SFA", amount: "~17%" },
    ],
    benefits: [
      "Boosts heart health with high MUFA content",
      "Natural Vitamin E as an antioxidant",
      "High smoke point — ideal for deep frying",
      "Resveratrol content supports anti-ageing",
      "Good cholesterol profile (LDL neutral)",
    ],
    cookingUse: "Deep frying, daily cooking, Indian curries",
  },
  {
    id: "sesame",
    name: "Sesame Oil",
    tamil: "Nallennai / Gingelly",
    icon: Zap,
    color: "#b45309",
    colorLight: "rgba(180,83,9,0.08)",
    colorBorder: "rgba(180,83,9,0.25)",
    nutrients: [
      { name: "Sesamol", amount: "High" },
      { name: "Vitamin E", amount: "~1.4mg/100g" },
      { name: "Calcium", amount: "~13mg/100g" },
      { name: "MUFA", amount: "~41%" },
    ],
    benefits: [
      "Sesamol — a powerful, heat-stable antioxidant",
      "Anti-inflammatory properties (sesamin compound)",
      "Supports bone density via natural calcium",
      "Traditional remedy for joint pain",
      "Improves skin complexion with topical use",
    ],
    cookingUse: "Tempering, traditional cooking, marinades, massage oil",
  },
  {
    id: "coconut",
    name: "Coconut Oil",
    tamil: "Thengai Ennai",
    icon: Leaf,
    color: "#16a34a",
    colorLight: "rgba(22,163,74,0.08)",
    colorBorder: "rgba(22,163,74,0.25)",
    nutrients: [
      { name: "MCT", amount: "~62%" },
      { name: "Lauric Acid", amount: "~49%" },
      { name: "SFA", amount: "~91%" },
      { name: "Vitamin K", amount: "Trace" },
    ],
    benefits: [
      "MCT fats provide quick, clean energy",
      "Lauric acid boosts immunity (anti-microbial)",
      "Supports thyroid function",
      "Excellent for hair and skin hydration",
      "Stable at high temperatures — no rancidity",
    ],
    cookingUse: "Light cooking, Kerala cuisine, hair oil, skin moisturiser",
  },
  {
    id: "sunflower",
    name: "Sunflower Oil",
    tamil: "Suryakanthi Ennai",
    icon: Sun,
    color: "#ca8a04",
    colorLight: "rgba(202,138,4,0.08)",
    colorBorder: "rgba(202,138,4,0.25)",
    nutrients: [
      { name: "Vitamin E", amount: "~41mg/100g" },
      { name: "PUFA (omega-6)", amount: "~65%" },
      { name: "MUFA", amount: "~19%" },
      { name: "SFA", amount: "~10%" },
    ],
    benefits: [
      "Exceptionally high Vitamin E for cell protection",
      "Light taste — neutral for all cuisines",
      "Reduces LDL cholesterol levels",
      "Good for moderate-heat cooking",
      "Skin barrier protection with topical use",
    ],
    cookingUse: "Daily cooking, baking, salad dressings, sautéing",
  },
];

export function HealthBenefitsSection() {
  const [activeId, setActiveId] = useState<string>("groundnut");
  const activeOil = OILS.find((o) => o.id === activeId)!;

  return (
    <section className="py-20 bg-[#FAF8F2] dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#D97706] text-sm font-bold uppercase tracking-widest mb-3">Nutrition & Health</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#3B2416] dark:text-white">
            What's in Your Oil?
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Each oil has a unique nutritional profile. Wood pressing preserves every bit of it.
          </p>
        </div>

        {/* Tab selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {OILS.map((oil) => {
            const Icon = oil.icon;
            return (
              <button
                key={oil.id}
                id={`health-tab-${oil.id}`}
                onClick={() => setActiveId(oil.id)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200"
                style={
                  activeId === oil.id
                    ? { background: oil.color, color: "white", boxShadow: `0 4px 16px ${oil.colorLight}` }
                    : { background: "white", color: "#6b5a47", border: "1px solid #E9D8A6" }
                }
              >
                <Icon className="h-4 w-4" />
                {oil.name.split(" ")[0]}
              </button>
            );
          })}
        </div>

        {/* Active panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white dark:bg-zinc-900 rounded-3xl border overflow-hidden shadow-[0_4px_32px_rgba(59,36,22,0.08)]"
            style={{ borderColor: activeOil.colorBorder }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[#E9D8A6]/40 dark:divide-zinc-800">

              {/* Left: Oil identity */}
              <div className="p-8 lg:p-10" style={{ background: activeOil.colorLight }}>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl mb-5" style={{ background: activeOil.color + "20", border: `1px solid ${activeOil.colorBorder}` }}>
                  {(() => { const Icon = activeOil.icon; return <Icon className="h-7 w-7" style={{ color: activeOil.color }} />; })()}
                </div>
                <h3 className="font-heading text-2xl font-bold text-[#3B2416] dark:text-white mb-1">{activeOil.name}</h3>
                <p className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: activeOil.color }}>{activeOil.tamil}</p>

                {/* Nutrient bars */}
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Key Nutrients</p>
                  {activeOil.nutrients.map(({ name, amount }) => (
                    <div key={name} className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#3B2416] dark:text-white">{name}</span>
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{ background: activeOil.color + "20", color: activeOil.color }}
                      >
                        {amount}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-[#E9D8A6]/60 dark:border-zinc-700">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Best For Cooking</p>
                  <p className="text-sm text-[#3B2416] dark:text-white font-medium leading-relaxed">{activeOil.cookingUse}</p>
                </div>
              </div>

              {/* Right: Health benefits */}
              <div className="lg:col-span-2 p-8 lg:p-10">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Health Benefits</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeOil.benefits.map((benefit, i) => (
                    <motion.div
                      key={benefit}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-start gap-3 p-4 rounded-2xl bg-[#FAF8F2] dark:bg-zinc-800/60 border border-[#E9D8A6]/60 dark:border-zinc-700"
                    >
                      <div
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white text-xs font-bold mt-0.5"
                        style={{ background: activeOil.color }}
                      >
                        {i + 1}
                      </div>
                      <p className="text-sm text-[#3B2416] dark:text-white/85 leading-relaxed font-medium">{benefit}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom note */}
                <div className="mt-8 flex items-center gap-3 p-4 rounded-2xl border" style={{ borderColor: activeOil.colorBorder, background: activeOil.colorLight }}>
                  <p className="text-sm font-semibold" style={{ color: activeOil.color }}>
                    All benefits above are preserved only in <strong>wood cold pressed</strong> extraction. Refined oils lose 80-90% of these.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
