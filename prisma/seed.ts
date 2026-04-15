import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const PRODUCTS = [
  // ── Olive Oils ──────────────────────────────────────────
  {
    name: "Cretan Extra Virgin Olive Oil",
    description: "Single-estate cold-pressed EVOO from ancient Koroneiki olives in Crete. Robust peppery finish with low acidity (≤0.2%). Perfect for drizzling and dipping.",
    price: "24.99",
    stock: 180,
    category: "Olive Oil",
    unit: "500ml",
  },
  {
    name: "Tuscan Blend Extra Virgin Olive Oil",
    description: "A harmonious blend of Frantoio, Leccino, and Moraiolo olives from Tuscany. Rich body with notes of fresh grass and green tomato.",
    price: "29.99",
    stock: 150,
    category: "Olive Oil",
    unit: "750ml",
  },
  {
    name: "Greek Kalamata Extra Virgin Olive Oil",
    description: "PDO-certified Kalamata EVOO. Extracted within 24 hours of harvest for peak freshness. Fruity aroma with a mild, buttery finish.",
    price: "19.99",
    stock: 200,
    category: "Olive Oil",
    unit: "500ml",
  },
  {
    name: "Spanish Arbequina Olive Oil",
    description: "Light and sweet Arbequina oil from Catalonia. Delicate almond undertones, perfect for salads and light sautéing.",
    price: "18.49",
    stock: 220,
    category: "Olive Oil",
    unit: "500ml",
  },
  {
    name: "Picual Reserve Olive Oil",
    description: "High-polyphenol Picual EVOO — one of Spain's most antioxidant-rich varieties. Intense flavour, ideal for drizzling on grilled fish.",
    price: "34.99",
    stock: 90,
    category: "Olive Oil",
    unit: "500ml",
  },
  {
    name: "Certified Organic Olive Oil",
    description: "100% organic, unfiltered EVOO. Naturally cloudy appearance with full body and complex flavour profile including hints of artichoke.",
    price: "27.99",
    stock: 130,
    category: "Olive Oil",
    unit: "750ml",
  },
  {
    name: "Infused Lemon Olive Oil",
    description: "Castelvetrano olives cold-pressed with Sicilian lemons simultaneously — not a blended product. Bright citrus aroma with silky texture.",
    price: "21.99",
    stock: 100,
    category: "Olive Oil",
    unit: "250ml",
  },
  {
    name: "Infused Garlic & Herb Olive Oil",
    description: "Premium EVOO infused with roasted garlic, rosemary, and thyme. Ready-to-use for bread dipping or pasta finishing.",
    price: "16.99",
    stock: 160,
    category: "Olive Oil",
    unit: "250ml",
  },
  {
    name: "Early Harvest Olive Oil",
    description: "Pressed from unripe olives for maximum polyphenols — up to 3× more antioxidants than standard EVOO. Intensely grassy and pungent.",
    price: "38.99",
    stock: 60,
    category: "Olive Oil",
    unit: "500ml",
  },
  {
    name: "Mild Light-Tasting Olive Oil",
    description: "Refined light olive oil for high-heat cooking and baking. Neutral flavour with a smoke point of 465°F (240°C).",
    price: "14.99",
    stock: 300,
    category: "Olive Oil",
    unit: "1L",
  },

  // ── Coconut Oils ────────────────────────────────────────
  {
    name: "Raw Unrefined Coconut Oil",
    description: "Cold-pressed from fresh coconut meat within 2 hours of harvest. Retains full coconut aroma, antioxidants, and MCTs. Great for cooking and skincare.",
    price: "16.99",
    stock: 250,
    category: "Coconut Oil",
    unit: "500ml",
  },
  {
    name: "Refined Organic Coconut Oil",
    description: "Expeller-pressed, deodorised coconut oil with a neutral flavour. High smoke point (350°F / 177°C). Ideal for baking and stir-frying.",
    price: "13.49",
    stock: 300,
    category: "Coconut Oil",
    unit: "500ml",
  },
  {
    name: "MCT Oil — Pure C8",
    description: "100% caprylic acid (C8) coconut-derived MCT oil. Rapid energy for brain and body. Unflavoured, mixes easily into coffee and smoothies.",
    price: "32.99",
    stock: 120,
    category: "Coconut Oil",
    unit: "500ml",
  },
  {
    name: "Fractionated Coconut Oil",
    description: "Liquid at all temperatures — never solidifies. Odourless, colourless, and shelf-stable for 2+ years. Perfect carrier oil for aromatherapy.",
    price: "15.99",
    stock: 180,
    category: "Coconut Oil",
    unit: "500ml",
  },
  {
    name: "Coconut Oil Cooking Spray",
    description: "Zero-waste, propellant-free pure coconut oil spray. Even coating for pans and bakeware. 100% coconut oil — no fillers.",
    price: "11.99",
    stock: 200,
    category: "Coconut Oil",
    unit: "200ml",
  },

  // ── Avocado Oils ────────────────────────────────────────
  {
    name: "Extra Virgin Avocado Oil",
    description: "Cold-pressed from hand-picked Hass avocados at peak ripeness. Buttery, mild flavour. Excellent for salads, dips, and finishing dishes.",
    price: "22.99",
    stock: 140,
    category: "Avocado Oil",
    unit: "500ml",
  },
  {
    name: "Refined Avocado Oil",
    description: "High-heat refined avocado oil with a smoke point of 500°F (260°C) — the highest of all cooking oils. Neutral taste, ideal for searing and deep frying.",
    price: "19.99",
    stock: 170,
    category: "Avocado Oil",
    unit: "500ml",
  },
  {
    name: "Avocado Oil with Lime",
    description: "Fresh-pressed avocado oil blended with key lime juice. Naturally emulsified. Exceptional for fish tacos, ceviche, and tropical salads.",
    price: "17.49",
    stock: 90,
    category: "Avocado Oil",
    unit: "250ml",
  },
  {
    name: "Cold-Pressed Avocado Oil — 1L",
    description: "Our bestselling EVOO-class avocado oil now in an economy size. Same quality, less packaging waste. Rich in oleic acid and vitamin E.",
    price: "36.99",
    stock: 100,
    category: "Avocado Oil",
    unit: "1L",
  },

  // ── Sesame Oils ─────────────────────────────────────────
  {
    name: "Toasted Sesame Oil",
    description: "Deep-amber oil from slow-roasted sesame seeds. Intensely nutty and aromatic. A small drizzle transforms stir-fries, noodles, and marinades.",
    price: "12.99",
    stock: 220,
    category: "Sesame Oil",
    unit: "250ml",
  },
  {
    name: "Cold-Pressed Raw Sesame Oil",
    description: "Unroasted, light golden sesame oil. Mild nutty flavour with all natural sesamin and sesamolin antioxidants intact. Great for Ayurvedic oil pulling.",
    price: "14.99",
    stock: 160,
    category: "Sesame Oil",
    unit: "250ml",
  },
  {
    name: "Black Sesame Oil",
    description: "Rare cold-pressed black sesame oil with a more intense, smoky flavour than white sesame. Rich in iron and zinc. Traditional Chinese medicine staple.",
    price: "18.99",
    stock: 80,
    category: "Sesame Oil",
    unit: "250ml",
  },
  {
    name: "Organic Sesame Oil — 1L",
    description: "USDA Certified Organic toasted sesame oil in a large format for high-volume kitchens and restaurants. Consistent rich flavour, batch-tested.",
    price: "28.99",
    stock: 110,
    category: "Sesame Oil",
    unit: "1L",
  },

  // ── Argan Oils ──────────────────────────────────────────
  {
    name: "Pure Culinary Argan Oil",
    description: "Food-grade roasted argan oil from Moroccan Berber cooperatives. Rich, nutty taste — Morocco's 'liquid gold'. Drizzle on couscous, hummus, or soups.",
    price: "29.99",
    stock: 70,
    category: "Argan Oil",
    unit: "100ml",
  },
  {
    name: "Organic Cosmetic Argan Oil",
    description: "100% pure unroasted argan oil cold-pressed for skin and hair. Rich in vitamin E and fatty acids. Absorbs quickly without greasiness. ECOCERT certified.",
    price: "24.99",
    stock: 95,
    category: "Argan Oil",
    unit: "50ml",
  },
  {
    name: "Argan Oil & Rose Hip Blend",
    description: "Synergistic blend of argan and rose hip seed oils. Targets hyperpigmentation, fine lines, and dehydration. Ideal for overnight facial treatment.",
    price: "34.99",
    stock: 60,
    category: "Argan Oil",
    unit: "30ml",
  },
  {
    name: "Premium Argan Gift Set",
    description: "Trio of culinary argan (100ml), cosmetic argan (50ml), and argan-infused hair serum (30ml) in a handwoven gift box. Perfect for gifting.",
    price: "69.99",
    stock: 40,
    category: "Argan Oil",
    unit: "Gift Set",
  },

  // ── Essential Oils ──────────────────────────────────────
  {
    name: "Lavender Essential Oil",
    description: "Pure steam-distilled Lavandula angustifolia from Provence, France. Rich linalool content for superior relaxation and sleep support. GC/MS tested.",
    price: "18.99",
    stock: 200,
    category: "Essential Oil",
    unit: "15ml",
  },
  {
    name: "Peppermint Essential Oil",
    description: "High-menthol (42%) peppermint oil from Pacific Northwest USA. Cooling and invigorating. Supports focus, digestion, and muscle recovery.",
    price: "14.99",
    stock: 230,
    category: "Essential Oil",
    unit: "15ml",
  },
  {
    name: "Tea Tree Essential Oil",
    description: "Australian Melaleuca alternifolia with ≥40% terpinen-4-ol. Naturally antibacterial, antifungal, and antiviral. ISO 4730:2017 certified.",
    price: "13.99",
    stock: 250,
    category: "Essential Oil",
    unit: "15ml",
  },
  {
    name: "Frankincense Boswellia Serrata Oil",
    description: "Steam-distilled from Boswellia serrata resin in Oman. Deeply grounding aroma. Prized for meditation, anti-inflammation, and skin rejuvenation.",
    price: "32.99",
    stock: 90,
    category: "Essential Oil",
    unit: "15ml",
  },
  {
    name: "Eucalyptus Globulus Essential Oil",
    description: "High-cineole (80%+) eucalyptus for respiratory support and air purification. Used in steam inhalation, diffusers, and homemade cleaning products.",
    price: "11.99",
    stock: 280,
    category: "Essential Oil",
    unit: "15ml",
  },
  {
    name: "Rose Otto Essential Oil",
    description: "Steam-distilled Bulgarian Rosa damascena — the world's finest rose oil. Over 300 natural compounds. Floral, honeyed, with extraordinary skin benefits.",
    price: "89.99",
    stock: 30,
    category: "Essential Oil",
    unit: "5ml",
  },
  {
    name: "Bergamot Essential Oil",
    description: "Cold-pressed Calabrian bergamot rind. Furocoumarin-free (FCF) — safe for sun exposure. Bright citrus, floral top notes. Anxiety and mood support.",
    price: "19.99",
    stock: 150,
    category: "Essential Oil",
    unit: "15ml",
  },
  {
    name: "Ylang Ylang Complete Essential Oil",
    description: "Whole-distillation Ylang Ylang extra complete — not fractionated. Full spectrum floral notes for perfumery, romance, and blood pressure support.",
    price: "22.99",
    stock: 110,
    category: "Essential Oil",
    unit: "15ml",
  },
  {
    name: "Cedarwood Atlas Essential Oil",
    description: "Steam-distilled Cedrus atlantica heartwood from Morocco. Rich, warm, woody aroma. Excellent for hair growth, stress relief, and insect repellent blends.",
    price: "12.99",
    stock: 200,
    category: "Essential Oil",
    unit: "15ml",
  },
  {
    name: "Clary Sage Essential Oil",
    description: "European Salvia sclarea with high linalyl acetate content. Balances female hormones, eases cramps, and promotes deep sleep. Popular in labour support.",
    price: "17.49",
    stock: 130,
    category: "Essential Oil",
    unit: "15ml",
  },

  // ── Other specialty oils ─────────────────────────────────
  {
    name: "Walnut Oil — First Cold Press",
    description: "Unrefined French walnut oil with a rich, toasted nut flavour. Exceptionally high in omega-3 ALA. Best used unheated on salads and pasta.",
    price: "16.99",
    stock: 100,
    category: "Avocado Oil",
    unit: "250ml",
  },
  {
    name: "Hemp Seed Oil",
    description: "Cold-pressed, raw Canadian hemp seed oil. Perfect 3:1 ratio of omega-6 to omega-3. Earthy, nutty taste. Ideal for smoothies and salad dressings.",
    price: "18.99",
    stock: 140,
    category: "Coconut Oil",
    unit: "250ml",
  },
  {
    name: "Flaxseed Oil — Refrigerated Fresh",
    description: "Nitrogen-flushed, cold-pressed linseed oil bottled in black UV-opaque glass. Highest plant-based source of ALA omega-3. Batch-made weekly.",
    price: "14.49",
    stock: 80,
    category: "Avocado Oil",
    unit: "250ml",
  },
  {
    name: "Pumpkin Seed Oil",
    description: "Austrian Styrian pumpkin seed oil — dark green, intensely nutty. PDO protected. Drizzle on pumpkin soup, vanilla ice cream, or yoghurt.",
    price: "22.99",
    stock: 70,
    category: "Sesame Oil",
    unit: "250ml",
  },
  {
    name: "Hazelnut Oil",
    description: "Cold-pressed French hazelnut oil from Piedmont hazelnuts. Naturally sweet, nutty, and rich in oleic acid. Perfect for pastry and chocolate confections.",
    price: "19.99",
    stock: 90,
    category: "Avocado Oil",
    unit: "250ml",
  },
  {
    name: "Macadamia Nut Oil",
    description: "Australian cold-pressed macadamia oil — the most omega-7 rich oil available. Mild buttery flavour with a high smoke point. Exceptional for skin hydration.",
    price: "24.99",
    stock: 85,
    category: "Avocado Oil",
    unit: "250ml",
  },
  {
    name: "Black Seed Oil (Nigella Sativa)",
    description: "Ethiopian-sourced cold-pressed black cumin seed oil. Thymoquinone content ≥1.5%. Used in traditional medicine for immune support and inflammation.",
    price: "21.99",
    stock: 120,
    category: "Essential Oil",
    unit: "100ml",
  },
  {
    name: "Jojoba Oil — Golden Raw",
    description: "Technically a liquid wax, not an oil — molecularly similar to human sebum. Cold-pressed golden jojoba for skin, hair, and nail care. 5-year shelf life.",
    price: "16.99",
    stock: 160,
    category: "Argan Oil",
    unit: "100ml",
  },
  {
    name: "Rosehip Seed Oil",
    description: "Chilean cold-pressed Rosa canina seed oil. Naturally high in trans-retinoic acid and vitamin C. Clinically proven to reduce scars, stretch marks, and UV damage.",
    price: "19.99",
    stock: 130,
    category: "Argan Oil",
    unit: "50ml",
  },
  {
    name: "Grapeseed Oil",
    description: "Expeller-pressed from Italian wine grape seeds. Light texture with a neutral flavour and very high smoke point (420°F / 216°C). Rich in proanthocyanidins.",
    price: "13.99",
    stock: 190,
    category: "Olive Oil",
    unit: "500ml",
  },
  {
    name: "Almond Oil — Sweet & Pure",
    description: "Cold-pressed Californian sweet almond oil. Mild and slightly sweet. Excellent emollient for massage, baby skincare, and hair conditioning treatments.",
    price: "14.99",
    stock: 150,
    category: "Essential Oil",
    unit: "100ml",
  },
  {
    name: "Castor Oil — Cold Pressed Hexane-Free",
    description: "USDA Organic Jamaican Black Castor Oil alternative — cold-pressed without hexane. High ricinoleic acid for hair growth, joint support, and constipation relief.",
    price: "15.99",
    stock: 175,
    category: "Essential Oil",
    unit: "200ml",
  },
] as const;

async function main() {
  console.log("🌱 Seeding database with 50 oil products…");

  // Clear existing products to allow re-running seed idempotently
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();

  const created = await prisma.product.createMany({
    data: PRODUCTS.map((p) => ({
      name: p.name,
      description: p.description,
      price: p.price,
      stock: p.stock,
      category: p.category,
      unit: p.unit,
      imageUrl: null, // Replace with real image URLs in production
      isActive: true,
    })),
  });

  console.log(`✅ Created ${created.count} products.`);
}

main()
  .catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
