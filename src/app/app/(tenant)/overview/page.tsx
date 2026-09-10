import Link from "next/link";
import { PageHeader, PrimaryAction, PlusIcon } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { createStatusBadge } from "@/components/ui/status-badge";
import { IconBadge } from "@/components/ui/icon-badge";

export const metadata = { title: "Overview — Kavio" };

const STATS_ROW1 = [
  {
    label: "Total Properti", value: "128", delta: "+12 bulan ini", positive: true, color: "#0F8A5D", bg: "rgba(15,138,93,0.08)",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
  },
  {
    label: "Agent Aktif", value: "34", delta: "+3 bulan ini", positive: true, color: "#2563EB", bg: "rgba(37,99,235,0.08)",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  },
  {
    label: "Klaim Pending", value: "7", delta: "Perlu ditindaklanjuti", positive: false, color: "#D97706", bg: "rgba(217,119,6,0.08)",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
  },
  {
    label: "Lead Baru", value: "23", delta: "+5 minggu ini", positive: true, color: "#7C3AED", bg: "rgba(124,58,237,0.08)",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.18 2 2 0 0 1 3.64 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
  },
];

const STATS_ROW2 = [
  {
    label: "Total Nilai Properti", value: "Rp 284 M", delta: "+Rp 18 M bulan ini", positive: true, color: "#0F8A5D", bg: "rgba(15,138,93,0.08)",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
  },
  {
    label: "Klaim Disetujui", value: "52", delta: "+8 bulan ini", positive: true, color: "#16A34A", bg: "rgba(22,163,74,0.08)",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>,
  },
  {
    label: "Property Sold", value: "9", delta: "Bulan Juli 2026", positive: true, color: "#0891B2", bg: "rgba(8,145,178,0.08)",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /><path d="m14 7 2 2 4-4" /></svg>,
  },
];

const RECENT_CLAIMS = [
  { id: "CLM-091", agent: "Budi Santoso",   property: "Ruko Sudirman No. 12",      status: "pending",  date: "Hari ini, 10:24" },
  { id: "CLM-090", agent: "Dewi Rahayu",    property: "Apartemen Kuningan Lt. 8",  status: "approved", date: "Kemarin, 15:42" },
  { id: "CLM-089", agent: "Ahmad Fauzi",    property: "Ruko BSD Blok C No. 3",     status: "approved", date: "Kemarin, 09:11" },
  { id: "CLM-088", agent: "Siti Nurhaliza", property: "Kios Tanah Abang A-12",     status: "pending",  date: "20 Jul, 14:30" },
  { id: "CLM-087", agent: "Reza Pramana",   property: "Gudang Cakung 500m²",       status: "rejected", date: "19 Jul, 08:55" },
];

const RECENT_PROPERTIES = [
  { title: "Ruko Sudirman No. 12",     type: "Ruko",      price: "Rp 3,2 M", status: "active" },
  { title: "Apartemen Kuningan Lt. 8", type: "Apartemen", price: "Rp 1,8 M", status: "active" },
  { title: "Gudang Cakung 500m²",      type: "Gudang",    price: "Rp 5,5 M", status: "inactive" },
  { title: "Kios Tanah Abang A-12",    type: "Kios",      price: "Rp 900 Jt",status: "active" },
];

const CLAIM_STATUS = {
  pending:  { label: "Pending",   bg: "rgba(217,119,6,0.10)",   color: "#B45309" },
  approved: { label: "Disetujui", bg: "rgba(22,163,74,0.10)",   color: "#15803D" },
  rejected: { label: "Ditolak",   bg: "rgba(220,38,38,0.10)",   color: "#DC2626" },
  active:   { label: "Aktif",     bg: "rgba(15,138,93,0.10)",   color: "#0F8A5D" },
  inactive: { label: "Nonaktif",  bg: "rgba(100,116,139,0.10)", color: "#475569" },
} as const;

