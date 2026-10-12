# CrimeMap — Geospatial Intelligence Prototype

A runnable React + TypeScript + Vite prototype for exploring synthetic incident records. It includes an interactive Leaflet map, filter-aware dashboards, Recharts analytics, deterministic spatial grid aggregation, transparent incident similarity, area-level descriptive indices, patrol-plan drafts, and CSV/printable reports.

> **Important data note:** All 5,000 incident records are synthetic and reproducibly generated using seed `20261012`, with timestamps from 1 Jan through 12 Oct 2026. Puducherry coordinates are approximate area anchors, not verified incident locations. The data is not official police data and must not be used for operational decisions. See `DATA_PROVENANCE.md`. Similarity scores do not establish identity, intent, causation, or guilt. Area indices are descriptive and not validated predictions.

## Requirements
- Node.js 18.18+ (Node 20 LTS recommended)
- npm
- Internet connection for OpenStreetMap tiles and optional Google Fonts

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite (normally `http://localhost:5173`). Choose **Open demo** or **Continue with demo access**. Demo login is intentionally mock authentication; no password is saved or verified.

## Production checks
```bash
npm run typecheck
npm run build
npm run preview
```
The build uses Vite and TypeScript. `npm run build` performs a TypeScript project build followed by a production bundle.

## Features
- Public landing page and explicitly labeled mock authentication.
- Seven-item workspace navigation: Overview, Crime map, Trend analytics, Hotspot detection, Incident correlation, Risk & patrol planning, Reports & exports.
- Shared incident filter state for date, category, severity, area and global search.
- Seeded 5,000-row synthetic Puducherry-region incident dataset dated 1 Jan–12 Oct 2026; records can be reset to baseline from the sidebar.
- Leaflet map using OpenStreetMap tiles with attribution, selectable markers, incident details, hotspot grid overlays and legend.
- Filter-aware KPIs, charts, incident table with local search/sort/pagination, monthly/hour/day distributions.
- Hotspot method: deterministic latitude/longitude grid cell aggregation with adjustable cell size and minimum count.
- Correlation method: score = 45% geographic proximity + 35% time proximity + 20% category match. Geographic/time proximity decay linearly to zero at their configured limit; results under 20 are hidden.
- Area review index: 55% relative incident volume + 25% high/critical share + 20% night-time share. Inputs are normalized against the current filtered data. This is a descriptive prototype metric, not a validated risk model.
- Editable patrol-plan drafts persisted in browser localStorage. No dispatch integration exists.
- Report preview based on current filters, CSV downloads for incidents and supported aggregate tables, and browser Print / Save as PDF.
- Theme preference persistence is scaffolded; the primary supported design is dark mode. A light-theme class is available for UI testing.

## CSV data
`sample-incidents.csv` contains 250 synthetic rows dated 1 Jan–12 Oct 2026. The current prototype offers CSV export but does not include a file-import UI. See `DATA_PROVENANCE.md` for official-source context, limitations, and a safe path to acquiring authorized real data.

## Project layout
```text
src/
  App.tsx                 Routes, shared layout and page components
  components/             (reserved for further component extraction)
  data/incidents.ts       Seeded synthetic records and demo geography
  services/analytics.ts   Filtering, trends, hotspots, correlation, risk, CSV
  types/index.ts          Typed incident and filter models
  styles/global.css       Dark enterprise design system and responsive rules
  main.tsx                React entry point
```

## Backend integration plan
Keep `src/services/analytics.ts` as the local prototype adapter and introduce a typed `IncidentRepository` interface with methods such as `list(filters)`, `getById(id)`, and aggregate endpoints. A FastAPI service can expose `GET /api/v1/incidents`, `GET /api/v1/analytics/trends`, `GET /api/v1/analytics/hotspots`, `GET /api/v1/areas/risk`, and `POST /api/v1/reports`. Use Pydantic schemas for validation and parameterized queries. PostgreSQL/PostGIS can store incident points in a `geometry(Point, 4326)` column with a GiST index; use `ST_DWithin` for distance filters and `ST_SnapToGrid`/`ST_ClusterDBSCAN` for spatial aggregation. Keep authorization, audit logging, retention rules, and source provenance server-side. Never accept arbitrary client-provided SQL. Add a `.env.example` with `VITE_API_BASE_URL=http://localhost:8000` when a backend is wired in.

## Known limitations
- Demo authentication is not production security.
- Map tile availability depends on internet connectivity and OpenStreetMap's public tile service policy; respect attribution and usage rules.
- Marker clustering is not added as a separate plugin; the map displays individual records and aggregated grid circles. At higher zoomed-out levels, a clustering library can be introduced if needed.
- The heat-oriented view uses grid aggregates rendered as proportional circle overlays rather than a dedicated raster heatmap.
- No real police data, predictive model, official boundary dataset, or backend service is connected.
- The reference image mentioned in the project brief was not available as an inspectable attachment in this execution context, so the visual design follows the written dark-navy/electric-blue brief.
