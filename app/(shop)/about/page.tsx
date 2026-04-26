import Image from "next/image";
import Link from "next/link";
import {
  Leaf, ShieldCheck, Droplets, Flame, Zap, Heart, Brain,
  Sun, CheckCircle2, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Shri Sameya Village Wood Cold Pressed Oils",
  description:
    "Learn about our traditional Chekku (wood cold-pressed) oil extraction process, our village roots, and why our groundnut, sesame, coconut & sunflower oils are the healthiest choice for your family.",
};

const WHY_CHOOSE = [
  { icon: Leaf, title: "Wood Cold Pressed Method", body: "Traditional Chekku process retains natural nutrients, aroma and taste that heat-based refining destroys." },
  { icon: ShieldCheck, title: "No Chemicals or Preservatives", body: "Every bottle is pure oil — no hexane, no bleaching agents, no artificial additives ever." },
  { icon: Droplets, title: "Authentic Village Taste", body: "Sourced from village farms and pressed in the traditional way, delivering the taste your grandparents remember." },
  { icon: Heart, title: "High Nutritional Value", body: "Cold-pressing keeps Vitamin E, phytosterols, antioxidants and healthy fats fully intact." },
  { icon: CheckCircle2, title: "Hygienic Processing & Packaging", body: "FSSAI-certified facility with strict hygiene standards from seed to seal." },
];

const CHEKKU_STEPS = [
  { step: "01", title: "Seed Selection", body: "Premium quality seeds — groundnut, sesame, coconut, sunflower — sourced directly from trusted village farms." },
  { step: "02", title: "Sun Drying", body: "Seeds are naturally sun-dried to the perfect moisture level, preserving their nutritional integrity." },
  { step: "03", title: "Wooden Chekku Press", body: "A traditional wooden cold-press (Chekku) slowly extracts oil at low temperature — no heat, no solvents." },
  { step: "04", title: "Natural Settling", body: "Extracted oil is left to settle naturally, allowing sediment to separate without chemical filtering." },
  { step: "05", title: "Hygiene Bottling", body: "The clear, pure oil is bottled in food-grade containers in our FSSAI-certified facility." },
];

const OILS = [
  {
    name: "Groundnut Oil",
    tamil: "Kadalai Ennai",
    image: "/site_assets/hero_groundnut_oil.png",
    color: "amber",
    fats: [
      { label: "Monounsaturated (MUFA)", value: "48–50%", width: "50%" },
      { label: "Polyunsaturated (PUFA)", value: "30–33%", width: "32%" },
      { label: "Saturated Fat", value: "17–20%", width: "18%" },
    ],
    nutrients: ["Vitamin E: ~15–20% RDA", "Phytosterols (cholesterol-lowering)"],
    benefits: ["Supports heart health (high MUFA)", "Reduces LDL cholesterol", "High smoke point — ideal for deep frying", "Provides sustained energy"],
    bestFor: "Deep frying, daily cooking",
    strength: "Balanced fats",
    note: null,
  },
  {
    name: "Sesame Oil",
    tamil: "Nallennai / Gingelly Oil",
    image: "/site_assets/hero_gingelly_oil.png",
    color: "orange",
    fats: [
      { label: "Monounsaturated (MUFA)", value: "39–42%", width: "40%" },
      { label: "Polyunsaturated (PUFA)", value: "40–43%", width: "41%" },
      { label: "Saturated Fat", value: "14–16%", width: "15%" },
    ],
    nutrients: ["Sesamin & Sesamol (powerful antioxidants)", "Vitamin E: ~10–15% RDA"],
    benefits: ["Strong antioxidant protection", "Supports blood pressure control", "Improves skin and hair health", "Anti-inflammatory properties"],
    bestFor: "Traditional cooking, pickles",
    strength: "Antioxidants",
    note: null,
  },
  {
    name: "Coconut Oil",
    tamil: "Thengai Ennai",
    image: "/site_assets/hero_coconut_oil.png",
    color: "green",
    fats: [
      { label: "Saturated Fat", value: "82–90%", width: "86%" },
      { label: "Monounsaturated (MUFA)", value: "5–7%", width: "6%" },
      { label: "Polyunsaturated (PUFA)", value: "1–2%", width: "1.5%" },
    ],
    nutrients: ["MCTs (Medium Chain Triglycerides): ~60–65%", "Lauric Acid: ~45–50%"],
    benefits: ["Quick energy source via MCT metabolism", "Supports immunity (antimicrobial)", "Good for brain function", "Enhances skin & hair care"],
    bestFor: "Light sautéing, Kerala dishes, baking",
    strength: "MCTs & Immunity",
    note: "High in saturated fat — use in moderation for cooking.",
  },
  {
    name: "Sunflower Oil",
    tamil: "Suryakanthi Ennai",
    image: "/site_assets/hero_sunflower_oil.png",
    color: "yellow",
    fats: [
      { label: "Polyunsaturated (PUFA)", value: "65–70%", width: "68%" },
      { label: "Monounsaturated (MUFA)", value: "20–25%", width: "22%" },
      { label: "Saturated Fat", value: "8–10%", width: "9%" },
    ],
    nutrients: ["Vitamin E: ~35–40% RDA (very high)"],
    benefits: ["Supports heart health", "Helps reduce cholesterol", "Great for light cooking & frying", "Boosts immunity via Vitamin E"],
    bestFor: "Light cooking, daily use",
    strength: "High Vitamin E",
    note: null,
  },
];

