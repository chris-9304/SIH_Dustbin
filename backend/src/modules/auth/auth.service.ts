import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma.js";
import { ConflictError, UnauthorizedError } from "../../lib/errors.js";
import { env } from "../../config/env.js";
import type { RegisterInput } from "./auth.schema.js";

export async function registerUser(input: RegisterInput) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) {
    throw new ConflictError("An account with this email already exists");
  }

  const passwordHash = await bcrypt.hash(input.password, env.BCRYPT_SALT_ROUNDS);

  const user = await prisma.user.create({
    data: { email: input.email, passwordHash, name: input.name },
  });

  return user;
}

export async function verifyCredentials(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new UnauthorizedError("Invalid email or password");
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    throw new UnauthorizedError("Invalid email or password");
  }

  return user;
}
