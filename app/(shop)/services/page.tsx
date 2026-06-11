import type { Metadata } from "next";
import Link from "next/link";
import { productService } from "@/server/services/product.service";
import { orderService } from "@/server/services/order.service";
import { cacheTag, cacheLife } from "next/cache";
import {
  ShoppingBag,
  ClipboardList,
  Package2,
  Tag,
  Truck,
  Shield,
  Star,
  ArrowRight,
  ArrowUpRight,
  Zap,
  BarChart3,
  Globe,
  MessageCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Everything we do for your kitchen — retail and bulk wood-pressed oils, pan-India delivery, order tracking, WhatsApp ordering, and seasonal offers.",
};

const SERVICES = [
  {
    icon: ShoppingBag,
    no: "01",
    title: "The Retail Collection",
    description:
      "Browse our full range of cold-pressed, wood-pressed oils — groundnut, coconut, sesame, sunflower, and more. Filter by category, price, and availability.",
    features: ["Filter by category & price", "500 ml to 5 L pack sizes", "Live stock availability", "Verified customer reviews"],
    href: "/products",
    cta: "Browse the collection",
  },
  {
    icon: Package2,
    no: "02",
    title: "Bulk & B2B Supply",
    description:
      "Restaurants, hotels, and retailers get dedicated pricing on bulk orders — 5 L, 15 L, and beyond. A consistent, traceable supply from one village mill.",
    features: ["Restaurant & hotel pricing", "15 L+ bulk packs", "Custom packaging", "Reliable repeat supply"],
    href: "/products?category=INDUSTRIAL",
    cta: "View bulk products",
  },
  {
    icon: Globe,
    no: "03",
    title: "Pan-India Delivery",
    description:
      "We ship across India from our mill in Coimbatore, Tamil Nadu. Free shipping on orders above ₹499, with dispatch within 24 hours on working days.",
    features: ["Free delivery above ₹499", "24-hour dispatch", "Tracked shipments", "Careful, leak-proof packing"],
    href: "/contact",
    cta: "Check your pincode",
  },
  {
    icon: ClipboardList,
    no: "04",
    title: "Order Tracking",
    description:
      "Follow every bottle from press to porch. Your account shows live status for each order — pending, paid, shipped, delivered — with full history.",
    features: ["Real-time status updates", "Complete order history", "Easy reordering", "Per-item price breakdown"],
    href: "/orders",
    cta: "Track my orders",
  },
  {
    icon: Tag,
    no: "05",
    title: "Seasonal Offers",
    description:
      "Harvest-time discounts and loyal-customer codes, applied at checkout for instant savings. No games — just honest prices that dip when the season is generous.",
    features: ["Checkout discount codes", "Percentage-based savings", "Festival specials", "First-order free delivery"],
    href: "/products",
    cta: "Shop with offers",
  },
  {
    icon: MessageCircle,
    no: "06",
    title: "WhatsApp Ordering",
    description:
      "Prefer to talk to a person? Message us on WhatsApp and we'll help you pick the right oils, confirm your order, and arrange delivery — the village way.",
    features: ["Personal recommendations", "Order without an account", "Bulk enquiries welcome", "Mon–Sat, 9 am – 7 pm"],
    href: "/contact",
    cta: "Message us",
  },
];

const HIGHLIGHTS = [
  { icon: Zap, label: "Fast dispatch", sub: "Orders processed within 24h" },
  { icon: Shield, label: "Secure payments", sub: "SSL + Razorpay" },
  { icon: Star, label: "Pure quality", sub: "FSSAI-certified cold press" },
  { icon: BarChart3, label: "Live tracking", sub: "Real-time order status" },
  { icon: Truck, label: "Free shipping", sub: "On orders above ₹499" },
];

