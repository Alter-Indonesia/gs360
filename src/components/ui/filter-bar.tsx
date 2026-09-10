"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";

// ─── Filter pill / dropdown ───────────────────────────────────────────────────

export function FilterDropdown({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: readonly string[];
  selected: string[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = selected.length;
  const isActive = count > 0;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1.5 h-8 px-3 rounded-xl text-xs font-semibold transition-all whitespace-nowrap"
        style={
          isActive
            ? { background: "rgba(15,138,93,0.10)", color: "#0F8A5D", boxShadow: "0 4px 10px rgba(15,138,93,0.18), 0 1px 3px rgba(15,138,93,0.10)" }
            : { background: "rgba(255,255,255,0.85)", color: "#64748B", boxShadow: "0 4px 10px rgba(15,138,93,0.07), 0 1px 3px rgba(0,0,0,0.05)" }
        }
      >
        {label}
        {isActive && (
          <span className="flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold text-white" style={{ background: "#0F8A5D" }}>
            {count}
          </span>
        )}
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute left-0 top-[calc(100%+6px)] z-50 min-w-[170px] rounded-2xl py-1.5 flex flex-col"
          style={{
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 8px 32px rgba(10,61,40,0.12), 0 2px 8px rgba(0,0,0,0.06)",
            border: "1px solid rgba(255,255,255,0.90)",
          }}
        >
          {options.map(opt => {
            const checked = selected.includes(opt);
            return (
              <button
                key={opt}
                onClick={() => onChange(opt)}
                className="flex items-center gap-2.5 px-3.5 py-2 text-sm text-left transition-colors hover:bg-emerald-50/70 w-full"
                style={{ color: checked ? "#0F8A5D" : "#374151" }}
              >
                <span
                  className="w-4 h-4 rounded flex items-center justify-center shrink-0 transition-all"
                  style={checked
                    ? { background: "#0F8A5D", border: "1.5px solid #0F8A5D" }
                    : { background: "transparent", border: "1.5px solid #CBD5E1" }
                  }
                >
                  {checked && (
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </span>
                <span className="font-medium">{opt}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Active filter tag ────────────────────────────────────────────────────────

export function FilterTag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 h-6 pl-2.5 pr-1.5 rounded-full text-xs font-semibold"
      style={{ background: "rgba(15,138,93,0.10)", color: "#0F8A5D", border: "1px solid rgba(15,138,93,0.18)" }}
    >
      {label}
      <button
        onClick={onRemove}
        className="flex items-center justify-center w-3.5 h-3.5 rounded-full hover:bg-emerald-600/20 transition-colors"
      >
        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </span>
  );
}

// ─── Search input ─────────────────────────────────────────────────────────────

export function SearchInput({
  value,
  onChange,
  placeholder = "Cari...",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className="flex items-center gap-2.5 h-9 px-3.5 rounded-xl"
      style={{
        background: "rgba(255,255,255,0.85)",
        boxShadow: focused
          ? "0 4px 14px rgba(15,138,93,0.14), 0 1px 4px rgba(0,0,0,0.06)"
          : "0 4px 10px rgba(15,138,93,0.07), 0 1px 3px rgba(0,0,0,0.05)",
        width: focused || value ? 280 : 172,
        transition: "width 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.2s ease",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={focused ? "#0F8A5D" : "#94A3B8"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.2s", flexShrink: 0 }}>
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="flex-1 bg-transparent outline-none text-sm placeholder:text-slate-300"
        style={{ color: "#1F2937" }}
      />
      {value && (
        <button onClick={() => onChange("")} className="text-slate-300 hover:text-slate-400 transition-colors">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}

// ─── Clear all button ─────────────────────────────────────────────────────────

export function ClearFiltersButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 h-8 px-3 rounded-xl text-xs font-semibold transition-colors hover:bg-red-50"
      style={{ color: "#EF4444" }}
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
      </svg>
      Hapus Filter
    </button>
  );
}

// ─── Filter bar shell ─────────────────────────────────────────────────────────

export function FilterBar({ children }: { children: ReactNode }) {
  return (
    <div className="px-5 pt-4 pb-3.5" style={{ borderBottom: "1px solid rgba(15,138,93,0.07)" }}>
      {children}
    </div>
  );
}

export function FilterRow({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-2">{children}</div>;
}

export function FilterDivider() {
  return <div className="w-px h-5 bg-slate-200 mx-0.5" />;
}

export function FilterTagRow({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
      <span className="text-[11px] font-medium mr-0.5" style={{ color: "#94A3B8" }}>Aktif:</span>
      {children}
    </div>
  );
}
