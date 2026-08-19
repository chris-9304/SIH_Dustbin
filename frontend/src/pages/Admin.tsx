import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { api } from "../api/client";
import type { SegregationTrendPoint, WardSummary } from "../api/types";

export function Admin() {
  const { data: wardsData } = useQuery({ queryKey: ["ward-summary"], queryFn: () => api<{ wards: WardSummary[] }>("/admin/analytics/ward-summary") });
  const { data: trendsData } = useQuery({ queryKey: ["segregation-trends"], queryFn: () => api<{ trends: SegregationTrendPoint[] }>("/admin/analytics/segregation-trends") });
  const { data: statusData } = useQuery({ queryKey: ["bins-status"], queryFn: () => api<{ statuses: { status: string; count: number }[] }>("/admin/analytics/bins-status") });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Municipal command center</h1>
        <p className="page-subtitle">Ward heatmaps, segregation trends, and fleet status.</p>
      </div>

      <div className="grid sm:grid-cols-4 gap-4">
        {wardsData?.wards.map((ward) => (
          <div key={ward.wardId} className="card !p-4">
            <p className="text-sm font-semibold text-slate-700">{ward.wardName}</p>
            <p className="text-2xl font-display font-semibold text-brand-700 mt-1">{ward.averageFillPercent}%</p>
            <p className="text-xs text-slate-400">
              {ward.binCount} bins · {ward.binsNeedingCollection} need collection
            </p>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 className="font-semibold text-brand-900 mb-3">Segregation quality trend (daily)</h2>
        {trendsData?.trends.length ? (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendsData.trends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#dcf2ea" />
                <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="averageSegregationScore" fill="#3aa389" name="Avg. quality score" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="empty-state">
            No bin-camera events yet — this fills in once bins start posting camera events (real
            device or test bench).
          </p>
        )}
      </div>

      <div className="card">
        <h2 className="font-semibold text-brand-900 mb-3">Fleet status</h2>
        <div className="flex gap-6">
          {statusData?.statuses.map((s) => (
            <div key={s.status} className="text-center">
              <p className="text-2xl font-display font-semibold text-brand-900">{s.count}</p>
              <p className="text-xs text-slate-400">{s.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
