"use client";

import { useState, useRef, useEffect } from "react";

const MONTHS_ID = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
const DAYS_ID = ["Min","Sen","Sel","Rab","Kam","Jum","Sab"];

function toISO(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function MiniCalendar({
  value,
  from,
  to,
  selecting,
  onSelect,
}: {
  value?: string;
  from: string;
  to: string;
  selecting: "from" | "to";
  onSelect: (iso: string) => void;
}) {
  const today = new Date();
  const initDate = value ? new Date(value + "T00:00:00") : today;
  const [viewYear, setViewYear] = useState(initDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initDate.getMonth());

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const todayISO = toISO(today.getFullYear(), today.getMonth(), today.getDate());

  return (
    <div className="flex flex-col gap-2" style={{ width: 224 }}>
      {/* Month nav */}
      <div className="flex items-center justify-between">
        <button
          onClick={prevMonth}
          className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors hover:bg-emerald-50"
          style={{ color: "#64748B" }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <span className="text-sm font-bold" style={{ color: "#0A3D28" }}>
          {MONTHS_ID[viewMonth]} {viewYear}
        </span>
        <button
          onClick={nextMonth}
          className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors hover:bg-emerald-50"
          style={{ color: "#64748B" }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7">
        {DAYS_ID.map(d => (
          <div key={d} className="h-7 flex items-center justify-center text-[10px] font-semibold" style={{ color: "#94A3B8" }}>
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const iso = toISO(viewYear, viewMonth, day);
          const isFrom = iso === from;
          const isTo = iso === to;
          const inRange = !!from && !!to && iso > from && iso < to;
          const isToday = iso === todayISO;
          const isSelected = isFrom || isTo;

          return (
            <button
              key={i}
              onClick={() => onSelect(iso)}
              className="h-8 w-8 mx-auto flex items-center justify-center text-xs relative transition-all"
              style={{
                background: isSelected
                  ? "linear-gradient(135deg, #0F8A5D 0%, #0A6B48 100%)"
                  : inRange
                  ? "rgba(15,138,93,0.08)"
                  : "transparent",
                color: isSelected ? "#fff" : inRange ? "#0F8A5D" : "#374151",
                fontWeight: isSelected || isToday ? 700 : 400,
                boxShadow: isSelected ? "0 2px 8px rgba(15,138,93,0.35)" : "none",
                borderRadius: (isFrom && to) ? "50% 0 0 50%" : (isTo && from) ? "0 50% 50% 0" : "50%",
              }}
            >
              {day}
              {isToday && !isSelected && (
                <span
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ background: "#0F8A5D" }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Hint */}
      <p className="text-center text-[10px] font-medium mt-0.5" style={{ color: "#94A3B8" }}>
        {selecting === "from" ? "Pilih tanggal mulai" : "Pilih tanggal akhir"}
      </p>
    </div>
  );
}

export interface DateRangeValue {
  from: string;
  to: string;
}

export interface DateRangePickerProps {
  value: DateRangeValue;
  onChange: (value: DateRangeValue) => void;
  /** Text on the trigger button when nothing is selected */
  placeholder?: string;
  /** Extra class names for the trigger button */
  className?: string;
}

export function DateRangePicker({
  value,
  onChange,
  placeholder = "Pilih Tanggal",
  className,
}: DateRangePickerProps) {
  const { from, to } = value;
  const [open, setOpen] = useState(false);
  const [selecting, setSelecting] = useState<"from" | "to">("from");
  const ref = useRef<HTMLDivElement>(null);
  const isActive = from !== "" || to !== "";

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleDaySelect(iso: string) {
    if (selecting === "from") {
      const next: DateRangeValue = { from: iso, to: to && iso > to ? "" : to };
      onChange(next);
      setSelecting("to");
    } else {
      if (from && iso < from) {
        onChange({ from: iso, to: "" });
        setSelecting("to");
      } else {
        onChange({ from, to: iso });
        setOpen(false);
        setSelecting("from");
      }
    }
  }

  function handleClear() {
    onChange({ from: "", to: "" });
    setSelecting("from");
  }

  function formatTriggerLabel() {
    if (!from && !to) return placeholder;
    if (from && to) return `${formatDate(from)} – ${formatDate(to)}`;
    if (from) return `Dari ${formatDate(from)}`;
    return `S.d. ${formatDate(to)}`;
  }

  return (
    <div className={`relative ${className ?? ""}`} ref={ref}>
      {/* Trigger */}
      <button
        onClick={() => { setOpen(v => !v); setSelecting("from"); }}
        className="flex items-center gap-1.5 h-8 px-3 rounded-xl text-xs font-semibold transition-all whitespace-nowrap max-w-[210px]"
        style={
          isActive
            ? { background: "rgba(15,138,93,0.10)", color: "#0F8A5D", boxShadow: "0 4px 10px rgba(15,138,93,0.18), 0 1px 3px rgba(15,138,93,0.10)" }
            : { background: "rgba(255,255,255,0.85)", color: "#64748B", boxShadow: "0 4px 10px rgba(15,138,93,0.07), 0 1px 3px rgba(0,0,0,0.05)" }
        }
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span className="truncate">{formatTriggerLabel()}</span>
        {isActive && (
          <span
            className="flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold text-white shrink-0"
            style={{ background: "#0F8A5D" }}
          >
            1
          </span>
        )}
        <svg
          width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          className={`transition-transform shrink-0 ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute left-0 top-[calc(100%+6px)] z-50 rounded-2xl p-4 flex flex-col gap-3.5"
          style={{
            background: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(24px)",
            boxShadow: "0 12px 40px rgba(10,61,40,0.14), 0 2px 8px rgba(0,0,0,0.06)",
            border: "1px solid rgba(255,255,255,0.90)",
          }}
        >
          {/* Range chips */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelecting("from")}
              className="flex-1 flex flex-col items-start px-3 py-2 rounded-xl transition-all"
              style={{
                background: selecting === "from" ? "rgba(15,138,93,0.08)" : "rgba(0,0,0,0.02)",
                border: selecting === "from" ? "1.5px solid rgba(15,138,93,0.25)" : "1.5px solid transparent",
              }}
            >
              <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: "#94A3B8" }}>Dari</span>
              <span className="text-xs font-semibold mt-0.5" style={{ color: from ? "#0A3D28" : "#CBD5E1" }}>
                {from ? formatDate(from) : "Pilih tanggal"}
              </span>
            </button>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14m-5-5 5 5-5 5" />
            </svg>
            <button
              onClick={() => setSelecting("to")}
              className="flex-1 flex flex-col items-start px-3 py-2 rounded-xl transition-all"
              style={{
                background: selecting === "to" ? "rgba(15,138,93,0.08)" : "rgba(0,0,0,0.02)",
                border: selecting === "to" ? "1.5px solid rgba(15,138,93,0.25)" : "1.5px solid transparent",
              }}
            >
              <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: "#94A3B8" }}>Sampai</span>
              <span className="text-xs font-semibold mt-0.5" style={{ color: to ? "#0A3D28" : "#CBD5E1" }}>
                {to ? formatDate(to) : "Pilih tanggal"}
              </span>
            </button>
          </div>

          <div style={{ height: 1, background: "rgba(15,138,93,0.07)" }} />

          <MiniCalendar
            value={selecting === "from" ? from : to}
            from={from}
            to={to}
            selecting={selecting}
            onSelect={handleDaySelect}
          />

          {isActive && (
            <button
              onClick={handleClear}
              className="flex items-center justify-center gap-1.5 h-8 rounded-xl text-xs font-semibold transition-colors hover:bg-red-50"
              style={{ color: "#EF4444" }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              Reset tanggal
            </button>
          )}
        </div>
      )}
    </div>
  );
}
