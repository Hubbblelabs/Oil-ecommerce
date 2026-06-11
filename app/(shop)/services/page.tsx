import type { Metadata } from "next";
import Link from "next/link";
import { productService } from "@/server/services/product.service";
import { orderService } from "@/server/services/order.service";
import { cacheTag, cacheLife } from "next/cache";
import {
  ShoppingBag,
  ClipboardList,
  Users,
  Package2,
  Tag,
  Truck,
  Shield,
  Star,
  ArrowRight,
  Zap,
  BarChart3,
  Globe,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Services | Shri Sameya Village Oils",
  description:
    "Explore all services â€” product listing, order management, user management, bulk orders, discount management, and more.",
};

const SERVICES = [
  {
    icon: ShoppingBag,
    color: "#D97706",
    bg: "rgba(217,119,6,0.08)",
    border: "rgba(217,119,6,0.2)",
    title: "Product Listing",
    description:
      "Browse our full range of cold-pressed, wood-pressed oils â€” groundnut, coconut, sesame, sunflower, and more. Filter by category, price, and availability.",
    features: ["Filter by category & price", "Search by name", "Bulk & retail sizes", "Stock availability"],
    href: "/products",
    cta: "Browse Products",
  },
  {
    icon: ClipboardList,
    color: "#16a34a",
    bg: "rgba(22,163,74,0.08)",
    border: "rgba(22,163,74,0.2)",
    title: "Order Management",
    description:
      "Track your orders in real-time. From PENDING â†’ PAID â†’ SHIPPED â†’ DELIVERED. Full order history with item details and total breakdown.",
    features: ["Real-time order tracking", "Full order history", "PDF invoice download", "Status notifications"],
    href: "/orders",
    cta: "My Orders",
  },
  {
    icon: Users,
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.08)",
    border: "rgba(124,58,237,0.2)",
    title: "User Management",
    description:
      "Secure account system with role-based access. Admin, Seller, and User roles each with dedicated dashboards and permission levels.",
    features: ["Role-based access (Admin/Seller/User)", "Secure JWT authentication", "Profile management", "Order history per user"],
    href: "/login",
    cta: "Sign In",
  },
  {
    icon: Package2,
    color: "#0ea5e9",
    bg: "rgba(14,165,233,0.08)",
    border: "rgba(14,165,233,0.2)",
    title: "Bulk / B2B Orders",
    description:
      "Restaurant, hotel, and retail partners get special pricing on bulk orders (5L, 15L, tanker quantities). Contact us for custom pricing.",
    features: ["Restaurant & hotel pricing", "15L+ bulk packs", "Custom packaging", "Consistent supply chain"],
    href: "/products?category=INDUSTRIAL",
    cta: "View Bulk Products",
  },
  {
    icon: Tag,
    color: "#dc2626",
    bg: "rgba(220,38,38,0.08)",
    border: "rgba(220,38,38,0.2)",
    title: "Discount & Offers",
    description:
      "Exclusive discount codes for loyal customers. Admin generates codes with custom descriptions; apply at checkout for instant savings.",
    features: ["Admin-generated promo codes", "Percentage-based discounts", "Apply at checkout", "Code validity management"],
    href: "/checkout",
    cta: "Shop with Offers",
  },
  {
    icon: Globe,
    color: "#0d9488",
    bg: "rgba(13,148,136,0.08)",
    border: "rgba(13,148,136,0.2)",
    title: "Pan-India Delivery",
    description:
      "We deliver across India from our mill in Coimbatore, Tamil Nadu. Free shipping on orders above â‚¹499. Fast dispatch within 24 hours.",
    features: ["Free delivery above â‚¹499", "24-hour dispatch", "Pan-India coverage", "Tracked shipments"],
    href: "/contact",
    cta: "Contact Us",
  },
];

