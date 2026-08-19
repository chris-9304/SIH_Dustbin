import type { FastifyReply, FastifyRequest } from "fastify";
import type { Role } from "@prisma/client";
import { ForbiddenError, UnauthorizedError } from "../lib/errors.js";

export interface AuthUser {
  sub: string;
  role: Role;
  email: string;
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: AuthUser;
    user: AuthUser;
  }
}

/** Verifies the JWT and attaches the payload to request.user. Register as a preHandler on protected routes. */
export async function requireAuth(request: FastifyRequest, _reply: FastifyReply): Promise<void> {
  try {
    await request.jwtVerify();
  } catch {
    throw new UnauthorizedError("Missing or invalid authentication token");
  }
}

/** Restricts a route to a given role. Must run after requireAuth. */
export function requireRole(role: Role) {
  return async (request: FastifyRequest, _reply: FastifyReply): Promise<void> => {
    if (request.user.role !== role) {
      throw new ForbiddenError(`This action requires the ${role} role`);
    }
  };
}
