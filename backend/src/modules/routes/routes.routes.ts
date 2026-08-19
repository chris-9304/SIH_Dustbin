import type { FastifyInstance } from "fastify";
import { NotFoundError } from "../../lib/errors.js";
import { optimizeRouteSchema } from "./routes.schema.js";
import { getRouteById, listRoutes, optimizeRoute } from "./routeOptimizer.service.js";
import { requireAuth, requireRole } from "../../middleware/auth.js";

export async function routeRoutes(app: FastifyInstance): Promise<void> {
  app.post("/optimize", { preHandler: [requireAuth, requireRole("ADMIN")] }, async (request, reply) => {
    const input = optimizeRouteSchema.parse(request.body ?? {});
    const result = await optimizeRoute(input.binIds);
    reply.status(201).send(result);
  });

  app.get("/", { preHandler: requireAuth }, async (_request, reply) => {
    const routes = await listRoutes();
    reply.send({ routes });
  });

  app.get("/:id", { preHandler: requireAuth }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const route = await getRouteById(id);
    if (!route) throw new NotFoundError("Route not found");
    reply.send({ route });
  });
}
