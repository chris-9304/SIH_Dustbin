# WasteLoop — Hardening & Polish Task Spec

**Audience:** implementing agent (Sonnet). **Author:** review pass on the merged `feature/prototype` work.
**Repo:** `nayi-disha-wasteloop` (npm workspaces: `backend`, `frontend`).

This document is the complete work order. Every task below is derived from a line-by-line
review of the current code. Line numbers refer to the state of the repo at commit `5e6232f`
and will drift as you edit — always re-grep for the quoted snippet rather than trusting the
line number.

---

## Ground rules

1. **Work in order.** Part 1 (correctness) before Part 2 (polish) before Part 3 (readiness).
   Part 3 tasks assume the Part 1 fixes are already in place.
2. **One commit per numbered task**, message format `fix(scope): summary` or
   `chore(scope): summary`. Do not squash unrelated tasks together.
3. **Do not reformat untouched code.** No mass import reordering, no style-only churn.
   The diff for each task should be readable in isolation.
4. **Do not change the public API shape** (route paths, response envelopes like
   `{ scan }` / `{ bins }` / `{ error: { code, message } }`) unless a task explicitly says to.
   The frontend and `backend/scripts/smoke-test.ts` both depend on these.
5. **Match the surrounding idiom.** This codebase uses: Zod schemas in `*.schema.ts` parsed at
   the route layer, thin route handlers delegating to `*.service.ts`, typed errors from
   `backend/src/lib/errors.ts`, `logger` from `backend/src/lib/logger.ts`, and `.js` extensions
   on relative imports (ESM + `"type": "module"`). Keep all of that.
6. **Verify before you claim done.** Each task has an acceptance check. Run it. If a check
   cannot be run (e.g. no database available), say so explicitly rather than asserting success.
7. **Zod is v3** (`^3.23.8`) and **Prisma is v5** (`^5.20.0`). Use v3/v5 APIs. Do not upgrade
   major versions as part of this work.

---

# Part 1 — Correctness bugs

These are real defects with concrete failure scenarios. Fix all eight.

---

## 1.1 — Throw verification is trivially forgeable (highest severity)

**Files:** `backend/src/modules/throws/throws.service.ts`, `backend/src/modules/throws/throws.schema.ts`

**Problem.** The final lock of the "triple-lock" chain is:

```ts
const throwVerified = input.verificationMethod === "NFC_TAG" ? true : Boolean(input.evidenceUrl);
```

and the schema declares `evidenceUrl: z.string().optional()` with no `.url()` and no `.min(1)`.

Any authenticated user holding a valid token and standing within 100 m of any bin can POST
`{ verificationMethod: "SELF_PHOTO", evidenceUrl: "x" }` and collect full `pendingPoints` plus
the 20 % `FULL_CHAIN_BONUS_PERCENT` without disposing of anything. `{ verificationMethod: "NFC_TAG" }`
with no evidence field at all is even easier — it returns `true` unconditionally. Nothing
downstream re-checks the evidence. The anti-fraud property this module exists to enforce
never holds.

**Required fix — three layers.**

**(a) Tighten the schema.** In `throws.schema.ts`:

```ts
evidenceUrl: z.string().url().max(2048).optional(),
```

**(b) Require a server-side corroborating signal per method.** Replace the single boolean
expression with an explicit, auditable resolver. Extract it into a named function in
`throws.service.ts` (do not inline it):

- `SELF_PHOTO` — a well-formed `evidenceUrl` is necessary but **not sufficient on its own**.
  Keep accepting it, but record it as the weakest tier (see (c)).
- `BIN_CAMERA` — must be corroborated by an actual `BinCameraEvent` row for **this bin**
  created within a short window (add `THROW_CAMERA_CORROBORATION_WINDOW_MINUTES = 5` to
  `backend/src/config/constants.ts`). Query `prisma.binCameraEvent.findFirst` filtered by
  `binId` and `createdAt: { gte: new Date(now.getTime() - windowMs) }`. If none exists, the
  throw is **not** verified and the reason is `THROW_NOT_VERIFIED`.
