interface SpinnerProps {
  size?: number;
  color?: string;
}

export function Spinner({ size = 16, color = "currentColor" }: SpinnerProps) {
  return (
    <svg
      className="animate-spin shrink-0"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeOpacity="0.25"
        strokeWidth="2.5"
      />
      <path
        d="M12 2 A10 10 0 0 1 22 12"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
