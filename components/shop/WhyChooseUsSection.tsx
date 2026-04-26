"use client";
import { motion } from "framer-motion";
import { Leaf, ShieldCheck, Zap, Heart, CheckCircle2, Users } from "lucide-react";

const FEATURES = [
  {
    icon: Leaf,
    title: "Traditional Chekku Pressed",
    body: "Our wooden chekku (cold press) operates at low temperatures, preserving every drop of natural goodness in the seed.",
  },
  {
    icon: ShieldCheck,
    title: "Zero Chemicals",
    body: "No hexane, no bleaching, no deodorising. What goes in is seeds. What comes out is pure oil.",
  },
  {
    icon: Heart,
    title: "Rich Nutrients Retained",
    body: "Full Vitamin E, antioxidants, phytosterols and healthy fats — exactly as nature intended.",
  },
  {
    icon: Zap,
    title: "Authentic Village Taste",
    body: "The deep aroma and rich flavour that only traditional extraction can deliver. A taste your family will recognise.",
  },
  {
    icon: CheckCircle2,
    title: "Hygienically Packed",
    body: "FSSAI-certified facility. Every batch quality-checked, sealed in food-grade packaging for maximum freshness.",
  },
  {
    icon: Users,
    title: "Direct from Farmers",
    body: "We source premium seeds directly from trusted village farmers — no middlemen, guaranteed freshness.",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-[#3B2416] relative overflow-hidden">
      {/* Background texture blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#D97706]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D97706]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#E9D8A6] text-sm font-bold uppercase tracking-widest mb-3">The Difference</p>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white leading-tight">
            Why Families Trust{" "}
            <span className="text-[#D97706]">Shri Sameya</span>
          </h2>
          <p className="text-white/60 mt-4 max-w-lg mx-auto text-base">
            Not just oil — a promise of purity passed down through generations.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="group relative bg-white/5 border border-white/10 hover:border-[#D97706]/40 hover:bg-[#D97706]/8 rounded-2xl p-7 transition-all duration-300"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D97706]/15 border border-[#D97706]/20 mb-5 group-hover:bg-[#D97706]/25 transition-colors">
                <Icon className="h-7 w-7 text-[#D97706]" />
              </div>
              <h3 className="text-white font-bold text-base mb-2">{title}</h3>
              <p className="text-white/55 text-sm leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
