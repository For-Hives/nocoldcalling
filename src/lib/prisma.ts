import { PrismaClient } from "@prisma/client";

declare global {
  var prismaGlobal: PrismaClient | undefined;
}

export const prismaClient: PrismaClient =
  global.prismaGlobal ?? new PrismaClient({ log: ["error", "warn"] });

if (process.env.NODE_ENV !== "production") global.prismaGlobal = prismaClient;


