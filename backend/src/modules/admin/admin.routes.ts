import type { FastifyInstance } from "fastify";
import { binStatusBreakdown, segregationTrends, wardSummary } from "./admin.service.js";
import { tickAllBins } from "../sensors/simulator.js";
import { requireAuth, requireRole } from "../../middleware/auth.js";

export async function adminRoutes(app: FastifyInstance): Promise<void> {
  const adminOnly = [requireAuth, requireRole("ADMIN")];

  app.get("/analytics/ward-summary", { preHandler: adminOnly }, async (_request, reply) => {
    reply.send({ wards: await wardSummary() });
  });

  app.get("/analytics/segregation-trends", { preHandler: adminOnly }, async (_request, reply) => {
    reply.send({ trends: await segregationTrends() });
  });

  app.get("/analytics/bins-status", { preHandler: adminOnly }, async (_request, reply) => {
    reply.send({ statuses: await binStatusBreakdown() });
  });

  app.post("/simulate/tick", { preHandler: adminOnly }, async (_request, reply) => {
    await tickAllBins();
    reply.send({ ok: true });
  });
}
