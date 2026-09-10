"use client";

import { useActionState, useState } from "react";
import { consolehubLogin } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ConsolehubLoginForm() {
  const [state, action, pending] = useActionState(consolehubLogin, undefined);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={action} className="flex flex-col gap-4">
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="owner@kavio.id"
        autoComplete="email"
        error={state?.errors?.email?.[0]}
      />
      <Input
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        autoComplete="current-password"
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

      {state?.message && (
        <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm"
          style={{ background: "#FEF2F2", color: "#B91C1C", border: "1px solid #FECACA" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {state.message}
        </div>
      )}

      <Button type="submit" variant="primary" size="lg" loading={pending} className="w-full mt-1">
        {pending ? "Masuk..." : "Masuk ke Consolehub"}
      </Button>
    </form>
  );
}
