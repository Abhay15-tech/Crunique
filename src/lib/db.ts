import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    // If DATABASE_URL is not configured (e.g. during build-time static collection),
    // return a safe proxy that fails explicitly only when a database query is actually attempted.
    return new Proxy({} as PrismaClient, {
      get(_target, prop) {
        if (process.env.DATABASE_URL) {
          const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
          const adapter = new PrismaPg(pool);
          const client = new PrismaClient({ adapter });
          return (client as any)[prop];
        }
        throw new Error(
          `[Prisma DB Error] Cannot execute '${String(prop)}' because DATABASE_URL is not configured in environment variables.`
        );
      },
    });
  }

  const pool = new pg.Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
