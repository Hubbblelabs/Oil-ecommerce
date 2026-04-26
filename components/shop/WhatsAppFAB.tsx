"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "917305212759";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello! I'm interested in ordering Shri Sameya Village Wood Cold Pressed Oils. Please share the available products and prices."
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export function WhatsAppFAB() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order via WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-20 right-4 md:bottom-8 md:right-6 z-50 flex items-center gap-2 group"
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            key="label"
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="bg-zinc-900 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-lg whitespace-nowrap"
          >
            Order via WhatsApp
          </motion.span>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="flex h-14 w-14 items-center justify-center rounded-full shadow-[0_4px_24px_rgba(37,211,102,0.45)] bg-[#25D366] border-2 border-[#1fa851] text-white"
      >
        {/* WhatsApp SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="h-7 w-7 fill-white"
          aria-hidden="true"
        >
          <path d="M16.004 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.347.63 4.587 1.76 6.523L2.667 29.333l6.987-1.733A13.253 13.253 0 0 0 16.004 29.333C23.36 29.333 29.333 23.36 29.333 16S23.36 2.667 16.004 2.667zm0 2.133c6.186 0 11.196 5.01 11.196 11.2 0 6.187-5.01 11.2-11.196 11.2-2.067 0-3.987-.56-5.64-1.547l-.4-.24-4.147 1.04 1.08-3.986-.266-.414A11.137 11.137 0 0 1 4.8 16c0-6.186 5.013-11.2 11.204-11.2zm-3.04 5.707c-.213 0-.56.08-.853.4-.293.32-1.12 1.093-1.12 2.667 0 1.573 1.147 3.093 1.307 3.307.16.213 2.24 3.573 5.52 4.88 2.72 1.093 3.28.88 3.867.827.587-.053 1.893-.773 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.134-.293-.213-.614-.373-.32-.16-1.893-.933-2.187-1.04-.293-.107-.506-.16-.72.16-.213.32-.826 1.04-.986 1.253-.16.213-.32.24-.64.08-.32-.16-1.36-.493-2.587-1.587-.96-.853-1.6-1.907-1.787-2.227-.187-.32-.013-.493.147-.64.146-.133.32-.347.48-.52.16-.173.213-.293.32-.507.107-.213.053-.4-.027-.56-.08-.16-.72-1.747-.987-2.387-.24-.587-.493-.507-.72-.52-.187-.013-.4-.013-.613-.013z" />
        </svg>
      </motion.div>
    </a>
  );
}
