import { Droplets, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background selection:bg-amber-500/30">
      {/* Left Column: Brand Visuals (Desktop Only) */}
      <div className="hidden lg:flex lg:w-[45%] relative bg-zinc-950 flex-col justify-between overflow-hidden p-12">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
           <div className="absolute inset-0 gradient-amber" />
           <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/noise-lines.png')] opacity-20 hidden"></div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-amber-700 text-white shadow-[0_0_15px_rgba(180,83,9,0.4)] group-hover:scale-105 transition-transform border border-amber-600/50">
              <Droplets className="h-5 w-5 fill-amber-100/50 text-amber-100" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-serif text-2xl font-bold tracking-tight text-white leading-none">
                Shri Sameya Village
              </span>
              <span className="text-xs font-semibold tracking-[0.2em] text-amber-500/80 uppercase mt-1">
                Wood Pressed Oils
              </span>
            </div>
          </Link>
        </div>

        <div className="relative z-10 max-w-md mt-auto mb-10">
          <p className="inline-block py-1 px-3 mb-6 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-semibold tracking-widest uppercase backdrop-blur-md">
            Premium Wellness
          </p>
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-6">
            Unlock the power of <span className="text-gradient-amber">pure nature.</span>
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed mb-8">
            Join thousands of culinary enthusiasts and health-conscious individuals who trust Shri Sameya Village for 100% pure, wood-pressed premium oils.
          </p>
          
          <div className="space-y-4">
             <div className="flex items-center gap-3 text-zinc-300">
                <CheckCircle2 className="h-5 w-5 text-amber-500" />
                <span>Zero artificial additives or preservatives</span>
             </div>
             <div className="flex items-center gap-3 text-zinc-300">
                <CheckCircle2 className="h-5 w-5 text-amber-500" />
                <span>Access to exclusive rare collections</span>
             </div>
             <div className="flex items-center gap-3 text-zinc-300">
                <CheckCircle2 className="h-5 w-5 text-amber-500" />
                <span>Track orders & easy reordering</span>
             </div>
          </div>
        </div>
      </div>

      {/* Right Column: Auth Content */}
      <div className="flex w-full lg:w-[55%] flex-col justify-center px-6 py-12 sm:px-12 lg:px-24 xl:px-32 relative">
        <div className="lg:hidden flex justify-center mb-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-amber-700 text-white shadow-[0_0_15px_rgba(180,83,9,0.4)] border border-amber-600/50">
              <Droplets className="h-5 w-5 fill-amber-100/50 text-amber-100" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-serif text-xl font-bold tracking-tight text-foreground leading-none">
                Shri Sameya Village
              </span>
            </div>
          </Link>
        </div>
        
        {children}
      </div>
    </div>
  );
}
