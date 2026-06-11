"use client";
import { motion } from "framer-motion";
import { Leaf, ShieldCheck, Heart, Truck, Award } from "lucide-react";

const FEATURES = [
  {
    index: "01",
    icon: Leaf,
    title: "Traditional chekku pressed",
    body: "Our wooden chekku turns slowly at low temperature, preserving every drop of natural goodness locked inside the seed.",
  },
  {
    index: "02",
    icon: ShieldCheck,
    title: "Zero chemicals",
    body: "No hexane, no bleaching, no deodorising. What goes in is seeds. What comes out is pure oil — nothing else.",
  },
  {
    index: "03",
    icon: Heart,
    title: "Nutrients fully retained",
    body: "Full Vitamin E, antioxidants, phytosterols and healthy fats — exactly as nature intended them to reach your plate.",
  },
];

const HIGHLIGHTS = [
  { title: "Healthy & Delicious", icon: Heart },
  { title: "Safe & Reliable", icon: ShieldCheck },
  { title: "Fast Delivery", icon: Truck },
  { title: "Premium Quality", icon: Award },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function WhyChooseUsSection() {
  return (
    <section className="relative overflow-hidden bg-paper-deep py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <p className="eyebrow mb-4 flex items-center gap-3">
            <span className="font-display italic text-muted-foreground">02</span>
            <span className="inline-block h-px w-10 bg-primary" />
            Why Us
          </p>
          <h2 className="text-display-hero text-4xl text-foreground sm:text-5xl">
            Why families trust
            <br />
            <em className="text-display-italic text-primary">our oil</em>
          </h2>
        </div>

        {/* Feature rows */}
        <div className="border-t border-border">
          {FEATURES.map(({ index, icon: Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
              className="group grid grid-cols-12 items-start gap-4 border-b border-border py-9 transition-colors duration-300 hover:bg-card/60 sm:gap-8"
            >
              <span className="label-xs col-span-2 pt-2 sm:col-span-1">{index}</span>
              <div className="col-span-10 sm:col-span-4 lg:col-span-4 flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-card text-primary transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  {title}
                </h3>
              </div>
              <p className="col-span-10 col-start-3 text-sm leading-relaxed text-muted-foreground sm:col-span-7 sm:col-start-6 sm:text-base">
                {body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Highlights strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-5"
        >
          {HIGHLIGHTS.map(({ title, icon: Icon }) => (
            <div key={title} className="flex items-center gap-2.5">
              <Icon className="h-4 w-4 text-primary" />
              <span className="label-xs text-foreground/70">{title}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