async function getStats() {
  "use cache";
  cacheTag("products", "orders");
  cacheLife("minutes");
  try {
    const [products, orders] = await Promise.all([
      productService.getProducts(1, 100),
      orderService.getOrders(1, 100),
    ]);
    return {
      productCount: products.total,
      orderCount: orders.total,
    };
  } catch {
    return { productCount: 50, orderCount: 500 };
  }
}

export default async function ServicesPage() {
  const stats = await getStats();

  const statItems = [
    { value: `${stats.productCount}+`, label: "Products listed" },
    { value: `${stats.orderCount}+`, label: "Orders fulfilled" },
    { value: "4", label: "Oil categories" },
    { value: "100%", label: "Pure & natural" },
  ];

  return (
    <div className="bg-background">
      {/* ── Editorial hero ── */}
      <section className="grain relative overflow-hidden bg-secondary text-secondary-foreground">
        <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-primary/15 blur-[130px]" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 lg:px-8 lg:pb-20 lg:pt-24">
          <p className="eyebrow mb-5 flex items-center gap-3">
            <span className="inline-block h-px w-10 bg-primary" />
            What we offer
          </p>
          <div className="flex flex-wrap items-end justify-between gap-10">
            <h1 className="text-display-hero max-w-2xl text-4xl sm:text-5xl lg:text-6xl">
              Six services, one
              <br />
              <em className="text-display-italic text-primary">unhurried promise.</em>
            </h1>
            <p className="max-w-sm text-sm leading-relaxed text-secondary-foreground/60">
              From browsing the collection to bulk B2B supply — everything we do,
              built around oil pressed slowly in one Tamil Nadu village.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-secondary-foreground/10 bg-secondary-foreground/10 sm:grid-cols-4">
            {statItems.map((stat) => (
              <div key={stat.label} className="bg-secondary px-6 py-6">
                <p className="font-display text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
                  {stat.value}
                </p>
                <p className="label-tiny mt-2 text-secondary-foreground/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Highlights bar ── */}
      <div className="border-b border-border bg-paper-deep">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3">
            {HIGHLIGHTS.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/25 bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Services grid ── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mb-14 max-w-xl">
          <p className="eyebrow mb-4 flex items-center gap-3">
            <span className="inline-block h-px w-10 bg-primary" />
            The full platform
          </p>
          <h2 className="text-display-hero text-3xl text-foreground sm:text-4xl lg:text-5xl">
            Everything under <em className="text-display-italic text-primary">one roof</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.title} className="card-editorial group flex flex-col p-8">
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/25 bg-primary/10 transition-colors duration-300 group-hover:bg-primary">
                    <Icon className="h-5 w-5 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
                  </div>
                  <span className="label-xs text-muted-foreground/60">{service.no}</span>
                </div>

                <h3 className="font-display mb-3 text-xl font-semibold tracking-tight text-foreground">
                  {service.title}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                <ul className="mb-8 space-y-2.5">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-foreground/80">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={service.href}
                  className="link-underline mt-auto inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wide text-primary"
                >
                  {service.cta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="grain relative overflow-hidden bg-secondary py-20 text-secondary-foreground">
        <div className="pointer-events-none absolute right-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-primary/15 blur-[120px]" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-display-hero mb-5 text-3xl sm:text-4xl lg:text-5xl">
            Ready to taste{" "}
            <em className="text-display-italic text-primary">pure tradition?</em>
          </h2>
          <p className="mx-auto mb-10 max-w-md text-sm leading-relaxed text-secondary-foreground/60">
            Shop premium cold-pressed oils delivered fresh from our village mill —
            or talk to us about supplying yours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="btn-shine group inline-flex h-12 items-center gap-2.5 rounded-full bg-primary px-7 text-sm font-bold text-primary-foreground transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              Shop now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/contact"
              className="group inline-flex h-12 items-center gap-2 rounded-full border border-secondary-foreground/25 px-7 text-sm font-semibold text-secondary-foreground/85 transition-colors hover:border-primary hover:text-primary"
            >
              Contact for bulk orders
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
