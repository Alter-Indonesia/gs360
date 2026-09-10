# Database

## Stack
- **PostgreSQL**

---

## Entitas Utama

### users
Satu akun untuk semua merchant. Bisa jadi member di banyak tempat.
- id, name, email, phone, password_hash
- role: `super_admin` | `merchant_admin` | `staff` | `member`
- created_at, updated_at

### merchants
Tiap lini bisnis = satu merchant.
- id, name, type: `fitness` | `futsal` | `kos` | `ruko`
- address, phone, logo
- created_at

### merchant_staff
Relasi user (admin/staff) ke merchant tertentu.
- id, user_id, merchant_id, role: `admin` | `staff`

### membership_plans
Paket yang ditawarkan tiap merchant.
- id, merchant_id, name, duration_days, price
- description, is_active

### memberships
Relasi member ke merchant — satu user bisa punya banyak record di sini.
- id, user_id, merchant_id, plan_id
- status: `pending` | `active` | `expired` | `cancelled`
- start_date, end_date
- created_at

### payments
- id, membership_id, user_id, merchant_id
- amount, method: `cash` | `transfer` | `qris` | `gateway`
- status: `pending` | `verified` | `rejected`
- proof_url (foto bukti transfer)
- verified_by (user_id staff), verified_at
- created_at

### checkins
- id, membership_id, user_id, merchant_id
- checked_in_at
- recorded_by (user_id staff)

### personal_trainers
Trainer internal gym. Satu user bisa jadi trainer di satu merchant.
- id, user_id, merchant_id, bio, photo_url
- is_active
- created_at

### pt_schedules
Slot ketersediaan trainer — bisa diset oleh trainer sendiri atau admin.
- id, trainer_id, merchant_id
- date, start_time, end_time
- is_available (false jika sudah dibooking)

### pt_packages
Paket Personal Training — bisa terpisah atau bundling dengan membership.
- id, merchant_id, trainer_id (nullable — berlaku untuk semua trainer jika null)
- name, session_count, price
- is_bundled (true jika bagian dari membership plan)
- membership_plan_id (nullable — diisi jika bundling)
- is_active

### pt_bookings
Booking sesi Personal Training oleh member.
- id, member_id (user_id), trainer_id, schedule_id, merchant_id
- package_id (nullable — jika pakai paket)
- status: `pending` | `confirmed` | `completed` | `cancelled`
- notes (catatan dari member)
- created_at

### pt_payments
Pembayaran khusus untuk PT (jika tidak bundling dengan membership).
- id, booking_id, user_id, merchant_id
- amount, method: `cash` | `transfer` | `qris` | `gateway`
- status: `pending` | `verified` | `rejected`
- proof_url
- verified_by, verified_at
- created_at

### loyalty_points (future)
- id, user_id, merchant_id, points, reason, created_at

### notifications (future)
- id, user_id, title, body, is_read, created_at

---

## Relationship

```
users
 ├── merchant_staff (sebagai admin/staff)
 ├── personal_trainers
 └── memberships
      ├── membership_plans
      │    └── pt_packages (bundled)
      ├── payments
      └── checkins

merchants
 ├── merchant_staff
 ├── membership_plans
 ├── memberships
 ├── personal_trainers
 │    ├── pt_schedules
 │    └── pt_packages
 └── pt_bookings
      └── pt_payments
```

---

## Catatan
- `memberships` adalah tabel kunci untuk loyalty — perusahaan bisa query satu `user_id` dan lihat di merchant mana saja dia terdaftar, status, dan histori pembayarannya.
- `pt_packages.is_bundled` menentukan apakah sesi PT sudah include dalam membership plan tertentu atau harus bayar terpisah.
- `pt_schedules.is_available` di-set false otomatis saat booking dikonfirmasi.