- `NFC_TAG` — must **not** be trusted from the client. There is currently no device-attested
  NFC tap record in the schema. Until one exists, treat `NFC_TAG` exactly like `BIN_CAMERA`:
  require corroboration from a device-authenticated signal on that bin. Do not leave the
  unconditional `true`.

**(c) Record the trust tier.** Add a `trustTier` field so downstream analytics can tell a
corroborated throw from an uncorroborated one. Add to `ThrowEvent` in `schema.prisma`:

```prisma
enum ThrowTrustTier {
  UNCORROBORATED
  DEVICE_CORROBORATED
}
```

with `trustTier ThrowTrustTier @default(UNCORROBORATED)` on the model, plus a migration.
Set it to `DEVICE_CORROBORATED` when a `BinCameraEvent` (or future NFC record) backed the
verification.

**(d) Document the residual gap.** Add a short comment block above the resolver naming what
is still spoofable (a self-supplied photo URL is not proof of disposal) and pointing at the
real fix (server-side image verification against the bin camera frame). Do not overstate the
guarantee in comments or in `README.md`.

**Acceptance.**
- `POST /api/v1/throws` with `evidenceUrl: "x"` returns a 400 validation error.
- `POST /api/v1/throws` with `verificationMethod: "NFC_TAG"` and no corroborating device
  record returns `{ success: false, reason: "THROW_NOT_VERIFIED" }`, not a points award.
- `POST /api/v1/throws` with `verificationMethod: "BIN_CAMERA"` succeeds only when a
  `BinCameraEvent` for that bin exists inside the window.
- Existing happy-path `SELF_PHOTO` flow in the frontend `Throw.tsx` demo still succeeds
  (it sends a real `https://picsum.photos/...` URL, which passes `.url()`).

---

## 1.2 — Redemption double-spend race

**File:** `backend/src/modules/rewards/rewards.service.ts` (function `redeem`)

**Problem.** The balance read, the sufficiency check, and the arithmetic all happen **outside**
the transaction:

```ts
const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
if (user.wasteCoinBalance < option.costPoints) { throw new ValidationError(...); }
const newBalance = user.wasteCoinBalance - option.costPoints;
return prisma.$transaction(async (tx) => { ... });
```

A user with exactly 100 WasteCoins who double-clicks redeem on a 100-point option gets **two**
`Redemption` rows with `status: FULFILLED` and a final balance of 0 — two rewards for one
payment. There is no unique constraint on `Redemption` to catch it. Both `RewardTransaction`
rows record `balanceAfter: 0`, so the ledger no longer reconciles.

**Required fix.** Move the read, the check, and the write **inside** the transaction, and make
the debit atomic and conditional. Use a guarded `updateMany` so the database enforces the
invariant rather than application code:

```ts
return prisma.$transaction(async (tx) => {
  const debited = await tx.user.updateMany({
    where: { id: userId, wasteCoinBalance: { gte: option.costPoints } },
    data: { wasteCoinBalance: { decrement: option.costPoints } },
  });
  if (debited.count === 0) {
    throw new ValidationError("Insufficient WasteCoin balance for this redemption");
  }
  const updated = await tx.user.findUniqueOrThrow({
    where: { id: userId },
    select: { wasteCoinBalance: true },
  });
  // ...create Redemption + RewardTransaction using updated.wasteCoinBalance as balanceAfter
});
```

`balanceAfter` must be read from the post-decrement row, never computed from a pre-transaction
snapshot.

**Acceptance.** Two concurrent `POST /api/v1/rewards/redeem` calls for a user whose balance
covers exactly one redemption result in exactly one `Redemption` row and one `REDEEM`
`RewardTransaction`; the second returns a 400. Balance never goes negative. Add a test
(see Part 3) that fires both calls with `Promise.allSettled`.

---

## 1.3 — Points award loses updates under concurrency

**File:** `backend/src/modules/throws/throws.service.ts` (function `verifyAndThrow`, success path)

**Problem.** `prisma.user.findUniqueOrThrow` runs **before** the `$transaction`, and the balance
is then written **absolutely**:

