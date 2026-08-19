import { prisma } from "../../lib/prisma.js";
import { NotFoundError, ValidationError } from "../../lib/errors.js";

export async function listTransactions(userId: string) {
  return prisma.rewardTransaction.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function listBadgeCatalogWithOwnership(userId: string) {
  const [badges, owned] = await Promise.all([
    prisma.badge.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.userBadge.findMany({ where: { userId } }),
  ]);
  const ownedIds = new Set(owned.map((b) => b.badgeId));
  return badges.map((badge) => ({
    ...badge,
    earned: ownedIds.has(badge.id),
    earnedAt: owned.find((b) => b.badgeId === badge.id)?.earnedAt ?? null,
  }));
}

/** Awards a badge to a user if the badge exists and they don't already have it. Idempotent. */
export async function awardBadgeIfEligible(userId: string, badgeCode: string) {
  const badge = await prisma.badge.findUnique({ where: { code: badgeCode } });
  if (!badge) return null;

  const existing = await prisma.userBadge.findUnique({
    where: { userId_badgeId: { userId, badgeId: badge.id } },
  });
  if (existing) return existing;

  return prisma.userBadge.create({ data: { userId, badgeId: badge.id } });
}

export async function listRedemptionOptions() {
  return prisma.redemptionOption.findMany({ where: { active: true }, orderBy: { costPoints: "asc" } });
}

export async function redeem(userId: string, redemptionOptionId: string) {
  const option = await prisma.redemptionOption.findUnique({ where: { id: redemptionOptionId } });
  if (!option || !option.active) throw new NotFoundError("Redemption option not found");

  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
  if (user.wasteCoinBalance < option.costPoints) {
    throw new ValidationError("Insufficient WasteCoin balance for this redemption");
  }

  const newBalance = user.wasteCoinBalance - option.costPoints;

  return prisma.$transaction(async (tx) => {
    const redemption = await tx.redemption.create({
      data: { userId, redemptionOptionId, pointsSpent: option.costPoints, status: "FULFILLED" },
    });
    await tx.rewardTransaction.create({
      data: {
        userId,
        type: "REDEEM",
        amount: -option.costPoints,
        balanceAfter: newBalance,
        description: `Redeemed: ${option.title}`,
      },
    });
    await tx.user.update({ where: { id: userId }, data: { wasteCoinBalance: newBalance } });
    return redemption;
  });
}
