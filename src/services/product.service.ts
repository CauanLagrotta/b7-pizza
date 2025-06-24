import { prisma } from "@/lib/prisma.lib";

export const getAllProducts = async () => {
  return await prisma.product.findMany();
};
