"use client";

import { type SelectHTMLAttributes, forwardRef, useState } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, hint, error, placeholder, className = "", id, children, ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "#475569" }}
          >
            {label}
          </label>
        )}

        <div
          className="relative flex items-center rounded-xl bg-white"
          style={{
            height: 44,
            border: error
              ? "1.5px solid #DC2626"
              : focused
              ? "1.5px solid #16A34A"
              : "1.5px solid #E2E8F0",
            boxShadow: focused
              ? "0 0 0 3px rgba(22,163,74,0.10)"
              : "0 1px 3px rgba(0,0,0,0.04)",
            transition: "border-color 0.18s ease, box-shadow 0.18s ease",
          }}
        >
          <select
            ref={ref}
            id={selectId}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`w-full h-full pl-3.5 pr-9 bg-transparent outline-none text-sm appearance-none ${className}`}
            style={{ color: "#0F172A" }}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {children}
          </select>
          <div className="absolute right-3 pointer-events-none" style={{ color: "#94A3B8" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
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
Select.displayName = "Select";
