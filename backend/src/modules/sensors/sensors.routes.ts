import type { FastifyInstance } from "fastify";
import { cameraEventSchema, telemetrySchema } from "./sensors.schema.js";
import {
  getRecentCameraEvents,
  getRecentSensorLogs,
  ingestCameraEvent,
  ingestTelemetry,
} from "./sensors.service.js";
import { requireDeviceAuth } from "../../middleware/deviceAuth.js";
import { requireAuth } from "../../middleware/auth.js";

/**
 * Registered under the /api/v1/bins prefix. POST routes here are the RPi/ESP32-ready ingestion
 * contract: authenticated per-bin via x-device-api-key, not a user JWT. The GET routes are for
 * the frontend/admin to read back recent history.
 */
export async function sensorRoutes(app: FastifyInstance): Promise<void> {
  app.post("/:binId/telemetry", { preHandler: requireDeviceAuth }, async (request, reply) => {
    const { binId } = request.params as { binId: string };
    const input = telemetrySchema.parse(request.body);
    const result = await ingestTelemetry(binId, input, "DEVICE");
    reply.status(201).send(result);
  });

  app.post("/:binId/camera-events", { preHandler: requireDeviceAuth }, async (request, reply) => {
    const { binId } = request.params as { binId: string };
    const input = cameraEventSchema.parse(request.body);
    const event = await ingestCameraEvent(binId, input);
    reply.status(201).send({ cameraEvent: event });
  });

  app.get("/:binId/logs", { preHandler: requireAuth }, async (request, reply) => {
    const { binId } = request.params as { binId: string };
    const { limit } = request.query as { limit?: string };
    const logs = await getRecentSensorLogs(binId, limit ? Number(limit) : undefined);
    reply.send({ logs });
  });

  app.get("/:binId/camera-events", { preHandler: requireAuth }, async (request, reply) => {
    const { binId } = request.params as { binId: string };
    const events = await getRecentCameraEvents(binId);
    reply.send({ cameraEvents: events });
  });
}
