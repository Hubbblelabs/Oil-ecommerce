import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: 'ts-node --compiler-options {"module":"CommonJS"} prisma/seed.ts',
  },
  datasource: {
    // Falls back to a placeholder so `prisma generate` can run without a real DB.
    // Replace DATABASE_URL in .env before running migrations or seeding.
    url: process.env.DATABASE_URL ?? "postgresql://placeholder:placeholder@localhost:5432/oil_ecommerce",
  },
});
