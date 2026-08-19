import { prisma } from "../../lib/prisma.js";
import { ValidationError } from "../../lib/errors.js";
import { env } from "../../config/env.js";
import { getDistanceDurationMatrix, getRoute, type LngLat } from "../../lib/osrmClient.js";
import { optimizeVisitOrder } from "./tsp.js";

/**
 * Picks candidate bins for collection: an explicit list, or every ACTIVE/FULL bin at or above
 * the fill-percent threshold — the "which bins actually need emptying" signal from
 * dustbin_arch.md's dynamic routing phase, in place of static weekly schedules.
 */
async function selectCandidateBins(binIds?: string[]) {
  if (binIds && binIds.length > 0) {
    const bins = await prisma.bin.findMany({ where: { id: { in: binIds } } });
    if (bins.length < 2) throw new ValidationError("Need at least 2 valid bins to optimize a route");
    return bins;
  }

  const bins = await prisma.bin.findMany({
    where: {
      status: { in: ["ACTIVE", "FULL"] },
      currentFillPercent: { gte: env.ROUTE_FILL_THRESHOLD_PERCENT },
    },
  });
  if (bins.length < 2) {
    throw new ValidationError(
      `Need at least 2 bins at or above ${env.ROUTE_FILL_THRESHOLD_PERCENT}% fill to optimize a route`,
    );
  }
  return bins;
}

/**
 * Orchestrates: candidate bins -> real-world duration matrix (OSRM /table) -> nearest-neighbor +
 * 2-opt visit ordering -> real road-following geometry for that order (OSRM /route) -> persist.
 * This is the "similar to Google Maps" fastest-route behavior: real road distances/durations
 * from a genuine routing engine, with our own multi-stop ordering heuristic on top (the part
 * dustbin_arch.md calls out for OR-Tools/TSP).
 */
export async function optimizeRoute(binIds?: string[]) {
  const bins = await selectCandidateBins(binIds);
  const points: LngLat[] = bins.map((b) => ({ lng: b.longitude, lat: b.latitude }));

  const { durations, distances } = await getDistanceDurationMatrix(points);
  const { order } = optimizeVisitOrder(durations);

  const orderedBins = order.map((i) => bins[i]!);
  const orderedPoints = order.map((i) => points[i]!);

  const routeGeometry = await getRoute(orderedPoints);

  const stopsData = order.map((binIndex, position) => {
    const prevIndex = position === 0 ? binIndex : order[position - 1]!;
    return {
      binId: bins[binIndex]!.id,
      sequenceOrder: position,
      distanceFromPrevMeters: position === 0 ? 0 : distances[prevIndex]![binIndex]!,
      durationFromPrevSeconds: position === 0 ? 0 : durations[prevIndex]![binIndex]!,
    };
  });

  const route = await prisma.route.create({
    data: {
      totalDistanceMeters: routeGeometry.distanceMeters,
      totalDurationSeconds: routeGeometry.durationSeconds,
      algorithm: "nearest-neighbor+2opt/osrm-table",
      geometryGeoJson: routeGeometry.geometry,
      stops: { create: stopsData },
    },
    include: { stops: { include: { bin: true }, orderBy: { sequenceOrder: "asc" } } },
  });

  return { route, orderedBins };
}

export async function listRoutes() {
  return prisma.route.findMany({
    orderBy: { generatedAt: "desc" },
    take: 20,
    include: { stops: { include: { bin: true }, orderBy: { sequenceOrder: "asc" } } },
  });
}

export async function getRouteById(id: string) {
  return prisma.route.findUnique({
    where: { id },
    include: { stops: { include: { bin: true }, orderBy: { sequenceOrder: "asc" } } },
  });
}
