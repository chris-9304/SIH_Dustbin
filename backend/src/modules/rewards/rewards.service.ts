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

  // The balance check and debit happen atomically inside the transaction, via a guarded
  // updateMany, so two concurrent redemptions cannot both succeed against the same balance
  // (see docs/hardening-tasks.md 1.2). balanceAfter is read back post-debit, never computed
  // from a pre-transaction snapshot.
  return prisma.$transaction(async (tx) => {
    const debited = await tx.user.updateMany({
      where: { id: userId, wasteCoinBalance: { gte: option.costPoints } },
      data: { wasteCoinBalance: { decrement: option.costPoints } },
    });
    if (debited.count === 0) {
      throw new ValidationError("Insufficient WasteCoin balance for this redemption");
    }

    const updatedUser = await tx.user.findUniqueOrThrow({
      where: { id: userId },
      select: { wasteCoinBalance: true },
    });

    const redemption = await tx.redemption.create({
      data: { userId, redemptionOptionId, pointsSpent: option.costPoints, status: "FULFILLED" },
    });
    await tx.rewardTransaction.create({
      data: {
        userId,
        type: "REDEEM",
        amount: -option.costPoints,
        balanceAfter: updatedUser.wasteCoinBalance,
        description: `Redeemed: ${option.title}`,
      },
    });
    return redemption;
  });
}
