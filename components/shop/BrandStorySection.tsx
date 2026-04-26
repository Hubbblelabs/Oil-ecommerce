"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Award, Droplets, Leaf } from "lucide-react";

export function BrandStorySection() {
  return (
    <section className="py-20 bg-white dark:bg-zinc-900 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Image collage */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Main image */}
            <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(59,36,22,0.18)]">
              <Image
                src="/site_assets/lifestyle_pouring.png"
                alt="Village chekku mill"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3B2416]/50 to-transparent" />
            </div>

            {/* Floating card: since 1985 */}
            <div className="absolute -bottom-6 -right-4 sm:-right-8 bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.14)] border border-[#E9D8A6]/60">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-[#D97706]/10 flex items-center justify-center">
                  <Award className="h-6 w-6 text-[#D97706]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Trusted Since</p>
                  <p className="text-2xl font-bold text-[#3B2416] dark:text-white leading-none">1985</p>
                </div>
              </div>
            </div>

            {/* Floating: stat card */}
            <div className="absolute -top-4 -right-4 sm:-right-8 bg-[#D97706] rounded-2xl p-4 shadow-[0_8px_24px_rgba(217,119,6,0.4)]">
              <p className="text-white font-bold text-2xl leading-none">10,000+</p>
              <p className="text-white/80 text-xs font-semibold mt-0.5">Happy Families</p>
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[#D97706] text-sm font-bold uppercase tracking-widest mb-4">Our Story</p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3B2416] dark:text-white leading-tight mb-6">
              From Village Roots <br />to Your Kitchen
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-5">
              Deep in the heart of Tamil Nadu, our wooden chekku machines have been slowly pressing
              seeds into liquid gold for decades. We preserve the traditional extraction methods our
              ancestors perfected — delivering oils that carry real taste, real nutrition, and real heritage.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              <strong className="text-[#3B2416] dark:text-white">No shortcuts. No compromise.</strong> Every
              bottle you receive carries the soul of a village tradition that refuses to die in the age of mass production.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6 mb-8">
              {[
                { icon: Droplets, value: "4 Oils", label: "Cold Pressed Varieties" },
                { icon: Leaf, value: "Zero", label: "Chemicals Added" },
                { icon: Award, value: "FSSAI", label: "Certified Facility" },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <div className="h-10 w-10 rounded-xl bg-[#D97706]/10 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-[#D97706]" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-[#3B2416] dark:text-white">{value}</p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-[#3B2416] hover:bg-[#D97706] text-white font-bold px-7 py-3.5 rounded-xl transition-all duration-300 text-sm"
            >
              Read Our Full Story <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
