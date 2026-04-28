import { Pool, types } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

// Set Decimal handling for pg (Prisma handles this, but good for raw queries)
types.setTypeParser(1700, (val) => parseFloat(val));

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientExtended | undefined;
};

export type PrismaClientExtended = ReturnType<typeof createPrismaClient>;

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL environment variable is not set."
    );
  }

  // Optimized Pool for Neon Serverless
  // In serverless, we want a smaller pool per instance to avoid global exhaustion
  const pool = new Pool({
    connectionString,
    max: 10, // Reduced from 20 to prevent pool exhaustion across multiple lambdas
    idleTimeoutMillis: 20000, 
    connectionTimeoutMillis: 15000, // Increased to 15s to handle Neon cold starts/bursts
    maxUses: 7500, // Helps with memory leaks in long-running processes
  });

  pool.on("error", (err) => {
    console.error("CRITICAL: Unexpected connection pool error:", err);
  });

  const adapter = new PrismaPg(pool);

  const client = new PrismaClient({
    adapter,
    log: [
      { emit: 'event', level: 'query' },
      { emit: 'stdout', level: 'error' },
      { emit: 'stdout', level: 'warn' },
    ],
  });

  // Slow query logging & Performance monitoring
  return client.$extends({
    query: {
      $allModels: {
        async $allOperations({ operation, model, args, query }) {
          const start = performance.now();
          const result = await query(args);
          const duration = performance.now() - start;

          if (duration > 300) { // Log queries slower than 300ms
            console.warn(
              `\x1b[33m[Prisma Slow Query]\x1b[0m ${model}.${operation} took ${duration.toFixed(2)}ms`
            );
          }
          return result;
        },
      },
    },
  });
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
