/* eslint-disable no-console */
import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma.js";
import { env } from "../src/config/env.js";
import { snapToRoad } from "../src/lib/osrmClient.js";
import { createScan, issueToken } from "../src/modules/scans/scans.service.js";
import { verifyAndThrow } from "../src/modules/throws/throws.service.js";
import { optimizeRoute } from "../src/modules/routes/routeOptimizer.service.js";

// Central New Delhi hub points (Connaught Place, India Gate, Lodhi Road, Khan Market) — bins are
// scattered around these with small jitter, then snapped to the nearest real road via OSRM.
const HUBS = [
  { name: "Connaught Place", code: "CP", lat: 28.6315, lng: 77.2167 },
  { name: "India Gate", code: "IG", lat: 28.6129, lng: 77.2295 },
  { name: "Lodhi Road", code: "LR", lat: 28.5918, lng: 77.2273 },
  { name: "Khan Market", code: "KM", lat: 28.6008, lng: 77.2266 },
] as const;

const DEMO_PASSWORD = "wasteloop123";

function jitter(value: number, magnitude: number): number {
  return value + (Math.random() - 0.5) * 2 * magnitude;
}

async function hash(password: string): Promise<string> {
  return bcrypt.hash(password, env.BCRYPT_SALT_ROUNDS);
}

async function seedWardsAndBins() {
  const wards = [];
  for (const hub of HUBS) {
    wards.push(await prisma.ward.create({ data: { name: hub.name, code: hub.code } }));
  }

  const bins = [];
  let binIndex = 1;
  for (let hubIdx = 0; hubIdx < HUBS.length; hubIdx++) {
    const hub = HUBS[hubIdx]!;
    const ward = wards[hubIdx]!;
    const binsForHub = 4 + Math.floor(Math.random() * 2); // 4-5 bins per hub, ~18 total
    for (let i = 0; i < binsForHub; i++) {
      const rawLat = jitter(hub.lat, 0.006);
      const rawLng = jitter(hub.lng, 0.006);
      const snapped = await snapToRoad({ lat: rawLat, lng: rawLng });
      const code = `BIN-${hub.code}-${String(binIndex).padStart(2, "0")}`;
      binIndex++;
      bins.push(
        await prisma.bin.create({
          data: {
            code,
            label: `${hub.name} Bin ${i + 1}`,
            latitude: snapped.lat,
            longitude: snapped.lng,
            wardId: ward.id,
          },
        }),
      );
    }
  }
  console.log(`Seeded ${wards.length} wards and ${bins.length} bins.`);
  return { wards, bins };
}

async function seedBadges() {
  const badges = await prisma.$transaction([
    prisma.badge.create({
      data: { code: "FIRST_THROW", name: "First Steps", description: "Completed your first verified disposal.", iconEmoji: "🌱" },
    }),
    prisma.badge.create({
      data: { code: "STREAK_7", name: "Week Warrior", description: "7-day disposal streak.", iconEmoji: "🔥" },
    }),
    prisma.badge.create({
      data: { code: "STREAK_30", name: "Consistency Champion", description: "30-day disposal streak.", iconEmoji: "🏆" },
    }),
    prisma.badge.create({
      data: { code: "RECYCLE_ROOKIE", name: "Recycle Rookie", description: "Awarded on account creation.", iconEmoji: "♻️" },
    }),
  ]);
  console.log(`Seeded ${badges.length} badges.`);
}

async function seedRedemptionOptions() {
  const options = await prisma.$transaction([
    prisma.redemptionOption.create({
      data: { code: "BSES_50", title: "BSES Electricity Bill Discount", description: "Rs. 50 off your next BSES electricity bill.", costPoints: 200, provider: "BSES" },
    }),
    prisma.redemptionOption.create({
      data: { code: "DMRC_10", title: "DMRC Metro Credit", description: "10 metro-card credits via DMRC.", costPoints: 120, provider: "DMRC" },
    }),
    prisma.redemptionOption.create({
      data: { code: "BSES_100", title: "BSES Electricity Bill Discount (Large)", description: "Rs. 100 off your next BSES electricity bill.", costPoints: 380, provider: "BSES" },
    }),
  ]);
  console.log(`Seeded ${options.length} redemption options.`);
}

