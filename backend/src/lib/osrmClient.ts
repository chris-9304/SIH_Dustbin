import { env } from "../config/env.js";
import { logger } from "./logger.js";

export type LngLat = { lng: number; lat: number };

interface OsrmTableResponse {
  code: string;
  durations: (number | null)[][];
  distances: (number | null)[][];
}

interface OsrmRouteResponse {
  code: string;
  routes: Array<{
    distance: number;
    duration: number;
    geometry: { type: "LineString"; coordinates: [number, number][] };
  }>;
}

interface OsrmNearestResponse {
  code: string;
  waypoints: Array<{ location: [number, number]; distance: number }>;
}

function coordsParam(points: LngLat[]): string {
  return points.map((p) => `${p.lng},${p.lat}`).join(";");
}

async function osrmFetch<T>(path: string): Promise<T> {
  const url = `${env.OSRM_BASE_URL}${path}`;
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    logger.error({ url, status: res.status, body }, "OSRM request failed");
    throw new Error(`OSRM request failed with status ${res.status}`);
  }
  const json = (await res.json()) as T & { code: string; message?: string };
  if (json.code !== "Ok") {
    throw new Error(`OSRM returned non-Ok code: ${json.code} ${json.message ?? ""}`);
  }
  return json;
}

/** Real-world distance/duration matrix between all pairs of points, via OSRM's Table service. */
export async function getDistanceDurationMatrix(points: LngLat[]): Promise<{
  distances: number[][];
  durations: number[][];
}> {
  if (points.length < 2) {
    return { distances: [[0]], durations: [[0]] };
  }
  const data = await osrmFetch<OsrmTableResponse>(
    `/table/v1/driving/${coordsParam(points)}?annotations=distance,duration`,
  );
  return {
    distances: data.distances.map((row) => row.map((v) => v ?? Number.POSITIVE_INFINITY)),
    durations: data.durations.map((row) => row.map((v) => v ?? Number.POSITIVE_INFINITY)),
  };
}

/** Real road-following route (geometry + totals) for an ordered sequence of stops, via OSRM's Route service. */
export async function getRoute(points: LngLat[]): Promise<{
  distanceMeters: number;
  durationSeconds: number;
  geometry: [number, number][];
}> {
  const data = await osrmFetch<OsrmRouteResponse>(
    `/route/v1/driving/${coordsParam(points)}?overview=full&geometries=geojson`,
  );
  const route = data.routes[0];
  if (!route) throw new Error("OSRM returned no route");
  return {
    distanceMeters: route.distance,
    durationSeconds: route.duration,
    geometry: route.geometry.coordinates,
  };
}

/** Snaps an arbitrary point onto the nearest routable road node, via OSRM's Nearest service. Used at seed time so every bin is guaranteed routable. */
export async function snapToRoad(point: LngLat): Promise<LngLat> {
  const data = await osrmFetch<OsrmNearestResponse>(
    `/nearest/v1/driving/${coordsParam([point])}`,
  );
  const waypoint = data.waypoints[0];
  if (!waypoint) throw new Error("OSRM returned no nearest waypoint");
  const [lng, lat] = waypoint.location;
  return { lng, lat };
}
