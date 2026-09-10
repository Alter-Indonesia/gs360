"use client";

import { useState } from "react";
import {
  FilterBar, FilterRow, FilterDivider, FilterTagRow,
  FilterDropdown, FilterTag, SearchInput, ClearFiltersButton,
} from "@/components/ui/filter-bar";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import {
  TableCard, Table, Thead, Th, Tbody, Tr, Td,
  TableEmpty, TableFooter, RowActions, RowActionButton,
} from "@/components/ui/table";
import { StatCardCompact } from "@/components/ui/stat-card";
import { createStatusBadge } from "@/components/ui/status-badge";
import { PageHeader, PrimaryAction, PlusIcon } from "@/components/ui/page-header";

// ─── Static data ──────────────────────────────────────────────────────────────

const STATS = [
  {
    label: "Total Properti", value: "128", color: "#0F8A5D", bg: "rgba(15,138,93,0.10)",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
  },
  {
    label: "Aktif", value: "103", color: "#16A34A", bg: "rgba(22,163,74,0.10)",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
  },
  {
    label: "Terjual", value: "21", color: "#0891B2", bg: "rgba(8,145,178,0.10)",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /><path d="m14 7 2 2 4-4" /></svg>,
  },
  {
    label: "Pending Klaim", value: "8", color: "#D97706", bg: "rgba(217,119,6,0.10)",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
  },
];

const PROPERTIES = [
  { id: 1, name: "Ruko Sudirman No. 12",       type: "Ruko",      city: "Jakarta Pusat",   price: "Rp 3,2 M", bank: "BCA",     marketing: "Budi Santoso",   status: "active",   createdAt: "2025-01-15" },
  { id: 2, name: "Gudang Cakung 500m²",         type: "Gudang",    city: "Jakarta Timur",   price: "Rp 5,5 M", bank: "Mandiri", marketing: "Ahmad Fauzi",    status: "inactive", createdAt: "2025-02-03" },
  { id: 3, name: "Apartemen Kuningan Lt. 8",    type: "Apartemen", city: "Jakarta Selatan", price: "Rp 1,8 M", bank: "BNI",     marketing: "Dewi Rahayu",    status: "active",   createdAt: "2025-03-20" },
  { id: 4, name: "Ruko BSD Blok C No. 3",       type: "Ruko",      city: "Tangerang",       price: "Rp 2,9 M", bank: "BCA",     marketing: "Reza Pramana",   status: "active",   createdAt: "2025-04-11" },
  { id: 5, name: "Kios Tanah Abang A-12",       type: "Kios",      city: "Jakarta Pusat",   price: "Rp 900 Jt",bank: "BTN",     marketing: "Siti Nurhaliza", status: "sold",     createdAt: "2025-05-07" },
  { id: 6, name: "Vila Puncak Bogor",           type: "Vila",      city: "Bogor",           price: "Rp 4,1 M", bank: "BRI",     marketing: "Budi Santoso",   status: "pending",  createdAt: "2025-06-18" },
  { id: 7, name: "Ruko Kelapa Gading B5",       type: "Ruko",      city: "Jakarta Utara",   price: "Rp 3,7 M", bank: "BCA",     marketing: "Ahmad Fauzi",    status: "active",   createdAt: "2025-07-02" },
  { id: 8, name: "Kantor Sudirman Tower Lt. 12",type: "Kantor",    city: "Jakarta Pusat",   price: "Rp 8,2 M", bank: "Mandiri", marketing: "Dewi Rahayu",    status: "active",   createdAt: "2025-07-14" },
];

const STATUS_CONFIG = {
  active:   { label: "Aktif",         color: "#0F8A5D", bg: "rgba(15,138,93,0.10)" },
  inactive: { label: "Nonaktif",      color: "#64748B", bg: "rgba(100,116,139,0.10)" },
  sold:     { label: "Terjual",       color: "#0891B2", bg: "rgba(8,145,178,0.10)" },
  pending:  { label: "Pending Klaim", color: "#D97706", bg: "rgba(217,119,6,0.10)" },
};

