"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { loginMember } from "@/app/actions/member";

const EYE_ICON = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);

const EYE_OFF_ICON = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const BENEFITS = [
  {
    label: "Akses gym unlimited",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F5C518" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8.5" y1="12" x2="15.5" y2="12"/>
        <line x1="2" y1="8" x2="2" y2="16" strokeWidth="2.2"/><line x1="5" y1="9.5" x2="5" y2="14.5" strokeWidth="2.2"/>
        <line x1="19" y1="9.5" x2="19" y2="14.5" strokeWidth="2.2"/><line x1="22" y1="8" x2="22" y2="16" strokeWidth="2.2"/>
        <line x1="2" y1="12" x2="5" y2="12"/><line x1="5" y1="12" x2="8.5" y2="12"/>
        <line x1="15.5" y1="12" x2="19" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/>
      </svg>
    ),
  },
  {
    label: "Booking Personal Training",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F5C518" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        <polyline points="9 16 11 18 15 14"/>
      </svg>
    ),
  },
  {
    label: "Group class & jadwal",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F5C518" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    label: "Tracking progress & check-in",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F5C518" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
];

export function LoginClient() {
  const [showPass, setShowPass] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(async () => { await loginMember(); });
  }

  return (
    <div className="min-h-screen flex" style={{ background: "#0D0D0D" }}>

      {/* ── Left panel (desktop) ── */}
      <aside
        className="hidden lg:flex flex-col justify-between w-[440px] shrink-0 relative overflow-hidden"
        style={{ padding: "48px 44px" }}
      >
        {/* Background image with overlay */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(160deg, #1a0a00 0%, #0D0D0D 60%)",
        }}/>
        {/* Decorative glow */}
        <div className="absolute pointer-events-none" style={{
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232,66,10,0.18) 0%, transparent 70%)",
          top: -80, left: -80,
        }}/>
        <div className="absolute pointer-events-none" style={{
          width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,197,24,0.10) 0%, transparent 70%)",
          bottom: 40, right: -60,
        }}/>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}/>
        {/* Right border */}
        <div className="absolute right-0 top-0 bottom-0 w-px" style={{ background: "rgba(255,255,255,0.06)" }}/>

        {/* Brand */}
        <Link href="/" className="relative flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #E8420A 0%, #C93408 100%)", boxShadow: "0 4px 16px rgba(232,66,10,0.45)" }}
          >
            <span className="text-white font-extrabold text-sm tracking-tight">GS</span>
          </div>
          <span className="text-lg font-extrabold tracking-tight text-white">
            Golden<span style={{ color: "#E8420A" }}>Sport</span>
          </span>
        </Link>

        {/* Center content */}
        <div className="relative flex-1 flex flex-col justify-center gap-10">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-xs font-bold tracking-wider"
              style={{ background: "rgba(245,197,24,0.10)", border: "1px solid rgba(245,197,24,0.20)", color: "#F5C518" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"/>
              MEMBER PORTAL
            </div>
            <h2 className="text-4xl font-extrabold text-white leading-tight">
              Selamat<br/>datang<br/>
              <span style={{ color: "#E8420A" }}>kembali.</span>
            </h2>
            <p className="text-sm mt-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.45)", maxWidth: 300 }}>
              Akses dashboard, booking trainer, dan pantau progres keanggotaan kamu.
            </p>
          </div>

          {/* Benefits */}
          <div className="flex flex-col gap-3">
            {BENEFITS.map(b => (
              <div key={b.label} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(245,197,24,0.08)", border: "1px solid rgba(245,197,24,0.14)" }}
                >
                  {b.icon}
                </div>
                <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.60)" }}>{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs" style={{ color: "rgba(255,255,255,0.20)" }}>
          © 2025 Golden Sport. Semua hak dilindungi.
        </p>
      </aside>

      {/* ── Right panel — form ── */}
      <main className="flex-1 flex flex-col items-center justify-center px-5 py-12 md:px-10 relative">
        {/* Subtle top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{
          width: 480, height: 2,
          background: "linear-gradient(90deg, transparent, rgba(232,66,10,0.50), transparent)",
        }}/>

        <div className="w-full max-w-[400px]">

          {/* Mobile brand */}
          <Link href="/" className="flex items-center gap-2.5 lg:hidden mb-10">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #E8420A 0%, #C93408 100%)", boxShadow: "0 4px 12px rgba(232,66,10,0.40)" }}>
              <span className="text-white font-extrabold text-sm">GS</span>
            </div>
            <span className="text-base font-extrabold tracking-tight text-white">Golden<span style={{ color: "#E8420A" }}>Sport</span></span>
          </Link>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-white mb-1.5">Masuk</h1>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.40)" }}>
              Akses dashboard keanggotaan kamu
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.45)" }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                defaultValue="budi@email.com"
                className="w-full px-4 py-3.5 rounded-2xl text-sm outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  color: "white",
                }}
                onFocus={e => e.currentTarget.style.border = "1px solid rgba(232,66,10,0.50)"}
                onBlur={e => e.currentTarget.style.border = "1px solid rgba(255,255,255,0.09)"}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Password
                </label>
                <button type="button" className="text-xs font-medium transition-colors" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Lupa password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  defaultValue="demo123"
                  className="w-full px-4 py-3.5 pr-12 rounded-2xl text-sm outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    color: "white",
                  }}
                  onFocus={e => e.currentTarget.style.border = "1px solid rgba(232,66,10,0.50)"}
                  onBlur={e => e.currentTarget.style.border = "1px solid rgba(255,255,255,0.09)"}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-xl transition-colors"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  {showPass ? EYE_OFF_ICON : EYE_ICON}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={pending}
              className="w-full py-3.5 rounded-2xl text-sm font-bold text-white transition-all mt-2 relative overflow-hidden"
              style={{
                background: pending ? "rgba(232,66,10,0.40)" : "linear-gradient(135deg, #E8420A 0%, #C93408 100%)",
                boxShadow: pending ? "none" : "0 4px 20px rgba(232,66,10,0.40)",
                cursor: pending ? "not-allowed" : "pointer",
              }}
            >
              {pending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.25)" strokeWidth="2.5"/>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                  Memproses...
                </span>
              ) : "Masuk"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }}/>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>atau</span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }}/>
          </div>

          {/* Register link */}
          <div
            className="flex items-center justify-between px-4 py-3.5 rounded-2xl"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <span className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>Belum punya akun?</span>
            <Link
              href="/register"
              className="flex items-center gap-1.5 text-sm font-bold transition-colors"
              style={{ color: "#E8420A" }}
            >
              Daftar Member
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