```ts
const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });   // outside tx
...
const afterEarn = user.wasteCoinBalance + pointsAwarded;                        // stale snapshot
const afterBonus = afterEarn + bonusAmount;
await tx.user.update({ where: { id: userId }, data: { wasteCoinBalance: afterBonus, ... } });
```

A user holding two valid tokens who submits both throws concurrently: both read balance 50,
one commits 62, the other commits 60 — final balance 60 instead of the correct 72. The
`ThrowEvent.tokenId @unique` constraint does **not** help, because the two tokens differ.
Both `RewardTransaction.balanceAfter` values are wrong.

**Required fix.**
- Move the `user` read inside the transaction.
- Write the balance with `{ increment: pointsAwarded + bonusAmount }`, not an absolute value.
- Derive `balanceAfter` for **both** ledger rows from the actual post-update balance. Since
  two `RewardTransaction` rows are written (`EARN_RELEASED` then `BONUS`), do the increment in
  two steps — increment by `pointsAwarded`, read the balance, write the `EARN_RELEASED` row;
  then increment by `bonusAmount`, read, write the `BONUS` row — so each row's `balanceAfter`
  is truthful.
- Streak fields (`currentStreak`, `longestStreak`, `lastThrowDate`) must also be computed from
  the row read **inside** the transaction, since `nextStreak` depends on `user.lastThrowDate`.

**Acceptance.** Two concurrent verified throws for the same user produce a final balance equal
to the sum of both awards plus both bonuses, and the `RewardTransaction` rows for that user,
ordered by `createdAt`, form a consistent running balance. Add a test (Part 3).

---

## 1.4 — Telemetry clobbers MAINTENANCE / OFFLINE bin status

**File:** `backend/src/modules/sensors/sensors.service.ts` (function `ingestTelemetry`)

**Problem.**

```ts
const nextStatus = input.fillPercent >= 95 ? "FULL" : bin.status === "FULL" ? "ACTIVE" : bin.status;
```

The `>= 95` branch ignores the current status. An admin marks a damaged bin `MAINTENANCE` via
`PATCH /api/v1/bins/:id`; its ESP32 keeps posting, and the next reading at 96 % flips it to
`FULL`. `routeOptimizer.service.ts` selects `status: { in: ["ACTIVE", "FULL"] }`, so the
out-of-service bin gets routed to collection crews anyway.

Note this bug is **invisible in the demo**: `simulator.ts` returns early for `MAINTENANCE` and
`OFFLINE` bins, so only real devices hit it — exactly the path this module claims to serve.

**Required fix.** Treat `MAINTENANCE` and `OFFLINE` as terminal-until-an-admin-clears-them.
Extract the transition into a small named pure function (easier to unit-test in Part 3):

```ts
function nextBinStatus(current: BinStatus, fillPercent: number): BinStatus {
  if (current === "MAINTENANCE" || current === "OFFLINE") return current;
  if (fillPercent >= BIN_FULL_THRESHOLD_PERCENT) return "FULL";
  return current === "FULL" ? "ACTIVE" : current;
}
```

Also hoist the bare `95` into `backend/src/config/constants.ts` as
`BIN_FULL_THRESHOLD_PERCENT = 95` alongside the existing threshold constants — it is currently
the only magic number in that file's neighbourhood that is not centralized.

**Acceptance.** A bin set to `MAINTENANCE` that receives telemetry at 99 % fill is still
`MAINTENANCE` afterwards, its `currentFillPercent` and `lastTelemetryAt` are still updated,
and it does not appear in `POST /api/v1/routes/optimize` candidate selection.

---

## 1.5 — Unvalidated `limit` query param returns a 500

**File:** `backend/src/modules/sensors/sensors.routes.ts` (`GET /:binId/logs`)

**Problem.**

```ts
const { limit } = request.query as { limit?: string };
const logs = await getRecentSensorLogs(binId, limit ? Number(limit) : undefined);
```

Three defects in one line:
- `?limit=abc` → `Number("abc")` is `NaN` → Prisma rejects `take: NaN` → falls through to the
  generic `INTERNAL_ERROR` 500 branch of `errorHandler` instead of a 400.
