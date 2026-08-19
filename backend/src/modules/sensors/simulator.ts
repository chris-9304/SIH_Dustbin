import { prisma } from "../../lib/prisma.js";
import { logger } from "../../lib/logger.js";
import { ingestTelemetry, ingestCameraEvent } from "./sensors.service.js";
import { BIN_CAMERA_TRIGGER_FILL_PERCENT } from "../../config/constants.js";

/** Rough kg-per-liter density used to derive a plausible weight from a plausible fill level. */
const WASTE_DENSITY_KG_PER_LITER = 0.15;

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

/**
 * Advances one bin's simulated telemetry by one step: fill rises gradually with occasional lid
 * events, resets (a "collection") once it crosses ~95%, and occasionally emits a camera event
 * once it crosses the camera-trigger threshold — mirroring the ESP32 behavior in dustbin_arch.md
 * without needing real hardware.
 */
export async function tickBin(binId: string, recordedAt: Date = new Date()): Promise<void> {
  const bin = await prisma.bin.findUnique({ where: { id: binId } });
  if (!bin || bin.status === "MAINTENANCE" || bin.status === "OFFLINE") return;

  const lidEvent = Math.random() < 0.15;
  const isCollection = bin.currentFillPercent >= 95 && Math.random() < 0.6;

  const fillPercent = isCollection
    ? randomBetween(0, 5)
    : Math.min(100, bin.currentFillPercent + randomBetween(0.5, 3.5));

  const weightKg = Math.max(
    0,
    (fillPercent / 100) * bin.capacityLiters * WASTE_DENSITY_KG_PER_LITER + randomBetween(-0.5, 0.5),
  );

  const { sensorLog, cameraTriggerRecommended } = await ingestTelemetry(
    binId,
    { fillPercent, weightKg, lidEvent, motionDetected: lidEvent, recordedAt },
    "SIMULATED",
  );

  if (!isCollection && cameraTriggerRecommended && Math.random() < 0.4) {
    const contaminationDetected = Math.random() < 0.12;
    const hazardousDetected = contaminationDetected && Math.random() < 0.2;
    await ingestCameraEvent(binId, {
      sensorLogId: sensorLog.id,
      imageUrl: `https://picsum.photos/seed/bin-${bin.code}-${sensorLog.id}/400/300`,
      segregationQualityScore: contaminationDetected ? randomBetween(30, 65) : randomBetween(70, 99),
      contaminationDetected,
      hazardousDetected,
    });
  }
}

export async function tickAllBins(): Promise<void> {
  const bins = await prisma.bin.findMany({ select: { id: true } });
  for (const bin of bins) {
    await tickBin(bin.id);
  }
}

/**
 * Generates `days` worth of history for every bin at `stepMinutes` resolution, walking forward
 * from `days` ago to now. Used by the seed script so the demo doesn't start with an empty history.
 */
export async function backfillHistory(days: number, stepMinutes = 20): Promise<void> {
  const bins = await prisma.bin.findMany({ select: { id: true } });
  const totalSteps = Math.floor((days * 24 * 60) / stepMinutes);
  const start = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  for (const bin of bins) {
    let cursor = new Date(start);
    for (let step = 0; step < totalSteps; step++) {
      await tickBin(bin.id, cursor);
      cursor = new Date(cursor.getTime() + stepMinutes * 60 * 1000);
    }
  }

  logger.info({ bins: bins.length, days, stepMinutes }, "Backfilled simulated sensor history");
}

let intervalHandle: NodeJS.Timeout | undefined;

/** Keeps posting simulated telemetry on a timer, so a running demo visibly updates without a real device. */
export function startSimulationLoop(intervalMs: number): void {
  if (intervalHandle) return;
  logger.info({ intervalMs }, "Starting sensor simulation loop");
  intervalHandle = setInterval(() => {
    tickAllBins().catch((err) => logger.error(err, "Simulation tick failed"));
  }, intervalMs);
}

export function stopSimulationLoop(): void {
  if (intervalHandle) clearInterval(intervalHandle);
  intervalHandle = undefined;
}

// CLI entry point: `npm run simulate -- --backfill=14` or `npm run simulate -- --tick`
const isMainModule = process.argv[1] && import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
  const arg = process.argv.find((a) => a.startsWith("--backfill"));
  if (arg) {
    const days = Number(arg.split("=")[1] ?? "14");
    backfillHistory(days)
      .then(() => process.exit(0))
      .catch((err) => {
        logger.error(err, "Backfill failed");
        process.exit(1);
      });
  } else {
    tickAllBins()
      .then(() => process.exit(0))
      .catch((err) => {
        logger.error(err, "Tick failed");
        process.exit(1);
      });
  }
}
