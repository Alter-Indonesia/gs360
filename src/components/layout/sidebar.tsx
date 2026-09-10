"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "./sidebar-context";
import { logout } from "@/app/actions/auth";
import { useTransition } from "react";

const NAV_MAIN = [
  {
    href: "/app/overview",
    label: "Dashboard",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect width="7" height="7" x="3" y="3" rx="1.5" /><rect width="7" height="7" x="14" y="3" rx="1.5" />
        <rect width="7" height="7" x="14" y="14" rx="1.5" /><rect width="7" height="7" x="3" y="14" rx="1.5" />
      </svg>
    ),
  },
  {
    href: "/app/properties",
    label: "Properti",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    href: "/app/leads",
    label: "Lead",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.18 2 2 0 0 1 3.64 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    href: "/app/agents",
    label: "Agent",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    href: "/app/claims",
    label: "Klaim Penjualan",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    href: "/app/documents",
    label: "Dokumen",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
  {
    href: "/app/notifications",
    label: "Notifikasi",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </svg>
    ),
    badge: 3,
  },
  {
    href: "/app/reports",
    label: "Laporan",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
];

const NAV_BOTTOM = [
  {
    href: "/app/settings",
    label: "Pengaturan",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
];

type NavItemDef = { href: string; label: string; icon: React.ReactNode; badge?: number };

function NavItem({ item, collapsed, pathname }: { item: NavItemDef; collapsed: boolean; pathname: string }) {
  const active = pathname === item.href || (item.href !== "/app/overview" && pathname.startsWith(item.href));
  return (
    <Link
      href={item.href}
      title={collapsed ? item.label : undefined}
      className="flex items-center gap-3 px-3 py-[9px] text-sm font-medium transition-all duration-200 relative"
      style={{
        borderRadius: 14,
        background: active ? "rgba(255,255,255,0.82)" : "transparent",
        color: active ? "#0B6B44" : "#4A6358",
        justifyContent: collapsed ? "center" : undefined,
        boxShadow: active
          ? "0 1px 8px rgba(15,138,93,0.10), inset 0 1px 0 rgba(255,255,255,0.9)"
          : "none",
      }}
    >
      <span
        className="shrink-0 transition-all duration-200"
        style={{ color: active ? "#0B8F63" : "#7AA090", opacity: active ? 1 : 0.85 }}
      >
        {item.icon}
      </span>
      {!collapsed && (
        <span className="truncate font-[500]" style={{ letterSpacing: "-0.01em" }}>
          {item.label}
        </span>
      )}
      {!collapsed && item.badge && (
        <span
          className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0"
          style={{ background: "#0B8F63", color: "white", letterSpacing: 0 }}
        >
          {item.badge}
        </span>
      )}
      {collapsed && item.badge && (
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ background: "#0B8F63" }} />
      )}
    </Link>
  );
}

