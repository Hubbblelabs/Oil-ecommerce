import type { Metadata } from "next";
import { Cormorant_Garamond, Hanken_Grotesk } from "next/font/google";
import { cacheLife, cacheTag } from "next/cache";
import { productService } from "@/server/services/product.service";
import { LandingV2, type LandingProduct } from "@/components/landing/LandingV2";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-lv2-serif",
  display: "swap",
});

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-lv2-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: { absolute: "Shri Sameya Village — Tradition Pressed Into Every Drop" },
  description:
    "Unrefined oils drawn slowly from one Indian village — the way four generations of our family have always made them. Wood-churned ghani, nothing refined.",
};

async function getFeaturedProducts(): Promise<LandingProduct[]> {
  "use cache";
  cacheTag("products");
  cacheLife("minutes");

  const result = await productService.getProducts(1, 4);
  return result.data.map(({ id, name, price, image, category }) => ({
    id,
    name,
    price,
    image,
    category,
  }));
}

export default async function HomePage() {
  const products = await getFeaturedProducts();

  return (
    <LandingV2
      products={products}
      className={`${serif.variable} ${sans.variable}`}
    />
  );
}
