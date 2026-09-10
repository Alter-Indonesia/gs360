"use client";

import { useState } from "react";
import { PROPERTIES, TYPES, CITIES } from "../../_data/properties";
import { PropertyCard } from "../../_components/property-card";

export function ListingClient() {
  const [search, setSearch] = useState("");
  const [type, setType]     = useState("Semua");
  const [city, setCity]     = useState("Semua Kota");

  const filtered = PROPERTIES.filter(p => {
    const q = search.toLowerCase();
    return (
      (!q || p.name.toLowerCase().includes(q) || p.city.toLowerCase().includes(q)) &&
      (type === "Semua" || p.type === type) &&
      (city === "Semua Kota" || p.city === city)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-5 xl:px-8 py-10 flex flex-col gap-8">

      {/* Header */}
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "#0A2B1E" }}>
          Semua Properti
        </h1>
        <p className="text-sm" style={{ color: "#64748B" }}>
          {PROPERTIES.length} properti tersedia dari berbagai kota di Indonesia
        </p>
      </div>

      {/* Filter bar */}
      <div
        className="flex flex-col sm:flex-row gap-3 p-4 rounded-2xl"
        style={{
          background: "rgba(255,255,255,0.82)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 2px 12px rgba(15,138,93,0.07)",
          border: "1px solid rgba(15,138,93,0.08)",
        }}
      >
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Cari nama atau kota..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 h-10 rounded-xl text-sm outline-none transition-all"
            style={{ background: "rgba(15,138,93,0.04)", border: "1px solid rgba(15,138,93,0.10)", color: "#1F2937" }}
          />
        </div>

        <select
          value={type}
          onChange={e => setType(e.target.value)}
          className="h-10 px-3 rounded-xl text-sm outline-none"
          style={{ background: "rgba(15,138,93,0.04)", border: "1px solid rgba(15,138,93,0.10)", color: "#374151", minWidth: 130 }}
        >
          {TYPES.map(t => <option key={t}>{t}</option>)}
        </select>

        <select
          value={city}
          onChange={e => setCity(e.target.value)}
          className="h-10 px-3 rounded-xl text-sm outline-none"
          style={{ background: "rgba(15,138,93,0.04)", border: "1px solid rgba(15,138,93,0.10)", color: "#374151", minWidth: 160 }}
        >
          {CITIES.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Results count */}
      <p className="text-xs -mt-4" style={{ color: "#94A3B8" }}>
        Menampilkan <span className="font-semibold" style={{ color: "#0F8A5D" }}>{filtered.length}</span> properti
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <p className="text-sm font-medium" style={{ color: "#94A3B8" }}>Tidak ada properti yang cocok</p>
          <p className="text-xs" style={{ color: "#CBD5E1" }}>Coba ubah kata kunci atau filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(p => <PropertyCard key={p.id} p={p} />)}
        </div>
      )}
    </div>
  );
}
