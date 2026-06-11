"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Award, Droplets, Leaf } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const STATS = [
  { icon: Droplets, value: "4 Oils", label: "Cold pressed varieties" },
  { icon: Leaf, value: "Zero", label: "Chemicals added" },
  { icon: Award, value: "FSSAI", label: "Certified facility" },
];

export function BrandStorySection() {
  return (
    <section className="overflow-hidden bg-background py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* LEFT — imagery */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative"
          >
            <div className="grain relative h-[440px] overflow-hidden rounded-[2rem] border border-border shadow-lift">
              <Image
                src="/site_assets/lifestyle_pouring.png"
                alt="Village chekku mill pouring oil"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
              <span className="label-tiny absolute bottom-5 left-5 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-white backdrop-blur-md">
                The chekku at work
              </span>
            </div>

            {/* Floating year card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6, ease: EASE }}
              className="absolute -bottom-7 right-6 rounded-2xl border border-border bg-card p-5 shadow-premium sm:right-10"
            >
              <p className="label-tiny">Trusted since</p>
              <p className="font-display text-4xl font-semibold tracking-tight text-foreground">1985</p>
            </motion.div>
          </motion.div>

          {/* RIGHT — copy */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          >
            <p className="eyebrow mb-4 flex items-center gap-3">
              <span className="font-display italic text-muted-foreground">04</span>
              <span className="inline-block h-px w-10 bg-primary" />
              Our Story
            </p>
            <h2 className="text-display-hero mb-7 text-4xl text-foreground sm:text-5xl">
              From village roots
              <br />
              to <em className="text-display-italic text-primary">your kitchen</em>
            </h2>

            <p className="mb-5 text-base leading-relaxed text-muted-foreground">
              Deep in the heart of Tamil Nadu, our wooden chekku machines have been
              slowly pressing seeds into liquid gold for decades. We preserve the
              traditional extraction methods our ancestors perfected — delivering oils
              that carry real taste, real nutrition, and real heritage.
            </p>
            <p className="mb-10 text-base leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">No shortcuts. No compromise.</span>{" "}
              Every bottle carries the soul of a village tradition that refuses to die
              in the age of mass production.
            </p>

            {/* Stats */}
            <div className="mb-10 grid grid-cols-3 divide-x divide-border border-y border-border py-6">
              {STATS.map(({ icon: Icon, value, label }, i) => (
                <div key={label} className={i === 0 ? "pr-6" : "px-6"}>
                  <Icon className="mb-2.5 h-5 w-5 text-primary" />
                  <p className="font-display text-xl font-semibold tracking-tight text-foreground">{value}</p>
                  <p className="label-tiny mt-1">{label}</p>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="btn-shine group inline-flex items-center gap-3 rounded-full bg-secondary px-8 py-4 text-sm font-bold text-secondary-foreground transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              Read our full story
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
