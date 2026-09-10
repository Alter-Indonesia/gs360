"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Tentang", href: "#about" },
  { label: "Layanan", href: "#services" },
  { label: "Trainer", href: "#trainers" },
  { label: "Paket", href: "#plans" },
];

export function PublicNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Pill wrapper — transitions its own box properties only */}
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
          background: "transparent",
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
          borderRadius: 0,
          border: "none",
          boxShadow: "none",
        }}
      >
        <div
          className="flex items-center justify-between h-full"
          style={{ padding: scrolled ? "0 20px" : "0 24px" }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg, #E8420A 0%, #C93408 100%)", boxShadow: "0 4px 14px rgba(232,66,10,0.40)" }}
            >
              <span className="text-white font-extrabold text-sm tracking-tight">GS</span>
            </div>
            <span className="text-lg font-extrabold tracking-tight text-white">
              Golden<span style={{ color: "#E8420A" }}>Sport</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-xl text-sm transition-colors hover:text-white"
                style={{ color: "rgba(255,255,255,0.65)", fontWeight: scrolled ? 600 : 400 }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-colors hover:text-white"
              style={{ color: "rgba(255,255,255,0.60)" }}
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-white"
              style={{ background: "linear-gradient(135deg, #E8420A 0%, #C93408 100%)", boxShadow: "0 4px 14px rgba(232,66,10,0.35)" }}
            >
              Daftar Member
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden shrink-0 w-10 h-10 flex items-center justify-center rounded-xl"
            style={{ color: "rgba(255,255,255,0.80)", background: "rgba(255,255,255,0.06)" }}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
          >
            {menuOpen
              ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/></svg>
            }
          </button>
        </div>
      </div>

      {/* Mobile dropdown — sits below the pill, outside it so not clipped */}
      {menuOpen && (
        <div
          className="md:hidden mx-4 mt-2 px-5 pb-5 pt-4 flex flex-col gap-1 rounded-2xl"
          style={{ background: "rgba(18,18,18,0.97)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 8px 32px rgba(0,0,0,0.40)" }}
        >
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-3 rounded-xl text-sm font-medium transition-colors hover:bg-white/5"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-2 mt-3">
            <Link
              href="/login"
              className="flex-1 text-center py-3 rounded-xl text-sm font-semibold border"
              style={{ color: "rgba(255,255,255,0.70)", borderColor: "rgba(255,255,255,0.12)" }}
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="flex-1 text-center py-3 rounded-xl text-sm font-bold text-white"
              style={{ background: "linear-gradient(135deg, #E8420A 0%, #C93408 100%)" }}
            >
              Daftar Member
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
