"use client";

import { usePathname } from "next/navigation";

const PAGE_TITLES: Record<string, { label: string; desc: string }> = {
  "/app/overview":      { label: "Dashboard",        desc: "Ringkasan aktivitas perusahaan Anda" },
  "/app/properties":    { label: "Properti",          desc: "Kelola listing properti" },
  "/app/leads":         { label: "Lead",              desc: "Manajemen prospek dan calon pembeli" },
  "/app/agents":        { label: "Agent",             desc: "Manajemen agent penjualan" },
  "/app/claims":        { label: "Klaim Penjualan",   desc: "Workflow klaim penjualan" },
  "/app/documents":     { label: "Dokumen",           desc: "Manajemen dokumen properti" },
  "/app/notifications": { label: "Notifikasi",        desc: "Pemberitahuan terbaru" },
  "/app/reports":       { label: "Laporan",           desc: "Analitik dan laporan penjualan" },
  "/app/settings":      { label: "Pengaturan",        desc: "Konfigurasi akun dan perusahaan" },
};

function getPageMeta(pathname: string) {
  for (const [key, val] of Object.entries(PAGE_TITLES)) {
    if (pathname === key || pathname.startsWith(key + "/")) return val;
  }
  return { label: "Dashboard", desc: "" };
}

export function Navbar() {
  const pathname = usePathname();
  const { label, desc } = getPageMeta(pathname);

  return (
    <header
      className="h-14 shrink-0 flex items-center justify-between px-5 gap-4"
      style={{
        background: "transparent",
      }}
    >
      {/* Left — page title */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold leading-tight" style={{ color: "#0A3D28" }}>{label}</h1>
          </div>
          {desc && <p className="text-xs leading-tight truncate" style={{ color: "#5A8070" }}>{desc}</p>}
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1.5">

        {/* Notification bell */}
        <button
          className="relative w-9 h-9 flex items-center justify-center rounded-xl transition-colors hover:bg-white/60"
          style={{ color: "#4B6358" }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ background: "#0F8A5D", border: "1.5px solid white" }}
          />
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-slate-200 mx-1" />

        {/* Avatar + name */}
        <div className="flex items-center gap-2 pl-1 cursor-pointer group">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0"
            style={{ background: "linear-gradient(135deg, #0F8A5D 0%, #0A6B48 100%)" }}
          >
            A
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-slate-700 leading-tight">Admin</p>
            <p className="text-[10px] text-slate-400 leading-tight">PT. Collection</p>
          </div>
          <svg className="text-slate-300 group-hover:text-slate-500 transition-colors" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
    </header>
  );
}
