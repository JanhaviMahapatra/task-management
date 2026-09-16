import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import path from 'path';

const dbPath = process.env.NODE_ENV === 'production'
  ? '/tmp/dev.db'
  : path.join(process.cwd(), 'prisma', 'dev.db');

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