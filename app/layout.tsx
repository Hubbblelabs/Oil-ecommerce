import { Suspense } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { CartProvider } from "@/components/providers/CartProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
        geistSans.variable,
        geistMono.variable,
        inter.variable,
        "font-sans"
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
