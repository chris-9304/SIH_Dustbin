import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { api } from "../api/client";
import type { Bin, BinCameraEvent, SensorLog } from "../api/types";

export function BinDetail() {
  const { id } = useParams<{ id: string }>();

  const { data: binData } = useQuery({
    queryKey: ["bin", id],
    queryFn: () => api<{ bin: Bin }>(`/bins/${id}`),
    enabled: !!id,
  });
  const { data: logsData } = useQuery({
    queryKey: ["bin-logs", id],
    queryFn: () => api<{ logs: SensorLog[] }>(`/bins/${id}/logs?limit=60`),
    enabled: !!id,
  });
  const { data: eventsData } = useQuery({
    queryKey: ["bin-camera-events", id],
    queryFn: () => api<{ cameraEvents: BinCameraEvent[] }>(`/bins/${id}/camera-events`),
    enabled: !!id,
  });

  const bin = binData?.bin;
  const chartData = [...(logsData?.logs ?? [])]
    .reverse()
    .map((log) => ({ time: new Date(log.recordedAt).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit" }), fillPercent: Math.round(log.fillPercent), weightKg: Math.round(log.weightKg * 10) / 10 }));

  return (
    <div className="space-y-6">
      <Link to="/bins" className="text-sm text-brand-700 hover:underline">
        ← Back to bins
      </Link>

      {bin && (
        <div className="card">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h1 className="page-title">{bin.label}</h1>
              <p className="text-slate-500 text-sm font-mono">{bin.code}</p>
            </div>
            <span className="chip bg-brand-50 text-brand-700 border border-brand-100">{bin.status}</span>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-5 text-sm">
            <div>
              <p className="text-slate-400">Fill level</p>
              <p className="text-xl font-display font-semibold text-brand-900">{Math.round(bin.currentFillPercent)}%</p>
            </div>
            <div>
              <p className="text-slate-400">Weight</p>
              <p className="text-xl font-display font-semibold text-brand-900">{bin.currentWeightKg.toFixed(1)} kg</p>
            </div>
            <div>
              <p className="text-slate-400">Last telemetry</p>
              <p className="text-xl font-display font-semibold text-brand-900">
                {bin.lastTelemetryAt ? new Date(bin.lastTelemetryAt).toLocaleDateString() : "—"}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="card">
        <h2 className="font-semibold text-brand-900 mb-3">Sensor history (fill %)</h2>
        {chartData.length > 0 ? (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#dcf2ea" />
                <XAxis dataKey="time" tick={{ fontSize: 10 }} minTickGap={30} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line type="monotone" dataKey="fillPercent" stroke="#2c8570" dot={false} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="empty-state">
            No sensor telemetry yet — this bin is ready for a device or test bench to start streaming
            data via <code className="font-mono">POST /api/v1/bins/{id}/telemetry</code>.
          </p>
        )}
      </div>

      <div className="card">
        <h2 className="font-semibold text-brand-900 mb-3">Recent camera events</h2>
        {eventsData?.cameraEvents.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {eventsData.cameraEvents.map((event) => (
              <div key={event.id} className="rounded-xl overflow-hidden border border-brand-100">
                <img src={event.imageUrl} alt="bin camera capture" className="w-full h-24 object-cover" />
                <div className="p-2 text-xs">
                  <p>Quality: {event.segregationQualityScore ? Math.round(event.segregationQualityScore) : "—"}</p>
                  {event.contaminationDetected && <p className="text-red-600">Contamination detected</p>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-state">
            No camera events yet — will populate once a bin camera or your test bench posts to{" "}
            <code className="font-mono">POST /api/v1/bins/{id}/camera-events</code>.
          </p>
        )}
      </div>
    </div>
  );
}
