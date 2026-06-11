import React from "react";
import { FEATURES, FeatureKey } from "@/lib/features";
import { CheckCircle2, ShieldAlert, Sparkles, Shield, Cpu, RefreshCw, KeyRound } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "System Feature Flag Report",
  description: "Platform capability and environmental toggle overview.",
};

interface FeatureCardProps {
  id: FeatureKey;
  label: string;
  env: string;
  description: string;
  role: string;
  isEnabled: boolean;
}

export default function FeaturesReportPage() {
  const featureList: FeatureCardProps[] = [
    {
      id: "cart",
      label: "Cart & Checkout System",
      env: "NEXT_PUBLIC_ENABLE_CART",
      description: "Controls the ability to add items to cart, persist products locally, fill checkout forms, choose payment methods, and place new orders atomically.",
      role: "Customer Storefront",
      isEnabled: FEATURES.cart,
    },
    {
      id: "trackOrder",
      label: "Order History & Tracking",
      env: "NEXT_PUBLIC_ENABLE_TRACK_ORDER",
      description: "Controls the access to order listings, personal account sidebars, verified order tracking pages, status progression indicators, and historical transactions.",
      role: "Customer Accounts",
      isEnabled: FEATURES.trackOrder,
    },
    {
      id: "feedback",
      label: "Verified Purchase Reviews",
      env: "NEXT_PUBLIC_ENABLE_FEEDBACK",
      description: "Controls the verified purchase review loop. Restricts reviews to users who have orders containing the product. Handles rating calculations and dynamic review feeds.",
      role: "Platform Feedback Loop",
      isEnabled: FEATURES.feedback,
    },
    {
      id: "adminProducts",
      label: "Admin Product Catalog",
      env: "NEXT_PUBLIC_ENABLE_ADMIN_PRODUCTS",
      description: "Controls product CRUD panel features: adding new products, editing catalogs, adjusting stocks, modifying images, and updating rich-text descriptions.",
      role: "Admin Operations",
      isEnabled: FEATURES.adminProducts,
    },
    {
      id: "adminUsers",
      label: "Admin User Directory",
      env: "NEXT_PUBLIC_ENABLE_ADMIN_USERS",
      description: "Controls the user registry view. Enables admin role escalations (e.g. promoting accounts to ADMIN or USER) and absolute active status toggling.",
      role: "Admin Security",
      isEnabled: FEATURES.adminUsers,
    },
    {
      id: "adminOrders",
      label: "Admin Order Processing",
      env: "NEXT_PUBLIC_ENABLE_ADMIN_ORDERS",
      description: "Controls the platform order log. Allows admins to inspect all system transactions and update order states (e.g. progressing status from PENDING to PAID or DELIVERED).",
      role: "Admin Logistics",
      isEnabled: FEATURES.adminOrders,
    },
  ];

  return (
    <div className="bg-[#FAF8F2] dark:bg-zinc-950 min-h-screen py-12 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[80px]" />
      <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-[#D97706]/5 rounded-full blur-[80px]" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 text-[#D97706] text-xs font-extrabold uppercase tracking-widest mb-4 border border-amber-500/20 shadow-inner">
            <Cpu className="w-3.5 h-3.5 animate-pulse" />
            System Console
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-black tracking-tight text-[#3B2416] dark:text-white leading-[1.1] uppercase mb-4">
            Feature Flag Report
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg font-light leading-relaxed">
            Real-time status of all platform capabilities controlled by environment variables in <code className="bg-zinc-100 dark:bg-zinc-800 font-mono text-sm px-1.5 py-0.5 rounded text-[#D97706]">.env</code> on your laptop.
          </p>
        </div>

        {/* Status Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {featureList.map((feat) => (
            <div
              key={feat.id}
              className="group relative bg-white dark:bg-zinc-900 border border-[#E9D8A6]/60 dark:border-zinc-800 rounded-3xl p-6 shadow-[0_2px_16px_rgba(59,36,22,0.04)] hover:shadow-[0_8px_32px_rgba(59,36,22,0.08)] transition-all duration-300 hover:-translate-y-1 flex flex-col h-full overflow-hidden"
            >
              {/* Top border glowing gradient if active */}
              {feat.isEnabled ? (
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-400 to-green-600" />
              ) : (
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-red-400 to-rose-600 animate-pulse" />
              )}

              {/* Status Header */}
              <div className="flex justify-between items-start gap-4 mb-4">
                <div>
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-muted-foreground bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                    {feat.role}
                  </span>
                  <h3 className="font-heading font-extrabold text-[#3B2416] dark:text-white text-lg mt-1">
                    {feat.label}
                  </h3>
                </div>

                {feat.isEnabled ? (
                  <div className="flex items-center gap-1.5 text-xs font-bold bg-green-50 dark:bg-green-950/20 text-green-600 dark:text-green-400 px-3 py-1 rounded-full border border-green-200 dark:border-green-900 shadow-inner">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    ENABLED
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs font-bold bg-red-50 dark:bg-red-950/20 text-rose-600 dark:text-rose-400 px-3 py-1 rounded-full border border-rose-200 dark:border-rose-900 shadow-inner">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    DISABLED
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed flex-grow font-medium mb-6">
                {feat.description}
              </p>

              {/* Env Config Code */}
              <div className="mt-auto pt-4 border-t border-border/40 flex items-center justify-between text-xs">
                <span className="text-zinc-400 dark:text-zinc-500 font-semibold uppercase tracking-wider">Config Toggle</span>
                <code className="font-mono bg-zinc-50 dark:bg-zinc-950/50 px-2.5 py-1.5 rounded-lg border border-border/40 text-amber-700 dark:text-amber-400 font-semibold select-all">
                  {feat.env}
                </code>
              </div>
            </div>
          ))}
        </div>

        {/* Setup guide cta footer */}
        <div className="mt-16 bg-[#1a0e04] rounded-3xl p-8 sm:p-10 border border-[#3a2010] relative overflow-hidden text-center text-zinc-300">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px]" />
          <h3 className="font-heading text-xl font-bold text-white mb-2 uppercase tracking-wide">Need to adjust feature flags?</h3>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-xl mx-auto mb-6 font-light">
            Open the <code className="bg-zinc-800 text-amber-400 px-1.5 py-0.5 rounded font-mono text-xs">.env</code> configuration file in the root of your project directory, change the value of any flag to <code className="bg-zinc-800 text-amber-400 px-1.5 py-0.5 rounded font-mono text-xs">"true"</code> or <code className="bg-zinc-800 text-amber-400 px-1.5 py-0.5 rounded font-mono text-xs">"false"</code>, and restart your server.
          </p>
          <div className="flex flex-wrap gap-4 justify-center items-center text-xs font-bold uppercase tracking-wider text-zinc-500">
            <span className="flex items-center gap-1"><KeyRound className="w-3.5 h-3.5 text-amber-500" /> Environment-Safe</span>
            <span className="text-zinc-700">&middot;</span>
            <span className="flex items-center gap-1"><RefreshCw className="w-3.5 h-3.5 text-amber-500" /> Hot-Reloading</span>
            <span className="text-zinc-700">&middot;</span>
            <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-amber-500" /> Admin Guarded</span>
          </div>
        </div>

      </div>
    </div>
  );
}
