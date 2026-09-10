"use client";

import { useSearchParams } from "next/navigation";
import { useActionState, useState } from "react";
import Link from "next/link";
import { registerMember, RegisterMemberState } from "@/app/actions/member";
import { PLANS } from "@/app/(public)/_data/fitness";

const CHECK_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const EYE_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EYE_OFF_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

function formatPrice(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

export function RegisterClient() {
  const params = useSearchParams();
  const planId = (params.get("plan") ?? "basic") as "basic" | "standard" | "premium";
  const plan = PLANS.find(p => p.id === planId) ?? PLANS[0];

  const [showPass, setShowPass] = useState(false);
  const [state, action, pending] = useActionState<RegisterMemberState, FormData>(registerMember, undefined);

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "#0D0D0D", fontFamily: "inherit" }}
    >
      {/* Left panel — plan summary */}
      <aside
        className="hidden lg:flex flex-col justify-between w-[420px] shrink-0 p-10 xl:p-14"
        style={{ background: "rgba(255,255,255,0.03)", borderRight: "1px solid rgba(255,255,255,0.07)" }}
      >
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #E8420A 0%, #C93408 100%)", boxShadow: "0 4px 14px rgba(232,66,10,0.40)" }}
          >
            <span className="text-white font-extrabold text-sm tracking-tight">GS</span>
          </div>
          <span className="text-lg font-extrabold tracking-tight text-white">
            Golden<span style={{ color: "#E8420A" }}>Sport</span>
          </span>
        </Link>

        {/* Plan card */}
        <div className="flex-1 flex flex-col justify-center gap-8">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>
              Paket yang dipilih
            </p>
            <div
              className="rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xl font-bold text-white">{plan.name}</p>
                  {plan.badge && (
                    <span
                      className="inline-block mt-1 text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(232,66,10,0.18)", color: "#E8420A" }}
                    >
                      {plan.badge}
                    </span>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <p
                    className="text-2xl font-extrabold"
                    style={{ color: plan.highlight ? "#F5C518" : "white" }}
                  >
                    {formatPrice(plan.price)}
                  </p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.40)" }}>{plan.duration}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2.5">
                {plan.features.map(f => (
                  <div key={f} className="flex items-center gap-2.5">
                    <span style={{ color: "#E8420A" }}>{CHECK_ICON}</span>
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Plan switcher */}
          <div>
            <p className="text-xs font-semibold mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>
              Ganti paket
            </p>
            <div className="flex flex-col gap-2">
              {PLANS.map(p => (
                <Link
                  key={p.id}
                  href={`/register?plan=${p.id}`}
                  className="flex items-center justify-between px-4 py-3 rounded-xl transition-all"
                  style={{
                    background: p.id === planId ? "rgba(232,66,10,0.12)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${p.id === planId ? "rgba(232,66,10,0.40)" : "rgba(255,255,255,0.07)"}`,
                  }}
                >
                  <span className="text-sm font-semibold" style={{ color: p.id === planId ? "#E8420A" : "rgba(255,255,255,0.60)" }}>
                    {p.name}
                  </span>
                  <span className="text-sm font-bold" style={{ color: p.id === planId ? "white" : "rgba(255,255,255,0.40)" }}>
                    {formatPrice(p.price)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
          © 2025 Golden Sport. Semua hak dilindungi.
        </p>
      </aside>

      {/* Right panel — form */}
      <main className="flex-1 flex flex-col items-center justify-center px-5 py-12 md:px-10">
        <div className="w-full max-w-[440px]">
          {/* Mobile brand */}
          <Link href="/" className="flex items-center gap-3 lg:hidden mb-8">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #E8420A 0%, #C93408 100%)" }}
            >
              <span className="text-white font-extrabold text-sm">GS</span>
            </div>
            <span className="text-base font-extrabold tracking-tight text-white">
              Golden<span style={{ color: "#E8420A" }}>Sport</span>
            </span>
          </Link>

          <h1 className="text-3xl font-extrabold text-white mb-1">Buat Akun</h1>
          <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.45)" }}>
            Pilih paket dan lengkapi data kamu
          </p>

          {/* Mobile plan switcher */}
          <div className="lg:hidden mb-6 flex flex-col gap-2">
            {PLANS.map(p => (
              <Link
                key={p.id}
                href={`/register?plan=${p.id}`}
                className="flex items-center justify-between px-4 py-3 rounded-xl transition-all"
                style={{
                  background: p.id === planId ? "rgba(232,66,10,0.12)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${p.id === planId ? "rgba(232,66,10,0.45)" : "rgba(255,255,255,0.07)"}`,
                }}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: p.id === planId ? "#E8420A" : "rgba(255,255,255,0.20)" }}
                  />
                  <span
                    className="text-sm font-semibold"
                    style={{ color: p.id === planId ? "white" : "rgba(255,255,255,0.50)" }}
                  >
                    {p.name}
                  </span>
                  {p.badge && (
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(232,66,10,0.18)", color: "#E8420A" }}
                    >
                      {p.badge}
                    </span>
                  )}
                </div>
                <span
                  className="text-sm font-bold"
                  style={{ color: p.id === planId ? (p.highlight ? "#F5C518" : "white") : "rgba(255,255,255,0.35)" }}
                >
                  {formatPrice(p.price)}
                </span>
              </Link>
            ))}
          </div>

          {state?.message && (
            <div
              className="mb-5 px-4 py-3 rounded-xl text-sm"
              style={{ background: "rgba(232,66,10,0.12)", border: "1px solid rgba(232,66,10,0.30)", color: "#FF7A4D" }}
            >
              {state.message}
            </div>
          )}

          <form action={action} className="flex flex-col gap-5">
            <input type="hidden" name="plan" value={planId} />

            {/* Nama */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.70)" }}>
                Nama Lengkap
              </label>
              <input
                type="text"
                name="name"
                defaultValue="Budi Santoso"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: state?.errors?.name ? "1px solid rgba(232,66,10,0.60)" : "1px solid rgba(255,255,255,0.10)",
                  color: "white",
                }}
              />
              {state?.errors?.name && (
                <p className="text-xs" style={{ color: "#FF7A4D" }}>{state.errors.name[0]}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.70)" }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                defaultValue="budi@email.com"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: state?.errors?.email ? "1px solid rgba(232,66,10,0.60)" : "1px solid rgba(255,255,255,0.10)",
                  color: "white",
                }}
              />
              {state?.errors?.email && (
                <p className="text-xs" style={{ color: "#FF7A4D" }}>{state.errors.email[0]}</p>
              )}
            </div>

            {/* No HP */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.70)" }}>
                Nomor HP
              </label>
              <input
                type="tel"
                name="phone"
                defaultValue="081234567890"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: state?.errors?.phone ? "1px solid rgba(232,66,10,0.60)" : "1px solid rgba(255,255,255,0.10)",
                  color: "white",
                }}
              />
              {state?.errors?.phone && (
                <p className="text-xs" style={{ color: "#FF7A4D" }}>{state.errors.phone[0]}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.70)" }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  defaultValue="demo123"
                  className="w-full px-4 py-3 pr-12 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: state?.errors?.password ? "1px solid rgba(232,66,10,0.60)" : "1px solid rgba(255,255,255,0.10)",
                    color: "white",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-lg transition-colors"
                  style={{ color: "rgba(255,255,255,0.40)" }}
                >
                  {showPass ? EYE_OFF_ICON : EYE_ICON}
                </button>
              </div>
              {state?.errors?.password && (
                <p className="text-xs" style={{ color: "#FF7A4D" }}>{state.errors.password[0]}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all mt-1"
              style={{
                background: pending ? "rgba(232,66,10,0.50)" : "linear-gradient(135deg, #E8420A 0%, #C93408 100%)",
                boxShadow: pending ? "none" : "0 4px 18px rgba(232,66,10,0.35)",
                cursor: pending ? "not-allowed" : "pointer",
              }}
            >
              {pending ? "Memproses..." : "Lanjut ke Pembayaran"}
            </button>
          </form>

          <p className="mt-6 text-sm text-center" style={{ color: "rgba(255,255,255,0.40)" }}>
            Sudah punya akun?{" "}
            <Link href="/login" className="font-semibold transition-colors" style={{ color: "#E8420A" }}>
              Masuk
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
