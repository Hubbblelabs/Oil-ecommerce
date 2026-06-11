"use client";
import { motion } from "framer-motion";
import { Phone, MapPin, MessageCircle, Clock, ArrowUpRight } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function WhatsAppCTASection() {
  const whatsappUrl =
    "https://wa.me/917305212759?text=Hi%2C%20I%27m%20interested%20in%20ordering%20Shri%20Sameya%20Village%20wood%20pressed%20oils.";

  return (
    <section className="bg-background pb-24 pt-4 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="grain relative overflow-hidden rounded-[2.5rem] bg-secondary text-secondary-foreground"
        >
          {/* Ambient glows */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-primary/10 blur-[90px]" />

          <div className="relative z-10 grid grid-cols-1 gap-14 px-8 py-16 sm:px-12 sm:py-20 lg:grid-cols-2 lg:gap-12">
            {/* Left — CTA */}
            <div>
              <p className="eyebrow mb-6 flex items-center gap-3 text-[#25D366]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#25D366]" />
                </span>
                We&apos;re online now
              </p>

              <h2 className="text-display-hero mb-6 text-4xl sm:text-5xl">
                Ready to switch to
                <br />
                <em className="text-display-italic text-primary">healthier cooking?</em>
              </h2>

              <p className="mb-10 max-w-md text-sm leading-relaxed opacity-65 sm:text-base">
                Order directly from us on WhatsApp. Get the freshest batch, custom
                quantities, and answers to all your questions — all in one chat.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shine group inline-flex items-center gap-3 rounded-full bg-[#25D366] px-8 py-4 text-sm font-bold text-white transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
                <a
                  href="tel:+917305212759"
                  className="inline-flex items-center gap-3 rounded-full border border-secondary-foreground/25 px-8 py-4 text-sm font-semibold transition-colors hover:border-secondary-foreground/60"
                >
                  <Phone className="h-4 w-4" />
                  Call us now
                </a>
              </div>
            </div>

            {/* Right — contact details, editorial rows */}
            <div className="flex flex-col divide-y divide-secondary-foreground/10 border-y border-secondary-foreground/10 lg:self-center">
              <div className="flex items-center gap-5 py-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-secondary-foreground/20 text-primary">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="label-tiny opacity-50">Phone / WhatsApp</p>
                  <a
                    href="tel:+917305212759"
                    className="font-display text-xl font-semibold tracking-tight transition-colors hover:text-primary"
                  >
                    +91 73052 12759
                  </a>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/place/Shri+Sameya+Village+Wood+Cold+Pressed+oil+Mill/@10.9977733,77.0148808,196m/data=!3m1!1e3!4m6!3m5!1s0x3ba8578b603c1543:0x643e8cbfc32ce7ab!8m2!3d10.9980135!4d77.0149197!16s%2Fg%2F11nhh9vc0q!5m1!1e4?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 py-6"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-secondary-foreground/20 text-primary transition-colors group-hover:border-primary">
                  <MapPin className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <p className="label-tiny opacity-50">Location</p>
                  <p className="text-sm font-semibold leading-snug">
                    Coimbatore, Ramanathapuram
                    <span className="block font-normal opacity-60">Trichy Road, Tamil Nadu</span>
                  </p>
                </div>
                <ArrowUpRight className="h-4 w-4 opacity-40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary group-hover:opacity-100" />
              </a>

              <div className="flex items-center gap-5 py-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-secondary-foreground/20 text-primary">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <p className="label-tiny opacity-50">Order timings</p>
                  <p className="text-sm font-semibold">Mon–Sat: 8:00 AM – 7:00 PM</p>
                  <p className="text-xs opacity-50">Sunday: 9:00 AM – 3:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
