import type { Metadata } from "next";
import { LegalArticle } from "@/components/shop/LegalArticle";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern purchases from Shri Sameya Village Wood Pressed Oils.",
};

export default function TermsPage() {
  return (
    <LegalArticle
      eyebrow="Terms of Service"
      title="Simple terms,"
      titleItalic="honestly kept."
      updated="June 2026"
      intro="These terms govern your use of our website and your purchases from Shri Sameya Village. By placing an order, you agree to them — and we agree to hold up our end."
      sections={[
        {
          heading: "Orders & acceptance",
          body: [
            "An order is confirmed once payment is received or, for WhatsApp orders, once we confirm availability with you. We reserve the right to cancel orders where stock has run out — in which case you are refunded in full, immediately.",
          ],
        },
        {
          heading: "Pricing",
          body: [
            "All prices are listed in Indian Rupees (₹) and include applicable taxes. Prices are calculated server-side at the moment you place the order — the price you see at checkout is the price you pay.",
          ],
        },
        {
          heading: "Delivery",
          body: [
            "We dispatch within 24 hours on working days from our mill in Coimbatore, Tamil Nadu. Delivery timelines vary by pincode; free shipping applies on orders above ₹499.",
          ],
        },
        {
          heading: "Product quality",
          body: [
            "Our oils are unrefined and cold-pressed in small batches. Natural sediment, slight colour variation between batches, and seasonal aroma differences are signs of genuine wood-pressed oil — not defects.",
            "Store bottles in a cool, dark place. Shelf life is 6–12 months from the pressing date printed on the label.",
          ],
        },
        {
          heading: "Accounts",
          body: [
            "You are responsible for keeping your account credentials private. We may suspend accounts used fraudulently or abusively.",
          ],
        },
        {
          heading: "Governing law",
          body: [
            "These terms are governed by the laws of India, with courts in Coimbatore, Tamil Nadu having jurisdiction.",
          ],
        },
      ]}
    />
  );
}
