import type { FastifyInstance } from "fastify";
import { createBinSchema, updateBinSchema } from "./bins.schema.js";
import { createBin, getBinById, listBins, updateBin } from "./bins.service.js";
import { requireAuth, requireRole } from "../../middleware/auth.js";

export async function binRoutes(app: FastifyInstance): Promise<void> {
  app.get("/", { preHandler: requireAuth }, async (_request, reply) => {
    const bins = await listBins();
    reply.send({ bins });
  });

  app.get("/:id", { preHandler: requireAuth }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const bin = await getBinById(id);
    reply.send({ bin });
  });

  app.post("/", { preHandler: [requireAuth, requireRole("ADMIN")] }, async (request, reply) => {
    const input = createBinSchema.parse(request.body);
    const bin = await createBin(input);
    reply.status(201).send({ bin });
  });

  app.patch("/:id", { preHandler: [requireAuth, requireRole("ADMIN")] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const input = updateBinSchema.parse(request.body);
    const bin = await updateBin(id, input);
    reply.send({ bin });
  });
}
