"use client";
import { motion } from "framer-motion";
import { Phone, MapPin, MessageCircle, ArrowRight, Clock } from "lucide-react";

export function WhatsAppCTASection() {
  const whatsappUrl = "https://wa.me/917305212759?text=Hi%2C%20I%27m%20interested%20in%20ordering%20Shri%20Sameya%20Village%20wood%20pressed%20oils.";

  return (
    <section className="py-20 bg-white dark:bg-zinc-900 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-[#3B2416] via-[#4a2e1c] to-[#2a180e] rounded-3xl overflow-hidden"
        >
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D97706]/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D97706]/10 rounded-full blur-[80px] pointer-events-none" />

          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 px-8 py-16 sm:px-12 sm:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* Left: CTA Text */}
              <div>
                <div className="inline-flex items-center gap-2 bg-[#25D366]/20 border border-[#25D366]/30 rounded-full px-4 py-1.5 mb-6">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#25D366] animate-pulse" />
                  <span className="text-[#25D366] text-xs font-bold tracking-widest uppercase">We&apos;re Online Now</span>
                </div>

                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                  Ready to Switch to
                  <span className="block text-[#D97706]">Healthier Cooking?</span>
                </h2>

                <p className="text-white/65 text-base leading-relaxed mb-8 max-w-lg">
                  Order directly from us on WhatsApp. Get the freshest batch, custom quantities,
                  and answers to all your questions — all in one chat.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <motion.a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1fb85a] text-white font-bold px-7 py-3.5 rounded-xl text-base transition-all shadow-[0_8px_24px_rgba(37,211,102,0.35)] hover:shadow-[0_8px_36px_rgba(37,211,102,0.5)]"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Chat on WhatsApp
                  </motion.a>

                  <motion.a
                    href="tel:+917305212759"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-3.5 rounded-xl text-base border border-white/20 transition-all backdrop-blur-sm"
                  >
                    <Phone className="h-5 w-5" />
                    Call Us Now
                  </motion.a>
                </div>
              </div>

              {/* Right: Info cards */}
              <div className="flex flex-col gap-4">
                {/* Phone */}
                <div className="flex items-center gap-5 bg-white/8 border border-white/12 rounded-2xl p-5 backdrop-blur-sm">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#D97706]/20 border border-[#D97706]/30">
                    <Phone className="h-6 w-6 text-[#D97706]" />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-0.5">Phone / WhatsApp</p>
                    <a href="tel:+917305212759" className="text-white text-xl font-bold hover:text-[#D97706] transition-colors">
                      +91 73052 12759
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-5 bg-white/8 border border-white/12 rounded-2xl p-5 backdrop-blur-sm">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#D97706]/20 border border-[#D97706]/30">
                    <MapPin className="h-6 w-6 text-[#D97706]" />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-0.5">Location</p>
                    <p className="text-white font-semibold text-sm leading-snug">
                      Coimbatore, Ramanathapuram<br />
                      <span className="text-white/60 font-normal">Trichy Road, Tamil Nadu</span>
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-center gap-5 bg-white/8 border border-white/12 rounded-2xl p-5 backdrop-blur-sm">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#D97706]/20 border border-[#D97706]/30">
                    <Clock className="h-6 w-6 text-[#D97706]" />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-0.5">Order Timings</p>
                    <p className="text-white font-semibold text-sm">Mon–Sat: 8:00 AM – 7:00 PM</p>
                    <p className="text-white/50 text-xs mt-0.5">Sunday: 9:00 AM – 3:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
