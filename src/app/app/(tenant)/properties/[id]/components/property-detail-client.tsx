"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { createStatusBadge } from "@/components/ui/status-badge";

// ─── Mock data ────────────────────────────────────────────────────────────────

const PROPERTY = {
  id: "1",
  name: "Ruko Sudirman No. 12",
  status: "active" as const,
  price: "Rp 3.200.000.000",
  developer: "Agung Podomoro",
  agent: "Budi Santoso",
  marketing: "PT Collection",
  createdAt: "15 Januari 2025",
  address: "Jl. Jenderal Sudirman No. 12, Karet Tengsin, Tanah Abang, Jakarta Pusat, DKI Jakarta 10220",
  description: "Ruko 3 lantai strategis di kawasan bisnis Sudirman, cocok untuk kantor, retail, maupun showroom. Dilengkapi dengan akses parkir basement, keamanan 24 jam, dan fasilitas gedung premium. Lokasi sangat mudah dijangkau dari berbagai penjuru Jakarta.",
  coverUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  photos: [
    { id: 1, url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80", label: "Tampak Depan" },
    { id: 2, url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", label: "Ruang Utama" },
    { id: 3, url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80", label: "Lantai 2" },
    { id: 4, url: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=600&q=80", label: "Basement" },
  ],
  type: "Ruko",
  bank: "BCA",
  city: "Jakarta Pusat",
};

const STATUS_CONFIG = {
  active:   { label: "Aktif",         color: "#0F8A5D", bg: "rgba(15,138,93,0.10)" },
  inactive: { label: "Nonaktif",      color: "#64748B", bg: "rgba(100,116,139,0.10)" },
  sold:     { label: "Terjual",       color: "#0891B2", bg: "rgba(8,145,178,0.10)" },
  pending:  { label: "Pending Klaim", color: "#D97706", bg: "rgba(217,119,6,0.10)" },
} as const;

const StatusBadge = createStatusBadge(STATUS_CONFIG);

// ─── Mock dokumen & klaim ─────────────────────────────────────────────────────

const DOKUMEN = [
  { id: 1, name: "SHM.pdf",        type: "pdf",   size: "2.4 MB", uploadedAt: "10 Jan 2025" },
  { id: 2, name: "AJB.pdf",        type: "pdf",   size: "1.8 MB", uploadedAt: "10 Jan 2025" },
  { id: 3, name: "Foto Depan",     type: "image", size: "3.1 MB", uploadedAt: "12 Jan 2025" },
  { id: 4, name: "Site Plan",      type: "image", size: "5.6 MB", uploadedAt: "12 Jan 2025" },
  { id: 5, name: "Perjanjian",     type: "pdf",   size: "980 KB", uploadedAt: "15 Jan 2025" },
  { id: 6, name: "Video",          type: "video", size: "48 MB",  uploadedAt: "20 Jan 2025" },
];

const KLAIM = [
  { id: "KLM-001", agent: "Ahmad Fauzi",    tanggal: "05 Feb 2025", status: "approved", nominal: "Rp 3.200.000.000" },
  { id: "KLM-002", agent: "Dewi Rahayu",    tanggal: "18 Mar 2025", status: "pending",  nominal: "Rp 3.200.000.000" },
  { id: "KLM-003", agent: "Budi Santoso",   tanggal: "02 Apr 2025", status: "rejected", nominal: "Rp 3.200.000.000" },
];

const KLAIM_STATUS: Record<string, { label: string; color: string; bg: string }> = {
  approved: { label: "Disetujui",  color: "#0F8A5D", bg: "rgba(15,138,93,0.10)" },
  pending:  { label: "Menunggu",   color: "#D97706", bg: "rgba(217,119,6,0.10)" },
  rejected: { label: "Ditolak",    color: "#DC2626", bg: "rgba(220,38,38,0.10)" },
};

// ─── Tab definitions ──────────────────────────────────────────────────────────

const TABS = [
  { key: "overview",   label: "Overview" },
  { key: "dokumen",    label: "Dokumen" },
  { key: "klaim",      label: "Klaim" },
  { key: "timeline",   label: "Timeline" },
  { key: "analitik",   label: "Analitik" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

// ─── Info row ─────────────────────────────────────────────────────────────────

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#94A3B8" }}>{label}</p>
      <div className="text-sm font-semibold" style={{ color: "#0A2B1E" }}>{children}</div>
    </div>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

type Photo = { id: number; url: string | null; label: string };

function Lightbox({
  photos,
  index,
  onClose,
  onNav,
}: {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onNav: (i: number) => void;
}) {
  const visible = photos.filter(p => p.url);
  const current = visible[index];
  const total = visible.length;

  const [dir, setDir] = useState<"left" | "right">("right");
  const [animKey, setAnimKey] = useState(0);
  const [exitUrl, setExitUrl] = useState<string | null>(null);

  const prev = useCallback(() => {
    setExitUrl(visible[index]?.url ?? null);
    setDir("right");
    setAnimKey(k => k + 1);
    onNav((index - 1 + total) % total);
  }, [index, total, onNav, visible]);

  const next = useCallback(() => {
    setExitUrl(visible[index]?.url ?? null);
    setDir("left");
    setAnimKey(k => k + 1);
    onNav((index + 1) % total);
  }, [index, total, onNav, visible]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const EASE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";
  const EASE_IN  = "cubic-bezier(0.4, 0, 1, 1)";

  const mainAnim: React.CSSProperties = {
    animation: dir === "left"
      ? `card-fly-from-right 0.55s ${EASE_OUT} both`
      : `card-fly-from-left 0.55s ${EASE_OUT} both`,
  };

  const ghostLeftAnim: React.CSSProperties = dir === "right" ? {
    animation: `card-fly-from-left 0.55s ${EASE_OUT} both`,
  } : {};

  const ghostRightAnim: React.CSSProperties = dir === "left" ? {
    animation: `card-fly-from-right 0.55s ${EASE_OUT} both`,
  } : {};

  const prevPhoto = visible[(index - 1 + total) % total];
  const nextPhoto = visible[(index + 1) % total];

  if (!current) return null;

  const modal = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-xl"
      onClick={onClose}
    >
      <style>{`
        @keyframes card-fly-from-right {
          0%   { opacity: 0; transform: translateX(60px) scale(0.94); filter: blur(4px); }
          100% { opacity: 1; transform: translateX(0)    scale(1);    filter: blur(0); }
        }
        @keyframes card-fly-from-left {
          0%   { opacity: 0; transform: translateX(-60px) scale(0.94); filter: blur(4px); }
          100% { opacity: 1; transform: translateX(0)     scale(1);    filter: blur(0); }
        }
      `}</style>
      {/* Tombol prev */}
      <button
        className="absolute left-5 top-1/2 z-50 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:bg-white/20"
        style={{ background: "rgba(255,255,255,0.10)", color: "#fff", backdropFilter: "blur(8px)" }}
        onClick={e => { e.stopPropagation(); prev(); }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
      </button>

      {/* Tombol next */}
      <button
        className="absolute right-5 top-1/2 z-50 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:bg-white/20"
        style={{ background: "rgba(255,255,255,0.10)", color: "#fff", backdropFilter: "blur(8px)" }}
        onClick={e => { e.stopPropagation(); next(); }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
      </button>

      {/* Stage */}
      <div
        className="flex flex-col items-center w-full"
        onClick={e => e.stopPropagation()}
      >
        {/* Row: ghost kiri + foto utama + ghost kanan */}
        <div className="flex items-center justify-center w-full">

          {/* Ghost kiri */}
          {total > 1 && prevPhoto?.url ? (
            <div
              key={`prev-${animKey}`}
              className="hidden lg:block shrink-0 rounded-[24px] overflow-hidden cursor-pointer"
              style={{ width: 360, height: 420, opacity: 0.32, filter: "blur(1.5px)", marginRight: -180, zIndex: 10, ...ghostLeftAnim }}
              onClick={e => { e.stopPropagation(); prev(); }}
            >
              <img src={prevPhoto.url} alt={prevPhoto.label} className="w-full h-full object-cover" />
            </div>
          ) : <div className="hidden lg:block" style={{ width: 140 }} />}

          {/* Foto utama */}
          <div
            className="relative overflow-hidden rounded-[28px] lg:rounded-[36px] z-20 shrink-0"
            style={{
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow: "0 25px 80px rgba(0,0,0,0.55)",
              maxWidth: "min(860px, calc(100vw - 340px))",
              width: "100%",
            }}
          >
            {/* Foto lama yang exit — dinonaktifkan */}
            {false && exitUrl && (
              <img
                key={`exit-${animKey}`}
                src={exitUrl ?? undefined}
                alt="exit"
                className="w-full object-cover block absolute inset-0 z-10"
                style={{
                  maxHeight: "68vh",
                  animation: dir === "left"
                    ? `card-exit-left 0.28s ${EASE_IN} both`
                    : `card-exit-right 0.28s ${EASE_IN} both`,
                }}
                onAnimationEnd={() => setExitUrl(null)}
              />
            )}

            <img
              key={animKey}
              src={current.url!}
              alt={current.label}
              className="w-full object-cover block"
              style={{ maxHeight: "68vh", ...mainAnim }}
            />

            {/* Caption overlay */}
            <div
              className="absolute bottom-0 left-0 right-0 px-8 py-7"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.4) 55%, transparent 100%)" }}
            >
              <div
                className="mb-2 inline-flex rounded-full px-3 py-1 text-xs font-medium text-white"
                style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.10)", backdropFilter: "blur(8px)" }}
              >
                {index + 1}/{total}
              </div>
              <h3 className="text-xl font-bold text-white">{current.label}</h3>
            </div>

            {/* Close */}
            <button
              className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:bg-white/20"
              style={{ background: "rgba(0,0,0,0.40)", color: "#fff", backdropFilter: "blur(6px)" }}
              onClick={onClose}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Ghost kanan */}
          {total > 1 && nextPhoto?.url ? (
            <div
              key={`next-${animKey}`}
              className="hidden lg:block shrink-0 rounded-[24px] overflow-hidden cursor-pointer"
              style={{ width: 360, height: 420, opacity: 0.32, filter: "blur(1.5px)", marginLeft: -180, zIndex: 10, ...ghostRightAnim }}
              onClick={e => { e.stopPropagation(); next(); }}
            >
              <img src={nextPhoto.url} alt={nextPhoto.label} className="w-full h-full object-cover" />
            </div>
          ) : <div className="hidden lg:block" style={{ width: 140 }} />}

        </div>

        {/* Thumbnail strip */}
        <div
          className="flex items-center justify-center gap-2 mt-5"
          onClick={e => e.stopPropagation()}
        >
          {visible.map((p, i) => (
            <button
              key={p.id}
              onClick={() => onNav(i)}
              className="rounded-lg overflow-hidden transition-all duration-150 shrink-0"
              style={{
                width: 64, height: 44,
                outline: i === index ? "2px solid #0F8A5D" : "2px solid transparent",
                outlineOffset: 2,
                opacity: i === index ? 1 : 0.4,
                transform: i === index ? "scale(1.06)" : "scale(1)",
              }}
            >
              <img src={p.url!} alt={p.label} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

// ─── Photo placeholder ────────────────────────────────────────────────────────

function PhotoSlot({ label, url, onClick }: { label: string; url: string | null; onClick?: () => void }) {
  if (url) {
    return (
      <div
        className="aspect-video rounded-2xl overflow-hidden relative group/photo cursor-zoom-in"
        onClick={onClick}
      >
        <img src={url} alt={label} className="w-full h-full object-cover transition-transform duration-300 group-hover/photo:scale-105" />
        <div className="absolute inset-0 bg-black/0 group-hover/photo:bg-black/30 transition-all duration-300" />
        {/* Zoom hint */}
        <span
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/photo:opacity-100 transition-opacity duration-200"
        >
          <span className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </span>
        </span>
        <span
          className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-semibold opacity-0 group-hover/photo:opacity-100 transition-opacity duration-200"
          style={{ background: "rgba(0,0,0,0.55)", color: "#fff", backdropFilter: "blur(4px)" }}
        >
          {label}
        </span>
      </div>
    );
  }
  return (
    <div
      className="aspect-video rounded-2xl flex flex-col items-center justify-center gap-2"
      style={{
        background: "rgba(15,138,93,0.04)",
        border: "1.5px dashed rgba(15,138,93,0.18)",
      }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
      <span className="text-[11px] font-medium" style={{ color: "#CBD5E1" }}>{label}</span>
    </div>
  );
}

// ─── Tab content ──────────────────────────────────────────────────────────────

function OverviewTab({ property, onOpenLightbox }: { property: typeof PROPERTY; onOpenLightbox: (i: number) => void }) {
  const visiblePhotos = property.photos.filter(p => p.url);

  return (
    <div className="flex flex-col gap-6">

      {/* Info grid */}
      <div
        className="rounded-2xl p-6"
        style={{
          background: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 2px 12px rgba(15,138,93,0.07), 0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <h3 className="text-sm font-bold mb-4" style={{ color: "#0A3D28" }}>Informasi Properti</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-5">
          <InfoRow label="Status"><StatusBadge status={property.status} /></InfoRow>
          <InfoRow label="Harga">{property.price}</InfoRow>
          <InfoRow label="Tipe">{property.type}</InfoRow>
          <InfoRow label="Developer">{property.developer}</InfoRow>
          <InfoRow label="Agent">{property.agent}</InfoRow>
          <InfoRow label="Marketing">{property.marketing}</InfoRow>
          <InfoRow label="Bank">{property.bank}</InfoRow>
          <InfoRow label="Kota">{property.city}</InfoRow>
          <InfoRow label="Tanggal Dibuat">{property.createdAt}</InfoRow>
        </div>
      </div>

      {/* Address */}
      <div
        className="rounded-2xl p-6"
        style={{
          background: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 2px 12px rgba(15,138,93,0.07), 0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <h3 className="text-sm font-bold mb-3" style={{ color: "#0A3D28" }}>Alamat</h3>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(15,138,93,0.08)", color: "#0F8A5D" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>{property.address}</p>
        </div>
      </div>

      {/* Description */}
      <div
        className="rounded-2xl p-6"
        style={{
          background: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 2px 12px rgba(15,138,93,0.07), 0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <h3 className="text-sm font-bold mb-3" style={{ color: "#0A3D28" }}>Deskripsi</h3>
        <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>{property.description}</p>
      </div>

      {/* Photos */}
      <div
        className="rounded-2xl p-6"
        style={{
          background: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 2px 12px rgba(15,138,93,0.07), 0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold" style={{ color: "#0A3D28" }}>Foto</h3>
          <button
            className="flex items-center gap-1.5 h-8 px-3 rounded-xl text-xs font-semibold transition-colors hover:opacity-80"
            style={{ background: "rgba(15,138,93,0.08)", color: "#0F8A5D" }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Tambah Foto
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {property.photos.map((p) => (
            <PhotoSlot
              key={p.id}
              label={p.label}
              url={p.url}
              onClick={p.url ? () => onOpenLightbox(visiblePhotos.indexOf(p)) : undefined}
            />
          ))}
        </div>
      </div>

    </div>
  );
}

// ─── Dokumen tab ──────────────────────────────────────────────────────────────

const DOC_ICON = {
  pdf: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  image: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
    </svg>
  ),
  video: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><polygon points="8 10 16 10 12 16"/>
      <line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
};

const DOC_COLOR: Record<string, { color: string; bg: string }> = {
  pdf:   { color: "#DC2626", bg: "rgba(220,38,38,0.08)" },
  image: { color: "#0891B2", bg: "rgba(8,145,178,0.08)" },
  video: { color: "#7C3AED", bg: "rgba(124,58,237,0.08)" },
};

function DokumenTab() {
  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-xs" style={{ color: "#94A3B8" }}>{DOKUMEN.length} dokumen</p>
        <button
          className="flex items-center gap-1.5 h-8 px-3 rounded-xl text-xs font-semibold transition-opacity hover:opacity-80"
          style={{ background: "rgba(15,138,93,0.08)", color: "#0F8A5D" }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Upload Dokumen
        </button>
      </div>

      {/* Grid dokumen */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {DOKUMEN.map(doc => {
          const c = DOC_COLOR[doc.type];
          return (
            <div
              key={doc.id}
              className="group flex flex-col gap-3 p-4 rounded-2xl cursor-pointer transition-all hover:shadow-md"
              style={{ background: "rgba(255,255,255,0.80)", border: "1px solid rgba(15,138,93,0.07)" }}
            >
              {/* Preview area */}
              <div
                className="w-full aspect-video rounded-xl flex items-center justify-center"
                style={{ background: c.bg }}
              >
                <div style={{ color: c.color }}>{DOC_ICON[doc.type as keyof typeof DOC_ICON]}</div>
              </div>

              {/* Info */}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: "#1F2937" }}>{doc.name}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: "#94A3B8" }}>{doc.size} · {doc.uploadedAt}</p>
                </div>
                {/* Download */}
                <button
                  className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                  style={{ background: "rgba(15,138,93,0.08)", color: "#0F8A5D" }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Klaim tab ────────────────────────────────────────────────────────────────

function KlaimTab() {
  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-xs" style={{ color: "#94A3B8" }}>{KLAIM.length} klaim tercatat</p>
        <button
          className="flex items-center gap-1.5 h-8 px-3 rounded-xl text-xs font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #0F8A5D 0%, #0A6B48 100%)", boxShadow: "0 4px 12px rgba(15,138,93,0.20)" }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Ajukan Klaim
        </button>
      </div>

      {/* Table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: "1px solid rgba(15,138,93,0.07)" }}
      >
        {/* Head */}
        <div
          className="grid grid-cols-5 px-4 py-3"
          style={{ borderBottom: "1px solid rgba(15,138,93,0.07)", background: "rgba(15,138,93,0.03)" }}
        >
          {["ID Klaim", "Agent", "Tanggal", "Status", "Nominal"].map(h => (
            <span key={h} className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#94A3B8" }}>{h}</span>
          ))}
        </div>

        {/* Rows */}
        {KLAIM.map((k, i) => {
          const s = KLAIM_STATUS[k.status];
          return (
            <div
              key={k.id}
              className="grid grid-cols-5 items-center px-4 py-3.5 transition-colors hover:bg-emerald-50/30"
              style={{ borderBottom: i < KLAIM.length - 1 ? "1px solid rgba(15,138,93,0.05)" : "none" }}
            >
              <span className="text-xs font-semibold font-mono" style={{ color: "#0F8A5D" }}>{k.id}</span>
              <span className="text-sm" style={{ color: "#374151" }}>{k.agent}</span>
              <span className="text-sm" style={{ color: "#64748B" }}>{k.tanggal}</span>
              <span>
                <span
                  className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold"
                  style={{ color: s.color, background: s.bg }}
                >
                  {s.label}
                </span>
              </span>
              <span className="text-sm font-semibold" style={{ color: "#0A3D28" }}>{k.nominal}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Timeline tab ─────────────────────────────────────────────────────────────

const TIMELINE = [
  { id: 1, date: "15 Jan 2025", title: "Properti Didaftarkan",         desc: "Properti berhasil didaftarkan ke platform oleh Admin.",             icon: "add",      color: "#0F8A5D" },
  { id: 2, date: "10 Jan 2025", title: "Dokumen SHM & AJB Diupload",   desc: "2 dokumen legal berhasil diupload dan diverifikasi.",               icon: "doc",      color: "#0891B2" },
  { id: 3, date: "05 Feb 2025", title: "Klaim Diajukan",               desc: "Ahmad Fauzi mengajukan klaim atas properti ini.",                  icon: "klaim",    color: "#D97706" },
  { id: 4, date: "07 Feb 2025", title: "Klaim Disetujui",              desc: "Klaim KLM-001 oleh Ahmad Fauzi disetujui oleh Admin.",             icon: "approved", color: "#0F8A5D" },
  { id: 5, date: "18 Mar 2025", title: "Klaim Baru Diajukan",          desc: "Dewi Rahayu mengajukan klaim baru atas properti ini.",             icon: "klaim",    color: "#D97706" },
  { id: 6, date: "02 Apr 2025", title: "Klaim Ditolak",                desc: "Klaim KLM-003 oleh Budi Santoso ditolak — properti masih aktif.",  icon: "rejected", color: "#DC2626" },
];

const TIMELINE_ICON: Record<string, React.ReactNode> = {
  add:      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  doc:      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  klaim:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
  approved: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  rejected: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
};

function TimelineTab() {
  return (
    <div className="flex flex-col gap-0">
      {TIMELINE.map((item, i) => (
        <div key={item.id} className="flex gap-4">
          {/* Spine */}
          <div className="flex flex-col items-center">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10"
              style={{ background: `${item.color}18`, color: item.color, border: `1.5px solid ${item.color}30` }}
            >
              {TIMELINE_ICON[item.icon]}
            </div>
            {i < TIMELINE.length - 1 && (
              <div className="w-px flex-1 mt-1" style={{ background: "rgba(15,138,93,0.10)", minHeight: 32 }} />
            )}
          </div>

          {/* Content */}
          <div className={`pb-6 min-w-0 flex-1 ${i === TIMELINE.length - 1 ? "pb-0" : ""}`}>
            <div className="flex items-center gap-2 mb-0.5">
              <p className="text-sm font-semibold" style={{ color: "#1F2937" }}>{item.title}</p>
            </div>
            <p className="text-xs mb-1" style={{ color: "#94A3B8" }}>{item.date}</p>
            <p className="text-sm leading-relaxed" style={{ color: "#64748B" }}>{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Analitik tab ─────────────────────────────────────────────────────────────

const LEAD_DATA = [
  { bulan: "Feb", leads: 3, views: 42 },
  { bulan: "Mar", leads: 7, views: 89 },
  { bulan: "Apr", leads: 4, views: 61 },
  { bulan: "Mei", leads: 9, views: 134 },
  { bulan: "Jun", leads: 5, views: 98 },
  { bulan: "Jul", leads: 12, views: 176 },
];

const LEADS = [
  { id: 1, name: "Rina Susanti",   phone: "+62 812-3456-7890", tanggal: "03 Jul 2025", sumber: "Website" },
  { id: 2, name: "Hendra Wijaya",  phone: "+62 857-9012-3456", tanggal: "09 Jul 2025", sumber: "WhatsApp" },
  { id: 3, name: "Melisa Putri",   phone: "+62 821-4567-8901", tanggal: "14 Jul 2025", sumber: "Website" },
  { id: 4, name: "Tono Prasetyo",  phone: "+62 838-2345-6789", tanggal: "18 Jul 2025", sumber: "Referral" },
];

function MiniBar({ value, max, color }: { value: number; max: number; color: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 flex-1">
      <div className="w-full flex items-end" style={{ height: 60 }}>
        <div
          className="w-full rounded-t-md transition-all"
          style={{ height: `${(value / max) * 100}%`, background: color, minHeight: 4 }}
        />
      </div>
    </div>
  );
}

function AnalitikTab() {
  const maxViews = Math.max(...LEAD_DATA.map(d => d.views));
  const maxLeads = Math.max(...LEAD_DATA.map(d => d.leads));
  const totalViews = LEAD_DATA.reduce((s, d) => s + d.views, 0);
  const totalLeads = LEAD_DATA.reduce((s, d) => s + d.leads, 0);
  const convRate = ((totalLeads / totalViews) * 100).toFixed(1);

  return (
    <div className="flex flex-col gap-5">

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Tayangan",   value: totalViews.toString(), sub: "halaman detail dilihat", color: "#0891B2", bg: "rgba(8,145,178,0.08)",
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg> },
          { label: "Total Lead",       value: totalLeads.toString(), sub: "prospek masuk",          color: "#0F8A5D", bg: "rgba(15,138,93,0.08)",
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
          { label: "Konversi",         value: `${convRate}%`,        sub: "tayangan → lead",        color: "#7C3AED", bg: "rgba(124,58,237,0.08)",
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg> },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.80)", border: "1px solid rgba(15,138,93,0.07)" }}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold" style={{ color: "#94A3B8" }}>{s.label}</p>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
            </div>
            <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[11px] mt-0.5" style={{ color: "#CBD5E1" }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.80)", border: "1px solid rgba(15,138,93,0.07)" }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold" style={{ color: "#0A3D28" }}>Tren 6 Bulan Terakhir</h3>
          <div className="flex items-center gap-4 text-[11px]" style={{ color: "#94A3B8" }}>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: "rgba(8,145,178,0.5)" }} />Tayangan</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: "#0F8A5D" }} />Lead</span>
          </div>
        </div>
        <div className="flex items-end gap-2">
          {LEAD_DATA.map(d => (
            <div key={d.bulan} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex items-end gap-0.5" style={{ height: 80 }}>
                <MiniBar value={d.views} max={maxViews} color="rgba(8,145,178,0.35)" />
                <MiniBar value={d.leads} max={maxLeads} color="#0F8A5D" />
              </div>
              <span className="text-[10px] font-medium" style={{ color: "#94A3B8" }}>{d.bulan}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lead list */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(15,138,93,0.07)" }}>
        <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid rgba(15,138,93,0.07)", background: "rgba(15,138,93,0.03)" }}>
          <h3 className="text-sm font-bold" style={{ color: "#0A3D28" }}>Lead Masuk</h3>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(15,138,93,0.10)", color: "#0F8A5D" }}>{LEADS.length} lead</span>
        </div>
        <div className="grid px-4 py-2.5" style={{ gridTemplateColumns: "1fr 1fr 1fr auto", borderBottom: "1px solid rgba(15,138,93,0.06)", background: "rgba(15,138,93,0.02)" }}>
          {["Nama", "No. HP", "Tanggal", "Sumber"].map(h => (
            <span key={h} className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#94A3B8" }}>{h}</span>
          ))}
        </div>
        {LEADS.map((lead, i) => (
          <div
            key={lead.id}
            className="grid px-4 py-3 items-center hover:bg-emerald-50/30 transition-colors"
            style={{ gridTemplateColumns: "1fr 1fr 1fr auto", borderBottom: i < LEADS.length - 1 ? "1px solid rgba(15,138,93,0.05)" : "none" }}
          >
            <span className="text-sm font-semibold" style={{ color: "#1F2937" }}>{lead.name}</span>
            <span className="text-sm font-mono" style={{ color: "#64748B" }}>{lead.phone}</span>
            <span className="text-sm" style={{ color: "#64748B" }}>{lead.tanggal}</span>
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(15,138,93,0.08)", color: "#0F8A5D" }}>{lead.sumber}</span>
          </div>
        ))}
      </div>

    </div>
  );
}

function EmptyTab({ label }: { label: string }) {
  return (
    <div
      className="rounded-2xl flex flex-col items-center justify-center py-20 gap-3"
      style={{
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 2px 12px rgba(15,138,93,0.07), 0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" /><line x1="9" y1="9" x2="15" y2="9" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="15" x2="13" y2="15" />
      </svg>
      <p className="text-sm font-medium" style={{ color: "#94A3B8" }}>Belum ada {label}</p>
      <p className="text-xs" style={{ color: "#CBD5E1" }}>Data akan muncul di sini setelah ditambahkan</p>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function PropertyDetailClient({ id: _id }: { id: string }) {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const property = PROPERTY;
  const visiblePhotos = property.photos.filter(p => p.url);

  return (
    <div className="page-container">
      {lightboxIndex !== null && (
        <Lightbox
          photos={property.photos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNav={setLightboxIndex}
        />
      )}

      {/* Back + breadcrumb */}
      <div className="flex items-center gap-2 text-xs" style={{ color: "#94A3B8" }}>
        <Link href="/app/properties" className="hover:text-emerald-600 transition-colors font-medium">Properti</Link>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
        <span style={{ color: "#0A3D28" }} className="font-semibold truncate">{property.name}</span>
      </div>

      {/* Header card */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 2px 12px rgba(15,138,93,0.07), 0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex flex-col md:flex-row">

          {/* ── Foto utama ── */}
          <div className="md:w-[300px] lg:w-[340px] shrink-0">
            <div
              className="h-52 md:h-full min-h-[200px] relative overflow-hidden"
              style={{ borderRight: "1px solid rgba(15,138,93,0.07)" }}
            >
              {property.coverUrl ? (
                <img
                  src={property.coverUrl}
                  alt={property.name}
                  className="w-full h-full object-cover cursor-zoom-in"
                  onClick={() => setLightboxIndex(0)}
                />
              ) : (
                <div
                  className="w-full h-full flex flex-col items-center justify-center gap-3"
                  style={{ background: "linear-gradient(135deg, rgba(15,138,93,0.07) 0%, rgba(15,138,93,0.03) 100%)" }}
                >
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: "rgba(15,138,93,0.08)", color: "#0F8A5D" }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <p className="text-xs font-semibold" style={{ color: "#94A3B8" }}>Belum ada foto utama</p>
                    <button
                      className="flex items-center gap-1.5 h-7 px-3 rounded-lg text-[11px] font-semibold transition-opacity hover:opacity-80"
                      style={{ background: "rgba(15,138,93,0.10)", color: "#0F8A5D" }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                      Upload Foto
                    </button>
                  </div>
                </div>
              )}

              {/* Badge tipe properti */}
              <span
                className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[11px] font-semibold"
                style={{ background: "rgba(255,255,255,0.88)", color: "#0F8A5D", backdropFilter: "blur(8px)", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}
              >
                {property.type}
              </span>
            </div>
          </div>

          {/* ── Info kanan ── */}
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="flex items-start justify-between gap-4 p-5">
              <div className="min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-lg font-bold tracking-tight" style={{ color: "#0A2B1E" }}>{property.name}</h1>
                  <StatusBadge status={property.status} />
                </div>
                <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                  <span className="text-xs font-medium" style={{ color: "#64748B" }}>
                    {property.city}
                  </span>
                  <span className="text-[10px]" style={{ color: "#CBD5E1" }}>·</span>
                  <span className="text-sm font-bold" style={{ color: "#0F8A5D" }}>
                    {property.price}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`/properties/${property.id}/edit`}
                  className="flex items-center gap-1.5 h-9 px-4 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    background: "rgba(255,255,255,0.85)",
                    color: "#64748B",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    border: "1px solid rgba(148,163,184,0.15)",
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Edit
                </a>
                <button
                  className="flex items-center gap-1.5 h-9 px-4 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg, #0F8A5D 0%, #0A6B48 100%)",
                    boxShadow: "0 4px 14px rgba(15,138,93,0.25)",
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                  Ajukan Klaim
                </button>
              </div>
            </div>

            {/* Quick info strip */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-px mt-auto"
              style={{ borderTop: "1px solid rgba(15,138,93,0.06)", background: "rgba(15,138,93,0.06)" }}
            >
              {[
                { label: "Developer",  value: property.developer },
                { label: "Agent",      value: property.agent },
                { label: "Marketing",  value: property.marketing },
                { label: "Dibuat",     value: property.createdAt },
              ].map(item => (
                <div key={item.label} className="flex flex-col gap-0.5 px-4 py-3" style={{ background: "rgba(255,255,255,0.70)" }}>
                  <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#94A3B8" }}>{item.label}</span>
                  <span className="text-sm font-semibold truncate" style={{ color: "#1F2937" }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Tabs */}
      <div
        className="rounded-2xl overflow-visible flex flex-col"
        style={{
          background: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 2px 12px rgba(15,138,93,0.07), 0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        {/* Tab bar */}
        <div
          className="flex items-center gap-1 px-4 pt-3 overflow-x-auto"
          style={{ borderBottom: "1px solid rgba(15,138,93,0.07)" }}
        >
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="relative flex items-center h-9 px-4 text-sm font-semibold whitespace-nowrap transition-colors rounded-t-xl"
              style={{
                color: activeTab === tab.key ? "#0F8A5D" : "#94A3B8",
                background: activeTab === tab.key ? "rgba(15,138,93,0.06)" : "transparent",
              }}
            >
              {tab.label}
              {activeTab === tab.key && (
                <span
                  className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                  style={{ background: "#0F8A5D" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="p-5">
          {activeTab === "overview"  && <OverviewTab property={property} onOpenLightbox={setLightboxIndex} />}
          {activeTab === "dokumen"   && <DokumenTab />}
          {activeTab === "klaim"     && <KlaimTab />}
          {activeTab === "timeline"  && <TimelineTab />}
          {activeTab === "analitik"  && <AnalitikTab />}
        </div>
      </div>

    </div>
  );
}
