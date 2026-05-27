const fs = require('fs');
const content = `"use client";
import { motion } from "framer-motion";
import { Leaf, ShieldCheck, Heart, CheckCircle2, Truck, Award } from "lucide-react";

const TOP_FEATURES = [
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
];

const BOTTOM_HIGHLIGHTS = [
  { title: "Healthy & Delicious", icon: Heart },
  { title: "Safe & Reliable", icon: ShieldCheck },
  { title: "Fast Delivery", icon: Truck },
  { title: "Premium Quality", icon: Award },
];

export function WhyChooseUsSection() {
  return (
    <section className="py-24 bg-white dark:bg-black relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Why families trust <span className="text-primary">our oil</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Experience the pure taste of tradition with our authentic wood-pressed oils.
          </p>
        </div>

        {/* Top 3 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {TOP_FEATURES.map(({ icon: Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group bg-card hover:bg-primary/5 border border-border/60 hover:border-primary/30 rounded-3xl p-8 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mb-6 group-hover:scale-110 transition-transform">
                <Icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
              <p className="text-muted-foreground leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Highlights Row */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 md:gap-8 items-center bg-zinc-50 dark:bg-zinc-900/50 py-8 px-6 rounded-3xl border border-border/50"
        >
          {BOTTOM_HIGHLIGHTS.map(({ title, icon: Icon }) => (
            <div key={title} className="flex items-center gap-2">
              <Icon className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">{title}</span>
            </div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
`;
fs.writeFileSync('components/shop/WhyChooseUsSection.tsx', content);
console.log('WhyChooseUsSection rewritten.');
