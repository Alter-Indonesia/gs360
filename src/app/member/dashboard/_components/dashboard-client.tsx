"use client";

import { useTransition, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { logoutMember } from "@/app/actions/member";
import { QRModal } from "@/components/ui/qr-modal";

const PROMOS = [
  {
    badge: "PROMO SPESIAL",
    title: "Upgrade ke Premium",
    highlight: "1 Bulan Gratis!",
    desc: "Latih lebih maksimal, capai versi terbaikmu.",
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
  },
  {
    badge: "NEW CLASS",
    title: "HIIT Morning",
    highlight: "Mulai 1 Oktober!",
    desc: "Sesi 45 menit bersama Nadia Putri. Slot terbatas.",
    img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80",
  },
  {
    badge: "MEMBER REWARD",
    title: "Ajak Teman,",
    highlight: "Dapat Cashback!",
    desc: "Referral berhasil = diskon Rp50.000 bulan depan.",
    img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
  },
];

function PromoCarousel() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const reset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setActive(i => (i + 1) % PROMOS.length), 4000);
  };

  useEffect(() => {
    reset();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const go = (i: number) => { setActive(i); reset(); };

  const p = PROMOS[active];

  return (
    <div className="flex flex-col gap-2">
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{ height: 118, background: "#0D0D0D" }}
      >
        {/* BG image — right side only */}
        <img
          src={p.img}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.35, objectPosition: "center right" }}
        />

        {/* Gradient overlay — strong left fade */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, #0D0D0D 45%, rgba(13,13,13,0.70) 65%, rgba(13,13,13,0.10) 100%)" }}
        />

        {/* Content */}
        <div className="relative h-full flex items-center pl-4 pr-4">
          <div className="flex flex-col gap-1.5 min-w-0">
            {/* Badge pill */}
            <div
              className="flex items-center w-fit px-2.5 py-0.5 rounded-full"
              style={{ background: "#F5C518" }}
            >
              <span className="text-xs font-extrabold tracking-wider" style={{ color: "#0D0D0D", fontSize: 10 }}>
                {p.badge}
              </span>
            </div>

            {/* Title */}
            <p className="text-sm font-extrabold text-white leading-tight">
              {p.title}{" "}
              <span style={{ color: "#F5C518" }}>{p.highlight}</span>
            </p>

            {/* Desc */}
            <p className="text-xs leading-snug" style={{ color: "rgba(255,255,255,0.45)", maxWidth: 190 }}>
              {p.desc}
            </p>

            {/* Lihat Detail — solid yellow */}
            <button
              className="flex items-center gap-1.5 text-xs font-bold mt-0.5 w-fit px-3 py-1.5 rounded-lg transition-all"
              style={{
                background: "#F5C518",
                color: "#0D0D0D",
              }}
            >
              Lihat Detail
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0D0D0D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-1.5">
        {PROMOS.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === active ? 16 : 6,
              height: 6,
              background: i === active ? "#F5C518" : "rgba(255,255,255,0.20)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

interface Session {
  name: string;
  email: string;
  phone: string;
  plan: string;
  planName: string;
  planPrice: number;
  paymentMethod: string;
  paymentStatus: string;
  memberSince: string;
  memberId: string;
}


const LOGOUT_ICON = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

const CHEVRON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

const DUMMY_CHECKINS = [
  { date: "Hari ini", time: "07:12", duration: "1j 45m" },
  { date: "Kemarin", time: "18:34", duration: "2j 10m" },
  { date: "2 hari lalu", time: "06:55", duration: "1j 30m" },
];

const QUICK_ACTIONS = [
  {
    label: "Book Personal Training",
    desc: "Jadwalkan sesi 1-on-1 dengan trainer",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    label: "Jadwal Group Class",
    desc: "Lihat & daftar kelas minggu ini",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    label: "Upgrade Paket",
    desc: "Perpanjang atau upgrade membership",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
];

function greeting() {
  const h = new Date().getHours();
  if (h < 11) return "Selamat pagi,";
  if (h < 15) return "Selamat siang,";
  if (h < 18) return "Selamat sore,";
  return "Selamat malam,";
}

interface Props {
  session: Session;
}

export function DashboardClient({ session }: Props) {
  const [loggingOut, startLogout] = useTransition();
  const [showQR, setShowQR] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const isActive = session.paymentStatus === "active";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const initials = session.name
    .split(" ")
    .slice(0, 2)
    .map((w: string) => w[0])
    .join("")
    .toUpperCase();

  const SIDEBAR_NAV = [
    {
      label: "Dashboard",
      active: true,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect width="7" height="7" x="3" y="3" rx="1.5"/><rect width="7" height="7" x="14" y="3" rx="1.5"/>
          <rect width="7" height="7" x="14" y="14" rx="1.5"/><rect width="7" height="7" x="3" y="14" rx="1.5"/>
        </svg>
      ),
    },
    {
      label: "Check-in",
      active: false,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          <polyline points="9 16 11 18 15 14"/>
        </svg>
      ),
    },
    {
      label: "Jadwal Kelas",
      active: false,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
    },
    {
      label: "Personal Training",
      active: false,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8.5" y1="12" x2="15.5" y2="12"/><line x1="2" y1="8" x2="2" y2="16" strokeWidth="2"/><line x1="5" y1="9.5" x2="5" y2="14.5" strokeWidth="2"/>
          <line x1="19" y1="9.5" x2="19" y2="14.5" strokeWidth="2"/><line x1="22" y1="8" x2="22" y2="16" strokeWidth="2"/>
        </svg>
      ),
    },
    {
      label: "Upgrade Paket",
      active: false,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
        </svg>
      ),
    },
    {
      label: "Notifikasi",
      active: false,
      badge: 1,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex" style={{ background: "#0D0D0D" }}>

      {/* ── Desktop Sidebar ── */}
      <div
        className="hidden lg:flex flex-col shrink-0 transition-all duration-300 ease-in-out relative"
        style={{ width: sidebarCollapsed ? 80 : 240, padding: "20px 0 20px 16px" }}
      >
        {/* Toggle button */}
        <button
          onClick={() => setSidebarCollapsed(c => !c)}
          className="absolute top-12 -right-3.5 z-50 w-7 h-7 flex items-center justify-center rounded-full transition-all duration-200"
          style={{
            background: "rgba(30,30,30,0.95)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.40)",
            color: "rgba(255,255,255,0.50)",
          }}
        >
          {sidebarCollapsed
            ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          }
        </button>

        {/* Glass panel */}
        <div
          className="flex flex-col flex-1 overflow-hidden sticky top-5"
          style={{
            borderRadius: 24,
            background: "rgba(22,22,22,0.90)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.40)",
            maxHeight: "calc(100vh - 40px)",
          }}
        >
          {/* Brand */}
          <div className="flex items-center h-16 shrink-0 px-4 gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-extrabold text-white"
              style={{ background: "linear-gradient(135deg, #E8420A 0%, #C93408 100%)", boxShadow: "0 4px 12px rgba(232,66,10,0.40)" }}
            >
              GS
            </div>
            {!sidebarCollapsed && (
              <span className="text-sm font-extrabold tracking-tight text-white">
                Golden<span style={{ color: "#E8420A" }}>Sport</span>
              </span>
            )}
          </div>

          {/* Nav */}
          <nav className="flex-1 px-2.5 pb-2 flex flex-col gap-0.5 overflow-y-auto">
            {SIDEBAR_NAV.map(item => (
              <button
                key={item.label}
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-all duration-200 w-full text-left relative"
                style={{
                  borderRadius: 14,
                  background: item.active ? "rgba(245,197,24,0.12)" : "transparent",
                  color: item.active ? "#F5C518" : "rgba(255,255,255,0.45)",
                  justifyContent: sidebarCollapsed ? "center" : undefined,
                  border: item.active ? "1px solid rgba(245,197,24,0.20)" : "1px solid transparent",
                }}
              >
                <span className="shrink-0" style={{ color: item.active ? "#F5C518" : "rgba(255,255,255,0.35)" }}>
                  {item.icon}
                </span>
                {!sidebarCollapsed && (
                  <span className="truncate">{item.label}</span>
                )}
                {!sidebarCollapsed && item.badge && (
                  <span className="ml-auto text-xs font-bold px-1.5 py-0.5 rounded-full shrink-0" style={{ background: "#E8420A", color: "white", fontSize: 10 }}>
                    {item.badge}
                  </span>
                )}
                {sidebarCollapsed && item.badge && (
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ background: "#E8420A" }} />
                )}
              </button>
            ))}

            <div className="my-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />

            <button
              className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-all duration-200 w-full text-left"
              style={{ borderRadius: 14, color: "rgba(255,255,255,0.35)", justifyContent: sidebarCollapsed ? "center" : undefined }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              {!sidebarCollapsed && <span>Pengaturan</span>}
            </button>
          </nav>

          {/* User card */}
          <div className="px-2.5 pb-4 shrink-0">
            <div
              className="flex items-center gap-2.5 px-3 py-2.5"
              style={{
                borderRadius: 16,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                justifyContent: sidebarCollapsed ? "center" : undefined,
              }}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold"
                style={{ background: "linear-gradient(135deg, #F5C518, #D4A800)", color: "#0D0D0D" }}
              >
                {initials}
              </div>
              {!sidebarCollapsed && (
                <>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white truncate leading-tight">{session.name}</p>
                    <p className="text-xs truncate leading-tight" style={{ color: "rgba(255,255,255,0.35)", fontSize: 10 }}>{session.planName}</p>
                  </div>
                  <button
                    onClick={() => startLogout(() => { logoutMember(); })}
                    disabled={loggingOut}
                    className="shrink-0 p-1.5 rounded-lg transition-colors"
                    style={{ color: "rgba(255,255,255,0.30)" }}
                    title="Keluar"
                  >
                    {LOGOUT_ICON}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 min-w-0 flex flex-col">

      {/* Topbar — mobile only */}
      <header className="fixed top-0 left-0 right-0 z-40 lg:hidden">
        <div
          className="transition-all duration-300"
          style={scrolled ? {
            width: "calc(100% - 32px)",
            maxWidth: 860,
            margin: "12px auto 0",
            height: 52,
            background: "rgba(18,18,18,0.92)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderRadius: 9999,
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.40)",
          } : {
            width: "100%",
            maxWidth: "none",
            margin: 0,
            height: 64,
            background: "rgba(13,13,13,0.80)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: 0,
            border: "none",
            boxShadow: "none",
          }}
        >
          <div
            className="flex items-center justify-between h-full"
            style={{ padding: scrolled ? "0 20px" : "0 20px" }}
          >
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #E8420A 0%, #C93408 100%)" }}>
                <span className="text-white font-extrabold text-xs">GS</span>
              </div>
              <span className="text-sm font-extrabold tracking-tight text-white">
                Golden<span style={{ color: "#E8420A" }}>Sport</span>
              </span>
            </Link>

            <button
              onClick={() => startLogout(() => { logoutMember(); })}
              disabled={loggingOut}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors"
              style={{ color: "rgba(255,255,255,0.45)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              {LOGOUT_ICON}
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      <div className="w-full max-w-2xl mx-auto px-4 md:px-6 flex flex-col gap-5 lg:pt-8 lg:pb-8" style={{ paddingTop: 88, paddingBottom: 40 }}>

        {/* Greeting */}
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "rgba(245,197,24,0.12)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F5C518" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          </div>
          <div>
            <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.40)" }}>{greeting()}</p>
            <p className="text-base font-bold text-white leading-tight">{session.name}</p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Tetap semangat, sehat selalu.</p>
          </div>
        </div>

        {/* Member card */}
        <div
          className="rounded-2xl p-6 relative"
          style={{ background: "#F5C518" }}
        >
          <div className="flex items-start justify-between gap-4">
            {/* Avatar + info */}
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold"
                style={{ background: "rgba(0,0,0,0.12)", color: "#0D0D0D" }}
              >
                {initials}
              </div>
              <div>
                <p className="text-base font-bold leading-tight" style={{ color: "#0D0D0D" }}>{session.name}</p>
                <p className="text-xs mt-0.5 font-medium" style={{ color: "rgba(0,0,0,0.55)" }}>{session.email}</p>
                <div className="flex items-center gap-2 mt-2.5">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-lg"
                    style={{ background: "rgba(0,0,0,0.15)", color: "#0D0D0D" }}
                  >
                    {session.planName}
                  </span>
                  <span
                    className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg"
                    style={{ background: "#E8420A", color: "#fff" }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="#fff" stroke="none">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 14l-3-3 1.41-1.41L11 12.17l4.59-4.58L17 9l-6 6z"/>
                    </svg>
                    {isActive ? "Aktif" : "Pending"}
                  </span>
                </div>
              </div>
            </div>

            {/* Member ID */}
            <div className="text-right shrink-0">
              <p className="text-xs font-medium mb-1" style={{ color: "rgba(0,0,0,0.45)" }}>Member ID</p>
              <p className="text-sm font-extrabold tracking-wider" style={{ color: "#0D0D0D" }}>
                {session.memberId}
              </p>
            </div>
          </div>

          {/* QR button — bottom right */}
          <button
            onClick={() => setShowQR(true)}
            className="absolute bottom-4 right-4 flex items-center justify-center w-9 h-9 rounded-xl transition-all"
            style={{ background: "rgba(0,0,0,0.12)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>
              <rect x="5" y="5" width="3" height="3" fill="#0D0D0D" stroke="none"/><rect x="16" y="5" width="3" height="3" fill="#0D0D0D" stroke="none"/><rect x="5" y="16" width="3" height="3" fill="#0D0D0D" stroke="none"/>
              <line x1="14" y1="14" x2="14" y2="14"/><line x1="17" y1="14" x2="17" y2="14"/><line x1="20" y1="14" x2="20" y2="14"/>
              <line x1="14" y1="17" x2="14" y2="17"/><line x1="17" y1="17" x2="20" y2="17"/><line x1="20" y1="20" x2="14" y2="20"/>
              <line x1="17" y1="20" x2="17" y2="20"/>
            </svg>
          </button>
        </div>

        <QRModal
          open={showQR}
          onClose={() => setShowQR(false)}
          title="Member QR"
          subtitle="Tunjukkan ke staff untuk check-in"
        >
          <div className="flex flex-col items-center gap-5">
            <div className="w-52 h-52 rounded-2xl flex items-center justify-center" style={{ background: "white", padding: 16 }}>
              <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
                <rect x="2" y="2" width="35" height="35" rx="4" fill="#0D0D0D"/>
                <rect x="8" y="8" width="23" height="23" rx="2" fill="white"/>
                <rect x="13" y="13" width="13" height="13" rx="1" fill="#0D0D0D"/>
                <rect x="63" y="2" width="35" height="35" rx="4" fill="#0D0D0D"/>
                <rect x="69" y="8" width="23" height="23" rx="2" fill="white"/>
                <rect x="74" y="13" width="13" height="13" rx="1" fill="#0D0D0D"/>
                <rect x="2" y="63" width="35" height="35" rx="4" fill="#0D0D0D"/>
                <rect x="8" y="69" width="23" height="23" rx="2" fill="white"/>
                <rect x="13" y="74" width="13" height="13" rx="1" fill="#0D0D0D"/>
                <rect x="42" y="2" width="6" height="6" rx="1" fill="#0D0D0D"/>
                <rect x="50" y="2" width="6" height="6" rx="1" fill="#0D0D0D"/>
                <rect x="42" y="10" width="6" height="6" rx="1" fill="#0D0D0D"/>
                <rect x="50" y="18" width="6" height="6" rx="1" fill="#E8420A"/>
                <rect x="42" y="26" width="14" height="6" rx="1" fill="#0D0D0D"/>
                <rect x="2" y="42" width="6" height="6" rx="1" fill="#0D0D0D"/>
                <rect x="10" y="42" width="6" height="6" rx="1" fill="#0D0D0D"/>
                <rect x="26" y="42" width="6" height="6" rx="1" fill="#0D0D0D"/>
                <rect x="42" y="42" width="6" height="6" rx="1" fill="#0D0D0D"/>
                <rect x="50" y="42" width="6" height="6" rx="1" fill="#0D0D0D"/>
                <rect x="58" y="42" width="6" height="6" rx="1" fill="#0D0D0D"/>
                <rect x="66" y="42" width="6" height="6" rx="1" fill="#0D0D0D"/>
                <rect x="74" y="42" width="6" height="6" rx="1" fill="#0D0D0D"/>
                <rect x="82" y="42" width="16" height="6" rx="1" fill="#0D0D0D"/>
                <rect x="58" y="50" width="6" height="6" rx="1" fill="#0D0D0D"/>
                <rect x="74" y="50" width="6" height="6" rx="1" fill="#0D0D0D"/>
                <rect x="50" y="58" width="6" height="14" rx="1" fill="#0D0D0D"/>
                <rect x="58" y="58" width="6" height="6" rx="1" fill="#0D0D0D"/>
                <rect x="66" y="58" width="6" height="6" rx="1" fill="#0D0D0D"/>
                <rect x="82" y="58" width="16" height="6" rx="1" fill="#0D0D0D"/>
                <rect x="58" y="66" width="6" height="6" rx="1" fill="#0D0D0D"/>
                <rect x="66" y="74" width="32" height="6" rx="1" fill="#0D0D0D"/>
                <rect x="58" y="82" width="6" height="16" rx="1" fill="#0D0D0D"/>
                <rect x="66" y="82" width="6" height="6" rx="1" fill="#0D0D0D"/>
                <rect x="82" y="66" width="6" height="6" rx="1" fill="#0D0D0D"/>
                <rect x="90" y="74" width="8" height="24" rx="1" fill="#0D0D0D"/>
                <rect x="66" y="90" width="22" height="8" rx="1" fill="#0D0D0D"/>
              </svg>
            </div>

            <div className="flex flex-col items-center gap-1">
              <p className="text-sm font-extrabold tracking-widest text-white">{session.memberId}</p>
              <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.40)" }}>{session.name}</p>
            </div>
          </div>
        </QRModal>


        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          {/* Check-in */}
          <div className="rounded-xl p-4 flex flex-col items-center justify-center gap-2" style={{ background: "#161616", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div
              className="flex items-center justify-center rounded-xl"
              style={{ width: 40, height: 40, background: "rgba(245,197,24,0.12)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F5C518" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                <polyline points="9 16 11 18 15 14"/>
              </svg>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-2xl font-extrabold text-white leading-tight">3</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.38)" }}>bulan ini</p>
            </div>
            <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.38)" }}>Check-in</p>
          </div>

          {/* Sesi PT */}
          <div className="rounded-xl p-4 flex flex-col items-center justify-center gap-2" style={{ background: "#161616", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div
              className="flex items-center justify-center rounded-xl"
              style={{ width: 40, height: 40, background: "rgba(245,197,24,0.12)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F5C518" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {/* bar center */}
                <line x1="8.5" y1="12" x2="15.5" y2="12"/>
                {/* left plate outer */}
                <line x1="2" y1="8" x2="2" y2="16" strokeWidth="2.5"/>
                {/* left plate inner */}
                <line x1="5" y1="9.5" x2="5" y2="14.5" strokeWidth="2.5"/>
                {/* left connectors */}
                <line x1="2" y1="12" x2="5" y2="12"/>
                <line x1="5" y1="12" x2="8.5" y2="12"/>
                {/* right plate inner */}
                <line x1="19" y1="9.5" x2="19" y2="14.5" strokeWidth="2.5"/>
                {/* right plate outer */}
                <line x1="22" y1="8" x2="22" y2="16" strokeWidth="2.5"/>
                {/* right connectors */}
                <line x1="15.5" y1="12" x2="19" y2="12"/>
                <line x1="19" y1="12" x2="22" y2="12"/>
              </svg>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-2xl font-extrabold text-white leading-tight">2</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.38)" }}>bulan ini</p>
            </div>
            <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.38)" }}>Sesi PT</p>
          </div>

          {/* Hari Tersisa — donut */}
          <div className="rounded-xl p-4 flex flex-col items-center justify-center gap-2" style={{ background: "#161616", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="relative flex items-center justify-center" style={{ width: 56, height: 56 }}>
              <svg width="56" height="56" viewBox="0 0 56 56" style={{ position: "absolute", inset: 0 }}>
                <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4"/>
                <circle
                  cx="28" cy="28" r="22"
                  fill="none"
                  stroke="#F5C518"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${(28 / 30) * 138.2} 138.2`}
                  strokeDashoffset="34.55"
                  transform="rotate(-90 28 28)"
                />
              </svg>
              <span className="text-sm font-extrabold text-white">28</span>
            </div>
            <p className="text-xs font-medium text-center leading-snug" style={{ color: "rgba(255,255,255,0.38)" }}>Hari Tersisa</p>
          </div>
        </div>

        {/* Monthly target */}
        <div
          className="rounded-xl px-4 py-3.5 flex flex-col gap-2.5"
          style={{ background: "#161616", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#F5C518" stroke="none">
                <path d="M13.5 0.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
              </svg>
              <p className="text-xs font-semibold text-white">Target Bulan Ini</p>
            </div>
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-semibold" style={{ color: "#F5C518" }}>Tinggal 2 hari lagi</p>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.30)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>
          </div>

          <p className="text-xl font-bold text-white">28 <span className="text-base" style={{ color: "rgba(255,255,255,0.35)", fontWeight: 500 }}>/ 30 hari aktif</span></p>

          {/* Progress bar */}
          <div className="rounded-full overflow-hidden" style={{ height: 6, background: "rgba(255,255,255,0.08)" }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${(28 / 30) * 100}%`,
                background: "linear-gradient(90deg, #E8420A, #F5C518)",
              }}
            />
          </div>
        </div>

        {/* Promo carousel */}
        <PromoCarousel />

        <div className="grid md:grid-cols-2 gap-4">
          {/* Check-in history */}
          <div
            className="rounded-2xl p-5 flex flex-col gap-4"
            style={{ background: "#161616", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-white">Riwayat Check-in</p>
              <button className="text-xs font-semibold" style={{ color: "#E8420A" }}>Lihat semua</button>
            </div>
            <div className="flex flex-col gap-2">
              {DUMMY_CHECKINS.map((c, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "rgba(232,66,10,0.10)" }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5C518" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{c.date}</p>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.38)" }}>{c.time}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.50)" }}>
                    {c.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div
            className="rounded-2xl p-5 flex flex-col gap-4"
            style={{ background: "#161616", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <p className="text-sm font-bold text-white">Layanan</p>
            <div className="flex flex-col gap-1.5">
              {QUICK_ACTIONS.map(item => (
                <button
                  key={item.label}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-colors"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.50)" }}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{item.label}</p>
                    <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.35)" }}>{item.desc}</p>
                  </div>
                  <span style={{ color: "rgba(255,255,255,0.20)", flexShrink: 0 }}>{CHEVRON}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-xs text-center pb-4" style={{ color: "rgba(255,255,255,0.18)" }}>
          Butuh bantuan? Hubungi staff di meja resepsionis atau WhatsApp 08xx-xxxx-xxxx
        </p>
      </div>

      {/* Floating chat button */}
      <button
        className="fixed flex items-center justify-center transition-all duration-200 active:scale-90 hover:scale-105"
        style={{
          bottom: 28,
          right: 22,
          width: 56,
          height: 56,
          background: "linear-gradient(135deg, #FFD93D 0%, #F5C518 60%, #D4A800 100%)",
          borderRadius: "50%",
          boxShadow: "0 6px 24px rgba(245,197,24,0.50), 0 2px 8px rgba(0,0,0,0.30)",
          zIndex: 50,
        }}
        aria-label="Chat"
      >
        {/* Chat icon */}
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
          <path
            d="M16 4C9.373 4 4 8.925 4 15c0 2.387.823 4.592 2.2 6.393L4.5 27l5.9-1.643C11.968 26.41 13.93 27 16 27c6.627 0 12-4.925 12-11S22.627 4 16 4z"
            fill="#1A1A1A"
          />
          <circle cx="11" cy="15" r="1.5" fill="#F5C518"/>
          <circle cx="16" cy="15" r="1.5" fill="#F5C518"/>
          <circle cx="21" cy="15" r="1.5" fill="#F5C518"/>
        </svg>

        {/* Notification dot */}
        <span
          className="absolute flex items-center justify-center"
          style={{
            top: 1,
            right: 1,
            width: 16,
            height: 16,
            background: "#E8420A",
            borderRadius: "50%",
            border: "2.5px solid #0D0D0D",
            fontSize: 9,
            fontWeight: 800,
            color: "white",
          }}
        >
          1
        </span>
      </button>

      </div>
    </div>
  );
}
