import type { Metadata } from "next";
import { LegalArticle } from "@/components/shop/LegalArticle";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Refunds, replacements, and cancellations at Shri Sameya Village Wood Pressed Oils.",
};

export default function RefundPolicyPage() {
  return (
    <LegalArticle
      eyebrow="Refund Policy"
      title="Fair refunds,"
      titleItalic="no fuss."
      updated="June 2026"
      intro="Oil is a consumable, so we keep our policy simple: if something arrives damaged or wrong, we make it right — quickly."
      sections={[
        {
          heading: "Damaged or leaking bottles",
          body: [
            "If your order arrives damaged, leaking, or tampered with, send us a photo on WhatsApp within 48 hours of delivery. We will ship a free replacement or refund you in full — your choice.",
          ],
        },
        {
          heading: "Wrong item delivered",
          body: [
            "Received a different oil or size than you ordered? We will arrange pickup of the wrong item and dispatch the correct one at no cost to you.",
          ],
        },
        {
          heading: "Cancellations",
          body: [
            "Orders can be cancelled free of charge any time before dispatch. Once an order has shipped, it can no longer be cancelled — but the damaged/wrong-item policies above still apply.",
          ],
        },
        {
          heading: "What we can't accept",
          body: [
            "Because our oils are food products, we cannot accept returns of opened bottles or refunds based on taste preference. Every batch is pressed the same slow way — if something tastes off to you, talk to us anyway; we want to know.",
          ],
        },
        {
          heading: "Refund timelines",
          body: [
            "Approved refunds are issued to your original payment method within 5–7 working days via Razorpay. WhatsApp/cash orders are refunded by UPI transfer.",
          ],
        },
      ]}
    />
  );
}
