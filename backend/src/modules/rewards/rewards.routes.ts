import type { FastifyInstance } from "fastify";
import { z } from "zod";
import {
  listBadgeCatalogWithOwnership,
  listRedemptionOptions,
  listTransactions,
  redeem,
} from "./rewards.service.js";
import { requireAuth } from "../../middleware/auth.js";

const redeemSchema = z.object({ redemptionOptionId: z.string().min(1) });

export async function rewardRoutes(app: FastifyInstance): Promise<void> {
  app.get("/transactions", { preHandler: requireAuth }, async (request, reply) => {
    const transactions = await listTransactions(request.user.sub);
    reply.send({ transactions });
  });

  app.get("/badges", { preHandler: requireAuth }, async (request, reply) => {
    const badges = await listBadgeCatalogWithOwnership(request.user.sub);
    reply.send({ badges });
  });

  app.get("/redemption-options", { preHandler: requireAuth }, async (_request, reply) => {
    const options = await listRedemptionOptions();
    reply.send({ options });
  });

  app.post("/redeem", { preHandler: requireAuth }, async (request, reply) => {
    const input = redeemSchema.parse(request.body);
    const redemption = await redeem(request.user.sub, input.redemptionOptionId);
    reply.status(201).send({ redemption });
  });
}
