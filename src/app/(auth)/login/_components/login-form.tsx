"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { login } from "@/app/actions/auth";

function EyeOpen() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOff() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" />
      <path d="M12 2 A10 10 0 0 1 22 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passFocused, setPassFocused] = useState(false);

  const PRIMARY = "#0F8A5D";
  const PRIMARY_FOCUS_RING = "rgba(15,138,93,0.12)";
  const BORDER_DEFAULT = "#E2E8F0";
  const BORDER_ERROR = "#EF4444";

  const fieldStyle = (focused: boolean, hasError: boolean) => ({
    border: `1.5px solid ${hasError ? BORDER_ERROR : focused ? PRIMARY : BORDER_DEFAULT}`,
    boxShadow: hasError
      ? "0 0 0 3px rgba(239,68,68,0.10)"
      : focused
      ? `0 0 0 3px ${PRIMARY_FOCUS_RING}`
      : "0 1px 3px rgba(0,0,0,0.04)",
    transition: "border-color 0.18s ease, box-shadow 0.18s ease",
  });

  return (
    <form action={action} className="flex flex-col gap-5">

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
          Email
        </label>
        <div
          className="flex items-center h-11 rounded-xl bg-white overflow-hidden"
          style={fieldStyle(emailFocused, !!state?.errors?.email)}
        >
          <span className="pl-3.5 text-slate-400 shrink-0">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </span>
          <input
            name="email"
            type="email"
            placeholder="nama@perusahaan.com"
            autoComplete="email"
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            className="flex-1 h-full px-3 bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-300"
          />
        </div>
        {state?.errors?.email?.[0] && (
          <p className="text-xs text-red-500">{state.errors.email[0]}</p>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
            Password
          </label>
          <button
            type="button"
            className="text-xs font-medium transition-opacity hover:opacity-60"
            style={{ color: PRIMARY }}
          >
            Lupa password?
          </button>
        </div>
        <div
          className="flex items-center h-11 rounded-xl bg-white overflow-hidden"
          style={fieldStyle(passFocused, !!state?.errors?.password)}
        >
          <span className="pl-3.5 text-slate-400 shrink-0">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </span>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="current-password"
            onFocus={() => setPassFocused(true)}
            onBlur={() => setPassFocused(false)}
            className="flex-1 h-full px-3 bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-300"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
            className="pr-3.5 text-slate-400 transition-colors hover:text-slate-600"
          >
            {showPassword ? <EyeOpen /> : <EyeOff />}
          </button>
        </div>
        {state?.errors?.password?.[0] && (
          <p className="text-xs text-red-500">{state.errors.password[0]}</p>
        )}
      </div>

      {/* Error message */}
      {state?.message && (
        <div
          className="flex items-start gap-2.5 px-4 py-3 rounded-xl text-sm"
          style={{ background: "#FEF2F2", color: "#B91C1C", border: "1px solid #FECACA" }}
        >
          <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {state.message}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={pending}
        className="btn-primary relative h-11 w-full rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{
          background: `linear-gradient(135deg, #0F8A5D 0%, #0A6B48 100%)`,
          boxShadow: "0 4px 14px rgba(15,138,93,0.30)",
        }}
      >
        {pending ? <><Spinner /><span>Masuk...</span></> : "Masuk ke Dashboard"}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-slate-100" />
        <span className="text-xs text-slate-300">atau</span>
        <div className="flex-1 h-px bg-slate-100" />
      </div>

      {/* Register link */}
      <p className="text-sm text-center text-slate-400">
        Belum punya akun perusahaan?{" "}
        <Link
          href="/register"
          className="font-semibold transition-opacity hover:opacity-70"
          style={{ color: PRIMARY }}
        >
          Daftar sekarang
        </Link>
      </p>
    </form>
  );
}
