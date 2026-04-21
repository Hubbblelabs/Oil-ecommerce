import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Role, Category } from "@prisma/client";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding Indian users & oil products...");

  // 🔥 Clean DB (order matters)
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // 👤 Users
  const admin = await prisma.user.create({
    data: {
      email: "admin@oilmart.in",
      name: "Admin",
      password: 'dummy123', role: Role.ADMIN,
    },
  });

  const seller1 = await prisma.user.create({
    data: {
      email: "seller1@oilmart.in",
      name: "Ravi Oils",
      password: 'dummy123', role: Role.SELLER,
    },
  });

  const seller2 = await prisma.user.create({
    data: {
      email: "seller2@oilmart.in",
      name: "Annapurna Traders",
      password: 'dummy123', role: Role.SELLER,
    },
  });

  const user = await prisma.user.create({
    data: {
      email: "user@oilmart.in",
      name: "Rahul Sharma",
      password: 'dummy123', role: Role.USER,
    },
  });

  // 🛢️ Indian Oils (seed-based focus)
  const products = [
    // COOKING
    { name: "Fortune Sunflower Oil 1L", price: 140, stock: 200, category: Category.COOKING },
    { name: "Dhara Mustard Oil 1L", price: 180, stock: 150, category: Category.COOKING },
    { name: "Saffola Gold Oil 1L", price: 220, stock: 120, category: Category.COOKING },
    { name: "Rice Bran Oil 1L", price: 160, stock: 180, category: Category.COOKING },
    { name: "Groundnut Oil 1L", price: 190, stock: 140, category: Category.COOKING },

    // PREMIUM
    { name: "Cold Pressed Mustard Oil", price: 350, stock: 80, category: Category.PREMIUM },
    { name: "Organic Sesame Oil", price: 400, stock: 70, category: Category.PREMIUM },
    { name: "Cold Pressed Coconut Oil", price: 450, stock: 90, category: Category.PREMIUM },

    // ORGANIC
    { name: "Organic Groundnut Oil", price: 420, stock: 60, category: Category.ORGANIC },
    { name: "Organic Sunflower Oil", price: 390, stock: 75, category: Category.ORGANIC },

    // INDUSTRIAL (bulk)
    { name: "Bulk Palm Oil 15L", price: 1800, stock: 50, category: Category.INDUSTRIAL },
    { name: "Bulk Soybean Oil 15L", price: 1700, stock: 60, category: Category.INDUSTRIAL },
  ];

  // 🔥 Assign sellers
  const createdProducts = [];

  for (let i = 0; i < products.length; i++) {
    const seller = i % 2 === 0 ? seller1 : seller2;

    const product = await prisma.product.create({
      data: {
        ...products[i],
        sellerId: seller.id,
      },
    });

    createdProducts.push(product);
  }

  console.log(`✅ Created ${createdProducts.length} products`);

  // 🧾 Sample Order
  await prisma.order.create({
    data: {
      userId: user.id,
      status: "PAID",
      totalAmount: 320,
      items: {
        create: [
          {
            productId: createdProducts[0].id,
            quantity: 2,
            price: 140,
          },
        ],
      },
    },
  });

  console.log("✅ Sample order created");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });