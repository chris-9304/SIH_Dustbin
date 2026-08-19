import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import { AppError } from "../lib/errors.js";
import { logger } from "../lib/logger.js";

export function errorHandler(error: FastifyError | Error, request: FastifyRequest, reply: FastifyReply): void {
  if (error instanceof AppError) {
    reply.status(error.statusCode).send({ error: { code: error.code, message: error.message } });
    return;
  }

  if (error instanceof ZodError) {
    reply.status(400).send({
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid request",
        details: error.flatten().fieldErrors,
      },
    });
    return;
  }

  const fastifyError = error as FastifyError;
  if (fastifyError.statusCode && fastifyError.statusCode < 500) {
    reply.status(fastifyError.statusCode).send({
      error: { code: fastifyError.code ?? "BAD_REQUEST", message: fastifyError.message },
    });
    return;
  }

  logger.error({ err: error, url: request.url, method: request.method }, "Unhandled error");
  reply.status(500).send({ error: { code: "INTERNAL_ERROR", message: "Something went wrong" } });
}
