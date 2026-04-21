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
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.3)] group-hover:scale-105 transition-transform">
              <Droplets className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">OilMart</span>
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
            Join thousands of culinary enthusiasts and health-conscious individuals who trust OilMart for 100% pure, cold-pressed premium oils.
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
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.3)]">
              <Droplets className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-foreground">OilMart</span>
          </Link>
        </div>
        
        {children}
      </div>
    </div>
  );
}
