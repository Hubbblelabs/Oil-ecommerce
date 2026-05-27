"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Leaf, Zap, Truck, ArrowRight, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";

const OIL_TYPES = [
  { name: "Groundnut Oil", tamil: "Kadalai Ennai", color: "#D97706" },
  { name: "Coconut Oil", tamil: "Thengai Ennai", color: "#16a34a" },
  { name: "Sesame Oil", tamil: "Nallennai", color: "#b45309" },
  { name: "Sunflower Oil", tamil: "Suryakanthi", color: "#ca8a04" },
  { name: "Gingelly Oil", tamil: "Nallennai", color: "#92400e" },
];

const HERO_IMAGES = [
  { src: "/site_assets/hero_groundnut_oil.png", label: "Groundnut Oil", category: "COOKING" },
  { src: "/site_assets/hero_coconut_oil.png", label: "Coconut Oil", category: "PREMIUM" },
  { src: "/site_assets/hero_gingelly_oil.png", label: "Gingelly Oil", category: "COOKING" },
  { src: "/site_assets/hero_sunflower_oil.png", label: "Sunflower Oil", category: "ORGANIC" },
  { src: "/site_assets/hero_family_cooking.png", label: "Farm Fresh", category: "PREMIUM" },
  { src: "/site_assets/hero_farm_to_kitchen.png", label: "Village Made", category: "COOKING" },
];

const TRUST = [
  { icon: ShieldCheck, label: "FSSAI Certified" },
  { icon: Leaf, label: "100% Natural" },
  { icon: Zap, label: "Farm Fresh" },
  { icon: Truck, label: "Free Delivery ₹499+" },
];

function OilTypeTicker() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % OIL_TYPES.length), 2200);
    return () => clearInterval(t);
  }, []);
  const oil = OIL_TYPES[idx];
  return (
    <span className="inline-block overflow-hidden h-[1.2em] align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block font-bold"
          style={{ color: oil.color }}
        >
          {oil.name}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function ImageStrip() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start", dragFree: true });
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="relative  lg:mt-0 w-full lg:w-[98%]">
      {/* Main large image */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-5/4 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_IMAGES[activeIdx].src}
              alt={HERO_IMAGES[activeIdx].label}
              fill
              priority
              className="object-cover w-100 h-100"
         
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-bold px-4 py-1.5 rounded-full">
                {HERO_IMAGES[activeIdx].label}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1 scrollbar-hide" ref={emblaRef}>
        <div className="flex gap-2.5 w-full">
          {HERO_IMAGES.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`relative flex-shrink-0 w-[80px] h-[60px] rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                activeIdx === i
                  ? "border-[#D97706] scale-105 shadow-md"
                  : "border-transparent opacity-60 hover:opacity-90"
              }`}
            >
              <Image src={img.src} alt={img.label} fill className="object-cover" sizes="100px" />
            </button>
          ))}
        </div>
      </div>

     
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-64px)] bg-[#FAF8F2] dark:bg-zinc-950 overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, #D97706 0%, transparent 50%), radial-gradient(circle at 80% 20%, #b45309 0%, transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8 flex flex-col lg:flex-row items-center gap-10 lg:gap-16 min-h-[calc(100vh-64px)]">
        
        {/* LEFT: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 max-w-xl"
        >
          {/* Pill label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-[#D97706]/10 border border-[#D97706]/30 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#D97706] animate-pulse" />
            <span className="text-[#D97706] text-xs font-bold tracking-widest uppercase">
              Traditional Chekku · Village Made
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-[#1a0e04] dark:text-white leading-[1.08] mb-5">
            Pure Taste,
            <br />
            <span className="text-[#3B2416] dark:text-zinc-300">Discover the</span>
            <br />
            <OilTypeTicker />
          </h1>

          {/* Sub */}
          <p className="text-[#6b5a47] dark:text-zinc-400 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
            Authentic wood pressed oils crafted with age-old village methods.{" "}
            <strong className="text-[#3B2416] dark:text-zinc-200 font-semibold">No heat. No chemicals.</strong>{" "}
            Just purity straight from the chekku.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-10">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-[#D97706] hover:bg-[#b86004] text-white font-bold px-7 py-3.5 rounded-2xl text-sm transition-all shadow-[0_8px_30px_rgba(217,119,6,0.35)] hover:shadow-[0_8px_40px_rgba(217,119,6,0.5)]"
              >
                Shop Oils <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-white dark:bg-zinc-800 text-[#3B2416] dark:text-white font-semibold px-7 py-3.5 rounded-2xl text-sm border border-[#E9D8A6] dark:border-zinc-700 transition-all hover:border-[#D97706] hover:shadow-md"
              >
                Our Story <ChevronRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap gap-2"
          >
            
          </motion.div>

          {/* Oil type scroll pills */}
          <div className="flex gap-2 mt-6 flex-wrap">
            {OIL_TYPES.map((oil) => (
              <Link
                key={oil.name}
                href={`/?category=COOKING`}
                className="text-xs font-bold px-3 py-1 rounded-full border transition-all hover:opacity-80"
                style={{ borderColor: oil.color + "40", color: oil.color, background: oil.color + "10" }}
              >
                {oil.name.split(" ")[0]}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* RIGHT: Image Carousel */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full lg:w-auto lg:flex-1 flex justify-end"
        >
          <ImageStrip />
        </motion.div>
      </div>
    </section>
  );
}
