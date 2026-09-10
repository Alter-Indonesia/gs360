import { ConsolehubLoginForm } from "./_components/consolehub-login-form";

export const metadata = { title: "Consolehub — Kavio" };

export default function ConsolehubLoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-12 relative"
      style={{ background: "#0F172A" }}
    >
      {/* Subtle glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(22,163,74,0.12) 0%, transparent 65%)" }} />
      </div>

      <div className="relative w-full max-w-sm animate-fade-up">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#16A34A" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <span className="text-xl font-bold text-white">kavio</span>
          </div>
          <span
            className="text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider"
            style={{ background: "rgba(22,163,74,0.15)", color: "#4ADE80", border: "1px solid rgba(22,163,74,0.25)" }}
          >
            Consolehub
          </span>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-7"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="mb-6">
            <h1 className="text-xl font-bold mb-1 text-white">Owner Login</h1>
            <p className="text-sm" style={{ color: "#475569" }}>
              Akses terbatas untuk Owner Platform Kavio
            </p>
          </div>

          <ConsolehubLoginForm />
        </div>

        <p className="text-center text-xs mt-6" style={{ color: "#334155" }}>
          © 2026 Kavio Platform
        </p>
      </div>
    </div>
  );
}