async function seedUsers() {
  const admin = await prisma.user.create({
    data: { email: "admin@wasteloop.demo", passwordHash: await hash(DEMO_PASSWORD), name: "Ward Admin", role: "ADMIN" },
  });

  const citizenNames = [
    "Aarav Sharma", "Priya Verma", "Rohan Gupta", "Ananya Singh", "Vikram Mehta",
    "Ishita Kapoor", "Karan Malhotra", "Sneha Reddy", "Arjun Nair", "Divya Iyer",
    "Rahul Chatterjee", "Meera Joshi",
  ];
  const citizens = [];
  for (let i = 0; i < citizenNames.length; i++) {
    citizens.push(
      await prisma.user.create({
        data: {
          email: `citizen${i + 1}@wasteloop.demo`,
          passwordHash: await hash(DEMO_PASSWORD),
          name: citizenNames[i]!,
          role: "CITIZEN",
        },
      }),
    );
  }
  console.log(`Seeded 1 admin + ${citizens.length} citizens. Demo password for all: "${DEMO_PASSWORD}"`);
  return { admin, citizens };
}

/** Builds a mix of successful and failed scan->token->throw chains so the demo shows every branch. */
async function seedThrowChains(citizens: { id: string }[], bins: { id: string; code: string; latitude: number; longitude: number }[]) {
  let successCount = 0;
  let failCount = 0;

  for (const citizen of citizens) {
    const chainsForUser = 2 + Math.floor(Math.random() * 3); // 2-4 chains per citizen
    for (let i = 0; i < chainsForUser; i++) {
      const bin = bins[Math.floor(Math.random() * bins.length)]!;
      const scan = await createScan(citizen.id, {
        imageUrls: [`https://picsum.photos/seed/scan-${citizen.id}-${i}/400/300`],
      });
      if (scan.aiClassification === "REJECTED") continue; // matches real "re-scan" flow, no token issued

      const token = await issueToken(citizen.id, scan.id);
      const outcome = Math.random();

      if (outcome < 0.75) {
        // Happy path: correct bin, in range, with evidence.
        await verifyAndThrow(citizen.id, {
          tokenCode: token.code,
          binCode: bin.code,
          gpsLat: bin.latitude,
          gpsLng: bin.longitude,
          verificationMethod: "SELF_PHOTO",
          evidenceUrl: `https://picsum.photos/seed/throw-${token.id}/400/300`,
        });
        successCount++;
      } else if (outcome < 0.88) {
        // GPS mismatch: user claims a bin far from their actual location.
        await verifyAndThrow(citizen.id, {
          tokenCode: token.code,
          binCode: bin.code,
          gpsLat: bin.latitude + 0.05,
          gpsLng: bin.longitude + 0.05,
          verificationMethod: "SELF_PHOTO",
          evidenceUrl: `https://picsum.photos/seed/throw-${token.id}/400/300`,
        });
        failCount++;
      } else {
        // Throw not verified: right place, but no evidence captured.
        await verifyAndThrow(citizen.id, {
          tokenCode: token.code,
          binCode: bin.code,
          gpsLat: bin.latitude,
          gpsLng: bin.longitude,
          verificationMethod: "SELF_PHOTO",
        });
        failCount++;
      }
    }
  }

  console.log(`Seeded throw chains: ${successCount} verified, ${failCount} failed (anti-gaming paths).`);
}

async function main() {
  console.log("Seeding WasteLoop demo data (central New Delhi)...");

  await seedBadges();
  await seedRedemptionOptions();
  const { citizens } = await seedUsers();
  const { bins } = await seedWardsAndBins();

  console.log("Skipping simulated sensor telemetry — bins start with no fill/weight history so real");
  console.log("device or test-bench data is the first thing that ever lands in SensorLog/BinCameraEvent.");

  console.log("Seeding scan -> token -> triple-lock -> throw -> reward chains...");
  await seedThrowChains(citizens, bins);

  console.log("Running one route optimization (explicit bin picks) so the Routes page isn't empty on first load...");
  const sampleBins = bins.slice(0, Math.min(6, bins.length));
  try {
    await optimizeRoute(sampleBins.map((b) => b.id));
    console.log("Seeded one optimized collection route.");
  } catch (err) {
    console.warn("Route optimization seed step skipped (OSRM unreachable?):", (err as Error).message);
  }

  console.log("\nDemo login credentials (all users share the same password):");
  console.log(`  Admin:   admin@wasteloop.demo / ${DEMO_PASSWORD}`);
  console.log(`  Citizen: citizen1@wasteloop.demo ... citizen12@wasteloop.demo / ${DEMO_PASSWORD}`);
  console.log("\nSeeding complete.");
}

main()
  .catch((err) => {
    console.error("Seeding failed:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
