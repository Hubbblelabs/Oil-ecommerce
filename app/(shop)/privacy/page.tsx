import type { Metadata } from "next";
import { LegalArticle } from "@/components/shop/LegalArticle";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Shri Sameya Village collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <LegalArticle
      eyebrow="Privacy Policy"
      title="Your data,"
      titleItalic="respected."
      updated="June 2026"
      intro="We collect only what we need to deliver pure oil to your door — nothing more. This policy explains what we store, why we store it, and the choices you have."
      sections={[
        {
          heading: "What we collect",
          body: [
            "When you create an account or place an order, we collect the details required to fulfil it:",
          ],
          list: [
            "Your name, email address, and phone number",
            "Shipping address for delivery",
            "Order history and items purchased",
            "Payment references from Razorpay (we never see or store your card details)",
          ],
        },
        {
          heading: "How we use it",
          body: [
            "Your information is used solely to process orders, arrange delivery, respond to your messages, and — if you opt in — send seasonal harvest notes. We never sell or rent your data to anyone.",
          ],
        },
        {
          heading: "Cookies & sessions",
          body: [
            "We use a single secure, HTTP-only cookie to keep you signed in for up to 24 hours. We do not use third-party advertising trackers.",
          ],
        },
        {
          heading: "Payment security",
          body: [
            "Payments are processed by Razorpay over encrypted connections. Card and UPI details go directly to Razorpay and never touch our servers — we store only the payment reference needed to confirm your order.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "You may ask us at any time to show you the data we hold about you, correct it, or delete your account entirely. Message us on WhatsApp or through the contact page and we will action it within 7 days.",
          ],
        },
      ]}
    />
  );
}
