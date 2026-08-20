/* eslint-disable no-console */
/**
 * End-to-end smoke test against a *running* backend + seeded database. Exercises the full chain:
 * register -> login -> scan -> token -> triple-lock+throw -> reward ledger -> admin route
 * optimization -> admin analytics. Exits non-zero on any failure.
 *
 * Usage: npm run smoke   (backend must already be running on BASE_URL, DB already seeded)
 */

const BASE_URL = process.env.SMOKE_BASE_URL ?? "http://localhost:4000";

let passed = 0;
let failed = 0;

function assert(condition: unknown, message: string): asserts condition {
  if (condition) {
    passed++;
    console.log(`  ✓ ${message}`);
  } else {
    failed++;
    console.error(`  ✗ ${message}`);
  }
}

async function api(path: string, options: RequestInit & { token?: string } = {}) {
  const headers: Record<string, string> = {};
  if (options.body !== undefined) headers["Content-Type"] = "application/json";
  if (options.token) headers.Authorization = `Bearer ${options.token}`;
  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  const body: any = await res.json().catch(() => ({}));
  return { status: res.status, body };
}

async function main() {
  console.log(`Running smoke test against ${BASE_URL}\n`);

  console.log("Health check");
  const health = await api("/health");
  assert(health.status === 200 && health.body.status === "ok", "GET /health returns ok");

  console.log("\nCitizen registration + auth");
  const email = `smoke-${Date.now()}@wasteloop.demo`;
  const register = await api("/api/v1/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password: "smoketest123", name: "Smoke Test User" }),
  });
  assert(register.status === 201 && register.body.token, "POST /auth/register returns a token");
  const citizenToken = register.body.token as string;

  const me = await api("/api/v1/auth/me", { token: citizenToken });
  assert(me.status === 200 && me.body.user.email === email, "GET /auth/me returns the registered user");

  console.log("\nScan -> token -> triple-lock -> throw -> reward chain");
  let scan;
  for (let attempt = 0; attempt < 8; attempt++) {
    const res = await api("/api/v1/scans", {
      method: "POST",
      token: citizenToken,
      body: JSON.stringify({ imageUrls: [`https://picsum.photos/seed/smoke-${Date.now()}-${attempt}/400/300`] }),
    });
    if (res.body.scan?.aiClassification !== "REJECTED") {
      scan = res.body.scan;
      break;
    }
  }
  assert(scan && scan.status === "PENDING_TOKEN", "POST /scans creates a non-rejected scan");

  const tokenRes = await api(`/api/v1/scans/${scan.id}/token`, { method: "POST", token: citizenToken });
  assert(tokenRes.status === 201 && tokenRes.body.token?.code, "POST /scans/:id/token issues a disposal token");
  const disposalToken = tokenRes.body.token;

  const bins = await api("/api/v1/bins", { token: citizenToken });
  assert(bins.status === 200 && bins.body.bins.length > 0, "GET /bins returns seeded bins");
  const targetBin = bins.body.bins[0];

  const throwRes = await api("/api/v1/throws", {
    method: "POST",
    token: citizenToken,
    body: JSON.stringify({
      tokenCode: disposalToken.code,
      binCode: targetBin.code,
      gpsLat: targetBin.latitude,
      gpsLng: targetBin.longitude,
      verificationMethod: "SELF_PHOTO",
      evidenceUrl: "https://picsum.photos/seed/smoke-throw/400/300",
    }),
  });
  assert(throwRes.status === 201 && throwRes.body.success === true, "POST /throws verifies the full chain and releases points");

  const balanceAfter = await api("/api/v1/auth/me", { token: citizenToken });
  assert(balanceAfter.body.user.wasteCoinBalance > 0, "User balance increased after verified throw");

  const transactions = await api("/api/v1/rewards/transactions", { token: citizenToken });
  assert(transactions.status === 200 && transactions.body.transactions.length >= 2, "GET /rewards/transactions shows EARN_RELEASED + BONUS entries");

  console.log("\nAnti-gaming path: expired/invalid token is rejected");
  const badThrow = await api("/api/v1/throws", {
    method: "POST",
    token: citizenToken,
    body: JSON.stringify({
      tokenCode: "not-a-real-token",
      binCode: targetBin.code,
      gpsLat: targetBin.latitude,
      gpsLng: targetBin.longitude,
      verificationMethod: "NFC_TAG",
    }),
  });
  assert(badThrow.status === 404, "POST /throws with an unknown token is rejected");

  console.log("\nAdmin: route optimization + analytics (requires seeded admin account)");
  const adminLogin = await api("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify({ email: "admin@wasteloop.demo", password: "wasteloop123" }),
  });
  assert(adminLogin.status === 200 && adminLogin.body.token, "Seeded admin account logs in");
  const adminToken = adminLogin.body.token as string;

  const binIds = bins.body.bins.slice(0, 4).map((b: { id: string }) => b.id);
  const optimize = await api("/api/v1/routes/optimize", {
    method: "POST",
    token: adminToken,
    body: JSON.stringify({ binIds }),
  });
  assert(
    optimize.status === 201 && optimize.body.route?.stops?.length === binIds.length,
    "POST /routes/optimize (admin) returns an ordered route using real OSRM distances",
  );

  const wardSummary = await api("/api/v1/admin/analytics/ward-summary", { token: adminToken });
  assert(wardSummary.status === 200 && Array.isArray(wardSummary.body.wards), "GET /admin/analytics/ward-summary works for admin");

  const citizenForbidden = await api("/api/v1/admin/analytics/ward-summary", { token: citizenToken });
  assert(citizenForbidden.status === 403, "Citizen is forbidden from admin analytics");

  console.log(`\n${passed} passed, ${failed} failed`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error("Smoke test crashed:", err);
  process.exit(1);
});
