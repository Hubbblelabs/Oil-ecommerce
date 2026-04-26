"use client";

import { useState } from "react";
import { MapPin, Phone, MessageCircle, Mail, Clock, ChevronDown, ChevronUp, CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

const FAQS = [
  { q: "How do I place an order?", a: "You can order directly through our website, or reach us instantly on WhatsApp at 7305212759. We're happy to assist you pick the right oils for your needs." },
  { q: "Do you deliver outside Coimbatore?", a: "Yes! We deliver across Tamil Nadu and to major cities across India. WhatsApp us with your pincode for delivery details and estimated timelines." },
  { q: "What sizes are available?", a: "Our oils are available in 500 ml, 1 litre, and 5 litre packs. Bulk / industrial packs are also available — contact us for custom requirements." },
  { q: "Are your oils really chemical-free?", a: "Absolutely. We use the traditional Chekku (wood cold-press) method with no solvents, no bleaching, and no preservatives. FSSAI certified." },
  { q: "What is the shelf life?", a: "Cold-pressed oils have a shelf life of 6–12 months when stored in a cool, dark place. No artificial preservatives means a naturally shorter shelf life — which is a sign of purity." },
  { q: "Do you offer bulk pricing for restaurants or retailers?", a: "Yes! We have special pricing for restaurants, hotels, and retailers. Call or WhatsApp us and mention you're interested in bulk orders." },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const WHATSAPP_URL = (msg: string) =>
    `https://wa.me/917305212759?text=${encodeURIComponent(msg)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello! My name is ${form.name}.\nPhone: ${form.phone}\n\n${form.message}`;
    window.open(WHATSAPP_URL(msg), "_blank");
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col">

      {/* ── Hero ── */}
      <section className="bg-zinc-950 relative overflow-hidden pt-10 pb-16">
        <div className="absolute top-0 left-1/3 w-[600px] h-[300px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-3">Get In Touch</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-zinc-400 max-w-lg mx-auto">
            Order via WhatsApp, ask us anything, or visit us in Coimbatore. We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* ── Contact Cards + Form ── */}
      <section className="py-16 bg-white dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Left: info cards */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <a
                href="https://wa.me/917305212759"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-4 items-start rounded-2xl border-2 border-[#25D366]/40 bg-[#25D366]/5 hover:bg-[#25D366]/10 p-5 transition-colors"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-[0_4px_16px_rgba(37,211,102,0.3)]">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-foreground">WhatsApp Order</p>
                  <p className="text-sm text-muted-foreground">Chat with us instantly</p>
                  <p className="text-[#25D366] font-semibold text-sm mt-1">+91 73052 12759 →</p>
                </div>
              </a>

              <a
                href="tel:+917305212759"
                className="group flex gap-4 items-start rounded-2xl border border-border bg-card hover:bg-amber-50/60 dark:hover:bg-amber-950/10 p-5 transition-colors"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-900/30">
                  <Phone className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="font-bold text-foreground">Call Us</p>
                  <p className="text-sm text-muted-foreground">Mon–Sat, 9am–7pm</p>
                  <p className="text-amber-600 font-semibold text-sm mt-1">+91 73052 12759</p>
                </div>
              </a>

              <a
                href="https://www.google.com/maps/place/Shri+Sameya+Village+Wood+Cold+Pressed+oil+Mill/@10.9977733,77.0148808,196m/data=!3m1!1e3!4m6!3m5!1s0x3ba8578b603c1543:0x643e8cbfc32ce7ab!8m2!3d10.9980135!4d77.0149197!16s%2Fg%2F11nhh9vc0q!5m1!1e4?entry=ttu&g_ep=EgoyMDI2MDQyMi4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-4 items-start rounded-2xl border border-border bg-card hover:bg-amber-50/60 dark:hover:bg-amber-950/10 p-5 transition-colors"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/30">
                  <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-bold text-foreground">Our Location</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Coimbatore, Ramanathapuram<br />
                    Trichy Road, Tamil Nadu, India
                  </p>
                  <p className="text-blue-600 font-semibold text-sm mt-1 group-hover:underline">Get Directions →</p>
                </div>
              </a>

              <div className="flex gap-4 items-start rounded-2xl border border-border bg-card p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100 dark:bg-green-900/30">
                  <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-bold text-foreground">Business Hours</p>
                  <p className="text-sm text-muted-foreground">Monday – Saturday</p>
                  <p className="text-sm font-semibold text-foreground mt-0.5">9:00 AM – 7:00 PM</p>
                </div>
              </div>
            </div>

            {/* Right: contact form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 py-16 text-center">
                  <CheckCircle2 className="h-16 w-16 text-[#25D366]" />
                  <h2 className="text-2xl font-bold text-foreground">Message sent via WhatsApp!</h2>
                  <p className="text-muted-foreground max-w-sm">
                    We've opened WhatsApp with your message pre-filled. We'll reply as soon as possible!
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="rounded-xl mt-4"
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <div className="bg-card border border-border rounded-3xl p-8 shadow-premium">
                  <h2 className="text-2xl font-bold text-foreground mb-2">Send us a message</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Fill in your details and we'll open WhatsApp with your message pre-filled.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5" htmlFor="contact-name">
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="e.g. Ravi Kumar"
                        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5" htmlFor="contact-phone">
                        Phone / WhatsApp Number
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        placeholder="+91 98765 43210"
                        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5" htmlFor="contact-message">
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        required
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        placeholder="I'd like to order 2 litres of Groundnut Oil and 1 litre of Sesame Oil..."
                        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-12 rounded-xl bg-[#25D366] hover:bg-[#1fa851] text-white font-bold border-0 text-base shadow-[0_4px_16px_rgba(37,211,102,0.3)]"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send via WhatsApp
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Live Map Embed ── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="mx-auto max-w-7xl rounded-3xl overflow-hidden shadow-premium border border-border h-[400px] bg-amber-50 dark:bg-zinc-900">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d195.8368817297839!2d77.0143808!3d10.9977733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8578b603c1543%3A0x643e8cbfc32ce7ab!2sShri%20Sameya%20Village%20Wood%20Cold%20Pressed%20oil%20Mill!5e0!3m2!1sen!2sin!4v1714110000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Shri Sameya Village Wood Cold Pressed Oil Mill Location"
            className="grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 bg-white dark:bg-zinc-950">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-amber-600 text-sm font-bold uppercase tracking-widest mb-2">FAQ</p>
            <h2 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-border rounded-2xl overflow-hidden">
                <button
                  id={`faq-${i}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left bg-card hover:bg-amber-50/50 dark:hover:bg-amber-950/10 transition-colors"
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="font-semibold text-foreground text-sm">{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp className="h-4 w-4 text-amber-600 shrink-0" />
                    : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
                </button>
                {openFaq === i && (
                  <div id={`faq-answer-${i}`} className="px-6 py-4 bg-amber-50/40 dark:bg-amber-950/10 border-t border-border">
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
