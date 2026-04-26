"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Leaf, Zap, Truck, ArrowRight, Play } from "lucide-react";

const TRUST = [
  { icon: ShieldCheck, label: "FSSAI Certified" },
  { icon: Leaf, label: "100% Natural" },
  { icon: Zap, label: "Farm Fresh" },
  { icon: Truck, label: "Fast Delivery" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#1a1008]">
      {/* Background image */}
      <Image
        src="/site_assets/hero_farm_to_kitchen.png"
        alt="Traditional chekku oil extraction"
        fill
        priority
        className="object-cover object-center opacity-50"
        sizes="100vw"
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a1008]/95 via-[#1a1008]/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1008]/80 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          {/* Label */}
          <div className="inline-flex items-center gap-2 bg-[#D97706]/20 border border-[#D97706]/40 rounded-full px-4 py-1.5 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D97706] animate-pulse" />
            <span className="text-[#E9D8A6] text-xs font-semibold tracking-widest uppercase">
              Traditional Chekku · Village Made
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-5">
            Pure Taste of{" "}
            <span className="relative inline-block">
              <span className="text-[#D97706]">Tradition</span>
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#D97706]/40 rounded-full" />
            </span>
          </h1>

          {/* Sub */}
          <p className="text-white/75 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg">
            Authentic wood pressed oils crafted with age-old village methods.{" "}
            <strong className="text-white/90 font-medium">No heat. No chemicals.</strong> Just purity.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-10">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/?category=COOKING"
                className="inline-flex items-center gap-2 bg-[#D97706] hover:bg-[#b86004] text-white font-bold px-7 py-3.5 rounded-xl text-base transition-all shadow-[0_8px_30px_rgba(217,119,6,0.4)] hover:shadow-[0_8px_40px_rgba(217,119,6,0.55)]"
              >
                Shop Best Sellers <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-3.5 rounded-xl text-base border border-white/20 transition-all backdrop-blur-sm"
              >
                <Play className="h-4 w-4 fill-white" /> Why Wood Pressed?
              </Link>
            </motion.div>
          </div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            {TRUST.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 bg-white/8 border border-white/12 rounded-full px-3.5 py-1.5 backdrop-blur-sm"
              >
                <Icon className="h-3.5 w-3.5 text-[#E9D8A6]" />
                <span className="text-white/85 text-xs font-semibold">{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Floating product image */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-8 bottom-0 hidden xl:block w-[340px] h-[420px]"
      >
        <Image
          src="/site_assets/product_groundnut_1l.png"
          alt="Premium Groundnut Oil"
          fill
          className="object-contain object-bottom drop-shadow-2xl"
          sizes="340px"
        />
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#FAF8F2] dark:from-[#111] to-transparent pointer-events-none" />
    </section>
  );
}
