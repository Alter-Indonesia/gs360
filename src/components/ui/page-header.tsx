import { type ReactNode } from "react";
import Link from "next/link";

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-xl font-bold tracking-tight" style={{ color: "#0A3D28" }}>{title}</h1>
        {description && (
          <p className="text-sm mt-0.5" style={{ color: "#5A8070" }}>{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function PrimaryAction({
  href,
  onClick,
  children,
}: {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  const cls = "flex items-center gap-2 h-9 px-4 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90";
  const style = {
    background: "linear-gradient(135deg, #0F8A5D 0%, #0A6B48 100%)",
    boxShadow: "0 4px 14px rgba(15,138,93,0.25)",
  };

  if (href) return <Link href={href} className={cls} style={style}>{children}</Link>;
  return <button onClick={onClick} className={cls} style={style}>{children}</button>;
}

export const PlusIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
