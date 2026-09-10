"use client";

import { useEffect, type ReactNode } from "react";

interface QRModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function QRModal({ open, onClose, children, title, subtitle }: QRModalProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          background: "rgba(0,0,0,0.70)",
          backdropFilter: "blur(8px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.22s ease",
        }}
      />

      {/* Centered dialog — all breakpoints */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 101,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 20px",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <div
          onClick={e => e.stopPropagation()}
          style={{
            width: "100%",
            maxWidth: 340,
            background: "#161616",
            borderRadius: 24,
            overflow: "hidden",
            opacity: open ? 1 : 0,
            transform: open ? "scale(1) translateY(0)" : "scale(0.94) translateY(12px)",
            transition: "opacity 0.22s ease, transform 0.28s cubic-bezier(0.34, 1.46, 0.64, 1)",
          }}
        >
          {/* Close button */}
          <div className="flex justify-end" style={{ padding: "16px 16px 0" }}>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 rounded-xl"
              style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.50)" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Header — centered */}
          {(title || subtitle) && (
            <div className="text-center" style={{ padding: "4px 20px 0" }}>
              {title && <p className="text-base font-bold text-white">{title}</p>}
              {subtitle && <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.40)" }}>{subtitle}</p>}
            </div>
          )}

          <div className="flex flex-col items-center" style={{ padding: "20px 20px 28px" }}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
