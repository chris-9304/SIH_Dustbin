# Nayi Disha — Project Documentation & Status

> **Assessment date:** 17 August 2026  
> **Current status:** polished hackathon/demo prototype; **not production-ready**.

## Frontend location

The website source is in [`frontend/`](frontend/README.md): its HTML shell, CSS, and JavaScript are separated into their respective folders. Run `npm install` and `npm run dev` from the repository root to launch it.

## What this project is

Nayi Disha is a Delhi-focused waste-management concept application. It presents four experiences in a browser:

- **Citizen:** image-based waste classification, nearby-bin lookup, QR-based bin verification, and WasteCoins rewards.
- **Garbage picker / collector:** critical-bin views and simple route optimisation.
- **Municipality:** map, ward, fill-level, and hotspot views.
- **Admin:** local user, presence-log, bin, hotspot, and cloud-sync panels.

The implementation is a static single-page application (SPA): there is no backend service, build tool, package manifest, database schema, or automated test suite in this repository.

## Repository snapshot

| Item | State |
| --- | --- |
| Git remote | `DivuLearnsToCode/NayiDisha-India-Innovates-2026Project-` |
| Checked-out branch | `adhitya.dev` |
| Latest commit | `28cee2c` — 24 May 2026, “Initial commit” |
| Frontend source files | `frontend/index.html`, `frontend/css/styles.css`, `frontend/js/app.js` |
| Working tree at assessment | clean before this documentation was added |
| Code organisation | The page is now a small HTML shell linked to external CSS and JavaScript under `frontend/`; JavaScript is the next feature-by-feature split. |

## Architecture

```text
Browser
  └─ index.html (UI, styling, data, state, all app logic)
       ├─ browser localStorage (accounts and local state)
       ├─ JSONBin (cloud synchronisation/prototype data)
       ├─ Groq API (user-supplied image-classification key)
       ├─ Leaflet + Leaflet Routing Machine (maps/routes)
       ├─ OpenStreetMap/CARTO tiles (map display)
       └─ QRCode.js (bin QR codes)
```

The app ships with 20 Delhi-area records and 60 hard-coded bin records. IoT values displayed in the app are fixture data; on the IoT screen their levels are periodically changed in the browser to simulate live telemetry.

## How to run locally

No install is required. Serve the directory through any static HTTP server (rather than opening the file directly) so browser APIs and external resources behave consistently:

```bash
cd "/home/adhitya/Documents/A&W/Personal Portfolio/NayiDisha-India-Innovates-2026Project-"
python3 -m http.server 8080
```

Open `http://localhost:8080`.

Internet access is needed for Google Fonts, maps, QR generation, JSONBin, and the waste-classification service. A user needs to provide their own Groq API key for image classification.

## Implemented capabilities

- Animated landing/splash and role-based entry flows.
- Map markers, fill-level status, filtering, and route visualisation.
- Nearest-neighbour route ordering (a heuristic, not an optimal TSP solver).
- Browser camera/upload flow and Groq vision request.
- QR creation and a simulated proof/verification flow.
- WasteCoins balances, sample redemption catalog, and local activity data.
- Local account registration/login and a JSONBin synchronisation attempt.
- A public live-prototype view, polling its configured data source every 8 seconds.

## Verification performed

- JavaScript extracted from the page passed `node --check`.
- `git diff --check` found no whitespace errors in the original working tree.
- Repository history contains one initial commit and the local and remote branch tips match.

This assessment did **not** use real API credentials, create accounts, upload images, or alter remote data. Therefore it confirms source-level validity, not successful end-to-end operation of third-party services.

## Readiness assessment

### Good demo qualities

- Strong visual presentation and a clear product narrative.
- Useful stakeholder-specific screens for a judging/demo context.
- The source contains safeguards for some unavailable map CDN cases and understandable UI errors for Groq failures.
- No dependency installation or backend setup is required to view most of the prototype.

### Blockers for a real deployment

1. **Critical — credential and user-data exposure.** A JSONBin master key is hard-coded in [`index.html`](index.html:625). The app uses it client-side and publishes synchronised records with `X-Bin-Private: false` ([`index.html`](index.html:665)). It also sends plain-text passwords and security answers to that store ([`index.html`](index.html:647)). Treat the credential as compromised: revoke/rotate it immediately, remove it from Git history if the repository is public, and invalidate any exposed data.
2. **Critical — authentication and authorisation are only client-side.** Credentials are compared as plain text from `localStorage` ([`index.html`](index.html:716)), and the sign-up modal allows anyone to select municipality or admin roles ([`index.html`](index.html:887)). Browser state can be modified by any visitor; it cannot protect municipal or administrative functionality.
3. **High — data is simulated and mutable in the client.** Bin locations, readings, hotspots, rewards, and verification results live in the page source. “Live” IoT readings are random browser changes ([`index.html`](index.html:1153)); verification completion is a timeout rather than server validation ([`index.html`](index.html:1164)). The prototype should not be represented as an operational waste system.
4. **High — third-party calls and keys are browser-facing.** Map/CDN availability, JSONBin, and the direct Groq request determine behaviour. A production design needs server-side API routes, error monitoring, rate limits, and secure secret management.
5. **Medium — maintainability is limited.** `index.html` is approximately 1,426 lines and mixes markup, styles, data, rendering, and business logic. The separate `styles.css` and `script.js` files are currently unused by the document. There are no tests, linting, CI, licence, contribution notes, or deployment configuration.
6. **Medium — privacy and accessibility need design work.** The application asks for location, camera images, personal identifiers, passwords, and security answers without a privacy notice, consent model, retention policy, or data-deletion controls. It relies heavily on click handlers on non-semantic elements and inline styling.

## Recommended next steps

1. Rotate the exposed JSONBin key immediately; do not merely replace it in the file. Purge/rewrite public Git history if it has been pushed, then migrate all secrets to a server environment.
2. Remove client-side account storage and role selection. Add a backend with hashed passwords, verified identities, server-enforced RBAC, and private database access.
3. Separate the SPA into modules/components, move fixture data to documented mock files, and wire a real IoT ingestion API with validation and audit logging.
4. Make rewards and bin verification server-authoritative. Do not award points from the browser alone.
5. Add a privacy policy, consent/retention choices, accessibility review, automated tests, linting, CI, and a deployment guide.

## Suggested production target

Use a browser frontend plus authenticated API/backend. Keep map data, IoT telemetry, rewards, classification proxying, and all credentials server-side. The frontend should receive only scoped, least-privilege data and never database/admin keys or password records.
