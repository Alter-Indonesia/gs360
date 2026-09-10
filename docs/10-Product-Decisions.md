# Product Decisions

## 2026-09-09 — Platform Pivot & Scope

**Keputusan:** Platform diubah dari marketplace properti (Kavio) menjadi platform manajemen operasional internal multi-merchant untuk PT. Satria GS dengan nama **Golden Sport**.

**Alasan:** Bisnis PT. Satria GS mencakup banyak lini (Fitness, Futsal, Kos, Ruko) dan membutuhkan sistem terpusat untuk manajemen member, pembayaran, dan operasional — bukan marketplace eksternal.

**Dampak:** Seluruh arsitektur, database, dan UI dirancang ulang. Prioritas pertama adalah modul Fitness.

---

## 2026-09-09 — Single User Account, Multi-Merchant Membership

**Keputusan:** Satu akun user bisa terdaftar sebagai member di banyak merchant sekaligus. Data cross-merchant tersimpan dan dapat diakses Super Admin.

**Alasan:** Perusahaan perlu tahu apakah seorang customer sudah loyal di satu merchant atau aktif di banyak merchant — untuk keperluan loyalty program, promo, dan retensi.

**Dampak:** Tabel `memberships` menjadi relasi many-to-many antara `users` dan `merchants`. Super Admin punya view khusus lintas merchant.

---

## 2026-09-09 — Role System

**Keputusan:** 4 role — `super_admin`, `merchant_admin`, `staff`, `member`.

**Alasan:** Super Admin (PT. Satria GS) butuh akses penuh lintas merchant. Merchant Admin hanya kelola merchant mereka. Staff hanya untuk operasional harian. Member adalah end user.

**Dampak:** Middleware auth harus cek role + merchant context di setiap request.

---

## 2026-09-09 — Pembayaran Manual Dulu

**Keputusan:** Phase 1 hanya support Cash, Transfer Manual, dan QRIS Manual. Payment gateway di roadmap berikutnya.

**Alasan:** Mempercepat MVP. Verifikasi manual sudah cukup untuk skala awal.

**Dampak:** Flow pembayaran melibatkan upload bukti + verifikasi manual oleh staff.

---

## 2026-09-09 — Personal Training di Modul Fitness

**Keputusan:** Modul Fitness mencakup fitur booking Personal Training. Trainer adalah karyawan internal gym (bukan freelance untuk sekarang). Paket PT bisa terpisah dari membership atau bundling. Jadwal bisa diset oleh trainer maupun admin.

**Alasan:** Member butuh bisa pilih dan book sesi PT langsung dari platform, bukan via WhatsApp atau manual.

**Dampak:** Tambah entitas: `personal_trainers`, `pt_schedules`, `pt_packages`, `pt_bookings`, `pt_payments`. Role `staff` perlu dibedakan antara staff kasir biasa dan trainer.

---

## Template untuk keputusan baru

**Tanggal:**
**Keputusan:**
**Alasan:**
**Dampak:**
