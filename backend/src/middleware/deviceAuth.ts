import type { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma.js";
import { NotFoundError, UnauthorizedError } from "../lib/errors.js";

declare module "fastify" {
  interface FastifyRequest {
    bin?: { id: string; code: string };
  }
}

/**
 * Authenticates a bin/device (real ESP32 or the simulator) via the `x-device-api-key` header
 * against Bin.deviceApiKey, rather than a user JWT. This is the contract a real Raspberry Pi /
 * ESP32 client will use once hardware is connected — the simulator uses the exact same path.
 */
export async function requireDeviceAuth(request: FastifyRequest, _reply: FastifyReply): Promise<void> {
  const params = request.params as { binId?: string };
  const apiKey = request.headers["x-device-api-key"];

  if (!params.binId || typeof apiKey !== "string" || apiKey.length === 0) {
    throw new UnauthorizedError("Missing bin id or device API key");
  }

  const bin = await prisma.bin.findUnique({ where: { id: params.binId }, select: { id: true, code: true, deviceApiKey: true } });
  if (!bin) {
    throw new NotFoundError("Bin not found");
  }
  if (bin.deviceApiKey !== apiKey) {
    throw new UnauthorizedError("Invalid device API key for this bin");
  }

  request.bin = { id: bin.id, code: bin.code };
}
