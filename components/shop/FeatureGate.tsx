"use client";

import React from "react";
import { FeatureKey, isFeatureEnabled } from "@/lib/features";
import { ShieldAlert } from "lucide-react";

interface FeatureGateProps {
  feature: FeatureKey;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showDisabledBanner?: boolean;
}

export function FeatureGate({
  feature,
  children,
  fallback,
  showDisabledBanner = false,
}: FeatureGateProps) {
  const enabled = isFeatureEnabled(feature);

  if (enabled) {
    return <>{children}</>;
  }

  if (fallback !== undefined) {
    return <>{fallback}</>;
  }

  if (showDisabledBanner) {
    return (
      <div className="rounded-2xl border border-[#E9D8A6]/60 bg-white dark:bg-zinc-900 p-6 flex flex-col items-center text-center max-w-md mx-auto shadow-md border-t-4 border-t-amber-500">
        <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center text-amber-600 mb-4">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-bold text-[#3B2416] dark:text-white uppercase tracking-wider">Feature Offline</h4>
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
          This feature is currently disabled in the environment settings. Please contact an administrator or update `.env` to enable this capability.
        </p>
      </div>
    );
  }

  return null;
}
