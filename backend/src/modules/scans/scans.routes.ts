import type { FastifyInstance } from "fastify";
import { createScanSchema } from "./scans.schema.js";
import { createScan, getScan, issueToken, listScans } from "./scans.service.js";
import { requireAuth } from "../../middleware/auth.js";

export async function scanRoutes(app: FastifyInstance): Promise<void> {
  app.post("/", { preHandler: requireAuth }, async (request, reply) => {
    const input = createScanSchema.parse(request.body);
    const scan = await createScan(request.user.sub, input);
    reply.status(201).send({ scan });
  });

  app.post("/:id/token", { preHandler: requireAuth }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const token = await issueToken(request.user.sub, id);
    reply.status(201).send({ token });
  });

  app.get("/", { preHandler: requireAuth }, async (request, reply) => {
    const scans = await listScans(request.user.sub);
    reply.send({ scans });
  });

  app.get("/:id", { preHandler: requireAuth }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const scan = await getScan(request.user.sub, id);
    reply.send({ scan });
  });
}
