"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";

const OIL_TYPES = [
  { name: "Groundnut", tamil: "Kadalai Ennai" },
  { name: "Coconut", tamil: "Thengai Ennai" },
  { name: "Sesame", tamil: "Nallennai" },
  { name: "Sunflower", tamil: "Suryakanthi" },
];

const HERO_IMAGES = [
  { src: "/site_assets/hero_groundnut_oil.png", label: "Groundnut Oil" },
  { src: "/site_assets/hero_coconut_oil.png", label: "Coconut Oil" },
  { src: "/site_assets/hero_gingelly_oil.png", label: "Gingelly Oil" },
  { src: "/site_assets/hero_sunflower_oil.png", label: "Sunflower Oil" },
  { src: "/site_assets/hero_family_cooking.png", label: "Farm Fresh" },
  { src: "/site_assets/hero_farm_to_kitchen.png", label: "Village Made" },
];

const STATS = [
  { value: "1985", label: "Pressing since" },
  { value: "10k+", label: "Families served" },
  { value: "0", label: "Chemicals, ever" },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function OilTicker() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % OIL_TYPES.length), 2400);
    return () => clearInterval(t);
  }, []);
  const oil = OIL_TYPES[idx];
  return (
    <span className="relative inline-block overflow-hidden align-bottom h-[1.15em] min-w-[5ch]">
      <AnimatePresence mode="wait">
        <motion.em
          key={idx}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-display-italic inline-block text-primary"
        >
          {oil.name}
        </motion.em>
      </AnimatePresence>
    </span>
  );
}

/* Rotating circular "purity stamp" */
function PurityStamp() {
  const text = "100% PURE · WOOD PRESSED · ZERO CHEMICALS · ";
  return (
    <div className="absolute -bottom-8 -left-8 z-10 hidden sm:flex h-32 w-32 items-center justify-center">
      <svg viewBox="0 0 100 100" className="animate-spin-slow absolute inset-0 h-full w-full">
        <defs>
          <path id="stamp-circle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-foreground" style={{ fontSize: "8.5px", letterSpacing: "1.8px", fontFamily: "var(--font-geist-mono), monospace" }}>
          <textPath href="#stamp-circle">{text}</textPath>
        </text>
      </svg>
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-amber-glow">
        <span className="font-display text-xl italic">S</span>
      </div>
    </div>
  );
}

function HeroImagery() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="relative w-full">
      <PurityStamp />

      <div className="grain relative aspect-[5/4] w-full overflow-hidden rounded-[2rem] border border-border shadow-lift">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_IMAGES[activeIdx].src}
              alt={HERO_IMAGES[activeIdx].label}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 flex items-center gap-3">
              <span className="label-tiny rounded-full border border-white/30 bg-white/10 px-4 py-2 text-white backdrop-blur-md">
                {HERO_IMAGES[activeIdx].label}
              </span>
            </div>
            <span className="label-tiny absolute bottom-5 right-5 text-white/70">
              {String(activeIdx + 1).padStart(2, "0")} / {String(HERO_IMAGES.length).padStart(2, "0")}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      <div className="scrollbar-hide mt-4 flex gap-2.5 overflow-x-auto pb-1">
        {HERO_IMAGES.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setActiveIdx(i)}
            className={`relative h-[58px] w-[78px] flex-shrink-0 overflow-hidden rounded-xl border transition-all duration-300 ${
              activeIdx === i
                ? "border-primary shadow-amber-glow"
                : "border-border opacity-50 hover:opacity-90"
            }`}
            aria-label={`Show ${img.label}`}
          >
            <Image src={img.src} alt="" fill className="object-cover" sizes="80px" />
          </button>
        ))}
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Faint radial warmth */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          background:
            "radial-gradient(circle at 15% 40%, var(--brand) 0%, transparent 45%), radial-gradient(circle at 85% 15%, var(--gold) 0%, transparent 40%)",
        }}
      />

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col items-center gap-12 px-4 pb-16 pt-10 sm:px-6 lg:flex-row lg:gap-16 lg:px-8">
        {/* LEFT — editorial copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex-1"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="eyebrow mb-7 flex items-center gap-3"
          >
            <span className="inline-block h-px w-10 bg-primary" />
            Traditional Chekku · Est. 1985
          </motion.p>

          <h1 className="text-display-hero mb-7 text-5xl text-foreground sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
            The pure
            <br />
            taste of
            <br />
            <OilTicker /> oil
          </h1>

          <p className="mb-10 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            Slow-pressed in wooden chekku mills the way our grandparents did it.
            <span className="font-semibold text-foreground"> No heat. No chemicals.</span>{" "}
            Just seeds, patience, and purity.
          </p>

          <div className="mb-12 flex flex-wrap items-center gap-4">
            <Link
              href="/products"
              className="btn-shine group inline-flex h-13 items-center gap-3 rounded-full bg-secondary px-8 py-4 text-sm font-bold text-secondary-foreground transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              Shop the oils
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 px-2 py-4 text-sm font-semibold text-foreground"
            >
              <span className="link-underline">Our story</span>
              <ArrowUpRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Stats row */}
          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
            className="flex max-w-md divide-x divide-border border-t border-border pt-6"
          >
            {STATS.map(({ value, label }, i) => (
              <div key={label} className={i === 0 ? "pr-8" : "px-8"}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {value}
                </dd>
                <dd className="label-tiny mt-1">{label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* RIGHT — imagery */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="w-full flex-1"
        >
          <HeroImagery />
        </motion.div>
      </div>
    </section>
  );
}
