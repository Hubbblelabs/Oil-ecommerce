import { CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";

const POINTS = [
  "Zero artificial additives or preservatives",
  "Access to exclusive rare collections",
  "Track orders & easy reordering",
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left — editorial brand panel */}
      <div className="grain relative hidden lg:flex lg:w-[45%] flex-col justify-between overflow-hidden bg-secondary p-12 text-secondary-foreground">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-primary/15 blur-[130px]" />

        <div className="relative z-10">
          <Link href="/" className="group inline-flex flex-col leading-none">
            <span className="font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-primary">
              Shri Sameya
            </span>
            <span className="label-tiny mt-1 text-primary">Village · Wood Pressed</span>
          </Link>
        </div>

        <div className="relative z-10 mb-8 max-w-md">
          <p className="eyebrow mb-6 flex items-center gap-3">
            <span className="inline-block h-px w-10 bg-primary" />
            Est. 1985
          </p>
          <h2 className="text-display-hero mb-7 text-5xl xl:text-6xl">
            The pure taste
            <br />
            of <em className="text-display-italic text-primary">tradition.</em>
          </h2>
          <p className="mb-10 text-base leading-relaxed opacity-60">
            Join thousands of families who trust Shri Sameya Village for 100% pure,
            wood-pressed oils — straight from the chekku to your kitchen.
          </p>

          <ul className="space-y-4">
            {POINTS.map((point) => (
              <li key={point} className="flex items-center gap-3 text-sm font-medium opacity-85">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <p className="label-tiny relative z-10 opacity-40">
          © 2026 Shri Sameya Village Wood Pressed Oils
        </p>
      </div>

      {/* Right — form column */}
      <div className="relative flex w-full flex-col justify-center px-6 py-12 sm:px-12 lg:w-[55%] lg:px-24 xl:px-32">
        {/* Back to shop */}
        <Link
          href="/"
          className="group absolute left-6 top-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:left-12 lg:left-24"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to shop
        </Link>

        {/* Mobile brand */}
        <div className="mb-10 flex justify-center lg:hidden">
          <Link href="/" className="flex flex-col items-center leading-none">
            <span className="font-display text-2xl font-semibold tracking-tight text-foreground">
              Shri Sameya
            </span>
            <span className="label-tiny mt-1 text-primary">Village · Wood Pressed</span>
          </Link>
        </div>

        {children}
      </div>
    </div>
  );
}
