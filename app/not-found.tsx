import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="grain relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-secondary px-6 text-center text-secondary-foreground">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[120px]" />

      <p className="eyebrow relative mb-6 flex items-center gap-3">
        <span className="inline-block h-px w-10 bg-primary" />
        Page not found
        <span className="inline-block h-px w-10 bg-primary" />
      </p>

      <h1 className="text-display-hero relative text-[clamp(6rem,24vw,16rem)] leading-none text-secondary-foreground/90">
        4<em className="text-display-italic text-primary">0</em>4
      </h1>

      <p className="relative mt-6 max-w-sm text-sm leading-relaxed text-secondary-foreground/60">
        The page you&rsquo;re looking for has settled to the bottom of the urn.
        Let&rsquo;s pour you back to somewhere familiar.
      </p>

      <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="btn-shine group inline-flex h-12 items-center gap-2.5 rounded-full bg-primary px-7 text-sm font-bold text-primary-foreground transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back home
        </Link>
        <Link
          href="/products"
          className="group inline-flex h-12 items-center gap-2 rounded-full border border-secondary-foreground/25 px-7 text-sm font-semibold text-secondary-foreground/80 transition-colors hover:border-primary hover:text-primary"
        >
          Shop the collection
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      <p className="label-tiny relative mt-16 text-secondary-foreground/35">
        Shri Sameya Village · Wood Pressed Oils
      </p>
    </div>
  );
}
