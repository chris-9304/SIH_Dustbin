import { prisma } from "../../lib/prisma.js";
import { ConflictError, NotFoundError } from "../../lib/errors.js";
import { haversineDistanceMeters } from "../../lib/geo.js";
import { daysBetweenLocal } from "../../lib/datetime.js";
import {
  FULL_CHAIN_BONUS_PERCENT,
  GPS_PROXIMITY_RADIUS_METERS,
  THROW_CAMERA_CORROBORATION_WINDOW_MINUTES,
} from "../../config/constants.js";
import { env } from "../../config/env.js";
import { awardBadgeIfEligible } from "../rewards/rewards.service.js";
import { logger } from "../../lib/logger.js";
import type { VerifyThrowInput } from "./throws.schema.js";
import type { ThrowTrustTier } from "@prisma/client";

function nextStreak(currentStreak: number, lastThrowDate: Date | null, now: Date): number {
  if (!lastThrowDate) return 1;
  const diff = daysBetweenLocal(lastThrowDate, now, env.APP_TIMEZONE);
  if (diff === 0) return currentStreak; // already counted today
  if (diff === 1) return currentStreak + 1;
  return 1; // streak broken
}

/**
 * Resolves whether a throw is verified, and at what trust tier.
 *
 * SELF_PHOTO is the weakest signal: a well-formed evidence URL is required, but the URL itself
 * is client-supplied and unverified server-side — this is UNCORROBORATED and known-spoofable.
 * The real fix is server-side image verification against the bin camera frame; until that
 * exists, treat this tier as a best-effort deterrent, not a guarantee.
 *
 * BIN_CAMERA and NFC_TAG both require a device-authenticated corroborating signal: a
 * BinCameraEvent recorded for this exact bin within a short window of the throw attempt. There
 * is no device-attested NFC tap record in the schema yet, so NFC_TAG is held to the same bar
 * rather than trusted unconditionally from the client.
 */
async function resolveThrowVerification(
  binId: string,
  verificationMethod: VerifyThrowInput["verificationMethod"],
  evidenceUrl: string | undefined,
  now: Date,
): Promise<{ throwVerified: boolean; trustTier: ThrowTrustTier }> {
  if (verificationMethod === "SELF_PHOTO") {
    return {
      throwVerified: Boolean(evidenceUrl),
      trustTier: "UNCORROBORATED",
    };
  }

  const windowStart = new Date(now.getTime() - THROW_CAMERA_CORROBORATION_WINDOW_MINUTES * 60 * 1000);
  const corroboration = await prisma.binCameraEvent.findFirst({
    where: { binId, createdAt: { gte: windowStart, lte: now } },
    select: { id: true },
  });

  return {
    throwVerified: Boolean(corroboration),
    trustTier: corroboration ? "DEVICE_CORROBORATED" : "UNCORROBORATED",
  };
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
  const { throwVerified, trustTier } = await resolveThrowVerification(
    bin.id,
    input.verificationMethod,
    input.evidenceUrl,
    now,
  );

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
          trustTier,
          evidenceUrl: input.evidenceUrl,
        },
      }),
    ]);
    return { success: false as const, reason: "THROW_NOT_VERIFIED", throwEvent };
  }

  // Full chain succeeded: release points + bonus, update streak, record ledger entries.
  // Balance reads and increments all happen inside the transaction so concurrent verified
  // throws for the same user cannot lose an update (see docs/hardening-tasks.md 1.3).
  const pointsAwarded = token.scan.pendingPoints;
  const bonusAmount = Math.round((pointsAwarded * FULL_CHAIN_BONUS_PERCENT) / 100);

  const result = await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUniqueOrThrow({ where: { id: userId } });
    const currentStreak = nextStreak(user.currentStreak, user.lastThrowDate, now);
    const longestStreak = Math.max(user.longestStreak, currentStreak);

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
        trustTier,
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

    const afterEarn = await tx.user.update({
      where: { id: userId },
      data: { wasteCoinBalance: { increment: pointsAwarded } },
      select: { wasteCoinBalance: true },
    });
    await tx.rewardTransaction.create({
      data: {
        userId,
        type: "EARN_RELEASED",
        amount: pointsAwarded,
        balanceAfter: afterEarn.wasteCoinBalance,
        description: `Points released for verified throw at bin ${bin.code}`,
        throwEventId: throwEvent.id,
      },
    });

    const afterBonus = await tx.user.update({
      where: { id: userId },
      data: { wasteCoinBalance: { increment: bonusAmount } },
      select: { wasteCoinBalance: true },
    });
    await tx.rewardTransaction.create({
      data: {
        userId,
        type: "BONUS",
        amount: bonusAmount,
        balanceAfter: afterBonus.wasteCoinBalance,
        description: "Full verification chain bonus",
        throwEventId: throwEvent.id,
      },
    });

    const updatedUser = await tx.user.update({
      where: { id: userId },
      data: { currentStreak, longestStreak, lastThrowDate: now },
    });

    return { throwEvent, user: updatedUser, pointsAwarded, bonusAmount, currentStreak };
  });

  // Badge awarding is best-effort and non-blocking for the core points/streak flow.
  try {
    const priorReleases = await prisma.rewardTransaction.count({
      where: { userId, type: "EARN_RELEASED" },
    });
    if (priorReleases === 1) await awardBadgeIfEligible(userId, "FIRST_THROW");
    if (result.currentStreak === 7) await awardBadgeIfEligible(userId, "STREAK_7");
    if (result.currentStreak === 30) await awardBadgeIfEligible(userId, "STREAK_30");
  } catch (err) {
    logger.warn({ err, userId }, "Badge awarding failed (non-blocking)");
  }

  return { success: true as const, ...result };
}