const STATUS_LABEL_TO_KEY: Record<string, string> = {
  "Aktif": "active", "Nonaktif": "inactive", "Terjual": "sold", "Pending Klaim": "pending",
};

const FILTER_DEFS = [
  { key: "status",    label: "Status",    options: ["Aktif", "Nonaktif", "Terjual", "Pending Klaim"] as const },
  { key: "type",      label: "Jenis",     options: ["Ruko", "Gudang", "Apartemen", "Kios", "Vila", "Kantor"] as const },
  { key: "marketing", label: "Marketing", options: ["Budi Santoso", "Ahmad Fauzi", "Dewi Rahayu", "Reza Pramana", "Siti Nurhaliza"] as const },
  { key: "city",      label: "Kota",      options: ["Jakarta Pusat", "Jakarta Selatan", "Jakarta Timur", "Jakarta Utara", "Tangerang", "Bogor"] as const },
  { key: "bank",      label: "Bank",      options: ["BCA", "Mandiri", "BNI", "BRI", "BTN"] as const },
] as const;

type FilterKey = (typeof FILTER_DEFS)[number]["key"];
type Filters = Record<FilterKey, string[]>;

// ─── Sub-components ───────────────────────────────────────────────────────────

const StatusBadge = createStatusBadge(STATUS_CONFIG);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PropertiesClient() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const [filters, setFilters] = useState<Filters>({ status: [], type: [], marketing: [], city: [], bank: [] });
  const [date, setDate] = useState({ from: "", to: "" });

  const toggleFilter = (key: FilterKey, value: string) =>
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter(v => v !== value) : [...prev[key], value],
    }));

  const removeFilterValue = (key: FilterKey, value: string) =>
    setFilters(prev => ({ ...prev, [key]: prev[key].filter(v => v !== value) }));

  const clearAll = () => {
    setFilters({ status: [], type: [], marketing: [], city: [], bank: [] });
    setSearch("");
    setDate({ from: "", to: "" });
  };

  const isDateActive = date.from !== "" || date.to !== "";
  const activeTagCount = Object.values(filters).reduce((n, arr) => n + arr.length, 0) + (isDateActive ? 1 : 0);
  const hasActive = activeTagCount > 0 || search.trim().length > 0;

  const filtered = PROPERTIES.filter(p => {
    const q = search.toLowerCase();
    return (
      (!q || p.name.toLowerCase().includes(q) || p.type.toLowerCase().includes(q) || p.city.toLowerCase().includes(q)) &&
      (filters.status.length === 0 || filters.status.some(s => STATUS_LABEL_TO_KEY[s] === p.status)) &&
      (filters.type.length === 0 || filters.type.includes(p.type)) &&
      (filters.marketing.length === 0 || filters.marketing.includes(p.marketing)) &&
      (filters.city.length === 0 || filters.city.includes(p.city)) &&
      (filters.bank.length === 0 || filters.bank.includes(p.bank)) &&
      (!date.from || p.createdAt >= date.from) &&
      (!date.to || p.createdAt <= date.to)
    );
  });

  const toggleAll = () =>
    setSelected(selected.length === filtered.length ? [] : filtered.map(p => p.id));

  const toggleOne = (id: number) =>
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const dateTagLabel = () => {
    const fmt = (s: string) => new Date(s + "T00:00:00").toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
    if (date.from && date.to) return `${fmt(date.from)} – ${fmt(date.to)}`;
    if (date.from) return `Dari ${fmt(date.from)}`;
    return `S.d. ${fmt(date.to)}`;
  };

  return (
    <div className="page-container">

      <PageHeader
        title="Properti"
        description="Kelola seluruh listing properti perusahaan"
        actions={
          <PrimaryAction href="/app/properties/new">
            {PlusIcon}
            Tambah Properti
          </PrimaryAction>
        }
      />

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {STATS.map(s => <StatCardCompact key={s.label} {...s} />)}
      </div>

      {/* Table card */}
      <TableCard>

        <FilterBar>
          <FilterRow>
            <SearchInput value={search} onChange={setSearch} placeholder="Cari properti..." />
            <FilterDivider />
            {FILTER_DEFS.map(f => (
              <FilterDropdown
                key={f.key}
                label={f.label}
                options={f.options}
                selected={filters[f.key]}
                onChange={val => toggleFilter(f.key, val)}
              />
            ))}
            <DateRangePicker
              placeholder="Tanggal Dibuat"
              value={date}
              onChange={setDate}
            />
            {hasActive && <ClearFiltersButton onClick={clearAll} />}
          </FilterRow>

          {activeTagCount > 0 && (
            <FilterTagRow>
              {FILTER_DEFS.map(f =>
                filters[f.key].map(val => (
                  <FilterTag key={`${f.key}-${val}`} label={val} onRemove={() => removeFilterValue(f.key, val)} />
                ))
              )}
              {isDateActive && (
                <FilterTag label={dateTagLabel()} onRemove={() => setDate({ from: "", to: "" })} />
              )}
            </FilterTagRow>
          )}
        </FilterBar>

        <Table>
          <Thead>
            <Th checkbox>
              <input
                type="checkbox"
                checked={selected.length === filtered.length && filtered.length > 0}
                onChange={toggleAll}
                className="w-4 h-4 rounded accent-emerald-600 cursor-pointer"
              />
            </Th>
            <Th number />
            <Th>{/* actions */}</Th>
            {["Nama Properti", "Jenis", "Kota", "Harga", "Bank", "Marketing", "Status"].map(h => (
              <Th key={h}>{h}</Th>
            ))}
          </Thead>
          <Tbody>
            {filtered.length === 0 ? (
              <TableEmpty colSpan={10} title="Tidak ada properti yang cocok" />
            ) : filtered.map((p, i) => (
              <Tr key={p.id} selected={selected.includes(p.id)} last={i === filtered.length - 1}>
                <Td checkbox>
                  <input
                    type="checkbox"
                    checked={selected.includes(p.id)}
                    onChange={() => toggleOne(p.id)}
                    className="w-4 h-4 rounded accent-emerald-600 cursor-pointer"
                  />
                </Td>
                <Td number>{i + 1}</Td>
                <Td>
                  <RowActions>
                    <RowActionButton href={`/app/properties/${p.id}`} tooltip="Lihat Detail" variant="view">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
                      </svg>
                    </RowActionButton>
                    <RowActionButton href={`/app/properties/${p.id}/edit`} tooltip="Edit" variant="edit">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </RowActionButton>
                  </RowActions>
                </Td>
                <Td><p className="text-sm font-semibold" style={{ color: "#1F2937" }}>{p.name}</p></Td>
                <Td><span className="text-sm" style={{ color: "#64748B" }}>{p.type}</span></Td>
                <Td><span className="text-sm" style={{ color: "#64748B" }}>{p.city}</span></Td>
                <Td><span className="text-sm font-semibold" style={{ color: "#0A3D28" }}>{p.price}</span></Td>
                <Td><span className="text-sm" style={{ color: "#64748B" }}>{p.bank}</span></Td>
                <Td><span className="text-sm" style={{ color: "#64748B" }}>{p.marketing}</span></Td>
                <Td><StatusBadge status={p.status as keyof typeof STATUS_CONFIG} /></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <TableFooter
          info={selected.length > 0
            ? `${selected.length} properti dipilih`
            : `Menampilkan ${filtered.length} dari ${PROPERTIES.length} properti`
          }
          currentPage={1}
        />

      </TableCard>
    </div>
  );
}
