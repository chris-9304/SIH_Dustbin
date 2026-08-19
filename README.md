# Nayi Disha (WasteLoop) — Prototype

AI + IoT municipal waste management platform. See [`dustbin_arch.md`](./dustbin_arch.md) for the
original system architecture and process flow this implements, and
[`docs/technical-report/report.pdf`](./docs/technical-report/report.pdf) for the full technical
report (implementation architecture, ERD, API summary, and a screenshot walkthrough).

The prototype is a complete, runnable system: a TypeScript/Fastify/Postgres backend covering
accounts, the full scan → token → triple-lock → throw → reward chain, OSRM-backed route
optimization for collection vehicles, and admin analytics — plus a full React frontend for both
the citizen app and the municipal command center.

**Sensor/camera telemetry is intentionally left blank in this build.** Every bin exists and is
routable, but no fake fill-level or camera data is seeded. That's on purpose: the next step is
wiring up a real device/test bench to send dummy sensor and camera payloads against the exact
ingestion endpoints below, before moving on to real hardware. Nothing about the frontend, database
schema, or routing needs to change when that happens — see "Connecting real hardware" below.

## Stack

- **Backend**: TypeScript, Fastify, Prisma, PostgreSQL, JWT + bcrypt auth, Zod validation.
- **Routing**: self-hosted [OSRM](http://project-osrm.org/) (falls back to the public OSRM demo
  server if you haven't set up the local one yet) + a nearest-neighbor/2-opt heuristic on top for
  multi-stop visit ordering.
- **Frontend**: React + Vite + Tailwind (custom pastel teal/blue-green design system with a
  saffron/navy accent), React Query, Leaflet (map), Recharts (sensor history, once populated).

## Quickstart

### 1. Install dependencies

```
npm install
```

### 2. Database

Either run Postgres via Docker:

```
docker compose up -d postgres
```

...or point `backend/.env`'s `DATABASE_URL` at any Postgres instance you already have (copy
`.env.example` to `backend/.env` first, and fill in `JWT_SECRET`).

### 3. Migrate + seed

```
npm run db:migrate --workspace backend
npm run db:seed --workspace backend
```

(`npm run db:reset --workspace backend` does a full drop + migrate + seed in one step — useful
when iterating.)

Seeding creates ~17-18 bins across 4 central-New-Delhi wards (snapped to real roads via OSRM), an
admin + 12 citizen demo accounts (password `wasteloop123` for all), a mix of successful and failed
scan→throw chains (so the anti-gaming paths are visible too), and one pre-computed optimized
route. Bins start with **0% fill and no sensor/camera history** — see the note above.

### 4. Run it

```
npm run dev:backend    # http://localhost:4000
npm run dev:frontend   # http://localhost:5173
```

Log in with `admin@wasteloop.demo` / `wasteloop123` (see the Routes/Command center pages) or any
`citizen1..12@wasteloop.demo` / `wasteloop123`.

### 5. Smoke test

With the backend running against a seeded database:

```
npm run smoke --workspace backend
```

## What you can demo right now

- **Citizen flow**: log in → Scan (mock AI classification) → generate a disposal token/QR → Throw
  (simulated GPS + bin QR + token triple-lock, with self-photo / bin-camera / NFC verification
  methods) → WasteCoins land in Rewards, with a full transaction ledger and redemption catalog.
- **Bins**: a live Leaflet map of every seeded bin plus a sortable table; each bin has a detail
  page ready to chart sensor history and camera events once telemetry starts arriving.
- **Routing**: on the Routes page (admin), pick any set of bins and click "Optimize route" — this
  calls real OSRM `/table` + `/route` APIs against actual New Delhi road geometry and runs a
  nearest-neighbor + 2-opt heuristic on top, then draws the resulting polyline and stop order on
  the map. This is fully independent of sensor data, so it works today.
- **Command center**: ward summaries and fleet status populate immediately; the segregation
  quality chart will fill in once bin-camera events start arriving.

## Self-hosting OSRM (optional)

By default `OSRM_BASE_URL` points at the public OSRM demo server, which is fine for development.
To run your own (recommended for anything beyond quick local testing):

```
./infra/osrm/scripts/fetch_and_prepare_osm.sh   # one-time: downloads + preprocesses a small
                                                  # central-Delhi OSM extract (needs Docker)
docker compose up -d osrm
# then set OSRM_BASE_URL=http://localhost:5000 in backend/.env
```

## Connecting real hardware / a test bench

Every bin has a `deviceApiKey` (see the `Bin` table via Prisma Studio: `npm run db:studio
--workspace backend`). A device — or a test bench standing in for one — authenticates with it via
the `x-device-api-key` header and posts to:

- `POST /api/v1/bins/:binId/telemetry`
  `{ fillPercent, weightKg, lidEvent, motionDetected, batteryPercent? }`
- `POST /api/v1/bins/:binId/camera-events`
  `{ imageUrl, segregationQualityScore?, contaminationDetected?, hazardousDetected? }`

These are the same endpoints a real ESP32/Raspberry Pi will call later — nothing else in the
backend needs to change. Once data starts landing, the Bins/BinDetail/Command-center pages pick it
up automatically (no frontend changes needed), and the route optimizer can switch back to
auto-selecting bins above a fill threshold (`ROUTE_FILL_THRESHOLD_PERCENT` in `backend/.env`)
instead of the manual bin picker used today.

A software simulator also exists at `backend/src/modules/sensors/simulator.ts`
(`npm run simulate --workspace backend -- --backfill=14` or `--tick`) if you want to generate
synthetic data for a demo before real hardware/test-bench data is available — it's not run by the
seed script by default, precisely so the system starts blank.

## Project layout

```
backend/    Fastify + Prisma API (see backend/src/modules/*)
frontend/   React + Vite citizen app + municipal command center
infra/osrm/ OSRM setup script + data (gitignored)
docs/       Technical report (architecture, ERD, API summary, screenshots)
```
