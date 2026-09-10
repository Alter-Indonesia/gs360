"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { requestJoinAgent } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface JoinAgentFormProps {
  companyId: string;
  companyName: string;
}

export function JoinAgentForm({ companyId, companyName }: JoinAgentFormProps) {
  const [state, action, pending] = useActionState(requestJoinAgent, undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  if (state?.message && !state.errors) {
    return (
      <div className="flex flex-col items-center gap-4 text-center animate-fade-up">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: "#DCFCE7" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-base mb-1" style={{ color: "#0F172A" }}>Permintaan Terkirim!</p>
          <p className="text-sm" style={{ color: "#94A3B8" }}>{state.message}</p>
        </div>
        <Link href="/login">
          <Button variant="outline" size="md">Kembali ke Login</Button>
        </Link>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-4">
      <input type="hidden" name="companyId" value={companyId} />

      <Input
        label="Nama Lengkap"
        name="name"
        placeholder="Nama Anda"
        error={state?.errors?.name?.[0]}
      />
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="email@anda.com"
        error={state?.errors?.email?.[0]}
      />
      <Input
        label="Nomor Telepon"
        name="phone"
        type="tel"
        placeholder="08xxxxxxxxxx"
        error={state?.errors?.phone?.[0]}
      />
      <Input
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder="Min. 8 karakter, ada angka & huruf kapital"
        error={state?.errors?.password?.[0]}
        rightIcon={
          <button type="button" onClick={() => setShowPassword((v) => !v)} className="transition-opacity hover:opacity-60" tabIndex={-1}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {showPassword
                ? <><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></>
                : <><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" y1="2" x2="22" y2="22" /></>
              }
            </svg>
          </button>
        }
      />
      <Input
        label="Konfirmasi Password"
        name="confirmPassword"
        type={showConfirm ? "text" : "password"}
        placeholder="Ulangi password"
        error={state?.errors?.confirmPassword?.[0]}
        rightIcon={
          <button type="button" onClick={() => setShowConfirm((v) => !v)} className="transition-opacity hover:opacity-60" tabIndex={-1}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {showConfirm
                ? <><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></>
                : <><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" y1="2" x2="22" y2="22" /></>
              }
            </svg>
          </button>
        }
      />

      {state?.message && state.errors && (
        <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm"
          style={{ background: "#FEF2F2", color: "#B91C1C", border: "1px solid #FECACA" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {state.message}
        </div>
      )}

      <Button type="submit" variant="primary" size="lg" loading={pending} className="w-full mt-1">
        {pending ? "Mengirim..." : `Bergabung ke ${companyName}`}
      </Button>

      <p className="text-xs text-center" style={{ color: "#94A3B8" }}>
        Sudah punya akun?{" "}
        <Link href="/login" className="font-semibold transition-opacity hover:opacity-60" style={{ color: "#16A34A" }}>
          Masuk
        </Link>
      </p>
    </form>
  );
}
