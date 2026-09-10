<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project: Golden Sport

Internal platform milik PT. Satria GS untuk manajemen multi-merchant (Fitness, Futsal, Kos, Ruko).

## Stack
- Next.js 16 (App Router, Turbopack)
- TypeScript
- Tailwind CSS v4
- PostgreSQL
- Authentication: JWT via `jose`

## Struktur Folder
- `src/app/(public)/` — landing pages publik
- `src/app/(auth)/` — login, register, join
- `src/app/app/` — dashboard (merchant admin, staff, member)
- `src/components/` — shared components
- `src/lib/` — utilities, db, auth helpers
- `src/types/` — TypeScript types

## Role System
- `super_admin` — akses penuh lintas semua merchant
- `merchant_admin` — akses terbatas ke merchant mereka sendiri
- `staff` — operasional harian (check-in, verifikasi bayar)
- `member` — end user

## Prioritas Sekarang
Phase 1: Fitness MVP — landing page, registrasi member, pembayaran manual, member dashboard, check-in, admin dashboard.

## Konvensi
- Semua teks UI dalam Bahasa Indonesia
- Gunakan Server Actions untuk mutasi data
- Jangan mock database — gunakan koneksi real ke PostgreSQL
- Ikuti struktur route group yang sudah ada
