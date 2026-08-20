import { prisma } from "../../lib/prisma.js";
import { env } from "../../config/env.js";

export async function wardSummary() {
  const wards = await prisma.ward.findMany({ include: { bins: true } });
  return wards.map((ward) => {
    const fillValues = ward.bins.map((b) => b.currentFillPercent);
    const avgFill = fillValues.length ? fillValues.reduce((a, b) => a + b, 0) / fillValues.length : 0;
    return {
      wardId: ward.id,
      wardName: ward.name,
      wardCode: ward.code,
      binCount: ward.bins.length,
      averageFillPercent: Math.round(avgFill * 10) / 10,
      binsNeedingCollection: ward.bins.filter(
        (b) => b.currentFillPercent >= env.ROUTE_FILL_THRESHOLD_PERCENT,
      ).length,
    };
  });
}

export async function segregationTrends() {
  const events = await prisma.binCameraEvent.findMany({
    orderBy: { createdAt: "desc" },
    take: 500,
    select: { createdAt: true, segregationQualityScore: true, contaminationDetected: true, hazardousDetected: true },
  });

  const byDay = new Map<
    string,
    { day: string; count: number; scoreSum: number; contaminated: number; hazardous: number }
  >();

  for (const event of events) {
    const day = event.createdAt.toISOString().slice(0, 10);
    const bucket = byDay.get(day) ?? { day, count: 0, scoreSum: 0, contaminated: 0, hazardous: 0 };
    bucket.count += 1;
    bucket.scoreSum += event.segregationQualityScore ?? 0;
    if (event.contaminationDetected) bucket.contaminated += 1;
    if (event.hazardousDetected) bucket.hazardous += 1;
    byDay.set(day, bucket);
  }

  return [...byDay.values()]
    .sort((a, b) => a.day.localeCompare(b.day))
    .map((b) => ({
      day: b.day,
      eventCount: b.count,
      averageSegregationScore: b.count ? Math.round((b.scoreSum / b.count) * 10) / 10 : 0,
      contaminationRate: b.count ? Math.round((b.contaminated / b.count) * 100) : 0,
      hazardousCount: b.hazardous,
    }));
}

export async function binStatusBreakdown() {
  const grouped = await prisma.bin.groupBy({ by: ["status"], _count: { _all: true } });
  return grouped.map((g) => ({ status: g.status, count: g._count._all }));
}