const COOKING_GUIDE = [
  { type: "Deep Frying", oil: "Groundnut Oil", icon: Flame, why: "High smoke point (~225°C), MUFA-rich, stable under heat.", examples: ["Vada", "Chips", "Puri", "Restaurant-style frying"] },
  { type: "Daily Cooking", oil: "Sunflower + Groundnut", icon: Sun, why: "Sunflower is light with high Vit E; Groundnut adds stability. Rotate or mix weekly.", examples: ["Curries", "Stir fry", "Poriyal", "Sabzi"] },
  { type: "Traditional Dishes", oil: "Sesame Oil", icon: Droplets, why: "Strong aroma & antioxidants enhance South Indian flavours.", examples: ["South Indian gravies", "Pickles", "Idli podi oil", "Temple-style cooking"] },
  { type: "Low–Medium Heat", oil: "Coconut Oil", icon: Leaf, why: "Medium-chain fats provide quick energy; unique flavour profile.", examples: ["Kerala dishes", "Baking", "Light sautéing", "Raw consumption (small qty)"] },
];

const colorMap: Record<string, string> = {
  amber: "bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800",
  orange: "bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-800",
  green: "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800",
  yellow: "bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-800",
};

const barColorMap: Record<string, string> = {
  amber: "bg-amber-500",
  orange: "bg-orange-500",
  green: "bg-green-600",
  yellow: "bg-yellow-500",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">

      {/* ── Hero ── */}
      <section className="relative h-72 sm:h-96 flex items-center overflow-hidden">
        <Image src="/site_assets/hero_family_cooking.png" alt="Family cooking with traditional oils" fill className="object-cover object-center" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-2">Our Story</p>
          <h1 className="text-4xl sm:text-6xl font-serif font-extrabold text-white leading-tight mb-3">
            Shri Sameya <br className="hidden sm:block" />
            <span className="text-amber-400">Village</span>
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-xl">
            Returning to roots — pure wood cold-pressed oils made the traditional way, for your family's health.
          </p>
        </div>
      </section>

      {/* ── Brand Story ── */}
      <section className="py-16 bg-white dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-amber-600 text-sm font-bold uppercase tracking-widest mb-3">About Us</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 leading-tight">
                We believe in returning <br />to our roots
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  At <strong className="text-foreground">Shri Sameya Village</strong>, our oils are extracted using the traditional wood cold-pressed <strong className="text-foreground">(Chekku) method</strong>, ensuring every drop retains its natural nutrients, aroma, and taste.
                </p>
                <p>
                  Inspired by village traditions and family values, we aim to deliver purity and health to every household. Our process avoids harmful chemicals and excessive heat — making our oils a genuinely healthier choice for daily cooking.
                </p>
                <p className="italic text-amber-700 dark:text-amber-400 font-medium border-l-4 border-amber-400 pl-4">
                  "Iyarkaiyanaathu… Arokiyamanathu… Suvaiyanathu…"
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="gradient-amber text-white border-0 shadow-amber-glow rounded-xl">
                  <Link href="/">Shop Now <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </Button>
                <Button asChild variant="outline" className="rounded-xl">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden h-72 sm:h-96 shadow-premium">
              <Image src="/site_assets/lifestyle_pouring.png" alt="Traditional Chekku oil extraction" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Line ── */}
      <section className="bg-amber-600 py-5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-2 text-white text-sm font-semibold text-center">
            {["No chemical refining", "No artificial additives", "Traditional Chekku extraction", "FSSAI certified"].map(t => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 shrink-0" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-16 bg-amber-50/50 dark:bg-zinc-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-amber-600 text-sm font-bold uppercase tracking-widest mb-2">Why Choose Our Oils</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">The Shri Sameya Difference</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE.map(({ icon: Icon, title, body }) => (
              <div key={title} className="glass-card rounded-2xl p-6 flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-900/30">
                  <Icon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Chekku Process ── */}
      <section className="py-16 bg-white dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-amber-600 text-sm font-bold uppercase tracking-widest mb-2">How It's Made</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">The Chekku Process</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              From seed to bottle — a time-honoured tradition that preserves everything nature intended.
            </p>
          </div>
          <div className="relative">
            {/* Connector line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-amber-200 dark:bg-amber-800 hidden sm:block" />
            <div className="space-y-8">
              {CHEKKU_STEPS.map(({ step, title, body }) => (
                <div key={step} className="relative flex gap-6 sm:gap-8">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-600 text-white font-bold text-sm z-10 shadow-amber-glow">
                    {step}
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/50 rounded-2xl px-6 py-4 flex-1">
                    <h3 className="font-bold text-foreground mb-1">{title}</h3>
                    <p className="text-sm text-muted-foreground">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Oil Health Guide ── */}
      <section className="py-16 bg-zinc-50 dark:bg-zinc-900/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-amber-600 text-sm font-bold uppercase tracking-widest mb-2">Health & Nutrition</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Our Oils, Explained</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Detailed fat composition, key nutrients, and health benefits for each of our four oils.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {OILS.map((oil) => (
              <div key={oil.name} className={`rounded-3xl border p-6 sm:p-8 ${colorMap[oil.color]}`}>
                <div className="flex items-start gap-4 mb-6">
                  <div className="relative h-20 w-20 rounded-2xl overflow-hidden shrink-0 shadow-premium">
                    <Image src={oil.image} alt={oil.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{oil.name}</h3>
                    <p className="text-sm text-muted-foreground italic">{oil.tamil}</p>
                  </div>
                </div>

                {/* Fat composition */}
                <div className="mb-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Fat Composition</p>
                  <div className="space-y-2">
                    {oil.fats.map(f => (
                      <div key={f.label}>
                        <div className="flex justify-between text-xs font-medium mb-1">
                          <span className="text-foreground/80">{f.label}</span>
                          <span className="font-bold">{f.value}</span>
                        </div>
                        <div className="h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${barColorMap[oil.color]}`} style={{ width: f.width }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Nutrients */}
                <div className="mb-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Key Nutrients</p>
                  <ul className="space-y-1">
                    {oil.nutrients.map(n => (
                      <li key={n} className="text-sm text-foreground/80 flex gap-1.5"><CheckCircle2 className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />{n}</li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Health Benefits</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                    {oil.benefits.map(b => (
                      <li key={b} className="text-sm text-foreground/80 flex gap-1.5"><CheckCircle2 className="h-4 w-4 shrink-0 text-green-600 mt-0.5" />{b}</li>
                    ))}
                  </ul>
                </div>

                {oil.note && (
                  <p className="mt-4 text-xs text-orange-700 dark:text-orange-400 bg-orange-100 dark:bg-orange-950/30 rounded-xl px-3 py-2">
                    ⚠ {oil.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section className="py-16 bg-white dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-amber-600 text-sm font-bold uppercase tracking-widest mb-2">Quick Reference</p>
            <h2 className="text-3xl font-bold text-foreground">Comparison Summary</h2>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-border shadow-premium">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-amber-50 dark:bg-amber-950/20">
                <tr>
                  {["Oil", "Best For", "Key Strength", "Cooking Type"].map(h => (
                    <th key={h} className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-zinc-950 divide-y divide-border">
                {[
                  { oil: "Groundnut Oil", best: "Frying, daily cooking", strength: "Balanced fats", type: "Deep Frying" },
                  { oil: "Sesame Oil", best: "Traditional cooking", strength: "Antioxidants", type: "Traditional Dishes" },
                  { oil: "Coconut Oil", best: "Energy, immunity", strength: "MCTs", type: "Light Cooking" },
                  { oil: "Sunflower Oil", best: "Light cooking", strength: "High Vitamin E", type: "Daily Cooking" },
                ].map(row => (
                  <tr key={row.oil} className="hover:bg-amber-50/40 dark:hover:bg-amber-950/10 transition-colors">
                    <td className="px-6 py-4 font-semibold text-foreground text-sm">{row.oil}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{row.best}</td>
                    <td className="px-6 py-4">
                      <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-semibold px-2.5 py-1 rounded-full">{row.strength}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{row.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6 italic">
            "Use different oils for different cooking needs — this ensures balanced nutrition. No single oil is perfect. Rotate oils for balanced health."
          </p>
        </div>
      </section>

      {/* ── Cooking Guide ── */}
      <section className="py-16 bg-zinc-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-2">Cooking Guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold">Which Oil for Which Cooking</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COOKING_GUIDE.map(({ type, oil, icon: Icon, why, examples }) => (
              <div key={type} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-colors">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-600/20 border border-amber-500/20 mb-4">
                  <Icon className="h-6 w-6 text-amber-400" />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">{type}</p>
                <h3 className="text-lg font-bold text-white mb-2">{oil}</h3>
                <p className="text-sm text-zinc-400 mb-4 leading-relaxed">{why}</p>
                <ul className="space-y-1">
                  {examples.map(ex => (
                    <li key={ex} className="text-xs text-zinc-500 flex gap-1.5 items-center">
                      <span className="h-1 w-1 rounded-full bg-amber-500 shrink-0" />{ex}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-amber-600">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to switch to healthier cooking?</h2>
          <p className="text-amber-100 mb-8">Coimbatore • Ramanathapuram • Trichy Road</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-amber-700 hover:bg-amber-50 border-0 font-bold rounded-xl h-12 px-8">
              <Link href="/">Shop Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 text-white bg-white/10 hover:bg-white/20 font-semibold rounded-xl h-12 px-8">
              <a href="https://wa.me/917305212759" target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
