"use client";

import { type ReactNode } from "react";
import Link from "next/link";

const GLASS_CARD = {
  background: "rgba(255,255,255,0.75)",
  backdropFilter: "blur(12px)",
  boxShadow: "0 2px 12px rgba(15,138,93,0.07), 0 1px 3px rgba(0,0,0,0.04)",
} as const;

const ROW_DIVIDER = "1px solid rgba(15,138,93,0.05)";
const HEAD_DIVIDER = "1px solid rgba(15,138,93,0.07)";
const FOOT_DIVIDER = "1px solid rgba(15,138,93,0.07)";

// ─── Shell ───────────────────────────────────────────────────────────────────

export function TableCard({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl overflow-visible flex flex-col" style={GLASS_CARD}>
      {children}
    </div>
  );
}

// ─── Table primitives ────────────────────────────────────────────────────────

export function Table({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">{children}</table>
    </div>
  );
}

export function Thead({ children }: { children: ReactNode }) {
  return <thead><tr style={{ borderBottom: HEAD_DIVIDER }}>{children}</tr></thead>;
}

export function Th({ children, checkbox, number }: { children?: ReactNode; checkbox?: boolean; number?: boolean }) {
  if (checkbox) {
    return <th className="w-10 px-5 py-3.5 text-left">{children}</th>;
  }
  if (number) {
    return (
      <th
        className="w-10 text-center text-[11px] font-semibold uppercase tracking-wider px-3 py-3.5"
        style={{ color: "#94A3B8" }}
      >
        {children ?? "No."}
      </th>
    );
  }
  return (
    <th
      className="text-left text-[11px] font-semibold uppercase tracking-wider px-3 py-3.5 whitespace-nowrap"
      style={{ color: "#94A3B8" }}
    >
      {children}
    </th>
  );
}

export function Tbody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function Tr({
  children,
  selected,
  last,
}: {
  children: ReactNode;
  selected?: boolean;
  last?: boolean;
}) {
  return (
    <tr
      className="group transition-colors"
      style={{
        borderBottom: last ? "none" : ROW_DIVIDER,
        background: selected ? "rgba(15,138,93,0.04)" : "transparent",
      }}
    >
      {children}
    </tr>
  );
}

export function Td({
  children,
  checkbox,
  number,
}: {
  children: ReactNode;
  checkbox?: boolean;
  number?: boolean;
}) {
  if (checkbox) return <td className="px-5 py-3.5">{children}</td>;
  if (number) {
    return (
      <td className="px-3 py-3.5 text-center text-xs font-semibold tabular-nums" style={{ color: "#94A3B8" }}>
        {children}
      </td>
    );
  }
  return <td className="px-3 py-3.5">{children}</td>;
}

// ─── Empty state ─────────────────────────────────────────────────────────────

export function TableEmpty({
  colSpan,
  title = "Tidak ada data",
  description = "Coba ubah kata kunci atau hapus filter",
}: {
  colSpan: number;
  title?: string;
  description?: string;
}) {
  return (
    <tr>
      <td colSpan={colSpan} className="text-center py-16">
        <div className="flex flex-col items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <p className="text-sm font-medium" style={{ color: "#94A3B8" }}>{title}</p>
          <p className="text-xs" style={{ color: "#CBD5E1" }}>{description}</p>
        </div>
      </td>
    </tr>
  );
}

// ─── Footer / pagination ─────────────────────────────────────────────────────

export function TableFooter({
  info,
  currentPage,
  onPrev,
  onNext,
}: {
  info: string;
  currentPage: number;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  return (
    <div
      className="flex items-center justify-between px-5 py-3.5 text-xs"
      style={{ borderTop: FOOT_DIVIDER, color: "#94A3B8" }}
    >
      <span>{info}</span>
      <div className="flex items-center gap-1">
        <button
          onClick={onPrev}
          className="px-3 h-7 rounded-lg text-xs font-medium transition-colors hover:bg-slate-100 disabled:opacity-40"
          style={{ color: "#64748B" }}
          disabled={currentPage <= 1}
        >
          ← Sebelumnya
        </button>
        <span
          className="px-3 h-7 flex items-center rounded-lg text-xs font-semibold"
          style={{ background: "rgba(15,138,93,0.08)", color: "#0F8A5D" }}
        >
          {currentPage}
        </span>
        <button
          onClick={onNext}
          className="px-3 h-7 rounded-lg text-xs font-medium transition-colors hover:bg-slate-100"
          style={{ color: "#64748B" }}
        >
          Berikutnya →
        </button>
      </div>
    </div>
  );
}

// ─── Row action buttons ───────────────────────────────────────────────────────

export function RowActions({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-1">
      {children}
    </div>
  );
}

const VARIANT_HOVER: Record<string, { text: string; bg: string }> = {
  view:   { text: "#0891B2", bg: "rgba(8,145,178,0.10)" },
  edit:   { text: "#D97706", bg: "rgba(217,119,6,0.10)" },
  delete: { text: "#DC2626", bg: "rgba(220,38,38,0.10)" },
  default:{ text: "#0F8A5D", bg: "rgba(15,138,93,0.08)" },
};

export function RowActionButton({
  href,
  onClick,
  tooltip,
  variant = "default",
  children,
}: {
  href?: string;
  onClick?: () => void;
  tooltip?: string;
  variant?: "view" | "edit" | "delete" | "default";
  children: ReactNode;
}) {
  const v = VARIANT_HOVER[variant];
  const inner = (
    <span className="relative group/btn inline-flex">
      <span
        className="w-7 h-7 flex items-center justify-center rounded-lg transition-all duration-200 ease-out cursor-pointer group-hover/btn:-translate-y-0.5 group-hover/btn:drop-shadow-sm"
        style={{ color: "#C4D3CC" }}
      >
        <span
          className="transition-all duration-200 ease-out group-hover/btn:scale-110 flex items-center justify-center"
          style={{ color: "inherit" }}
        >
          {children}
        </span>
      </span>

      {/* Hover background ring */}
      <span
        className="absolute inset-0 rounded-lg scale-75 opacity-0 group-hover/btn:scale-100 group-hover/btn:opacity-100 transition-all duration-200 ease-out group-hover/btn:-translate-y-0.5"
        style={{ background: v.bg }}
      />

      {/* Hover color overlay — covers icon with variant color */}
      <span
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/btn:opacity-100 transition-all duration-200 ease-out group-hover/btn:scale-110 group-hover/btn:-translate-y-0.5 pointer-events-none"
        style={{ color: v.text }}
        aria-hidden
      >
        {children}
      </span>

      {/* Tooltip */}
      {tooltip && (
        <span
          className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg text-[11px] font-semibold text-white whitespace-nowrap
            opacity-0 scale-90 group-hover/btn:opacity-100 group-hover/btn:scale-100 transition-all duration-150 z-50"
          style={{
            background: "rgba(15,30,22,0.88)",
            backdropFilter: "blur(8px)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.18)",
          }}
        >
          {tooltip}
          <span
            className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
            style={{ borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: "4px solid rgba(15,30,22,0.88)" }}
          />
        </span>
      )}
    </span>
  );

  if (href) return <Link href={href}>{inner}</Link>;
  return <button onClick={onClick}>{inner}</button>;
}
