import { ShopNavbar } from "@/components/shop/ShopNavbar";
import { MobileBottomNav } from "@/components/shop/MobileBottomNav";
import { WhatsAppFAB } from "@/components/shop/WhatsAppFAB";
import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";

const MARQUEE_ITEMS = [
  "Traditional Chekku Pressed",
  "Zero Chemicals",
  "FSSAI Certified",
  "Free Delivery Above â‚¹499",
  "Farm to Kitchen",
  "Cold Pressed Â· No Heat",
];

const FOOTER_COLUMNS = [
  {
    heading: "Shop",
    links: [
      { label: "All Products", href: "/products" },
      { label: "Groundnut Oil", href: "/products?category=COOKING" },
      { label: "Coconut Oil", href: "/products?category=PREMIUM" },
      { label: "Gingelly Oil", href: "/products?category=COOKING" },
      { label: "Bulk Orders", href: "/products?category=INDUSTRIAL" },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "My Orders", href: "/orders" },
      { label: "Cart", href: "/cart" },
      { label: "Sign In", href: "/login" },
      { label: "Register", href: "/register" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Oil Guide", href: "/oil-guide" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/contact" },
    ],
  },
];

function TrustMarquee() {
  const strip = (ariaHidden: boolean) => (
    <div className="marquee-track" aria-hidden={ariaHidden}>
      {MARQUEE_ITEMS.map((item) => (
        <span key={item} className="flex items-center shrink-0">
          <span className="label-xs px-8 text-foreground/60 whitespace-nowrap">{item}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee border-y border-border bg-paper-deep py-4" role="presentation">
      {strip(false)}
      {strip(true)}
    </div>
  );
}

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background pb-16 md:pb-0">
      <ShopNavbar />

      <main className="flex-1 pt-20">{children}</main>

      <WhatsAppFAB />

      <TrustMarquee />

      {/* â”€â”€ Editorial footer â”€â”€ */}
      <footer className="bg-secondary text-secondary-foreground grain">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-10">
          {/* Top: oversized brand statement */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-secondary-foreground/10">
            <div className="lg:col-span-6">
              <p className="eyebrow mb-5">Shri Sameya Village</p>
              <h2 className="text-display-hero text-4xl sm:text-5xl lg:text-6xl text-secondary-foreground mb-6">
                Pure taste of
                <br />
                <em className="text-display-italic text-primary">tradition.</em>
              </h2>
              <p className="max-w-sm text-sm leading-relaxed text-secondary-foreground/60">
                Premium wood pressed oils from sustainable Tamil Nadu farms â€”
                pure, natural, and traceable from seed to bottle.
              </p>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
              {FOOTER_COLUMNS.map((col) => (
                <div key={col.heading}>
                  <h4 className="label-xs text-secondary-foreground/40 mb-5">{col.heading}</h4>
                  <ul className="space-y-3">
                    {col.links.map(({ label, href }) => (
                      <li key={label}>
                        <Link
                          href={href}
                          className="link-underline text-sm font-medium text-secondary-foreground/75 hover:text-secondary-foreground transition-colors"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Middle: contact strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-10 border-b border-secondary-foreground/10">
            <a
              href="https://wa.me/917305212759"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-secondary-foreground"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-secondary-foreground/20 transition-colors group-hover:border-primary group-hover:text-primary">
                <Phone className="h-4 w-4" />
              </span>
              <span>
                <span className="label-tiny block text-secondary-foreground/40">WhatsApp / Phone</span>
                <span className="text-lg font-semibold tracking-tight group-hover:text-primary transition-colors">
                  +91 73052 12759
                </span>
              </span>
            </a>

            <a
              href="https://www.google.com/maps/place/Shri+Sameya+Village+Wood+Cold+Pressed+oil+Mill/@10.9977733,77.0148808,196m/data=!3m1!1e3!4m6!3m5!1s0x3ba8578b603c1543:0x643e8cbfc32ce7ab!8m2!3d10.9980135!4d77.0149197!16s%2Fg%2F11nhh9vc0q!5m1!1e4?entry=ttu"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-start gap-2 text-sm text-secondary-foreground/60 hover:text-primary transition-colors"
            >
              <span>
                Coimbatore, Ramanathapuram,
                <br />
                Trichy Road, Tamil Nadu
              </span>
              <ArrowUpRight className="h-4 w-4 mt-0.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8">
            <p className="label-tiny text-secondary-foreground/40">
              Â© 2026 Shri Sameya Village Wood Pressed Oils
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/privacy" className="label-tiny text-secondary-foreground/40 hover:text-secondary-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="label-tiny text-secondary-foreground/40 hover:text-secondary-foreground transition-colors">
                Terms
              </Link>
              <Link href="/refund-policy" className="label-tiny text-secondary-foreground/40 hover:text-secondary-foreground transition-colors">
                Refund Policy
              </Link>
              <span className="label-tiny text-secondary-foreground/25">FSSAI Lic. 12345678901234</span>
            </div>
          </div>
        </div>
      </footer>

      <MobileBottomNav />
    </div>
  );
}
