import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const citizenLinks = [
  { to: "/dashboard", label: "Dashboard", icon: "🏠" },
  { to: "/scan", label: "Scan", icon: "📷" },
  { to: "/bins", label: "Bins", icon: "🗺️" },
  { to: "/throw", label: "Throw", icon: "🎯" },
  { to: "/rewards", label: "Rewards", icon: "🪙" },
];

const adminLinks = [
  { to: "/routes", label: "Routes", icon: "🚚" },
  { to: "/admin", label: "Command center", icon: "📊" },
];

function navClass({ isActive }: { isActive: boolean }) {
  return `flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition ${
    isActive
      ? "bg-brand-600 text-white shadow-soft"
      : "text-brand-800/70 hover:bg-brand-100 hover:text-brand-900"
  }`;
}

export function Layout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-1 tricolor-rule" />
      <header className="sticky top-0 z-10 border-b border-brand-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-lg shadow-soft">
              ♻️
            </span>
            <div className="leading-tight">
              <p className="font-display font-semibold text-brand-900">Nayi Disha</p>
              <p className="text-[11px] uppercase tracking-wide text-brand-500">WasteLoop</p>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-1 rounded-full bg-brand-50/80 p-1">
            {citizenLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={navClass}>
                <span aria-hidden>{link.icon}</span>
                {link.label}
              </NavLink>
            ))}
            {user?.role === "ADMIN" && (
              <>
                <span className="mx-1 h-4 w-px bg-brand-200" aria-hidden />
                {adminLinks.map((link) => (
                  <NavLink key={link.to} to={link.to} className={navClass}>
                    <span aria-hidden>{link.icon}</span>
                    {link.label}
                  </NavLink>
                ))}
              </>
            )}
          </nav>

          <div className="flex items-center gap-3">
            {user && (
              <>
                <div className="chip bg-saffron-100 text-saffron-700">
                  <span aria-hidden>🪙</span>
                  {user.wasteCoinBalance} WC
                </div>
                <div className="hidden sm:block text-right leading-tight">
                  <p className="text-sm font-medium text-slate-700">{user.name}</p>
                  <p className="text-[11px] text-slate-400">{user.role === "ADMIN" ? "Municipal admin" : "Citizen"}</p>
                </div>
                <button onClick={logout} className="btn-ghost" title="Log out">
                  ⏻
                </button>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="border-t border-brand-100 py-4 text-center text-xs text-slate-400">
        Nayi Disha · WasteLoop — a civic waste-loop prototype
      </footer>
    </div>
  );
}
