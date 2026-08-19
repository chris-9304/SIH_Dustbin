import { useQuery } from "@tanstack/react-query";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import { api } from "../api/client";
import type { Bin } from "../api/types";

function fillColor(fillPercent: number): string {
  if (fillPercent >= 90) return "#dc2626";
  if (fillPercent >= 70) return "#f5891f";
  if (fillPercent >= 40) return "#3aa389";
  return "#4188b0";
}

export function Bins() {
  const { data, isLoading } = useQuery({
    queryKey: ["bins"],
    queryFn: () => api<{ bins: Bin[] }>("/bins"),
  });

  const bins = data?.bins ?? [];
  const center: [number, number] = bins.length
    ? [bins[0]!.latitude, bins[0]!.longitude]
    : [28.6139, 77.209];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Smart bins</h1>
        <p className="page-subtitle">
          Fill levels read 0% until a device or test bench starts sending telemetry — the map and
          collection routing work off real bin locations either way.
        </p>
      </div>

      {isLoading ? (
        <p className="text-slate-400 text-sm">Loading bins...</p>
      ) : (
        <>
          <div className="h-96 rounded-2xl overflow-hidden border border-brand-100 shadow-soft">
            <MapContainer center={center} zoom={13} className="h-full w-full">
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {bins.map((bin) => (
                <CircleMarker
                  key={bin.id}
                  center={[bin.latitude, bin.longitude]}
                  radius={9}
                  pathOptions={{ color: fillColor(bin.currentFillPercent), fillColor: fillColor(bin.currentFillPercent), fillOpacity: 0.85 }}
                >
                  <Popup>
                    <div className="text-sm">
                      <p className="font-semibold">{bin.label}</p>
                      <p>{bin.code}</p>
                      <p>{Math.round(bin.currentFillPercent)}% full · {bin.status}</p>
                      <Link to={`/bins/${bin.id}`} className="text-brand-700 underline">
                        View details
                      </Link>
                    </div>
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
                    <th className="px-4 py-2.5 font-medium">Code</th>
                    <th className="px-4 py-2.5 font-medium">Label</th>
                    <th className="px-4 py-2.5 font-medium">Ward</th>
                    <th className="px-4 py-2.5 font-medium">Fill %</th>
                    <th className="px-4 py-2.5 font-medium">Status</th>
                    <th className="px-4 py-2.5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-50">
                  {bins.map((bin) => (
                    <tr key={bin.id} className="hover:bg-brand-50/40">
                      <td className="px-4 py-2.5 font-mono text-xs">{bin.code}</td>
                      <td className="px-4 py-2.5">{bin.label}</td>
                      <td className="px-4 py-2.5">{bin.ward?.name ?? "—"}</td>
                      <td className="px-4 py-2.5">
                        <span className="font-medium" style={{ color: fillColor(bin.currentFillPercent) }}>
                          {Math.round(bin.currentFillPercent)}%
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className="chip bg-brand-50 text-brand-700 border border-brand-100">{bin.status}</span>
                      </td>
                      <td className="px-4 py-2.5">
                        <Link to={`/bins/${bin.id}`} className="text-brand-700 hover:underline font-medium">
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
