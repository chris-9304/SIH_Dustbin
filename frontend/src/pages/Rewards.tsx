import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { api, ApiError } from "../api/client";
import { useAuth } from "../context/AuthContext";
import type { RedemptionOption, RewardTransaction } from "../api/types";

export function Rewards() {
  const { user, refreshUser } = useAuth();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const { data: txData } = useQuery({ queryKey: ["transactions"], queryFn: () => api<{ transactions: RewardTransaction[] }>("/rewards/transactions") });
  const { data: optionsData } = useQuery({ queryKey: ["redemption-options"], queryFn: () => api<{ options: RedemptionOption[] }>("/rewards/redemption-options") });

  const redeemMutation = useMutation({
    mutationFn: (redemptionOptionId: string) => api("/rewards/redeem", { method: "POST", body: JSON.stringify({ redemptionOptionId }) }),
    onSuccess: async (_data, redemptionOptionId) => {
      const option = optionsData?.options.find((o) => o.id === redemptionOptionId);
      setMessage(`Redeemed: ${option?.title}`);
      setError(null);
      await Promise.all([refreshUser(), queryClient.invalidateQueries({ queryKey: ["transactions"] })]);
    },
    onError: (err) => setError(err instanceof ApiError ? err.message : "Redemption failed"),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Rewards</h1>
        <p className="page-subtitle">
          Balance: <span className="font-semibold text-brand-700">{user?.wasteCoinBalance} WasteCoins</span>
        </p>
      </div>

      {message && <p className="text-sm text-brand-700 bg-brand-50 border border-brand-200 rounded-xl px-3.5 py-2.5">{message}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="card">
        <h2 className="font-semibold text-brand-900 mb-4">Redeem</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {optionsData?.options.map((option) => (
            <div key={option.id} className="rounded-xl border border-brand-100 p-4 flex flex-col justify-between bg-white">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-saffron-600 font-semibold">{option.provider}</p>
                <p className="font-medium text-slate-800 mt-1">{option.title}</p>
                <p className="text-xs text-slate-500 mt-1">{option.description}</p>
              </div>
              <button
                onClick={() => redeemMutation.mutate(option.id)}
                disabled={redeemMutation.isPending || (user?.wasteCoinBalance ?? 0) < option.costPoints}
                className="btn-primary mt-4 w-full"
              >
                {option.costPoints} WC
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="card overflow-hidden">
        <h2 className="font-semibold text-brand-900 mb-3">Transaction ledger</h2>
        {txData?.transactions.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-slate-400">
                <tr>
                  <th className="py-1.5 font-medium">Date</th>
                  <th className="py-1.5 font-medium">Type</th>
                  <th className="py-1.5 font-medium">Description</th>
                  <th className="py-1.5 font-medium text-right">Amount</th>
                  <th className="py-1.5 font-medium text-right">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-50">
                {txData.transactions.map((tx) => (
                  <tr key={tx.id}>
                    <td className="py-1.5 text-xs text-slate-400 whitespace-nowrap">{new Date(tx.createdAt).toLocaleDateString()}</td>
                    <td className="py-1.5 text-xs text-slate-500">{tx.type}</td>
                    <td className="py-1.5">{tx.description}</td>
                    <td className={`py-1.5 text-right font-medium ${tx.amount >= 0 ? "text-brand-700" : "text-red-600"}`}>
                      {tx.amount >= 0 ? "+" : ""}
                      {tx.amount}
                    </td>
                    <td className="py-1.5 text-right text-slate-500">{tx.balanceAfter}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="empty-state">No transactions yet.</p>
        )}
      </div>
    </div>
  );
}