- `?limit=0` is falsy, so it silently becomes the default 100 rather than an empty result.
- `?limit=99999999` is accepted unbounded — any authenticated user can pull the entire
  `SensorLog` table for a bin in one request.

Every other input in this codebase goes through a Zod schema; this one does not.

**Required fix.** Add a query schema to `backend/src/modules/sensors/sensors.schema.ts` and
parse it in the handler like every other route:

```ts
export const sensorLogQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(500).default(100),
});
```

Then `const { limit } = sensorLogQuerySchema.parse(request.query);` and pass it through.
`z.coerce.number()` on `"abc"` produces a `ZodError`, which `errorHandler` already maps to a
proper 400 with `VALIDATION_ERROR`.

**Sweep for the same pattern.** Grep for `request.query as` and `Number(` across
`backend/src/` and give every query parameter the same treatment. Also check
`GET /:binId/camera-events`, which currently accepts no limit at all but calls a service with
a hardcoded default — give it the same schema for consistency.

**Acceptance.** `?limit=abc` → 400 `VALIDATION_ERROR`. `?limit=0` → 400. `?limit=1000` → 400.
`?limit=50` → 50 rows. No `limit` → 100 rows.

---

## 1.6 — Streaks use UTC day boundaries

**File:** `backend/src/modules/throws/throws.service.ts` (`dateOnlyUtc`, `daysBetween`, `nextStreak`)

**Problem.** `dateOnlyUtc` slices `toISOString()`, so the "day" bucket is UTC. This project
targets Indian municipal users (IST, UTC+05:30), which puts the streak boundary at 05:30 local
time instead of midnight:

- A throw at 04:00 IST Aug 20 (22:30 UTC Aug 19) followed by one at 09:00 IST Aug 21
  (03:30 UTC Aug 21) gives `daysBetween === 2` → an honest two-day streak resets to 1.
- Two throws on the same IST calendar day, one before 05:30 and one after, land in different
  UTC days and **inflate** the streak by one.

This propagates into the `STREAK_7` and `STREAK_30` badge awards.

**Required fix.** Introduce an explicit app timezone rather than relying on either UTC or the
server's local time (which is non-deterministic across deploy environments).

- Add `APP_TIMEZONE` to the Zod env schema in `backend/src/config/env.ts` with
  `.default("Asia/Kolkata")`, and to `.env.example` with a comment explaining it governs
  streak day boundaries.
- Replace `dateOnlyUtc` with a `localDateKey(d: Date, timeZone: string): string` helper that
  uses `Intl.DateTimeFormat` with `{ timeZone, year: "numeric", month: "2-digit", day: "2-digit" }`
  and returns a `YYYY-MM-DD` key. Do not hand-roll a fixed `+5:30` offset — an IANA zone is
  correct and costs nothing.
- `daysBetween` should then diff the two local date keys.

Put the helper in `backend/src/lib/` (e.g. `datetime.ts`), not inside `throws.service.ts` —
Part 3 adds unit tests against it directly, and other modules (`admin.service.ts` day bucketing,
see 2.3) will reuse it.

**Acceptance.** Unit tests (Part 3) covering: same IST day across the UTC boundary → `diff 0`,
streak unchanged; consecutive IST days across the UTC boundary → `diff 1`, streak increments;
a two-day gap → streak resets to 1.

---

## 1.7 — Collection threshold hardcoded instead of read from config

**File:** `backend/src/modules/admin/admin.service.ts` (function `wardSummary`)

**Problem.**

```ts
binsNeedingCollection: ward.bins.filter((b) => b.currentFillPercent >= 70).length,
```

This duplicates the value that `routeOptimizer.service.ts` reads as
`env.ROUTE_FILL_THRESHOLD_PERCENT` (default 70, documented as configurable in `.env.example`).
Set `ROUTE_FILL_THRESHOLD_PERCENT=60` and the admin ward dashboard still reports the 70 % count
while `POST /routes/optimize` builds routes over the 60 % set — the dashboard and the actual
route disagree with no indication why.

