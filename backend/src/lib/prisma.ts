import { PrismaClient } from "@prisma/client";

/** Single shared Prisma client instance for the process (avoids exhausting DB connections via multiple instantiations, e.g. under tsx watch reloads). */
declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

export const prisma = globalThis.__prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.__prisma = prisma;
}
