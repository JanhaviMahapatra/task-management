import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const dbPath = process.env.NODE_ENV === 'production'
  ? '/tmp/dev.db'
  : path.join(process.cwd(), 'prisma', 'dev.db');

// Ensure database file and schema exist at runtime in production
if (process.env.NODE_ENV === 'production' && !fs.existsSync(dbPath)) {
  try {
    execSync(`npx prisma db push --url "file:${dbPath}" --skip-generate`);
  } catch (err) {
    console.error('Failed to initialize SQLite runtime DB:', err);
  }
}

const adapter = new PrismaLibSql({
  url: `file:${dbPath}`,
});

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;