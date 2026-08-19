import { prisma } from "../../lib/prisma.js";
import { ConflictError, NotFoundError } from "../../lib/errors.js";
import { haversineDistanceMeters } from "../../lib/geo.js";
import { FULL_CHAIN_BONUS_PERCENT, GPS_PROXIMITY_RADIUS_METERS } from "../../config/constants.js";
import { awardBadgeIfEligible } from "../rewards/rewards.service.js";
import { logger } from "../../lib/logger.js";
import type { VerifyThrowInput } from "./throws.schema.js";

function dateOnlyUtc(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function daysBetween(a: Date, b: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((Date.parse(dateOnlyUtc(b)) - Date.parse(dateOnlyUtc(a))) / msPerDay);
}

function nextStreak(currentStreak: number, lastThrowDate: Date | null, now: Date): number {
  if (!lastThrowDate) return 1;
  const diff = daysBetween(lastThrowDate, now);
  if (diff === 0) return currentStreak; // already counted today
  if (diff === 1) return currentStreak + 1;
  return 1; // streak broken
}

export async function verifyAndThrow(userId: string, input: VerifyThrowInput) {
  const token = await prisma.disposalToken.findUnique({
    where: { code: input.tokenCode },
    include: { scan: true },
  });
  if (!token || token.userId !== userId) {
    throw new NotFoundError("Invalid or unrecognized disposal token");
  }
  if (token.status !== "ACTIVE") {
    throw new ConflictError("This token has already been used or is no longer valid");
  }

  const bin = await prisma.bin.findUnique({ where: { code: input.binCode } });
  if (!bin) {
    throw new NotFoundError("Invalid bin QR code");
  }

  const qrMatched = true; // bin resolved successfully via its fixed printed code
  const now = new Date();
  const tokenExpired = token.expiresAt.getTime() < now.getTime();
  const gpsOk =
    haversineDistanceMeters(
      { lat: input.gpsLat, lng: input.gpsLng },
      { lat: bin.latitude, lng: bin.longitude },
    ) <= GPS_PROXIMITY_RADIUS_METERS;
  const tokenValidAtCheck = !tokenExpired;

  // Triple-lock failed: GPS out of range, or token expired.
  if (!gpsOk || !tokenValidAtCheck) {
    const [, , throwEvent] = await prisma.$transaction([
      prisma.disposalToken.update({
        where: { id: token.id },
        data: { status: tokenExpired ? "EXPIRED" : "FAILED" },
      }),
      prisma.wasteScan.update({ where: { id: token.scanId }, data: { status: "EXPIRED" } }),
      prisma.throwEvent.create({
        data: {
          tokenId: token.id,
          binId: bin.id,
          verificationMethod: input.verificationMethod,
          gpsLat: input.gpsLat,
          gpsLng: input.gpsLng,
          qrMatched,
          tokenValidAtCheck,
          throwVerified: false,
          evidenceUrl: input.evidenceUrl,
        },
      }),
    ]);
    return {
      success: false as const,
      reason: !gpsOk ? "GPS_OUT_OF_RANGE" : "TOKEN_EXPIRED",
      throwEvent,
    };
  }

  // Presence verified — "Throw Now" unlocked. Resolve throw-verification outcome per method.
  const throwVerified = input.verificationMethod === "NFC_TAG" ? true : Boolean(input.evidenceUrl);

  if (!throwVerified) {
    const [, , throwEvent] = await prisma.$transaction([
      prisma.disposalToken.update({ where: { id: token.id }, data: { status: "FAILED" } }),
      prisma.wasteScan.update({ where: { id: token.scanId }, data: { status: "EXPIRED" } }),
      prisma.throwEvent.create({
        data: {
          tokenId: token.id,
          binId: bin.id,
          verificationMethod: input.verificationMethod,
          gpsLat: input.gpsLat,
          gpsLng: input.gpsLng,
          qrMatched,
          tokenValidAtCheck,
          throwVerified: false,
          evidenceUrl: input.evidenceUrl,
        },
      }),
    ]);
    return { success: false as const, reason: "THROW_NOT_VERIFIED", throwEvent };
  }

  // Full chain succeeded: release points + bonus, update streak, record ledger entries.
  const pointsAwarded = token.scan.pendingPoints;
  const bonusAmount = Math.round((pointsAwarded * FULL_CHAIN_BONUS_PERCENT) / 100);

  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
  const currentStreak = nextStreak(user.currentStreak, user.lastThrowDate, now);
  const longestStreak = Math.max(user.longestStreak, currentStreak);

  const result = await prisma.$transaction(async (tx) => {
    const throwEvent = await tx.throwEvent.create({
      data: {
        tokenId: token.id,
        binId: bin.id,
        verificationMethod: input.verificationMethod,
        gpsLat: input.gpsLat,
        gpsLng: input.gpsLng,
        qrMatched,
        tokenValidAtCheck,
        throwVerified: true,
        pointsAwarded,
        bonusPercent: FULL_CHAIN_BONUS_PERCENT,
        evidenceUrl: input.evidenceUrl,
      },
    });

    await tx.disposalToken.update({
      where: { id: token.id },
      data: { status: "VERIFIED", verifiedAt: now },
    });
    await tx.wasteScan.update({ where: { id: token.scanId }, data: { status: "CONSUMED" } });

    const afterEarn = user.wasteCoinBalance + pointsAwarded;
    const afterBonus = afterEarn + bonusAmount;

    await tx.rewardTransaction.create({
      data: {
        userId,
        type: "EARN_RELEASED",
        amount: pointsAwarded,
        balanceAfter: afterEarn,
        description: `Points released for verified throw at bin ${bin.code}`,
        throwEventId: throwEvent.id,
      },
    });
    await tx.rewardTransaction.create({
      data: {
        userId,
        type: "BONUS",
        amount: bonusAmount,
        balanceAfter: afterBonus,
        description: "Full verification chain bonus",
        throwEventId: throwEvent.id,
      },
    });

    const updatedUser = await tx.user.update({
      where: { id: userId },
      data: {
        wasteCoinBalance: afterBonus,
        currentStreak,
        longestStreak,
        lastThrowDate: now,
      },
    });

    return { throwEvent, user: updatedUser, pointsAwarded, bonusAmount };
  });

  // Badge awarding is best-effort and non-blocking for the core points/streak flow.
  try {
    const priorReleases = await prisma.rewardTransaction.count({
      where: { userId, type: "EARN_RELEASED" },
    });
    if (priorReleases === 1) await awardBadgeIfEligible(userId, "FIRST_THROW");
    if (currentStreak === 7) await awardBadgeIfEligible(userId, "STREAK_7");
    if (currentStreak === 30) await awardBadgeIfEligible(userId, "STREAK_30");
  } catch (err) {
    logger.warn(err, "Badge awarding failed (non-blocking)");
  }

  return { success: true as const, ...result };
}