const StatusBadge = createStatusBadge(CLAIM_STATUS);

const GLASS = { background: "rgba(255,255,255,0.75)", backdropFilter: "blur(12px)", boxShadow: "0 2px 16px rgba(15,138,93,0.07), 0 1px 3px rgba(0,0,0,0.04)" };

export default function OverviewPage() {
  return (
    <div className="page-container">

      <PageHeader
        title="Selamat datang kembali 👋"
        description="Berikut ringkasan aktivitas perusahaan Anda hari ini."
        actions={
          <PrimaryAction href="/app/properties/new">
            {PlusIcon}
            Tambah Properti
          </PrimaryAction>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS_ROW1.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {STATS_ROW2.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4">

        {/* Recent claims */}
        <div className="rounded-2xl overflow-hidden" style={GLASS}>
          <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(15,138,93,0.08)" }}>
            <h2 className="text-sm font-semibold text-slate-800">Klaim Terbaru</h2>
            <Link href="/app/claims" className="text-xs font-semibold transition-opacity hover:opacity-70" style={{ color: "#0F8A5D" }}>Lihat semua →</Link>
          </div>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                {["ID", "Agent", "Properti", "Status", "Waktu"].map(h => (
                  <th key={h} className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-6 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_CLAIMS.map((c, i) => (
                <tr key={c.id} className="transition-colors hover:bg-white/40" style={{ borderBottom: i < RECENT_CLAIMS.length - 1 ? "1px solid rgba(15,138,93,0.06)" : "none" }}>
                  <td className="px-6 py-3.5 text-xs font-mono font-semibold text-slate-500">{c.id}</td>
                  <td className="px-6 py-3.5 text-sm text-slate-700 font-medium">{c.agent}</td>
                  <td className="px-6 py-3.5 text-sm text-slate-500 max-w-[200px] truncate">{c.property}</td>
                  <td className="px-6 py-3.5"><StatusBadge status={c.status as keyof typeof CLAIM_STATUS} /></td>
                  <td className="px-6 py-3.5 text-xs text-slate-400 whitespace-nowrap">{c.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-4">

          {/* Recent properties */}
          <div className="rounded-2xl overflow-hidden" style={GLASS}>
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(15,138,93,0.08)" }}>
              <h2 className="text-sm font-semibold text-slate-800">Properti Terbaru</h2>
              <Link href="/app/properties" className="text-xs font-semibold transition-opacity hover:opacity-70" style={{ color: "#0F8A5D" }}>Lihat semua →</Link>
            </div>
            <div className="flex flex-col">
              {RECENT_PROPERTIES.map((p, i) => (
                <div key={p.title} className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-slate-50" style={{ borderBottom: i < RECENT_PROPERTIES.length - 1 ? "1px solid rgba(15,138,93,0.06)" : "none" }}>
                  <IconBadge
                    size="md"
                    color="#0F8A5D"
                    bg="rgba(15,138,93,0.08)"
                    shadow={false}
                    icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{p.title}</p>
                    <p className="text-xs text-slate-400">{p.type} · {p.price}</p>
                  </div>
                  <StatusBadge status={p.status as keyof typeof CLAIM_STATUS} />
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="rounded-2xl p-5" style={GLASS}>
            <h2 className="text-sm font-semibold text-slate-800 mb-3">Aksi Cepat</h2>
            <div className="flex flex-col gap-2">
              {[
                { href: "/app/properties/new", label: "Tambah properti baru", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> },
                { href: "/app/agents", label: "Undang agent baru", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" /></svg> },
                { href: "/app/claims?filter=pending", label: "Review klaim pending", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg> },
              ].map(action => (
                <Link key={action.href} href={action.href} className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-white/60" style={{ border: "1px solid rgba(15,138,93,0.10)", color: "#3D6B58" }}>
                  <span style={{ color: "#0F8A5D" }}>{action.icon}</span>
                  {action.label}
                  <svg className="ml-auto" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
