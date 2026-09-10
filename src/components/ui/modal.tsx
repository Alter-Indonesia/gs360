"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function Modal({ open, onClose, children, title, subtitle }: ModalProps) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Lock body scroll
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
          background: "rgba(0,0,0,0.65)",
          backdropFilter: "blur(6px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.22s ease",
        }}
      />

      {isDesktop ? (
        /* ── Desktop: centered dialog ── */
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 101,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: open ? "auto" : "none",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 400,
              margin: "0 16px",
              background: "#161616",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: 20,
              overflow: "hidden",
              opacity: open ? 1 : 0,
              transform: open ? "scale(1) translateY(0)" : "scale(0.96) translateY(8px)",
              transition: "opacity 0.22s ease, transform 0.26s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            {/* Header */}
            {(title || subtitle) && (
              <div
                className="flex items-start justify-between"
                style={{ padding: "20px 20px 0" }}
              >
                <div>
                  {title && <p className="text-base font-bold text-white">{title}</p>}
                  {subtitle && <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.40)" }}>{subtitle}</p>}
                </div>
                <button
                  onClick={onClose}
                  className="flex items-center justify-center w-8 h-8 rounded-xl shrink-0"
                  style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.50)" }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            )}

            <div style={{ padding: "20px" }}>
              {children}
            </div>
          </div>
        </div>
      ) : (
        /* ── Mobile: bottom sheet ── */
        <div
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 101,
            padding: "0 10px 10px",
            pointerEvents: open ? "auto" : "none",
            transform: open ? "translateY(0)" : "translateY(100%)",
            opacity: open ? 1 : 0,
            transition: "transform 0.32s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.18s ease",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "#161616",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 24,
              overflow: "hidden",
            }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
            </div>

            {/* Header */}
            {(title || subtitle) && (
              <div
                className="flex items-start justify-between"
                style={{ padding: "12px 20px 0" }}
              >
                <div>
                  {title && <p className="text-base font-bold text-white">{title}</p>}
                  {subtitle && <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.40)" }}>{subtitle}</p>}
                </div>
                <button
                  onClick={onClose}
                  className="flex items-center justify-center w-8 h-8 rounded-xl shrink-0"
                  style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.50)" }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            )}

            <div style={{ padding: "16px 20px 24px" }}>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
