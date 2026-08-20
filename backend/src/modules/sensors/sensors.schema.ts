import { z } from "zod";

export const telemetrySchema = z.object({
  fillPercent: z.number().min(0).max(100),
  weightKg: z.number().min(0),
  lidEvent: z.boolean().default(false),
  motionDetected: z.boolean().default(false),
  batteryPercent: z.number().min(0).max(100).optional(),
  recordedAt: z.coerce.date().optional(),
});
export type TelemetryInput = z.infer<typeof telemetrySchema>;

export const cameraEventSchema = z.object({
  sensorLogId: z.string().optional(),
  imageUrl: z.string().min(1),
  segregationQualityScore: z.number().min(0).max(100).optional(),
  contaminationDetected: z.boolean().default(false),
  hazardousDetected: z.boolean().default(false),
});
export type CameraEventInput = z.infer<typeof cameraEventSchema>;

export const sensorLogQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(500).default(100),
});
export type SensorLogQuery = z.infer<typeof sensorLogQuerySchema>;

export const cameraEventQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(200).default(20),
});
export type CameraEventQuery = z.infer<typeof cameraEventQuerySchema>;
