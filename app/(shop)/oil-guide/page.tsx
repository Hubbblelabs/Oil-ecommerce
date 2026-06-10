"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Droplets, Flame, Zap, Leaf } from "lucide-react";

const OILS = [
  {
    name: "Groundnut Oil",
    tamil: "Kadalai Ennai",
    icon: Flame,
    image: "/site_assets/product_groundnut_1l.png",
    bestFor: ["Deep Frying", "Daily Cooking", "Indian Curries"],
    highlight: "High smoke point — perfect for high-heat Indian cooking.",
    description: "Extracted from premium quality groundnuts using traditional wooden chekku. It retains a high smoke point making it the best choice for deep frying and traditional Indian recipes. Rich in Monounsaturated fatty acids (MUFA), it supports heart health.",
  },
  {
    name: "Sesame Oil",
    tamil: "Nallennai / Gingelly",
    icon: Zap,
    image: "/site_assets/hero_gingelly_oil.png",
    bestFor: ["Traditional Cooking", "Antioxidant Rich", "Tempering"],
    highlight: "Powerhouse of sesamol — the antioxidant that never breaks down.",
    description: "Known as the 'Queen of Oils', our Sesame oil is cold-pressed with palm jaggery to balance the bitterness. It is deeply nourishing, packed with antioxidants like sesamol and sesamin, and widely used for tempering, pickles, and oil pulling.",
  },
  {
    name: "Coconut Oil",
    tamil: "Thengai Ennai",
    icon: Leaf,
    image: "/site_assets/product_coconut_1l.png",
    bestFor: ["Light Cooking", "Energy Boost", "Hair & Skin Care"],
    highlight: "MCT-rich formula — fuels energy and supports immunity.",
    description: "Pressed from sun-dried copras, our coconut oil is 100% pure and unrefined. It contains high levels of Medium Chain Triglycerides (MCTs) and Lauric acid, making it excellent for quick energy, immunity boosting, as well as skin and hair nourishment.",
  },
  {
    name: "Sunflower Oil",
    tamil: "Suryakanthi Ennai",
    icon: Droplets,
    image: "/site_assets/hero_sunflower_oil.png",
    bestFor: ["Daily Cooking", "High Vitamin E", "Light Frying"],
    highlight: "Rich in Vitamin E — a daily essential for every kitchen.",
    description: "A light, versatile oil perfect for everyday cooking. Wood-pressed to retain its high Vitamin E content, it supports skin health and immune function without overpowering the natural flavors of your food.",
  },
];

export default function OilGuidePage() {
  const [currentPage, setCurrentPage] = useState(0);

  const next = () => setCurrentPage((p) => (p + 1) % OILS.length);
  const prev = () => setCurrentPage((p) => (p - 1 + OILS.length) % OILS.length);

  const oil = OILS[currentPage];
  const Icon = oil.icon;

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 flex flex-col items-center">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-foreground tracking-tight mb-3">
          The <span className="text-primary">Oil Guide</span>
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Flip through our premium collection to understand the benefits and uses of each wood-pressed oil.
        </p>
      </div>

      <div className="relative w-full max-w-5xl mx-auto px-4 perspective-[1500px]">
        {/* Book Container */}
        <div className="relative flex flex-col md:flex-row w-full h-[600px] md:h-[500px] bg-card rounded-3xl shadow-xl overflow-hidden border border-border/50">
          
          {/* Left Page (Image & Key Points) */}
          <div className="w-full md:w-1/2 h-full bg-zinc-50 dark:bg-zinc-900/50 p-8 flex flex-col justify-center items-center relative border-r border-border/50 z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage + "-img"}
                initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: -90 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex flex-col items-center w-full"
              >
                <div className="relative w-48 h-64 mb-6">
                  <Image src={oil.image} alt={oil.name} fill className="object-contain drop-shadow-xl" />
                </div>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {oil.bestFor.map((use) => (
                    <span key={use} className="bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full border border-primary/20">
                      {use}
                    </span>
                  ))}
                </div>
                <p className="text-sm font-semibold text-foreground text-center max-w-xs">
                  {oil.highlight}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Page (Explanation) */}
          <div className="w-full md:w-1/2 h-full bg-card p-8 flex flex-col justify-center relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage + "-text"}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="w-full"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-foreground">{oil.name}</h2>
                    <p className="text-xs font-bold text-primary uppercase tracking-widest">{oil.tamil}</p>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">About this oil</h3>
                  <p className="text-foreground leading-relaxed text-lg">
                    {oil.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls Overlay */}
          <div className="absolute inset-x-0 bottom-4 flex justify-between px-6 pointer-events-none z-20">
            <button onClick={prev} className="pointer-events-auto h-12 w-12 rounded-full bg-foreground text-background flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button onClick={next} className="pointer-events-auto h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

        </div>
        
        {/* Page Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {OILS.map((_, i) => (
            <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === currentPage ? "w-8 bg-primary" : "w-2 bg-border"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
