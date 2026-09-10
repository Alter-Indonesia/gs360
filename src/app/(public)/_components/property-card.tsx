"use client";

import Link from "next/link";
import type { Property } from "../_data/properties";

export function PropertyCard({ p }: { p: Property }) {
  return (
    <Link
      href={`/listing/${p.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
      style={{
        background: "rgba(255,255,255,0.88)",
        border: "1px solid rgba(15,138,93,0.08)",
        boxShadow: "0 2px 8px rgba(15,138,93,0.06)",
      }}
    >
      <div className="relative overflow-hidden aspect-video">
        <img
          src={p.img}
          alt={p.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[11px] font-semibold"
          style={{ background: "rgba(255,255,255,0.92)", color: "#0F8A5D", backdropFilter: "blur(8px)" }}
        >
          {p.type}
        </span>
      </div>

      <div className="flex flex-col gap-1.5 p-4">
        <p className="text-sm font-bold leading-snug line-clamp-2" style={{ color: "#0A2B1E" }}>{p.name}</p>
        <div className="flex items-center gap-1.5 text-xs" style={{ color: "#94A3B8" }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          {p.city}
        </div>
        <p className="text-base font-bold mt-1" style={{ color: "#0F8A5D" }}>{p.price}</p>
      </div>

      <div
        className="px-4 py-3 flex items-center justify-between"
        style={{ borderTop: "1px solid rgba(15,138,93,0.06)" }}
      >
        <span className="text-xs font-semibold" style={{ color: "#0F8A5D" }}>Lihat Detail</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0F8A5D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </div>
    </Link>
  );
}