**Required fix.** Import `env` and use `env.ROUTE_FILL_THRESHOLD_PERCENT`. Then grep the whole
`backend/src/` tree for other bare numeric thresholds (`>= 70`, `>= 80`, `>= 95`, `100`,
`0.2`, `45`) and confirm each is either already a named constant or genuinely local. Anything
that represents a tunable domain rule belongs in `backend/src/config/constants.ts` (fixed
domain rules) or `backend/src/config/env.ts` (deployment-tunable), matching the existing split.

**Acceptance.** Setting `ROUTE_FILL_THRESHOLD_PERCENT=60` changes both the
`binsNeedingCollection` count on `GET /admin/analytics/ward-summary` and the candidate set for
`POST /routes/optimize` consistently.

---

## 1.8 — Global JSON parser override compensates for a client bug

**Files:** `frontend/src/api/client.ts`, `backend/src/app.ts`

**Problem.** `backend/src/app.ts` installs an app-wide `addContentTypeParser` that rewrites an
empty body to `{}` for **every** route. The comment explains why, but the root cause is in the
client: `frontend/src/api/client.ts` sets

```ts
const headers: Record<string, string> = { "Content-Type": "application/json" };
```

unconditionally — on GETs and on bodyless POSTs alike.

The cost is paid globally, not just by the bodyless routes: a genuinely empty
`POST /api/v1/auth/login` now reaches `loginSchema.parse({})` and returns a field-level Zod
error instead of Fastify's clearer "body cannot be empty", and any route added later silently
loses the empty-body guard with no local sign that it was disabled. This is a bandaid applied
one layer too deep.

**Required fix.**
- In `frontend/src/api/client.ts`, only set `Content-Type` when `options.body` is present.
- Remove the `addContentTypeParser` block from `backend/src/app.ts`.
- Check the routes that genuinely accept an optional body — `POST /api/v1/routes/optimize`
  (already does `optimizeRouteSchema.parse(request.body ?? {})`) and
  `POST /api/v1/admin/simulate/tick` — still work when called with no body and no
  `Content-Type` header at all.
- Re-run `npm run smoke` and check `backend/scripts/smoke-test.ts` for any request that sends
  `Content-Type: application/json` with an empty body; fix those the same way.

**Acceptance.** `curl -X POST http://localhost:4000/api/v1/admin/simulate/tick -H "Authorization: Bearer $TOKEN"`
(no `Content-Type`, no body) returns 200. `curl -X POST .../auth/login -H "Content-Type: application/json" -d ''`
returns a clear 400. Frontend demo flows all still work.

---

# Part 2 — Polish

Lower severity, but these are what separate a prototype from something reviewable.

## 2.1 — Consistent input validation at every boundary

Audit every route handler in `backend/src/modules/**/*.routes.ts` for:
- `request.params as { ... }` — path params are currently type-asserted, never validated.
  Add param schemas (`z.object({ id: z.string().cuid() })`) and parse them. Prisma IDs are
  `cuid()`, so `z.string().cuid()` is the right check and turns a malformed id into a 400
  instead of a Prisma error.
- `request.query as { ... }` — covered in 1.5, apply everywhere.
- `request.body` — already good, keep it.

## 2.2 — Error handling consistency

- `backend/src/middleware/errorHandler.ts` handles `AppError`, `ZodError`, and Fastify errors.
  Add a branch for Prisma's `PrismaClientKnownRequestError`: map `P2002` (unique violation) to
  a 409 `CONFLICT` and `P2025` (record not found) to a 404 `NOT_FOUND`. Right now a unique
  violation surfaces as a 500. This matters directly for `ThrowEvent.tokenId @unique` under
  concurrent replay of the same token.
- `backend/src/modules/throws/throws.service.ts` swallows badge-award failures with a
  `logger.warn`. That is deliberate and correct — leave it, but make sure the log line carries
  `userId` so it is actionable.
- Never log secrets. Confirm `deviceApiKey` and `passwordHash` never reach a log line or an
  API response. `deviceAuth.ts` currently selects `deviceApiKey` — that is necessary for the
  comparison, just verify it is not echoed anywhere.

## 2.3 — Timezone consistency in analytics

