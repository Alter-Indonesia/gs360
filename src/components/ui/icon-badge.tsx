import { type ReactNode } from "react";

type Size = "sm" | "md" | "lg";

const SIZE_MAP: Record<Size, string> = {
  sm: "w-8 h-8 rounded-lg",
  md: "w-9 h-9 rounded-xl",
  lg: "w-10 h-10 rounded-xl",
};

export function IconBadge({
  icon,
  color,
  bg,
  size = "md",
  shadow = true,
}: {
  icon: ReactNode;
  color: string;
  bg: string;
  size?: Size;
  /** Floating shadow effect — matches stat card icon style */
  shadow?: boolean;
}) {
  const opacity = bg.match(/[\d.]+(?=\))/)?.[0] ?? "0.10";
  const shadowColor = bg.replace(/[\d.]+\)$/, `${Math.min(parseFloat(opacity) * 3, 0.40)})}`);

  return (
    <div
      className={`${SIZE_MAP[size]} flex items-center justify-center shrink-0`}
      style={{
        background: bg,
        color,
        boxShadow: shadow
          ? `0 4px 10px ${shadowColor}, 0 1px 3px ${bg.replace(/[\d.]+\)$/, "0.10)")}`
          : undefined,
      }}
    >
      {icon}
    </div>
  );
}
