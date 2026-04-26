"use client";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

const ROWS = [
  { feature: "Extraction Method", woodPressed: "Traditional wooden chekku", refined: "Industrial solvent extraction" },
  { feature: "Heat Used", woodPressed: "Minimal (≤ 40°C)", refined: "High heat (>200°C)" },
  { feature: "Chemicals", woodPressed: "None", refined: "Hexane, bleach, deodorisers" },
  { feature: "Nutrient Retention", woodPressed: "Fully retained", refined: "Mostly destroyed" },
  { feature: "Natural Aroma", woodPressed: "Rich & authentic", refined: "Artificially added" },
  { feature: "Shelf Life Additives", woodPressed: "None needed", refined: "Required" },
  { feature: "Traditional Purity", woodPressed: "100% pure", refined: "Chemically processed" },
];

export function ComparisonSection() {
  return (
    <section className="py-20 bg-[#FAF8F2] dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#D97706] text-sm font-bold uppercase tracking-widest mb-3">The Science</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#3B2416] dark:text-white">
            Wood Pressed vs Refined Oils
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            The difference isn't just taste — it's your family's health.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl overflow-hidden border border-[#E9D8A6] dark:border-zinc-800 shadow-[0_4px_40px_rgba(59,36,22,0.08)]"
        >
          {/* Table header */}
          <div className="grid grid-cols-3 bg-[#3B2416] text-white">
            <div className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-white/60">Feature</div>
            <div className="px-6 py-4 text-sm font-bold text-center">
              <span className="inline-flex items-center gap-1.5 bg-[#D97706]/20 text-[#E9D8A6] px-3 py-1 rounded-full text-xs">
                ✓ Wood Pressed (Us)
              </span>
            </div>
            <div className="px-6 py-4 text-sm font-bold text-center">
              <span className="inline-flex items-center gap-1.5 bg-white/10 text-white/50 px-3 py-1 rounded-full text-xs">
                ✗ Refined Oil
              </span>
            </div>
          </div>

          {/* Rows */}
          {ROWS.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-3 border-b border-[#E9D8A6]/40 dark:border-zinc-800 last:border-0 ${
                i % 2 === 0 ? "bg-white dark:bg-zinc-900" : "bg-[#FAF8F2]/60 dark:bg-zinc-900/50"
              }`}
            >
              <div className="px-6 py-4 text-sm font-semibold text-[#3B2416] dark:text-white">{row.feature}</div>
              <div className="px-6 py-4 text-sm text-center">
                <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-medium">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  {row.woodPressed}
                </span>
              </div>
              <div className="px-6 py-4 text-sm text-center">
                <span className="inline-flex items-center gap-1.5 text-rose-500 dark:text-rose-400 font-medium">
                  <XCircle className="h-4 w-4 shrink-0" />
                  {row.refined}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        <p className="text-center text-sm text-muted-foreground mt-6 italic">
          "Switch to wood pressed and feel the difference within weeks."
        </p>
      </div>
    </section>
  );
}