`backend/src/modules/admin/admin.service.ts` buckets `segregationTrends` by
`event.createdAt.toISOString().slice(0, 10)` — the same UTC-day bug as 1.6, in a different
place. Once 1.6 lands, reuse the shared `localDateKey` helper here so the admin "per day"
chart and the user-facing streak agree on what a day is.

## 2.4 — Device auth hardening

`backend/src/middleware/deviceAuth.ts` compares API keys with `!==`, which is a timing
side-channel. Use `crypto.timingSafeEqual` on equal-length buffers (guard the length check
first, since `timingSafeEqual` throws on length mismatch). Low practical risk over a network,
but it is a two-line fix in security-relevant code and reviewers will look for it.

## 2.5 — Route optimizer robustness

- `backend/src/lib/osrmClient.ts` maps unroutable pairs to `Number.POSITIVE_INFINITY`. If the
  matrix contains `Infinity`, `tourCost` returns `Infinity` and the persisted
  `Route.totalDistanceMeters` is meaningless. Detect an unroutable candidate set and fail with
  a clear `ValidationError` naming the offending bin, rather than persisting a garbage route.
- `osrmFetch` has no timeout. A hung public OSRM instance hangs the request indefinitely. Add
  an `AbortSignal.timeout(...)` with a configurable `OSRM_TIMEOUT_MS` env var (default 10000).
- `selectCandidateBins` with an explicit `binIds` list silently proceeds when only some ids
  resolve (it only checks `bins.length < 2`). If any requested id does not exist, that is a
  client error — return a 400 naming the missing ids.
- `twoOptImprove` caps `k` at `order.length - 2`, so the final stop is never repositioned.
  That is a real (if minor) quality limit on the tour. Either extend the loop to handle the
  open-path endpoint correctly or add a comment stating the limitation deliberately. Do not
  leave it undocumented.

## 2.6 — Frontend polish

- `frontend/src/api/client.ts` has no timeout and no retry policy; `@tanstack/react-query` is
  already a dependency, so configure sensible `staleTime` / `retry` defaults in one place
  rather than per-call.
- On a 401 from any endpoint, the client should clear the stored token and redirect to
  `/login`. Currently only `refreshUser` handles that, so a token expiring mid-session leaves
  the user staring at an error toast on every other page.
- `frontend/src/pages/Throw.tsx` disables the submit button on `busy`, which is good — verify
  the same double-submit guard exists on `Rewards.tsx` redeem and `Scan.tsx` token issuance.
  This is the client-side half of 1.2 and 1.3.
- Token is stored in `localStorage`, which is XSS-readable. For a prototype that is an
  acceptable, common tradeoff — but add a one-line comment in `client.ts` acknowledging it and
  naming httpOnly cookies as the production path, so it reads as a decision rather than an
  oversight.

---

# Part 3 — Readiness for next advancements

The repo currently has **zero tests and no linter**. That is the single biggest blocker to
building on this safely.

## 3.1 — Test infrastructure

Add Vitest to the backend workspace (`vitest`, `@vitest/coverage-v8` as devDependencies) with
a `test` script in `backend/package.json` and a root `npm test` that runs the workspace.

**Start with pure-function unit tests — no database needed.** These cover the highest-value
logic and run in milliseconds:

- `backend/src/lib/geo.ts` — `haversineDistanceMeters`: known city-pair distances, zero
  distance for identical points, antimeridian crossing.
- `backend/src/modules/routes/tsp.ts` — `nearestNeighborOrder` and `twoOptImprove`: a matrix
  with a known optimum, a matrix containing `Infinity`, `n = 2` and `n = 3` edge cases (note
  `optimizeVisitOrder` skips 2-opt when `matrix.length <= 3`).
- `backend/src/lib/datetime.ts` — the new `localDateKey` / `daysBetween` from 1.6, with the
  IST boundary cases spelled out in that task.
- The extracted `nextBinStatus` from 1.4.
- `backend/src/modules/scans/classifier.ts` — determinism (same input → same output) and
  distribution sanity across many seeds.

