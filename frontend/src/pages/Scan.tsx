import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, ApiError } from "../api/client";
import type { DisposalToken, WasteScan } from "../api/types";

// Sample "waste photo" picks standing in for a real camera upload — the classifier itself is a
// deterministic mock (see backend/src/modules/scans/classifier.ts), so any distinct URL works.
const SAMPLE_PHOTOS = Array.from({ length: 6 }, (_, i) => `https://picsum.photos/seed/waste-sample-${i}/300/220`);

function classificationStyle(c: string) {
  return {
    RECYCLABLE: "bg-mist-100 text-mist-600",
    BIODEGRADABLE: "bg-brand-100 text-brand-700",
    HAZARDOUS: "bg-saffron-100 text-saffron-700",
    REJECTED: "bg-slate-200 text-slate-600",
  }[c] ?? "bg-slate-100 text-slate-600";
}

function useCountdown(expiresAt: string | undefined) {
  const [remaining, setRemaining] = useState<number>(0);
  useEffect(() => {
    if (!expiresAt) return;
    const tick = () => setRemaining(Math.max(0, Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000)));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [expiresAt]);
  return remaining;
}

export function Scan() {
  const [selected, setSelected] = useState<string[]>([]);
  const [scan, setScan] = useState<WasteScan | null>(null);
  const [token, setToken] = useState<DisposalToken | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const remaining = useCountdown(token?.expiresAt);

  function toggle(url: string) {
    setSelected((prev) => (prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]));
  }

  async function submitScan() {
    setError(null);
    setBusy(true);
    try {
      const res = await api<{ scan: WasteScan }>("/scans", {
        method: "POST",
        body: JSON.stringify({ imageUrls: selected }),
      });
      setScan(res.scan);
      setToken(null);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Scan failed");
    } finally {
      setBusy(false);
    }
  }

  async function requestToken() {
    if (!scan) return;
    setError(null);
    setBusy(true);
    try {
      const res = await api<{ token: DisposalToken }>(`/scans/${scan.id}/token`, { method: "POST" });
      setToken(res.token);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not issue token");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="page-title">Scan your waste</h1>
        <p className="page-subtitle">Pick one or more sample photos to stand in for a camera capture.</p>
      </div>

      <div className="card">
        <div className="grid grid-cols-3 gap-3">
          {SAMPLE_PHOTOS.map((url) => (
            <button
              key={url}
              onClick={() => toggle(url)}
              className={`rounded-xl overflow-hidden border-2 transition ${
                selected.includes(url) ? "border-brand-500 ring-2 ring-brand-100" : "border-transparent hover:border-brand-200"
              }`}
            >
              <img src={url} alt="sample waste" className="w-full h-24 object-cover" />
            </button>
          ))}
        </div>

        {error && <p className="text-sm text-red-600 mt-4">{error}</p>}

        <button onClick={submitScan} disabled={selected.length === 0 || busy} className="btn-primary mt-5">
          {busy ? "Classifying..." : "Classify with AI"}
        </button>
      </div>

      {scan && (
        <div className="card space-y-3">
          <div className="flex items-center gap-2">
            <span className={`chip ${classificationStyle(scan.aiClassification)}`}>{scan.aiClassification}</span>
            <span className="text-xs text-slate-400">{Math.round(scan.aiConfidence * 100)}% confidence</span>
          </div>
          <p className="text-sm text-slate-600">
            Pending points: <span className="font-semibold text-brand-700">{scan.pendingPoints}</span>
          </p>

          {scan.aiClassification === "REJECTED" ? (
            <p className="text-sm text-red-600">Classification failed — please re-scan with clearer photos.</p>
          ) : !token ? (
            <button onClick={requestToken} disabled={busy} className="btn-primary">
              Generate disposal token / QR
            </button>
          ) : (
            <div className="rounded-xl border border-brand-100 bg-brand-50/70 p-4 text-center space-y-2">
              <p className="text-xs uppercase tracking-wide text-brand-500">Disposal Token / QR</p>
              <p className="font-mono text-sm break-all bg-white border border-brand-100 rounded-lg px-3 py-2">{token.code}</p>
              <p className="text-sm">
                {remaining > 0 ? (
                  <>
                    Valid for <span className="font-semibold text-brand-700">{Math.floor(remaining / 60)}m {remaining % 60}s</span>
                  </>
                ) : (
                  <span className="text-red-600">Token expired</span>
                )}
              </p>
              <Link to="/throw" className="btn-primary mt-2">
                Go to nearest bin →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
