import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup } from "react-leaflet";
import { api, ApiError } from "../api/client";
import type { Bin, OptimizedRoute } from "../api/types";

function formatDistance(m: number) {
  return m >= 1000 ? `${(m / 1000).toFixed(1)} km` : `${Math.round(m)} m`;
}
function formatDuration(s: number) {
  const mins = Math.round(s / 60);
  return mins >= 60 ? `${Math.floor(mins / 60)}h ${mins % 60}m` : `${mins} min`;
}

export function RoutesPage() {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  const [selectedBinIds, setSelectedBinIds] = useState<string[]>([]);

  const { data } = useQuery({ queryKey: ["routes"], queryFn: () => api<{ routes: OptimizedRoute[] }>("/routes") });
  const { data: binsData } = useQuery({ queryKey: ["bins"], queryFn: () => api<{ bins: Bin[] }>("/bins") });
  const latestRoute = data?.routes[0];
  const bins = binsData?.bins ?? [];

  const optimizeMutation = useMutation({
    mutationFn: (binIds: string[]) => api("/routes/optimize", { method: "POST", body: JSON.stringify({ binIds }) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["routes"] }),
    onError: (err) => setError(err instanceof ApiError ? err.message : "Route optimization failed"),
  });

  function toggleBin(id: string) {
    setSelectedBinIds((prev) => (prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]));
  }

  const center: [number, number] = latestRoute
    ? [latestRoute.stops[0]!.bin.latitude, latestRoute.stops[0]!.bin.longitude]
    : bins.length
      ? [bins[0]!.latitude, bins[0]!.longitude]
      : [28.6139, 77.209];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Collection route optimizer</h1>
        <p className="page-subtitle">
          Real road-network routing (OSRM) + nearest-neighbor/2-opt stop ordering — the same
          multi-stop TSP solve dustbin_arch.md calls out for OR-Tools. Pick bins to visit; once
          telemetry is live, this can auto-select bins above a fill threshold instead.
        </p>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-brand-900">Select bins to collect ({selectedBinIds.length} chosen)</h2>
          <div className="flex gap-2">
            <button className="btn-ghost bg-brand-50 text-brand-700" onClick={() => setSelectedBinIds(bins.map((b) => b.id))}>
              Select all
            </button>
            <button className="btn-ghost bg-slate-100" onClick={() => setSelectedBinIds([])}>
              Clear
            </button>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-64 overflow-y-auto pr-1">
          {bins.map((bin) => (
            <label
              key={bin.id}
              className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm cursor-pointer transition ${
                selectedBinIds.includes(bin.id) ? "border-brand-400 bg-brand-50" : "border-brand-100 bg-white hover:bg-brand-50/50"
              }`}
            >
              <input type="checkbox" checked={selectedBinIds.includes(bin.id)} onChange={() => toggleBin(bin.id)} className="accent-brand-600" />
              <span className="truncate">
                <span className="font-mono text-xs text-slate-400 mr-1">{bin.code}</span>
                {bin.label}
              </span>
            </label>
          ))}
        </div>

        {error && <p className="text-sm text-red-600 mt-3">{error}</p>}

        <button
          onClick={() => {
            setError(null);
            optimizeMutation.mutate(selectedBinIds);
          }}
          disabled={optimizeMutation.isPending || selectedBinIds.length < 2}
          className="btn-primary mt-4"
        >
          {optimizeMutation.isPending ? "Optimizing..." : `Optimize route (${selectedBinIds.length} bins)`}
        </button>
        {selectedBinIds.length < 2 && <p className="text-xs text-slate-400 mt-1.5">Select at least 2 bins.</p>}
      </div>

      {latestRoute && (
        <>
          <div className="grid grid-cols-3 gap-4">
            <div className="card !p-4">
              <p className="text-xs text-slate-400">Total distance</p>
              <p className="text-xl font-display font-semibold text-brand-900">{formatDistance(latestRoute.totalDistanceMeters)}</p>
            </div>
            <div className="card !p-4">
              <p className="text-xs text-slate-400">Total duration</p>
              <p className="text-xl font-display font-semibold text-brand-900">{formatDuration(latestRoute.totalDurationSeconds)}</p>
            </div>
            <div className="card !p-4">
              <p className="text-xs text-slate-400">Stops</p>
              <p className="text-xl font-display font-semibold text-brand-900">{latestRoute.stops.length}</p>
            </div>
          </div>

          <div className="h-96 rounded-2xl overflow-hidden border border-brand-100 shadow-soft">
            <MapContainer center={center} zoom={13} className="h-full w-full">
              <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Polyline positions={latestRoute.geometryGeoJson.map(([lng, lat]) => [lat, lng])} pathOptions={{ color: "#2c8570", weight: 4 }} />
              {latestRoute.stops.map((stop) => (
                <CircleMarker key={stop.id} center={[stop.bin.latitude, stop.bin.longitude]} radius={9} pathOptions={{ color: "#20554a", fillColor: "#3aa389", fillOpacity: 0.9 }}>
                  <Popup>
                    <p className="font-semibold">
                      Stop {stop.sequenceOrder + 1}: {stop.bin.label}
                    </p>
                    <p className="text-xs">{stop.bin.code}</p>
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>

          <div className="card overflow-hidden !p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-brand-50/70 text-left text-slate-500">
                  <tr>
                    <th className="px-4 py-2.5 font-medium">#</th>
                    <th className="px-4 py-2.5 font-medium">Bin</th>
                    <th className="px-4 py-2.5 font-medium">Distance from prev</th>
                    <th className="px-4 py-2.5 font-medium">Duration from prev</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-50">
                  {latestRoute.stops.map((stop) => (
                    <tr key={stop.id}>
                      <td className="px-4 py-2.5">{stop.sequenceOrder + 1}</td>
                      <td className="px-4 py-2.5">
                        {stop.bin.label} <span className="text-xs text-slate-400 font-mono">{stop.bin.code}</span>
                      </td>
                      <td className="px-4 py-2.5">{formatDistance(stop.distanceFromPrevMeters)}</td>
                      <td className="px-4 py-2.5">{formatDuration(stop.durationFromPrevSeconds)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {!latestRoute && <p className="empty-state">No route computed yet — select bins above and click "Optimize route".</p>}
    </div>
  );
}
