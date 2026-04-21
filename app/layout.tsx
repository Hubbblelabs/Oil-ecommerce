import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter, DM_Serif_Display, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { CartProvider } from "@/components/providers/CartProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "OilMart — Premium Natural Oils",
    template: "%s | OilMart",
  },
  description:
    "Shop premium cold-pressed, extra virgin, and specialty oils. Direct from source to your kitchen.",
  keywords: ["olive oil", "coconut oil", "premium oils", "natural oils", "cooking oil"],
  openGraph: {
    title: "OilMart — Premium Natural Oils",
    description: "Shop premium cold-pressed, extra virgin, and specialty oils.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        inter.variable,
        dmSerif.variable,
        geistMono.variable,
      )}
    >
      {/* Suspense is required by Next.js 16 PPR (Cache Components) when client
          components that use hooks exist in the layout. Using null fallback so the
          layout still renders — the static shell is preserved. */}
      <Suspense fallback={null}>
        <body className="min-h-full flex flex-col bg-background text-foreground">
          <CartProvider>{children}</CartProvider>
        </body>
      </Suspense>
    </html>
  );
}
