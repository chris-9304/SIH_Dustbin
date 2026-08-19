import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { env } from "./config/env.js";
import { logger } from "./lib/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { binRoutes } from "./modules/bins/bins.routes.js";
import { sensorRoutes } from "./modules/sensors/sensors.routes.js";
import { scanRoutes } from "./modules/scans/scans.routes.js";
import { throwRoutes } from "./modules/throws/throws.routes.js";
import { rewardRoutes } from "./modules/rewards/rewards.routes.js";
import { routeRoutes } from "./modules/routes/routes.routes.js";
import { adminRoutes } from "./modules/admin/admin.routes.js";

export async function buildApp() {
  const app = Fastify({ loggerInstance: logger });

  // Many POST endpoints (token issuance, admin actions, route optimize) take no/optional body.
  // Clients that still send `Content-Type: application/json` with an empty body would otherwise
  // hit Fastify's default "body cannot be empty" error, so treat empty as `{}`.
  app.addContentTypeParser(
    "application/json",
    { parseAs: "string" },
    (_req, body, done) => {
      if (!body || (body as string).length === 0) {
        done(null, {});
        return;
      }
      try {
        done(null, JSON.parse(body as string));
      } catch (err) {
        done(err as Error, undefined);
      }
    },
  );

  await app.register(cors, { origin: env.CORS_ORIGIN, credentials: true });
  await app.register(jwt, { secret: env.JWT_SECRET, sign: { expiresIn: env.JWT_EXPIRES_IN } });

  app.setErrorHandler(errorHandler);

  app.get("/health", async () => ({ status: "ok", timestamp: new Date().toISOString() }));

  await app.register(authRoutes, { prefix: "/api/v1/auth" });
  await app.register(binRoutes, { prefix: "/api/v1/bins" });
  await app.register(sensorRoutes, { prefix: "/api/v1/bins" });
  await app.register(scanRoutes, { prefix: "/api/v1/scans" });
  await app.register(throwRoutes, { prefix: "/api/v1/throws" });
  await app.register(rewardRoutes, { prefix: "/api/v1/rewards" });
  await app.register(routeRoutes, { prefix: "/api/v1/routes" });
  await app.register(adminRoutes, { prefix: "/api/v1/admin" });

  return app;
}
