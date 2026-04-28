import Image from "next/image";
import Link from "next/link";
import {
  Leaf, ShieldCheck, Droplets, Flame, Zap, Heart,
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
  { icon: Leaf, title: "Wood Cold Pressed", body: "Traditional Chekku process retains natural nutrients, aroma and taste that heat-based refining destroys." },
  { icon: ShieldCheck, title: "Zero Chemicals", body: "Every bottle is pure oil — no hexane, no bleaching agents, no artificial additives ever." },
  { icon: Droplets, title: "Village Authenticity", body: "Sourced from village farms and pressed in the traditional way, delivering the taste your grandparents remember." },
  { icon: Heart, title: "High Nutrition", body: "Cold-pressing keeps Vitamin E, phytosterols, antioxidants and healthy fats fully intact." },
  { icon: CheckCircle2, title: "Certified Hygiene", body: "FSSAI-certified facility with strict hygiene standards from seed to seal." },
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
    accentClass: "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/10",
    barColor: "bg-amber-500",
    fats: [
      { label: "Monounsaturated (MUFA)", value: "48–50%", width: "50%" },
      { label: "Polyunsaturated (PUFA)", value: "30–33%", width: "32%" },
      { label: "Saturated Fat", value: "17–20%", width: "18%" },
    ],
    nutrients: ["Vitamin E: ~15–20% RDA", "Phytosterols"],
    benefits: ["Supports heart health", "High smoke point", "Provides sustained energy"],
  },
  {
    name: "Sesame Oil",
    tamil: "Nallennai / Gingelly",
    image: "/site_assets/hero_gingelly_oil.png",
    accentClass: "text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-900/10",
    barColor: "bg-orange-500",
    fats: [
      { label: "Monounsaturated (MUFA)", value: "39–42%", width: "40%" },
      { label: "Polyunsaturated (PUFA)", value: "40–43%", width: "41%" },
      { label: "Saturated Fat", value: "14–16%", width: "15%" },
    ],
    nutrients: ["Sesamin & Sesamol", "Vitamin E: ~10–15% RDA"],
    benefits: ["Strong antioxidant protection", "Improves skin health", "Anti-inflammatory"],
  },
  {
    name: "Coconut Oil",
    tamil: "Thengai Ennai",
    image: "/site_assets/hero_coconut_oil.png",
    accentClass: "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/10",
    barColor: "bg-emerald-500",
    fats: [
      { label: "Saturated Fat", value: "82–90%", width: "86%" },
      { label: "Monounsaturated (MUFA)", value: "5–7%", width: "6%" },
      { label: "Polyunsaturated (PUFA)", value: "1–2%", width: "1.5%" },
    ],
    nutrients: ["MCTs: ~60–65%", "Lauric Acid: ~45–50%"],
    benefits: ["Quick energy source", "Supports immunity", "Great for skin & hair"],
  },
  {
    name: "Sunflower Oil",
    tamil: "Suryakanthi Ennai",
    image: "/site_assets/hero_sunflower_oil.png",
    accentClass: "text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-900/10",
    barColor: "bg-yellow-500",
    fats: [
      { label: "Polyunsaturated (PUFA)", value: "65–70%", width: "68%" },
      { label: "Monounsaturated (MUFA)", value: "20–25%", width: "22%" },
      { label: "Saturated Fat", value: "8–10%", width: "9%" },
    ],
    nutrients: ["Vitamin E: ~35–40% RDA"],
    benefits: ["Helps reduce cholesterol", "Great for light cooking", "Boosts immunity"],
  },
];

