import { type ReactNode } from "react";

export interface StatusConfig {
  label: string;
  color: string;
  bg: string;
}

export function StatusBadge({ config }: { config: StatusConfig }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
      style={{ background: config.bg, color: config.color }}
    >
      {config.label}
    </span>
  );
}

/**
 * Factory helper — define your status map once, get a typed badge component back.
 *
 * Usage:
 *   const PropertyBadge = createStatusBadge({
 *     active:  { label: "Aktif",    color: "#0F8A5D", bg: "rgba(15,138,93,0.10)" },
 *     sold:    { label: "Terjual",  color: "#0891B2", bg: "rgba(8,145,178,0.10)" },
 *   });
 *
 *   <PropertyBadge status="active" />
 */
export function createStatusBadge<T extends string>(map: Record<T, StatusConfig>) {
  return function Badge({ status }: { status: T }): ReactNode {
    return <StatusBadge config={map[status]} />;
  };
}
