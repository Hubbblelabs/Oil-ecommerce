import Link from "next/link";
import Image from "next/image";
import { Droplet, Sprout, ShieldCheck, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 opacity-40">
           {/* Abstract Amber Gradient until we have a real image */}
           <div className="w-full h-full gradient-amber mix-blend-multiply opacity-50" />
           <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <span className="inline-block py-1.5 px-4 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
            100% Pure & Organic
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1] selection:bg-amber-500/30">
            Liquid Gold, <br />
            <span className="text-gradient-amber">Cold Pressed</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Experience the purest essence of nature. Unrefined, sustainably sourced oils delivered directly from farm to your kitchen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full bg-amber-500 hover:bg-amber-600 text-white border-0 h-14 px-8 text-base shadow-[0_0_40px_rgba(245,158,11,0.3)] hover:shadow-[0_0_60px_rgba(245,158,11,0.5)] transition-all">
              <Link href="/products">Shop the Collection</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full h-14 px-8 text-base bg-white/5 hover:bg-white/10 border-white/20 text-white backdrop-blur-md">
              <Link href="/about">Our Process</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">The OilMart Standard</h2>
            <p className="text-muted-foreground text-lg">We don't compromise on quality. Every drop is crafted to elevate your health and culinary creations.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-panel p-8 rounded-3xl text-center group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto bg-amber-100 dark:bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Droplet className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">100% First Cold Pressed</h3>
              <p className="text-muted-foreground leading-relaxed">Extracted at low temperatures to preserve flavor, aroma, and essential nutrients.</p>
            </div>
            
            <div className="glass-panel p-8 rounded-3xl text-center group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto bg-amber-100 dark:bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sprout className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Sustainably Sourced</h3>
              <p className="text-muted-foreground leading-relaxed">Partnering directly with local farmers who employ ethical, organic farming methods.</p>
            </div>
            
            <div className="glass-panel p-8 rounded-3xl text-center group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto bg-amber-100 dark:bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Purity Guaranteed</h3>
              <p className="text-muted-foreground leading-relaxed">Zero additives, chemicals, or blends. Just pure, unadulterated nature in a bottle.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ASYMMETRICAL STORY SECTION */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 order-2 md:order-1 relative">
            <div className="aspect-[4/5] rounded-3xl bg-zinc-200 dark:bg-zinc-800 overflow-hidden relative shadow-2xl">
               <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-transparent mix-blend-overlay"></div>
               {/* Image Placeholder */}
               <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                 [Cinematic Extraction Process Image]
               </div>
            </div>
            <div className="absolute -bottom-8 -right-8 glass-panel p-6 rounded-2xl max-w-xs hidden md:block animate-in zoom-in duration-700 delay-300">
              <p className="font-semibold text-lg mb-1">“The flavor profile is unparalleled.”</p>
              <div className="flex text-amber-500 mb-2">
                <Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/>
              </div>
              <p className="text-sm text-muted-foreground">— Michelin Star Chef</p>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 order-1 md:order-2 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Crafted by tradition. <br/> perfect for today.</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
               We traveled to the oldest groves in the Mediterranean to bring back centuries-old extraction techniques. Our process might take longer, but the result is an oil that is richer, denser, and bursting with life.
            </p>
            <ul className="space-y-4 pt-4">
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-amber-500"/>
                <span className="font-medium text-foreground">Zero chemical refining processes</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-amber-500"/>
                <span className="font-medium text-foreground">Retains maximum natural antioxidants</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-amber-500"/>
                <span className="font-medium text-foreground">Bottled in UV-protective dark glass</span>
              </li>
            </ul>
            
            <div className="pt-8">
              <Button asChild variant="link" className="px-0 text-amber-600 hover:text-amber-700 text-lg font-semibold flex items-center gap-2 group">
                <Link href="/brand-story">
                  Discover Our Story
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-foreground"></div>
        <div className="absolute inset-0 gradient-amber opacity-10 mix-blend-screen"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-background">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Elevate your everyday cooking.</h2>
          <p className="text-xl opacity-80 mb-10 max-w-2xl mx-auto font-light">Join thousands of culinary enthusiasts who have switched to the purest oils in the world.</p>
          <Button asChild size="lg" className="rounded-full bg-amber-500 hover:bg-amber-600 text-white shadow-lg h-14 px-10 text-lg border-0 transition-transform hover:scale-105">
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
