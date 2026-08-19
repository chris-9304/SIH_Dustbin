import type { FastifyInstance } from "fastify";
import { loginSchema, registerSchema } from "./auth.schema.js";
import { registerUser, verifyCredentials } from "./auth.service.js";
import { requireAuth } from "../../middleware/auth.js";
import { prisma } from "../../lib/prisma.js";
import { NotFoundError } from "../../lib/errors.js";

function toPublicUser(user: {
  id: string;
  email: string;
  name: string;
  role: "CITIZEN" | "ADMIN";
  wasteCoinBalance: number;
  currentStreak: number;
  longestStreak: number;
  createdAt: Date;
}) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    wasteCoinBalance: user.wasteCoinBalance,
    currentStreak: user.currentStreak,
    longestStreak: user.longestStreak,
    createdAt: user.createdAt,
  };
}

export async function authRoutes(app: FastifyInstance): Promise<void> {
  app.post("/register", async (request, reply) => {
    const input = registerSchema.parse(request.body);
    const user = await registerUser(input);
    const token = app.jwt.sign({ sub: user.id, role: user.role, email: user.email });
    reply.status(201).send({ token, user: toPublicUser(user) });
  });

  app.post("/login", async (request, reply) => {
    const input = loginSchema.parse(request.body);
    const user = await verifyCredentials(input.email, input.password);
    const token = app.jwt.sign({ sub: user.id, role: user.role, email: user.email });
    reply.send({ token, user: toPublicUser(user) });
  });

  app.get("/me", { preHandler: requireAuth }, async (request, reply) => {
    const user = await prisma.user.findUnique({ where: { id: request.user.sub } });
    if (!user) throw new NotFoundError("User not found");
    reply.send({ user: toPublicUser(user) });
  });
}
