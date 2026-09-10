import { type ReactNode } from "react";

const STATS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" />
      </svg>
    ),
    value: "2.4rb+",
    label: "Properti terdaftar",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    value: "98%",
    label: "Tingkat approval",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    value: "340+",
    label: "Agent aktif",
  },
];

// ─── Left panel ───────────────────────────────────────────────────────────────

function LeftPanel({ heading, subheading, children }: {
  heading: ReactNode;
  subheading: string;
  children: ReactNode;
}) {
  return (
    <div className="hidden lg:flex w-[55%] shrink-0 flex-col relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(145deg, #064E35 0%, #0A6B48 45%, #0F8A5D 100%)" }} />
      {/* Orbs */}
      <div className="absolute top-[10%] right-[-8%] w-[520px] h-[520px] rounded-full" style={{ background: "radial-gradient(circle, rgba(110,231,183,0.15) 0%, rgba(15,138,93,0.08) 45%, transparent 70%)" }} />
      <div className="absolute -bottom-40 -left-40 w-[480px] h-[480px] rounded-full" style={{ background: "radial-gradient(circle, rgba(6,78,53,0.8) 0%, transparent 65%)" }} />

      <div className="relative flex flex-col justify-between h-full px-12 py-10 xl:px-16 xl:py-14 gap-8">

        {/* Logo */}
        <div className="flex items-center gap-3 animate-fade-in">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.20)" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">kavio</span>
        </div>

        {/* Hero */}
        <div className="flex flex-col gap-6 xl:gap-10 animate-slide-left">
          <div className="flex flex-col gap-3 xl:gap-5">
            <div className="self-start flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: "rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.80)", border: "1px solid rgba(255,255,255,0.14)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-float" />
              Platform Distribusi Properti B2B
            </div>
            <h1 className="font-extrabold leading-[1.06] text-white" style={{ fontSize: "clamp(1.8rem, 2.8vw, 3.4rem)" }}>
              {heading}
            </h1>
            <p className="text-sm leading-relaxed max-w-md" style={{ color: "rgba(255,255,255,0.60)" }}>
              {subheading}
            </p>
          </div>

          {/* Slot for features/steps list */}
          {children}

          {/* Stats bar */}
          <div className="flex items-stretch rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.92)", border: "1px solid rgba(255,255,255,0.20)" }}>
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="flex-1 flex flex-col items-center gap-1.5 py-4 xl:py-5 px-4 text-center"
                style={{ borderRight: i < STATS.length - 1 ? "1px solid rgba(15,138,93,0.15)" : "none" }}
              >
                <span style={{ color: "#0F8A5D" }}>{s.icon}</span>
                <span className="text-2xl font-extrabold leading-none text-slate-900">{s.value}</span>
                <span className="text-xs text-slate-400">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
          © 2025 Golden Sport · Platform Manajemen Keanggotaan
        </p>
      </div>
    </div>
  );
}

// ─── Right panel ──────────────────────────────────────────────────────────────

function RightPanel({ title, subtitle, footerNote, children }: {
  title: string;
  subtitle: string;
  footerNote: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col justify-center px-8 py-12 lg:px-12 xl:px-16 relative overflow-y-auto">
      {/* Dot pattern */}
      <div className="absolute top-8 right-8 pointer-events-none" style={{ opacity: 0.2 }}>
        {Array.from({ length: 6 }).map((_, row) => (
          <div key={row} className="flex gap-3 mb-3">
            {Array.from({ length: 6 }).map((_, col) => (
              <div key={col} className="w-1 h-1 rounded-full bg-[#0F8A5D]" />
            ))}
          </div>
        ))}
      </div>

      <div className="relative w-full max-w-[420px] mx-auto animate-slide-right">
        {/* Mobile logo */}
        <div className="flex lg:hidden items-center gap-2.5 mb-10">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "#0F8A5D" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <span className="text-lg font-bold text-slate-900">kavio</span>
        </div>

        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-[1.75rem] font-bold text-slate-900 tracking-tight leading-tight mb-2">{title}</h2>
          <p className="text-sm text-slate-400">{subtitle}</p>
        </div>

        {/* Form card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: "#FFFFFF",
            border: "1px solid #E2EDE8",
            boxShadow: "0 2px 4px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.08), 0 32px 64px rgba(0,0,0,0.08), 0 8px 32px rgba(15,138,93,0.07)",
          }}
        >
          {children}
        </div>

        {/* Footer note */}
        <p className="text-xs text-center text-slate-300 mt-6">
          {footerNote}{" "}
          <span className="underline cursor-pointer hover:text-slate-500 transition-colors">Syarat & Ketentuan</span>
          {" "}dan{" "}
          <span className="underline cursor-pointer hover:text-slate-500 transition-colors">Kebijakan Privasi</span>
          {" "}Golden Sport.
        </p>
      </div>
    </div>
  );
}

// ─── Shell ────────────────────────────────────────────────────────────────────

export function AuthLayout({
  leftHeading,
  leftSubheading,
  leftContent,
  rightTitle,
  rightSubtitle,
  rightFooterNote,
  children,
}: {
  leftHeading: ReactNode;
  leftSubheading: string;
  leftContent: ReactNode;
  rightTitle: string;
  rightSubtitle: string;
  rightFooterNote: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen lg:h-screen flex overflow-hidden bg-[#F4F9F6]">
      <LeftPanel heading={leftHeading} subheading={leftSubheading}>
        {leftContent}
      </LeftPanel>
      <RightPanel title={rightTitle} subtitle={rightSubtitle} footerNote={rightFooterNote}>
        {children}
      </RightPanel>
    </div>
  );
}
