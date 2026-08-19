import { buildApp } from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./lib/logger.js";
import { startSimulationLoop } from "./modules/sensors/simulator.js";

async function main() {
  const app = await buildApp();

  await app.listen({ port: env.PORT, host: env.HOST });
  logger.info(`WasteLoop backend listening on http://${env.HOST}:${env.PORT}`);

  if (env.SIMULATION_ENABLED) {
    startSimulationLoop(env.SIMULATION_TICK_INTERVAL_MS);
  }
}

main().catch((err) => {
  logger.error(err, "Failed to start server");
  process.exit(1);
});
