import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ApiError } from "../api/client";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("citizen1@wasteloop.demo");
  const [password, setPassword] = useState("wasteloop123");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Login failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-soft border border-brand-100 bg-white/90">
        <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-brand-600 via-brand-700 to-mist-600 p-8 text-white">
          <div>
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-2xl">♻️</span>
            <h2 className="font-display text-2xl font-semibold mt-6">Nayi Disha</h2>
            <p className="text-brand-100 text-sm mt-1">WasteLoop — close the urban waste loop</p>
          </div>
          <ul className="space-y-3 text-sm text-brand-50/90">
            <li className="flex items-center gap-2"><span>📷</span> Scan &amp; classify waste with AI</li>
            <li className="flex items-center gap-2"><span>🎯</span> Triple-lock verified disposal</li>
            <li className="flex items-center gap-2"><span>🪙</span> Earn WasteCoins &amp; redeem rewards</li>
            <li className="flex items-center gap-2"><span>🚚</span> Live route optimization for collection</li>
          </ul>
          <div className="h-1 w-16 tricolor-rule rounded-full" />
        </div>

        <div className="p-8 sm:p-10">
          <h1 className="text-2xl font-display font-semibold text-brand-900 mb-1">Welcome back</h1>
          <p className="text-sm text-slate-500 mb-6">Log in to your WasteLoop account</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="field-label">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="field-input" required />
            </div>
            <div>
              <label className="field-label">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="field-input" required />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button type="submit" disabled={busy} className="btn-primary w-full">
              {busy ? "Logging in..." : "Log in"}
            </button>
          </form>
          <div className="mt-5 rounded-xl bg-brand-50 border border-brand-100 px-3.5 py-2.5 text-xs text-brand-700">
            Demo accounts: <span className="font-mono">admin@wasteloop.demo</span> or{" "}
            <span className="font-mono">citizen1..12@wasteloop.demo</span> · password{" "}
            <span className="font-mono">wasteloop123</span>
          </div>
          <p className="text-sm text-slate-600 mt-5">
            No account? <Link to="/register" className="text-brand-700 font-medium">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
