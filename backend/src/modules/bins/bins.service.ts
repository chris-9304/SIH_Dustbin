import { prisma } from "../../lib/prisma.js";
import { ConflictError, NotFoundError } from "../../lib/errors.js";
import type { CreateBinInput, UpdateBinInput } from "./bins.schema.js";

export async function listBins() {
  return prisma.bin.findMany({ include: { ward: true }, orderBy: { code: "asc" } });
}

export async function getBinById(id: string) {
  const bin = await prisma.bin.findUnique({ where: { id }, include: { ward: true } });
  if (!bin) throw new NotFoundError("Bin not found");
  return bin;
}

export async function getBinByCode(code: string) {
  const bin = await prisma.bin.findUnique({ where: { code } });
  if (!bin) throw new NotFoundError("Bin not found for this QR code");
  return bin;
}

export async function createBin(input: CreateBinInput) {
  const existing = await prisma.bin.findUnique({ where: { code: input.code } });
  if (existing) throw new ConflictError("A bin with this code already exists");

  return prisma.bin.create({
    data: {
      code: input.code,
      label: input.label,
      latitude: input.latitude,
      longitude: input.longitude,
      capacityLiters: input.capacityLiters,
      wardId: input.wardId,
    },
  });
}

export async function updateBin(id: string, input: UpdateBinInput) {
  await getBinById(id);
  return prisma.bin.update({ where: { id }, data: input });
}