const HIGHLIGHTS = [
  { icon: Zap, label: "Lightning Fast", sub: "Orders processed within 24h" },
  { icon: Shield, label: "100% Secure", sub: "SSL + Razorpay payments" },
  { icon: Star, label: "Pure Quality", sub: "FSSAI certified cold press" },
  { icon: BarChart3, label: "Live Tracking", sub: "Real-time order status" },
  { icon: Truck, label: "Free Shipping", sub: "On orders above â‚¹499" },
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

  return (
    <div className="min-h-screen bg-[#FAF8F2] dark:bg-zinc-950">
      {/* Hero Banner */}
      <div className="relative bg-[#1a0e04] overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 30% 50%, #D97706 0%, transparent 50%), radial-gradient(ellipse at 80% 30%, #b45309 0%, transparent 50%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-[#D97706]/20 border border-[#D97706]/30 rounded-full px-4 py-1.5 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D97706] animate-pulse" />
            <span className="text-[#D97706] text-xs font-bold tracking-widest uppercase">What We Offer</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-5">
            All Our <span className="text-[#D97706]">Services</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-10">
            From browsing authentic oils to managing bulk B2B orders â€” everything you need, built for a seamless experience.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8">
            <div>
              <p className="text-4xl font-black text-[#D97706]">{stats.productCount}+</p>
              <p className="text-zinc-400 text-sm font-semibold">Products Listed</p>
            </div>
            <div className="w-px bg-zinc-700 hidden sm:block" />
            <div>
              <p className="text-4xl font-black text-[#D97706]">{stats.orderCount}+</p>
              <p className="text-zinc-400 text-sm font-semibold">Orders Fulfilled</p>
            </div>
            <div className="w-px bg-zinc-700 hidden sm:block" />
            <div>
              <p className="text-4xl font-black text-[#D97706]">4</p>
              <p className="text-zinc-400 text-sm font-semibold">Oil Categories</p>
            </div>
            <div className="w-px bg-zinc-700 hidden sm:block" />
            <div>
              <p className="text-4xl font-black text-[#D97706]">100%</p>
              <p className="text-zinc-400 text-sm font-semibold">Pure & Natural</p>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights Bar */}
      <div className="bg-white dark:bg-zinc-900 border-b border-[#E9D8A6]/40 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3">
            {HIGHLIGHTS.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D97706]/10">
                  <Icon className="h-[18px] w-[18px] text-[#D97706]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#3B2416] dark:text-white">{label}</p>
                  <p className="text-xs text-muted-foreground">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <p className="text-[#D97706] text-sm font-bold uppercase tracking-widest mb-3">Complete Platform</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#3B2416] dark:text-white">
            Everything Under One Roof
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            A complete oil e-commerce ecosystem â€” from farm to your kitchen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="bg-white dark:bg-zinc-900 rounded-3xl border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                style={{ borderColor: service.border }}
              >
                {/* Card header */}
                <div className="p-6 pb-4" style={{ background: service.bg }}>
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl mb-4"
                    style={{ background: service.color + "20", border: `1px solid ${service.border}` }}
                  >
                    <Icon className="h-6 w-6" style={{ color: service.color }} />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-[#3B2416] dark:text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                </div>

                {/* Features list */}
                <div className="px-6 py-4 flex-1">
                  <ul className="space-y-2">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-[#3B2416] dark:text-zinc-300">
                        <div className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: service.color }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="px-6 pb-6">
                  <Link
                    href={service.href}
                    className="inline-flex w-full items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold transition-all hover:text-white"
                    style={{
                      border: `2px solid ${service.color}`,
                      color: service.color,
                    }}
                  >
                    {service.cta} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-[#1a0e04] py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-white mb-4">
            Ready to taste <span className="text-[#D97706]">pure tradition?</span>
          </h2>
          <p className="text-zinc-400 mb-8">
            Shop premium cold-pressed oils delivered fresh from our village mill.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[#D97706] hover:bg-[#b86004] text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-[0_8px_30px_rgba(217,119,6,0.35)]"
            >
              Shop Now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-8 py-4 rounded-2xl border border-white/20 transition-all"
            >
              Contact for Bulk Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