**Then integration tests** against a real Postgres (use the existing `docker-compose.yml`
service, or Testcontainers). Priority order:
1. The two concurrency tests from 1.2 and 1.3 — these are the regression guards for the most
   dangerous bugs in this repo, and they must fail against the pre-fix code.
2. The full happy-path chain: register → scan → issue token → throw → points released →
   balance and ledger consistent.
3. The failure paths: expired token, GPS out of range, replayed token, rejected classification.
4. Authorization: a `CITIZEN` token must be rejected on every `requireRole("ADMIN")` route.
   Currently nothing tests this at all.

## 3.2 — Linting and type strictness

- Add ESLint with `@typescript-eslint` to both workspaces, plus a root `npm run lint`.
- Confirm `strict: true` in both `tsconfig.json` files. Then hunt the non-null assertions:
  `backend/src/modules/routes/` is dense with `!` (`matrix[order[i]!]!`, `bins[binIndex]!`,
  `distances[prevIndex]![binIndex]!`). Each one is a silent runtime crash if the invariant
  ever breaks. Replace them with checked access or a narrow helper that throws a typed error.
- Add `noUncheckedIndexedAccess` if the codebase can absorb it — it is what would have caught
  those assertions in the first place.

## 3.3 — CI

Add `.github/workflows/ci.yml` running on push and PR: install, `prisma generate`, lint,
typecheck (`tsc --noEmit` both workspaces), test, build. Use a Postgres service container for
the integration tests. Keep it under five minutes.

## 3.4 — Seams for the advancements this project is heading toward

The code already has good seams. Protect and document them:

- **Real AI classification.** `backend/src/modules/scans/classifier.ts` is a deterministic mock
  behind a clean signature. Keep that signature (`(imageUrls: string[]) => { classification, confidence }`)
  and make the implementation swappable via an env flag (`CLASSIFIER_MODE=mock|vision`), so a
  real vision model drops in without touching `scans.service.ts`. If you wire a real model,
  use a current Claude model id — do not hardcode a legacy one.
- **Real hardware.** `sensors.service.ts` `ingestTelemetry` is genuinely shared between the
  simulator and the HTTP device path — that is the right design. Task 1.4 exposed that the
  simulator masks bugs on the device path; add integration tests that exercise the **HTTP**
  path with `x-device-api-key`, not just the in-process simulator call.
- **Rate limiting.** There is none. Device telemetry endpoints and `/auth/login` are both
  unprotected against flooding. Add `@fastify/rate-limit` with a stricter bucket on auth
  routes before this is exposed anywhere real.
- **Idempotency.** `POST /api/v1/throws` is not idempotent from the client's perspective — a
  network retry after a successful call hits the `ThrowEvent.tokenId` unique constraint and
  (after 2.2) returns a 409. That is safe but unfriendly. Consider an `Idempotency-Key` header
  on the mutating routes as a follow-up; note it in the README rather than building it now.

## 3.5 — Documentation truthfulness

Re-read `README.md`, `dustbin_arch.md`, and `docs/technical-report/report.html` after Part 1
lands. Task 1.1 materially changes what the "triple-lock" actually guarantees. **Any claim in
those documents about fraud prevention must match what the code now does.** If a document
claims a verification property the code does not enforce, either fix the code or fix the
document — do not leave the overclaim standing. This is the item most likely to be checked by
an evaluator and least likely to be caught by tests.

---

# Final verification checklist

Run all of these and report actual output. Do not report success for a step you skipped.

```bash
npm run lint
```

```bash
npm test
```

```bash
npm run build:backend && npm run build:frontend
```

```bash
npm run db:reset && npm run db:seed && npm run smoke
```

Then, manually through the running app: register a new user, run a scan, issue a token, perform
a successful throw, confirm the balance and streak update, redeem a reward, and log in as the
seeded admin to confirm the ward summary, segregation trends, and route optimization all render.

**Report honestly.** For each task: done / partially done / skipped, with the reason. If a fix
turned out to be wrong or unnecessary on closer reading, say so and explain why rather than
silently dropping it. If an acceptance check could not be run in your environment, name the
check and the reason.
