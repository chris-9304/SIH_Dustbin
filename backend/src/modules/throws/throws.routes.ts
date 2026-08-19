import type { FastifyInstance } from "fastify";
import { verifyThrowSchema } from "./throws.schema.js";
import { verifyAndThrow } from "./throws.service.js";
import { requireAuth } from "../../middleware/auth.js";

export async function throwRoutes(app: FastifyInstance): Promise<void> {
  app.post("/", { preHandler: requireAuth }, async (request, reply) => {
    const input = verifyThrowSchema.parse(request.body);
    const result = await verifyAndThrow(request.user.sub, input);
    reply.status(result.success ? 201 : 200).send(result);
  });
}
