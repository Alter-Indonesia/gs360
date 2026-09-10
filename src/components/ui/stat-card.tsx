import { type ReactNode } from "react";

export interface StatCardProps {
  label: string;
  value: string;
  /** Small text below value, e.g. "+12 bulan ini" */
  delta?: string;
  /** Green when positive, amber when false */
  positive?: boolean;
  icon: ReactNode;
  color: string;
  bg: string;
}

export function StatCard({ label, value, delta, positive = true, icon, color, bg }: StatCardProps) {
  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-4"
      style={{
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 2px 16px rgba(15,138,93,0.07), 0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500 font-medium">{label}</p>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: bg,
            color,
            boxShadow: `0 4px 10px ${bg.replace(/[\d.]+\)$/, "0.35)")}, 0 1px 3px ${bg.replace(/[\d.]+\)$/, "0.15)")}`,
          }}
        >
          {icon}
        </div>
      </div>
      <div>
        <p className="text-2xl lg:text-3xl font-extrabold text-slate-900 leading-none">{value}</p>
        {delta && (
          <p className="text-xs mt-1.5 font-medium" style={{ color: positive ? "#16A34A" : "#D97706" }}>
            {delta}
          </p>
        )}
      </div>
    </div>
  );
}

/** Compact variant used in property listing page (icon left, value right) */
export function StatCardCompact({ label, value, icon, color, bg }: Omit<StatCardProps, "delta" | "positive">) {
  return (
    <div
      className="rounded-2xl p-4 flex items-center gap-3.5"
      style={{
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 2px 12px rgba(15,138,93,0.07), 0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{
          background: bg,
          color,
          boxShadow: `0 4px 10px ${bg.replace(/[\d.]+\)$/, "0.30)")}, 0 1px 3px ${bg.replace(/[\d.]+\)$/, "0.15)")}`,
        }}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium" style={{ color: "#7A9A8A" }}>{label}</p>
        <p className="text-2xl font-extrabold leading-tight" style={{ color: "#0A2B1E" }}>{value}</p>
      </div>
    </div>
  );
}
