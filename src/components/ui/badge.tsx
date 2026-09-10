interface BadgeProps {
  variant?: "success" | "warning" | "danger" | "info" | "neutral" | "primary";
  children: React.ReactNode;
  className?: string;
}

const variants: Record<NonNullable<BadgeProps["variant"]>, { bg: string; text: string; border: string }> = {
  success: { bg: "#F0FDF4", text: "#15803D", border: "#BBF7D0" },
  warning: { bg: "#FFFBEB", text: "#B45309", border: "#FDE68A" },
  danger:  { bg: "#FEF2F2", text: "#B91C1C", border: "#FECACA" },
  info:    { bg: "#EFF6FF", text: "#1D4ED8", border: "#BFDBFE" },
  neutral: { bg: "#F8FAFC", text: "#475569", border: "#E2E8F0" },
  primary: { bg: "#F0FDF4", text: "#15803D", border: "#BBF7D0" },
};

export function Badge({ variant = "neutral", children, className = "" }: BadgeProps) {
  const v = variants[variant];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${className}`}
      style={{
        background: v.bg,
        color: v.text,
        border: `1px solid ${v.border}`,
      }}
    >
      {children}
    </span>
  );
}
