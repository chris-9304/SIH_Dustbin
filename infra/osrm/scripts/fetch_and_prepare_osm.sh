#!/usr/bin/env bash
# One-time setup for the self-hosted OSRM service in docker-compose.yml.
#
# Fetches a small OpenStreetMap extract for the central New Delhi demo region (Connaught Place /
# India Gate / Lodhi Road / Khan Market — matching backend/prisma/seed.ts's HUBS) via the Overpass
# API, then runs OSRM's standard extract -> partition -> customize pipeline (Multi-Level Dijkstra,
# matching `osrm-routed --algorithm mld` in docker-compose.yml) using the official osrm-backend
# Docker image, so no local OSRM toolchain install is needed — only Docker.
#
# Usage: ./infra/osrm/scripts/fetch_and_prepare_osm.sh
# After it finishes: docker compose up -d osrm

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DATA_DIR="$(cd "$SCRIPT_DIR/../data" && pwd)"

# Bounding box (min_lon,min_lat,max_lon,max_lat) — a ~9km x 10km box comfortably covering all
# four demo hubs plus surrounding road network so routes have room to route through.
BBOX="77.18,28.56,77.27,28.65"

OSM_FILE="$DATA_DIR/region.osm"
OSRM_IMAGE="osrm/osrm-backend"

echo "==> Fetching OSM extract for bbox $BBOX from Overpass API..."
curl -sS -o "$OSM_FILE" "https://overpass-api.de/api/map?bbox=${BBOX}"

if ! grep -q "<osm" "$OSM_FILE"; then
  echo "ERROR: downloaded file does not look like valid OSM XML. Overpass API may be rate-limiting or unavailable — try again shortly." >&2
  exit 1
fi
echo "==> Downloaded $(du -h "$OSM_FILE" | cut -f1) to $OSM_FILE"

echo "==> Running osrm-extract (car profile)..."
docker run --rm -v "$DATA_DIR:/data" "$OSRM_IMAGE" \
  osrm-extract -p /opt/car.lua /data/region.osm

echo "==> Running osrm-partition..."
docker run --rm -v "$DATA_DIR:/data" "$OSRM_IMAGE" \
  osrm-partition /data/region.osrm

echo "==> Running osrm-customize..."
docker run --rm -v "$DATA_DIR:/data" "$OSRM_IMAGE" \
  osrm-customize /data/region.osrm

echo ""
echo "==> Done. Start the routing engine with:"
echo "      docker compose up -d osrm"
echo "    Then point the backend at it via OSRM_BASE_URL=http://localhost:5000 (or http://osrm:5000 inside docker-compose)."
