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
