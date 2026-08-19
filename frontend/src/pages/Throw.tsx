import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api, ApiError } from "../api/client";
import { useAuth } from "../context/AuthContext";
import type { Bin, ThrowResult, WasteScan } from "../api/types";

const REASON_LABELS: Record<string, string> = {
  GPS_OUT_OF_RANGE: "GPS check failed — you're not close enough to this bin.",
  TOKEN_EXPIRED: "Your disposal token has expired.",
  THROW_NOT_VERIFIED: "Throw could not be verified — evidence was missing.",
};

export function Throw() {
  const { refreshUser } = useAuth();
  const { data: scansData } = useQuery({ queryKey: ["scans"], queryFn: () => api<{ scans: (WasteScan & { token?: { code: string; status: string } }) [] }>("/scans") });
  const { data: binsData } = useQuery({ queryKey: ["bins"], queryFn: () => api<{ bins: Bin[] }>("/bins") });

  const activeScan = scansData?.scans.find((s) => s.token?.status === "ACTIVE");

  const [tokenCode, setTokenCode] = useState("");
  const [binId, setBinId] = useState("");
  const [gpsLat, setGpsLat] = useState<number | "">("");
  const [gpsLng, setGpsLng] = useState<number | "">("");
  const [method, setMethod] = useState<"SELF_PHOTO" | "BIN_CAMERA" | "NFC_TAG">("SELF_PHOTO");
  const [includeEvidence, setIncludeEvidence] = useState(true);
  const [result, setResult] = useState<ThrowResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (activeScan?.token) setTokenCode(activeScan.token.code);
  }, [activeScan]);

  const bins = binsData?.bins ?? [];
  const selectedBin = bins.find((b) => b.id === binId);

  function simulateAtBin() {
    if (!selectedBin) return;
    setGpsLat(selectedBin.latitude);
    setGpsLng(selectedBin.longitude);
  }

  function simulateWrongLocation() {
    if (!selectedBin) return;
    setGpsLat(selectedBin.latitude + 0.05);
    setGpsLng(selectedBin.longitude + 0.05);
  }

  async function submit() {
    if (!selectedBin || gpsLat === "" || gpsLng === "") return;
    setError(null);
    setBusy(true);
    setResult(null);
    try {
      const res = await api<ThrowResult>("/throws", {
        method: "POST",
        body: JSON.stringify({
          tokenCode,
          binCode: selectedBin.code,
          gpsLat,
          gpsLng,
          verificationMethod: method,
          evidenceUrl: method !== "NFC_TAG" && includeEvidence ? "https://picsum.photos/seed/throw-evidence/400/300" : undefined,
        }),
      });
      setResult(res);
      await refreshUser();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Throw verification failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="page-title">Verify disposal at a bin</h1>
        <p className="page-subtitle">Simulates the triple-lock check: GPS proximity + bin QR + valid token.</p>
      </div>

      <div className="card space-y-4">
        <div>
          <label className="field-label">Disposal token code</label>
          <input value={tokenCode} onChange={(e) => setTokenCode(e.target.value)} className="field-input font-mono" placeholder="Paste a token from the Scan page" />
          {!activeScan && <p className="text-xs text-slate-400 mt-1">No active token found — generate one on the Scan page first.</p>}
        </div>

        <div>
          <label className="field-label">Bin (scan its QR)</label>
          <select value={binId} onChange={(e) => setBinId(e.target.value)} className="field-input">
            <option value="">Select a bin...</option>
            {bins.map((b) => (
              <option key={b.id} value={b.id}>
                {b.code} — {b.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button type="button" onClick={simulateAtBin} disabled={!selectedBin} className="btn-ghost bg-brand-50 hover:bg-brand-100 text-brand-700 disabled:opacity-40">
            Simulate GPS at bin
          </button>
          <button type="button" onClick={simulateWrongLocation} disabled={!selectedBin} className="btn-ghost bg-slate-100">
            Simulate wrong location
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <label className="text-xs text-slate-400">GPS latitude</label>
            <input type="number" step="any" value={gpsLat} onChange={(e) => setGpsLat(e.target.value === "" ? "" : Number(e.target.value))} className="field-input" />
          </div>
          <div>
            <label className="text-xs text-slate-400">GPS longitude</label>
            <input type="number" step="any" value={gpsLng} onChange={(e) => setGpsLng(e.target.value === "" ? "" : Number(e.target.value))} className="field-input" />
          </div>
        </div>

        <div>
          <label className="field-label">Throw verification method</label>
          <select value={method} onChange={(e) => setMethod(e.target.value as typeof method)} className="field-input">
            <option value="SELF_PHOTO">Self-recorded photo</option>
            <option value="BIN_CAMERA">Bin camera (IR-triggered)</option>
            <option value="NFC_TAG">NFC/QR tag on bag</option>
          </select>
        </div>

        {method !== "NFC_TAG" && (
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" checked={includeEvidence} onChange={(e) => setIncludeEvidence(e.target.checked)} className="accent-brand-600" />
            Attach evidence photo (uncheck to simulate a failed capture)
          </label>
        )}

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          onClick={submit}
          disabled={busy || !tokenCode || !selectedBin || gpsLat === "" || gpsLng === ""}
          className="btn-primary w-full"
        >
          {busy ? "Verifying..." : "Throw now"}
        </button>
      </div>

      {result && (
        <div className={`rounded-2xl border p-5 ${result.success ? "bg-brand-50 border-brand-200" : "bg-red-50 border-red-200"}`}>
          {result.success ? (
            <>
              <p className="font-semibold text-brand-800">Verified! Points released 🎉</p>
              <p className="text-sm text-brand-700 mt-1">
                +{result.pointsAwarded} points, +{result.bonusAmount} bonus WasteCoins
              </p>
            </>
          ) : (
            <p className="font-semibold text-red-700">{REASON_LABELS[result.reason ?? ""] ?? "Verification failed"}</p>
          )}
        </div>
      )}
    </div>
  );
}
