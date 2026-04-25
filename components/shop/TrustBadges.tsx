"use client";

import { Leaf, ShieldCheck, Beaker } from "lucide-react";

export function TrustBadges() {
  const badges = [
    {
      icon: Leaf,
      title: "Wood Pressed",
      desc: "Traditional wooden chekku method",
    },
    {
      icon: ShieldCheck,
      title: "No Chemicals",
      desc: "Zero preservatives or additives",
    },
    {
      icon: Leaf,
      title: "Farm Fresh",
      desc: "Sourced directly from local farms",
    },
    {
      icon: Beaker,
      title: "Lab Tested",
      desc: "Tested for purity & quality",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 my-6">
      {badges.map((badge, idx) => (
        <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30">
          <div className="p-2 bg-white dark:bg-zinc-900 rounded-lg shadow-sm shrink-0">
            <badge.icon className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground leading-none mb-1">{badge.title}</h4>
            <p className="text-[11px] text-muted-foreground leading-snug">{badge.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
