"use client";

import { type TextareaHTMLAttributes, forwardRef, useState } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, error, className = "", id, ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "#475569" }}
          >
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full rounded-xl bg-white px-3.5 py-3 text-sm outline-none resize-none ${className}`}
          style={{
            color: "#0F172A",
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
          {...props}
        />

        {error ? (
          <p className="text-xs" style={{ color: "#DC2626" }}>{error}</p>
        ) : hint ? (
          <p className="text-xs" style={{ color: "#94A3B8" }}>{hint}</p>
        ) : null}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
