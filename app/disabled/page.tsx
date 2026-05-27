import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageProps {
  searchParams: Promise<{ feature?: string }>;
}

export default async function FeatureDisabledPage({ searchParams }: PageProps) {
  const { feature } = await searchParams;

  const featureNames: Record<string, string> = {
    cart: "Cart & Checkout System",
    trackOrder: "Order Tracking & History",
    feedback: "Post-Purchase Feedback & Reviews",
    adminProducts: "Admin Product Management",
    adminUsers: "Admin User Directory",
    adminOrders: "Admin Order processing",
  };

  const name = feature ? (featureNames[feature] ?? feature) : "Requested Feature";

  return (
    <div className="min-h-screen bg-[#FAF8F2] dark:bg-zinc-950 flex flex-col items-center justify-center p-4">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.05),transparent_60%)] pointer-events-none" />

      <div className="relative max-w-md w-full bg-white dark:bg-zinc-900 border border-[#E9D8A6]/60 dark:border-zinc-800 rounded-3xl p-8 sm:p-10 shadow-[0_10px_40px_rgba(59,36,22,0.06)] overflow-hidden text-center">
        {/* Decorative Top Border */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-amber-400 via-[#D97706] to-amber-600" />

        {/* Dynamic Glowing Alert Circle */}
        <div className="mx-auto w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center text-amber-600 dark:text-amber-500 mb-6 shadow-inner relative">
          <div className="absolute inset-0 rounded-full bg-amber-500/10 animate-ping" />
          <ShieldAlert className="w-8 h-8 relative z-10" />
        </div>

        <h1 className="text-2xl font-extrabold tracking-tight text-[#3B2416] dark:text-white uppercase mb-2">
          Feature Offline
        </h1>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-6">
          <Settings className="w-3.5 h-3.5" />
          {name}
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-8">
          This system capability has been temporarily turned off in the environmental configuration. 
          To enable it, please set its corresponding feature flag to <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded font-mono text-amber-600 dark:text-amber-400">"true"</code> in your system configuration.
        </p>

        <div className="flex flex-col gap-3">
          <Button asChild size="lg" className="w-full bg-[#3B2416] hover:bg-[#D97706] text-white rounded-xl font-bold gap-2">
            <Link href="/">
              <ArrowLeft className="w-4 h-4" /> Back to Storefront
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full rounded-xl font-bold">
            <Link href="/features">
              System Features Report
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
