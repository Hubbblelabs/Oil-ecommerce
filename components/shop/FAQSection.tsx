"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus } from "lucide-react";

const FAQS = [
  {
    q: "What is wood pressed / chekku oil?",
    a: "Wood pressed (or chekku) oil is extracted using a traditional wooden press that operates at low temperatures. Unlike modern refining, no chemicals or solvents are used — only mechanical pressure. This preserves natural nutrients, aroma, and taste that heat-based refining destroys.",
  },
  {
    q: "Why is cold pressed oil healthier than refined oil?",
    a: "Cold pressing keeps Vitamin E, antioxidants, phytosterols and natural fats fully intact. Refined oils go through bleaching, deodorising and high-heat processing that destroys these nutrients and may introduce chemical residues.",
  },
  {
    q: "Does wood pressed oil have a shorter shelf life?",
    a: "Yes — typically 6 to 12 months. This is actually a sign of purity. Because we add zero preservatives, the oil is natural. Store in a cool, dark place and use within the recommended period.",
  },
  {
    q: "Are your oils FSSAI certified?",
    a: "Absolutely. Our facility is FSSAI certified and every batch is quality-tested before dispatch. We follow strict hygiene protocols from seed selection to bottling.",
  },
  {
    q: "Do you offer bulk pricing for restaurants and retailers?",
    a: "Yes! We have special pricing for restaurants, hotels, caterers, and retailers. WhatsApp us at 7305212759 or visit our Contact page and mention bulk orders.",
  },
  {
    q: "Which oil should I use for deep frying?",
    a: "Groundnut oil is ideal for deep frying — it has a high smoke point (~225°C) and a stable fatty acid profile that doesn't break down easily under heat. Sesame and coconut oils are better suited for medium-heat cooking and traditional dishes.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 bg-[#FAF8F2] dark:bg-zinc-950">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#D97706] text-sm font-bold uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#3B2416] dark:text-white">
            Questions? We've Got Answers
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className={`rounded-2xl border overflow-hidden transition-all ${
                open === i
                  ? "border-[#D97706]/50 shadow-[0_4px_20px_rgba(217,119,6,0.12)]"
                  : "border-[#E9D8A6] dark:border-zinc-800"
              }`}
            >
              <button
                id={`faq-item-${i}`}
                onClick={() => setOpen(open === i ? null : i)}
                className={`w-full flex items-center justify-between gap-4 px-6 py-4 text-left transition-colors ${
                  open === i
                    ? "bg-[#D97706]/8 dark:bg-[#D97706]/12"
                    : "bg-white dark:bg-zinc-900 hover:bg-[#FAF8F2] dark:hover:bg-zinc-800"
                }`}
                aria-expanded={open === i}
              >
                <span className="font-semibold text-[#3B2416] dark:text-white text-sm pr-2">{faq.q}</span>
                <div className={`h-7 w-7 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                  open === i
                    ? "bg-[#D97706] border-[#D97706] text-white rotate-45"
                    : "border-[#E9D8A6] dark:border-zinc-700 text-muted-foreground"
                }`}>
                  <Plus className="h-4 w-4" />
                </div>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-1 bg-white dark:bg-zinc-900 border-t border-[#E9D8A6]/40 dark:border-zinc-800">
                      <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
