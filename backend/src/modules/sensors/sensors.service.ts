import { prisma } from "../../lib/prisma.js";
import { NotFoundError } from "../../lib/errors.js";
import {
  BIN_CAMERA_TRIGGER_FILL_PERCENT,
  SENSOR_SIGNIFICANT_FILL_DELTA_PERCENT,
} from "../../config/constants.js";
import type { CameraEventInput, TelemetryInput } from "./sensors.schema.js";
import type { SensorSource } from "@prisma/client";

/**
 * Ingests one telemetry reading for a bin. This is the single code path used by both a future
 * real ESP32/Raspberry Pi client (via the HTTP endpoint, device-key authenticated) and the
 * in-process simulator (called directly) — nothing changes here when real hardware arrives.
 */
export async function ingestTelemetry(binId: string, input: TelemetryInput, source: SensorSource) {
  const bin = await prisma.bin.findUnique({ where: { id: binId } });
  if (!bin) throw new NotFoundError("Bin not found");

  const fillDelta = Math.abs(input.fillPercent - bin.currentFillPercent);
  const weightDelta = Math.abs(input.weightKg - bin.currentWeightKg);
  const significantChange =
    fillDelta >= SENSOR_SIGNIFICANT_FILL_DELTA_PERCENT ||
    input.lidEvent ||
    weightDelta >= Math.max(2, bin.currentWeightKg * 0.2);

  const recordedAt = input.recordedAt ?? new Date();

  const sensorLog = await prisma.sensorLog.create({
    data: {
      binId,
      fillPercent: input.fillPercent,
      weightKg: input.weightKg,
      lidEvent: input.lidEvent,
      motionDetected: input.motionDetected,
      batteryPercent: input.batteryPercent,
      recordedAt,
      source,
    },
  });

  const nextStatus =
    input.fillPercent >= 95 ? "FULL" : bin.status === "FULL" ? "ACTIVE" : bin.status;

  const updatedBin = await prisma.bin.update({
    where: { id: binId },
    data: {
      currentFillPercent: input.fillPercent,
      currentWeightKg: input.weightKg,
      lastTelemetryAt: recordedAt,
      status: nextStatus,
    },
  });

  return {
    sensorLog,
    bin: updatedBin,
    significantChange,
    cameraTriggerRecommended: input.fillPercent >= BIN_CAMERA_TRIGGER_FILL_PERCENT || input.lidEvent,
  };
}

export async function ingestCameraEvent(binId: string, input: CameraEventInput) {
  const bin = await prisma.bin.findUnique({ where: { id: binId } });
  if (!bin) throw new NotFoundError("Bin not found");

  return prisma.binCameraEvent.create({
    data: {
      binId,
      sensorLogId: input.sensorLogId,
      imageUrl: input.imageUrl,
      segregationQualityScore: input.segregationQualityScore,
      contaminationDetected: input.contaminationDetected,
      hazardousDetected: input.hazardousDetected,
    },
  });
}

export async function getRecentSensorLogs(binId: string, limit = 100) {
  return prisma.sensorLog.findMany({
    where: { binId },
    orderBy: { recordedAt: "desc" },
    take: limit,
  });
}

export async function getRecentCameraEvents(binId: string, limit = 20) {
  return prisma.binCameraEvent.findMany({
    where: { binId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}
