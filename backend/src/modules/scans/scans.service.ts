import { randomUUID } from "node:crypto";
import { prisma } from "../../lib/prisma.js";
import { ConflictError, NotFoundError, ValidationError } from "../../lib/errors.js";
import { classifyWaste } from "./classifier.js";
import { POINTS_PER_CLASSIFICATION, TOKEN_TTL_MINUTES } from "../../config/constants.js";
import type { CreateScanInput } from "./scans.schema.js";

export async function createScan(userId: string, input: CreateScanInput) {
  const { classification, confidence } = classifyWaste(input.imageUrls);
  const pendingPoints = POINTS_PER_CLASSIFICATION[classification] ?? 0;

  return prisma.wasteScan.create({
    data: {
      userId,
      imageUrls: input.imageUrls,
      aiClassification: classification,
      aiConfidence: confidence,
      pendingPoints,
    },
  });
}

export async function issueToken(userId: string, scanId: string) {
  const scan = await prisma.wasteScan.findUnique({ where: { id: scanId } });
  if (!scan || scan.userId !== userId) throw new NotFoundError("Scan not found");
  if (scan.aiClassification === "REJECTED") {
    throw new ValidationError("This scan was rejected by classification — re-scan before disposal");
  }
  if (scan.status !== "PENDING_TOKEN") {
    throw new ConflictError("A token has already been issued for this scan");
  }

  const expiresAt = new Date(Date.now() + TOKEN_TTL_MINUTES * 60 * 1000);

  const [token] = await prisma.$transaction([
    prisma.disposalToken.create({
      data: { scanId, userId, code: randomUUID(), expiresAt },
    }),
    prisma.wasteScan.update({ where: { id: scanId }, data: { status: "TOKEN_ISSUED" } }),
  ]);

  return token;
}

export async function getScan(userId: string, scanId: string) {
  const scan = await prisma.wasteScan.findUnique({ where: { id: scanId }, include: { token: true } });
  if (!scan || scan.userId !== userId) throw new NotFoundError("Scan not found");
  return scan;
}

export async function listScans(userId: string) {
  return prisma.wasteScan.findMany({
    where: { userId },
    include: { token: true },
    orderBy: { createdAt: "desc" },
  });
}
