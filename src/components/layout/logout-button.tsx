"use client";

import { useTransition } from "react";
import { logout } from "@/app/actions/auth";

export function LogoutButton({ collapsed }: { collapsed?: boolean }) {
  const [pending, startTransition] = useTransition();

  return (
    <form action={() => startTransition(async () => { await logout(); })}>
      <button
        type="submit"
        disabled={pending}
        title={collapsed ? "Keluar" : undefined}
        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
        style={{ justifyContent: collapsed ? "center" : undefined }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        {!collapsed && (pending ? "Keluar..." : "Keluar")}
      </button>
    </form>
  );
}