const COOKING_GUIDE = [
  { type: "Deep Frying", oil: "Groundnut Oil", icon: Flame, why: "High smoke point (~225°C), MUFA-rich, stable under heat." },
  { type: "Daily Cooking", oil: "Sunflower + Groundnut", icon: Sun, why: "Sunflower is light with high Vit E; Groundnut adds stability." },
  { type: "Traditional", oil: "Sesame Oil", icon: Droplets, why: "Strong aroma & antioxidants enhance South Indian flavours." },
  { type: "Low Heat", oil: "Coconut Oil", icon: Leaf, why: "Medium-chain fats provide quick energy; unique flavour." },
];

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen relative isolate">
      {/* Background Image Layer */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="/site_assets/premium_about_bg.png"
          alt="Background Texture"
          fill
          className="object-cover opacity-20 pointer-events-none fixed"
          priority
        />
        <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* ── Hero ── */}
        <div className="relative rounded-[2rem] overflow-hidden bg-zinc-950 mb-20 shadow-xl isolate">
          <Image 
            src="/site_assets/hero_family_cooking.png" 
            alt="Family cooking with traditional oils" 
            fill 
            className="object-cover object-center opacity-50 mix-blend-overlay" 
            priority 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="relative z-10 p-10 sm:p-20 lg:p-28 flex flex-col items-center text-center">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-[0.2em] mb-4 bg-amber-950/40 px-4 py-1.5 rounded-full border border-amber-500/30 backdrop-blur-md">
              Our Story
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white mb-6 max-w-4xl">
              Purity Sourced From <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Village Traditions</span>
            </h1>
            <p className="text-zinc-300 text-base sm:text-xl max-w-2xl font-medium leading-relaxed">
              Returning to roots — pure wood cold-pressed oils made the traditional way, for your family's health and wellness.
            </p>
          </div>
        </div>

        {/* ── Brand Story ── */}
        <section className="mb-24 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1 relative aspect-[4/3] lg:aspect-square rounded-[2rem] overflow-hidden bg-zinc-50 dark:bg-zinc-900 border border-border/40 group">
            <Image 
              src="/site_assets/lifestyle_pouring.png" 
              alt="Traditional Chekku oil extraction" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[2rem]" />
          </div>
          <div className="order-1 lg:order-2 flex flex-col justify-center">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-[0.2em] mb-4">
              About Us
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-6 leading-[1.15]">
              We believe in returning to our roots.
            </h2>
            <div className="space-y-5 text-muted-foreground font-medium leading-relaxed">
              <p>
                At <strong className="text-foreground">Shri Sameya Village</strong>, our oils are extracted using the traditional wood cold-pressed <strong className="text-foreground">(Chekku) method</strong>, ensuring every drop retains its natural nutrients, aroma, and taste.
              </p>
              <p>
                Inspired by village traditions and family values, we aim to deliver purity and health to every household. Our process avoids harmful chemicals and excessive heat — making our oils a genuinely healthier choice for daily cooking.
              </p>
            </div>
            
            <div className="mt-8 p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/50">
              <p className="italic text-amber-800 dark:text-amber-300 font-semibold text-lg">
                "Iyarkaiyanaathu… Arokiyamanathu… Suvaiyanathu…"
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold">
                <Link href="/products">Shop Our Oils</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ── Why Choose Us ── */}
        <section className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-4">
              The Shri Sameya Difference
            </h2>
            <p className="text-muted-foreground font-medium">
              Why our wood cold-pressed oils are the healthier choice.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE.map(({ icon: Icon, title, body }) => (
              <div key={title} className="p-8 rounded-3xl bg-zinc-50/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-border/50 hover:border-amber-500/30 transition-colors shadow-sm">
                <div className="h-12 w-12 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-6">
                  <Icon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Chekku Process ── */}
        <section className="mb-24 rounded-[2rem] bg-zinc-50/80 dark:bg-zinc-900/80 backdrop-blur-md border border-border/50 p-8 sm:p-16 lg:p-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-[0.2em] mb-4 block">
                How It's Made
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-6">
                The Authentic <br />Chekku Process
              </h2>
              <p className="text-muted-foreground font-medium leading-relaxed mb-8">
                From seed to bottle — a time-honoured tradition that preserves everything nature intended. No heat, no chemicals, just pure extraction.
              </p>
              <div className="space-y-6">
                {CHEKKU_STEPS.map(({ step, title, body }) => (
                  <div key={step} className="flex gap-5">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-bold text-xs">
                        {step}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-foreground mb-1">{title}</h4>
                      <p className="text-sm text-muted-foreground font-medium">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-border/40 shadow-sm hidden lg:block">
              <Image 
                src="/site_assets/lifestyle_kitchen_shelf.png" 
                alt="Bottled Chekku Oils" 
                fill 
                className="object-cover" 
              />
            </div>
          </div>
        </section>

        {/* ── Oil Health Guide ── */}
        <section className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-4">
              Explore Our Oils
            </h2>
            <p className="text-muted-foreground font-medium">
              Detailed nutrition and health profiles for each of our premium oils.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {OILS.map((oil) => (
              <div key={oil.name} className="flex flex-col sm:flex-row gap-6 p-6 sm:p-8 rounded-3xl bg-zinc-50/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="sm:w-1/3 flex-shrink-0">
                  <div className="relative aspect-square sm:aspect-[4/5] rounded-2xl overflow-hidden bg-background border border-border/40 mb-4">
                    <Image src={oil.image} alt={oil.name} fill className="object-contain p-4 mix-blend-multiply dark:mix-blend-normal" />
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${oil.accentClass}`}>
                    {oil.tamil}
                  </span>
                </div>
                <div className="sm:w-2/3 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-foreground mb-6">{oil.name}</h3>
                  
                  <div className="space-y-4 mb-6">
                    {oil.fats.map(f => (
                      <div key={f.label}>
                        <div className="flex justify-between text-xs font-semibold mb-1.5 text-muted-foreground">
                          <span>{f.label}</span>
                          <span className="text-foreground">{f.value}</span>
                        </div>
                        <div className="h-1.5 bg-background rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${oil.barColor}`} style={{ width: f.width }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Nutrients</h4>
                      <ul className="space-y-1.5">
                        {oil.nutrients.map(n => (
                          <li key={n} className="text-xs font-medium text-foreground flex items-start gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1 shrink-0" /> {n}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Benefits</h4>
                      <ul className="space-y-1.5">
                        {oil.benefits.map(b => (
                          <li key={b} className="text-xs font-medium text-foreground flex items-start gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1 shrink-0" /> {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Cooking Guide & CTA ── */}
        <section className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 rounded-[2rem] bg-zinc-50 dark:bg-zinc-900 border border-border/50 p-8 sm:p-10 shadow-sm">
            <h3 className="text-xl font-extrabold text-foreground mb-8">Quick Cooking Guide</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {COOKING_GUIDE.map(({ type, oil, icon: Icon, why }) => (
                <div key={type} className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-background border border-border/50 flex items-center justify-center shrink-0 shadow-sm">
                    <Icon className="h-5 w-5 text-amber-600 dark:text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-1">{type}</h4>
                    <p className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-1">{oil}</p>
                    <p className="text-xs text-muted-foreground font-medium leading-relaxed">{why}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-4 rounded-[2rem] bg-amber-600 p-8 sm:p-10 text-white flex flex-col justify-center items-center text-center shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <h3 className="text-2xl font-extrabold mb-4 relative z-10">Start Cooking Healthier</h3>
            <p className="text-amber-100 font-medium text-sm mb-8 relative z-10">
              Discover the true taste of tradition with our pure Chekku oils.
            </p>
            <Button asChild size="lg" className="w-full rounded-xl bg-white text-amber-700 hover:bg-zinc-100 font-bold relative z-10">
              <Link href="/products">Shop Collection</Link>
            </Button>
          </div>
        </section>

      </div>
    </div>
  );
}
