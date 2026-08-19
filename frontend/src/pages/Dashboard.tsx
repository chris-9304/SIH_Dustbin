import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";
import type { Badge, RewardTransaction } from "../api/types";

function StatCard({ label, value, icon, accent }: { label: string; value: string | number; icon: string; accent: string }) {
  return (
    <div className="card flex items-center gap-4">
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl ${accent}`}>{icon}</span>
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-2xl font-display font-semibold text-brand-900">{value}</p>
      </div>
    </div>
  );
}

export function Dashboard() {
  const { user } = useAuth();
  const { data: badgesData } = useQuery({
    queryKey: ["badges"],
    queryFn: () => api<{ badges: Badge[] }>("/rewards/badges"),
  });
  const { data: txData } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => api<{ transactions: RewardTransaction[] }>("/rewards/transactions"),
  });

  const earnedBadges = badgesData?.badges.filter((b) => b.earned) ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Welcome back, {user?.name.split(" ")[0]} 👋</h1>
        <p className="page-subtitle">Here's your WasteLoop activity at a glance.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="WasteCoin balance" value={user?.wasteCoinBalance ?? 0} icon="🪙" accent="bg-saffron-100 text-saffron-700" />
        <StatCard label="Current streak" value={`${user?.currentStreak ?? 0} days`} icon="🔥" accent="bg-brand-100 text-brand-700" />
        <StatCard label="Longest streak" value={`${user?.longestStreak ?? 0} days`} icon="🏆" accent="bg-mist-100 text-mist-600" />
      </div>

      <div className="flex flex-wrap gap-3">
        <Link to="/scan" className="btn-primary">
          <span aria-hidden>📷</span> Scan waste
        </Link>
        <Link to="/throw" className="btn-secondary">
          <span aria-hidden>🎯</span> Verify a throw
        </Link>
        <Link to="/rewards" className="btn-secondary">
          <span aria-hidden>🪙</span> View rewards
        </Link>
      </div>

      <div className="card">
        <h2 className="font-semibold text-brand-900 mb-3">Badges ({earnedBadges.length} earned)</h2>
        <div className="flex flex-wrap gap-3">
          {badgesData?.badges.map((badge) => (
            <div
              key={badge.id}
              className={`chip border ${
                badge.earned
                  ? "bg-brand-50 border-brand-200 text-brand-800"
                  : "bg-slate-50 border-slate-200 text-slate-400 opacity-60"
              }`}
              title={badge.description}
            >
              <span aria-hidden>{badge.iconEmoji}</span>
              {badge.name}
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 className="font-semibold text-brand-900 mb-3">Recent activity</h2>
        {txData?.transactions.length ? (
          <div className="divide-y divide-brand-50">
            {txData.transactions.slice(0, 8).map((tx) => (
              <div key={tx.id} className="py-2.5 flex items-center justify-between text-sm">
                <span className="text-slate-600">{tx.description}</span>
                <span className={tx.amount >= 0 ? "text-brand-700 font-semibold" : "text-red-600 font-semibold"}>
                  {tx.amount >= 0 ? "+" : ""}
                  {tx.amount} WC
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-state">No activity yet — go scan some waste!</p>
        )}
      </div>
    </div>
  );
}
