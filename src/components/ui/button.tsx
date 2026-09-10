"use client";

import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 select-none";

    const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-sm",
    };

    const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
      primary:
        "btn-primary bg-primary text-white shadow-sm shadow-primary/20",
      outline:
        "btn-outline bg-white border border-border text-foreground",
      ghost:
        "btn-ghost text-text-secondary hover:text-foreground",
      danger:
        "btn-danger bg-danger text-white shadow-sm shadow-danger/20",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
        {...props}
      >
        {loading ? (
          <>
            <Spinner />
            {children}
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

function Spinner() {
  return (
    <svg
      className="animate-spin shrink-0"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="2.5"
      />
      <path
        d="M12 2 A10 10 0 0 1 22 12"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
