"use client";

import { useState } from "react";
import { MapPin, Phone, MessageCircle, Clock, ChevronDown, ChevronUp, CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      <section className="grain relative overflow-hidden bg-secondary pb-16 pt-14 text-secondary-foreground">
        <div className="pointer-events-none absolute left-1/3 top-0 h-[300px] w-[600px] rounded-full bg-primary/15 blur-[120px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="eyebrow mb-4 flex items-center justify-center gap-3">
            <span className="inline-block h-px w-10 bg-primary" />
            Get in touch
            <span className="inline-block h-px w-10 bg-primary" />
          </p>
          <h1 className="text-display-hero mb-5 text-4xl sm:text-5xl lg:text-6xl">
            Talk to the <em className="text-display-italic text-primary">village.</em>
          </h1>
          <p className="mx-auto max-w-lg text-sm leading-relaxed text-secondary-foreground/60 sm:text-base">
            Order via WhatsApp, ask us anything, or visit us in Coimbatore. We&rsquo;d love to hear from you.
          </p>
        </div>
      </section>

      {/* ── Contact Cards + Form ── */}
      <section className="bg-background py-16">
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
                className="group flex gap-4 items-start rounded-2xl border border-border bg-card hover:bg-accent/60 p-5 transition-colors"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground">Call Us</p>
                  <p className="text-sm text-muted-foreground">Mon–Sat, 9am–7pm</p>
                  <p className="text-primary font-semibold text-sm mt-1">+91 73052 12759</p>
                </div>
              </a>

              <a
                href="https://www.google.com/maps/place/Shri+Sameya+Village+Wood+Cold+Pressed+oil+Mill/@10.9977733,77.0148808,196m/data=!3m1!1e3!4m6!3m5!1s0x3ba8578b603c1543:0x643e8cbfc32ce7ab!8m2!3d10.9980135!4d77.0149197!16s%2Fg%2F11nhh9vc0q!5m1!1e4?entry=ttu&g_ep=EgoyMDI2MDQyMi4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-4 items-start rounded-2xl border border-border bg-card hover:bg-accent/60 p-5 transition-colors"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sage/15">
                  <MapPin className="h-6 w-6 text-sage" />
                </div>
                <div>
                  <p className="font-bold text-foreground">Our Location</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Coimbatore, Ramanathapuram<br />
                    Trichy Road, Tamil Nadu, India
                  </p>
                  <p className="text-sage font-semibold text-sm mt-1 group-hover:underline">Get Directions →</p>
                </div>
              </a>

              <div className="flex gap-4 items-start rounded-2xl border border-border bg-card p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold-light">
                  <Clock className="h-6 w-6 text-primary" />
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
                    We&rsquo;ve opened WhatsApp with your message pre-filled. We&rsquo;ll reply as soon as possible!
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
                    Fill in your details and we&rsquo;ll open WhatsApp with your message pre-filled.
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
      <section className="px-4 sm:px-6 lg:px-8 pb-8 bg-background">
        <div className="mx-auto max-w-7xl rounded-3xl overflow-hidden shadow-premium border border-border h-[320px] sm:h-[400px] bg-paper-deep">
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
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="eyebrow mb-3 flex items-center justify-center gap-3">
              <span className="inline-block h-px w-10 bg-primary" />
              FAQ
              <span className="inline-block h-px w-10 bg-primary" />
            </p>
            <h2 className="text-display-hero text-3xl text-foreground sm:text-4xl">
              Frequently asked <em className="text-display-italic text-primary">questions</em>
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-border rounded-2xl overflow-hidden">
                <button
                  id={`faq-${i}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left bg-card hover:bg-accent/50 transition-colors"
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="font-semibold text-foreground text-sm">{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp className="h-4 w-4 text-primary shrink-0" />
                    : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
                </button>
                {openFaq === i && (
                  <div id={`faq-answer-${i}`} className="px-6 py-4 bg-paper-deep border-t border-border">
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
