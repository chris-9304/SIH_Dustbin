import { z } from "zod";

try {
  process.loadEnvFile();
} catch {
  // No .env file present (e.g. real env vars injected by Docker/hosting) — fine, continue.
}

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  JWT_EXPIRES_IN: z.string().default("7d"),
  BCRYPT_SALT_ROUNDS: z.coerce.number().int().min(4).max(15).default(12),
  PORT: z.coerce.number().int().default(4000),
  HOST: z.string().default("0.0.0.0"),
  CORS_ORIGIN: z.string().default("http://localhost:5173"),
  OSRM_BASE_URL: z.string().default("https://router.project-osrm.org"),
  ROUTE_FILL_THRESHOLD_PERCENT: z.coerce.number().min(0).max(100).default(70),
  SIMULATION_ENABLED: z
    .string()
    .default("false")
    .transform((v) => v === "true"),
  SIMULATION_TICK_INTERVAL_MS: z.coerce.number().int().default(30000),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment configuration:", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment configuration");
}

export const env = parsed.data;