function UserCard({ collapsed }: { collapsed: boolean }) {
  const [pending, startTransition] = useTransition();
  return (
    <div
      className="flex items-center gap-2.5 px-3 py-2.5 cursor-pointer transition-all duration-200"
      style={{
        borderRadius: 18,
        background: "rgba(255,255,255,0.60)",
        boxShadow: "0 1px 8px rgba(15,138,93,0.08), inset 0 1px 0 rgba(255,255,255,0.85)",
        border: "1px solid rgba(255,255,255,0.70)",
        justifyContent: collapsed ? "center" : undefined,
      }}
    >
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold text-white"
        style={{ background: "linear-gradient(135deg, #0F8A5D 0%, #0A6B48 100%)" }}
      >
        A
      </div>
      {!collapsed && (
        <>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold truncate leading-tight" style={{ color: "#1F2937" }}>Admin</p>
            <p className="text-[10px] leading-tight truncate" style={{ color: "#7AA090" }}>PT. Collection</p>
          </div>
          <form action={() => startTransition(async () => { await logout(); })}>
            <button
              type="submit"
              disabled={pending}
              className="shrink-0 p-1 rounded-lg transition-colors hover:bg-red-50"
              title="Keluar"
              style={{ color: "#94A3B8" }}
            >
              {pending ? (
                <svg className="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="rgba(0,0,0,0.15)" strokeWidth="2.5" />
                  <path d="M12 2 A10 10 0 0 1 22 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              )}
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const { collapsed, toggle } = useSidebar();

  return (
    /* Outer wrapper — memberi margin floating effect */
    <div
      className="shrink-0 flex flex-col transition-all duration-300 ease-in-out relative"
      style={{
        width: collapsed ? 96 : 264,
        padding: "20px 0 20px 20px",
      }}
    >
      {/* Toggle button — nempel di tepi kanan panel */}
      <button
        onClick={toggle}
        className="absolute top-[46px] -right-[14px] z-50 w-7 h-7 flex items-center justify-center rounded-full transition-all duration-200"
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.70)",
          boxShadow: "0 2px 8px rgba(15,85,60,0.12)",
          color: "#7AA090",
        }}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        ) : (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        )}
      </button>

      {/* Glass panel */}
      <div
        className="flex flex-col flex-1 overflow-hidden"
        style={{
          borderRadius: 28,
          background: "rgba(255,255,255,0.38)",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          border: "1px solid rgba(255,255,255,0.52)",
          boxShadow: "0 12px 40px rgba(15,85,60,0.08), inset 0 1px 0 rgba(255,255,255,0.55)",
        }}
      >
        {/* Soft top-left light reflection */}
        <div
          className="pointer-events-none absolute"
          style={{
            top: 0, left: 0, right: 0, height: 80, borderRadius: "28px 28px 0 0",
            background: "linear-gradient(160deg, rgba(255,255,255,0.18) 0%, transparent 100%)",
          }}
        />

        {/* Brand */}
        <div className="flex items-center h-[68px] shrink-0 px-4 gap-2.5">
          {/* Logo — klik untuk expand saat collapsed */}
          <div
            onClick={collapsed ? toggle : undefined}
            className="w-9 h-9 rounded-[12px] flex items-center justify-center shrink-0 text-sm font-bold text-white"
            style={{
              background: "linear-gradient(135deg, #0F8A5D 0%, #0A6B48 100%)",
              boxShadow: "0 2px 8px rgba(15,138,93,0.30)",
              cursor: collapsed ? "pointer" : "default",
            }}
            title={collapsed ? "Expand" : undefined}
          >
            P
          </div>

          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate leading-tight" style={{ color: "#1F2937", letterSpacing: "-0.02em" }}>
                PT. Collection
              </p>
              <p className="text-[10px] leading-tight" style={{ color: "#7AA090" }}>Powered by kavio</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 pb-2 flex flex-col gap-0.5 overflow-y-auto overflow-x-hidden scrollbar-none">
          {NAV_MAIN.map((item) => (
            <NavItem key={item.href} item={item} collapsed={collapsed} pathname={pathname} />
          ))}

          <div className="my-2" style={{ borderTop: "1px solid rgba(15,138,93,0.08)" }} />

          {NAV_BOTTOM.map((item) => (
            <NavItem key={item.href} item={item} collapsed={collapsed} pathname={pathname} />
          ))}
        </nav>

        {/* User card */}
        <div className="px-3 pb-4 shrink-0">
          <UserCard collapsed={collapsed} />
        </div>
      </div>
    </div>
  );
}

export function SidebarToggle() {
  const { collapsed, toggle } = useSidebar();
  return (
    <button
      onClick={toggle}
      className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors hover:bg-white/50"
      style={{ color: "#64748B" }}
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M9 3v18" />
        {collapsed ? <path d="m14 9 3 3-3 3" /> : <path d="m16 15-3-3 3-3" />}
      </svg>
    </button>
  );
}
