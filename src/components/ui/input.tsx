"use client";

import { type InputHTMLAttributes, forwardRef, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, leftIcon, rightIcon, className = "", id, ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "#475569" }}
          >
            {label}
          </label>
        )}

        <div
          className="flex items-center rounded-xl overflow-hidden bg-white"
          style={{
            height: 44,
            border: error
              ? "1.5px solid #DC2626"
              : focused
              ? "1.5px solid #16A34A"
              : "1.5px solid #E2E8F0",
            boxShadow: error
              ? "0 0 0 3px rgba(220,38,38,0.08)"
              : focused
              ? "0 0 0 3px rgba(22,163,74,0.10)"
              : "0 1px 3px rgba(0,0,0,0.04)",
            transition: "border-color 0.18s ease, box-shadow 0.18s ease",
          }}
        >
          {leftIcon && (
            <div className="pl-3 flex items-center shrink-0" style={{ color: "#94A3B8" }}>
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`flex-1 h-full px-3.5 bg-transparent outline-none text-sm ${className}`}
            style={{ color: "#0F172A" }}
            {...props}
          />
          {rightIcon && (
            <div className="pr-3 flex items-center shrink-0" style={{ color: "#94A3B8" }}>
              {rightIcon}
            </div>
          )}
        </div>

        {error ? (
          <p className="text-xs" style={{ color: "#DC2626" }}>{error}</p>
        ) : hint ? (
          <p className="text-xs" style={{ color: "#94A3B8" }}>{hint}</p>
        ) : null}
      </div>
    );
  }
);
Input.displayName = "Input";
