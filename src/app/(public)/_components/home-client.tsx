"use client";

import Link from "next/link";
import { STATS, SERVICES, TRAINERS, PLANS, TESTIMONIALS, FACILITIES } from "../_data/fitness";
import { useReveal } from "@/lib/use-reveal";

function formatPrice(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

const FACILITY_ICONS: Record<string, React.ReactNode> = {
  dumbbell: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 6.5h11M6.5 12h11M6.5 17.5h11M3 6.5h.01M3 12h.01M3 17.5h.01"/></svg>,
  activity: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  users:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  shower:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12a8 8 0 0 1 16 0Z"/><path d="M12 12v6"/><path d="M9 18h6"/></svg>,
  parking:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/></svg>,
  wifi:     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>,
  coffee:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>,
  wind:     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>,
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i <= Math.round(rating) ? "#F5C518" : "none"} stroke="#F5C518" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
      <span className="text-xs ml-1" style={{ color: "#F5C518" }}>{rating}</span>
    </div>
  );
}

export function HomeClient() {
  useReveal();

  return (
    <div className="flex flex-col" style={{ background: "#0D0D0D" }}>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: "100vh" }}>
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1800&q=85"
          alt="" aria-hidden
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.75) 50%, rgba(13,13,13,0.40) 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(232,66,10,0.12), transparent)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-5 xl:px-8 flex flex-col justify-center" style={{ minHeight: "100vh", paddingTop: 120, paddingBottom: 80 }}>
          <div className="max-w-2xl flex flex-col gap-7">
            <h1 data-reveal="" className="text-5xl lg:text-7xl font-extrabold leading-none tracking-tight text-white">
              Lampaui<br />
              <span className="text-gradient-primary">Batasmu</span><br />
              Bersama Kami
            </h1>

            <p data-reveal="" data-delay="1" className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.65)", maxWidth: 480 }}>
              Tubuh yang lebih kuat dimulai dari satu langkah. Kami di sini untuk menemani setiap langkah itu — dengan ruang yang nyaman, pelatih yang tepat, dan komunitas yang mendukung.
            </p>

            <div data-reveal="" data-delay="2" className="flex flex-wrap gap-x-10 gap-y-4 py-2">
              {STATS.map(s => (
                <div key={s.label}>
                  <p className="text-3xl font-extrabold text-white">{s.value}</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>{s.label}</p>
                </div>
              ))}
            </div>

            <div data-reveal="" data-delay="3" className="flex flex-wrap gap-4">
              <Link
                href="/register"
                className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white"
                style={{ background: "linear-gradient(135deg, #E8420A 0%, #C93408 100%)", boxShadow: "0 8px 28px rgba(232,66,10,0.45)" }}
              >
                Daftar Sekarang
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </Link>
              <a
                href="#plans"
                className="btn-outline inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white border"
                style={{ borderColor: "rgba(255,255,255,0.20)", background: "rgba(255,255,255,0.05)" }}
              >
                Lihat Paket
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float" style={{ opacity: 0.4 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </div>
      </section>


      {/* ── About ────────────────────────────────────────────────── */}
      <section id="about" className="py-24" style={{ background: "#111111" }}>
        <div className="max-w-7xl mx-auto px-5 xl:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div data-reveal="left" className="relative grid grid-cols-2 gap-3">
              <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&q=80" alt="Gym" className="rounded-2xl w-full aspect-[4/5] object-cover" />
              <div className="flex flex-col gap-3">
                <img src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&q=80" alt="Trainer" className="rounded-2xl w-full aspect-square object-cover" />
                <div className="rounded-2xl flex items-center justify-center p-6" style={{ background: "linear-gradient(135deg, #E8420A 0%, #C93408 100%)" }}>
                  <div className="text-center">
                    <p className="text-4xl font-extrabold text-white">10+</p>
                    <p className="text-sm text-white/80 mt-1">Tahun Melayani</p>
                  </div>
                </div>
              </div>
              <div
                className="absolute -bottom-5 -left-5 px-5 py-4 rounded-2xl"
                style={{ background: "#1A1A1A", border: "1px solid rgba(232,66,10,0.20)", boxShadow: "0 8px 32px rgba(0,0,0,0.40)" }}
              >
                <p className="text-2xl font-extrabold text-white">1.200+</p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.50)" }}>Member Aktif</p>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <p data-reveal="" className="text-xs font-bold uppercase tracking-widest" style={{ color: "#E8420A" }}>Tentang Kami</p>
              <h2 data-reveal="" data-delay="1" className="text-4xl font-extrabold leading-tight text-white">
                Perjalanan <span className="text-gradient-primary">Kebugaranmu</span><br />Dimulai di Sini
              </h2>
              <p data-reveal="" data-delay="2" className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.60)" }}>
                Golden Sport hadir sebagai destinasi kebugaran premium yang menyediakan fasilitas terlengkap, trainer bersertifikat internasional, dan program yang dipersonalisasi untuk setiap member.
              </p>
              <p data-reveal="" data-delay="3" className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.60)" }}>
                Kami percaya bahwa perjalanan kebugaran yang konsisten dimulai dari lingkungan yang tepat dan dukungan yang nyata. Itu mengapa kami ada.
              </p>

              <div className="grid grid-cols-2 gap-3 mt-2">
                {FACILITIES.map((f, i) => (
                  <div
                    data-reveal=""
                    data-delay={String(Math.min(i + 1, 5))}
                    key={f.label}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl"
                    style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <span style={{ color: "#E8420A" }}>{FACILITY_ICONS[f.icon]}</span>
                    <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.75)" }}>{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ── Services ──────────────────────────────────────────────── */}
      <section id="services" className="py-24" style={{ background: "#0D0D0D" }}>
        <div className="max-w-7xl mx-auto px-5 xl:px-8">
          <div className="text-center mb-14">
            <p data-reveal="" className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#E8420A" }}>Layanan Kami</p>
            <h2 data-reveal="" data-delay="1" className="text-4xl font-extrabold text-white">
              Capai Potensimu:<br />
              <span className="text-gradient-primary">Layanan Kebugaran Premium</span>
            </h2>
            <p data-reveal="" data-delay="2" className="text-base mt-4 max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.50)" }}>
              Dirancang untuk membantu kamu mencapai target kebugaran, dari sesi personal hingga kelas grup yang energik.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((s, i) => (
              <div
                data-reveal=""
                data-delay={String(i + 1)}
                key={s.id}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
                style={{ border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <img src={s.img} alt={s.title} className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,13,13,0.95) 0%, rgba(13,13,13,0.40) 50%, transparent 100%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-base font-bold text-white mb-1">{s.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.60)" }}>{s.desc}</p>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#E8420A" }}>
                    Selengkapnya
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── Why Choose Us ─────────────────────────────────────────── */}
      <section className="py-24" style={{ background: "#111111" }}>
        <div className="max-w-7xl mx-auto px-5 xl:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-6">
              <p data-reveal="" className="text-xs font-bold uppercase tracking-widest" style={{ color: "#E8420A" }}>Keunggulan Kami</p>
              <h2 data-reveal="" data-delay="1" className="text-4xl font-extrabold text-white">
                Mengapa Memilih Kami untuk<br />Perjalanan <span className="text-gradient-primary">Kebugaranmu?</span>
              </h2>
              <div className="flex flex-col gap-4 mt-2">
                {[
                  { title: "Peralatan Kelas Dunia", desc: "Peralatan fitness terbaru dari merek internasional terkemuka, dirawat secara rutin." },
                  { title: "Trainer Bersertifikat", desc: "Trainer bersertifikat internasional yang berdedikasi penuh membantu kamu mencapai target." },
                  { title: "Ragam Kelas Lengkap", desc: "Lebih dari 20 jenis kelas — dari Yoga hingga HIIT — tersedia setiap hari." },
                  { title: "Komunitas yang Suportif", desc: "Komunitas member yang positif dan motivatif untuk menjaga semangat latihanmu." },
                ].map((item, i) => (
                  <div
                    data-reveal=""
                    data-delay={String(i + 2)}
                    key={i}
                    className="flex gap-4 p-5 rounded-2xl"
                    style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(232,66,10,0.15)" }}>
                      <div className="w-2 h-2 rounded-full" style={{ background: "#E8420A" }} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-sm" style={{ color: "rgba(255,255,255,0.50)" }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div data-reveal="right" className="relative">
              <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=700&q=80" alt="Gym" className="rounded-3xl w-full aspect-[4/5] object-cover" />
              <div className="absolute inset-0 rounded-3xl" style={{ background: "linear-gradient(135deg, rgba(232,66,10,0.15) 0%, transparent 50%)" }} />
              <div
                className="absolute top-6 -right-6 px-5 py-4 rounded-2xl"
                style={{ background: "#1A1A1A", border: "1px solid rgba(245,197,24,0.20)", boxShadow: "0 8px 32px rgba(0,0,0,0.50)" }}
              >
                <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#F5C518" }}>Weekly Classes</p>
                <p className="text-3xl font-extrabold text-white">60+</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ── Trainers ──────────────────────────────────────────────── */}
      <section id="trainers" className="py-24" style={{ background: "#0D0D0D" }}>
        <div className="max-w-7xl mx-auto px-5 xl:px-8">
          <div className="text-center mb-14">
            <p data-reveal="" className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#E8420A" }}>Our Trainers</p>
            <h2 data-reveal="" data-delay="1" className="text-4xl font-extrabold text-white">
              Kenali <span className="text-gradient-primary">Trainer Terbaik Kami</span>
            </h2>
            <p data-reveal="" data-delay="2" className="text-base mt-4 max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.50)" }}>
              Trainer bersertifikat internasional yang siap membimbing setiap langkah perjalanan kebugaran kamu.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TRAINERS.map((t, i) => (
              <div
                data-reveal=""
                data-delay={String(i + 1)}
                key={t.id}
                className="group relative overflow-hidden rounded-2xl"
                style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="relative overflow-hidden">
                  <img src={t.img} alt={t.name} className="w-full aspect-[3/4] object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,26,26,1) 0%, rgba(26,26,26,0.20) 50%, transparent 100%)" }} />
                </div>
                <div className="p-5 -mt-16 relative z-10">
                  <StarRating rating={t.rating} />
                  <h3 className="text-base font-bold text-white mt-2">{t.name}</h3>
                  <p className="text-xs mt-0.5" style={{ color: "#E8420A" }}>{t.specialty}</p>
                  <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{t.exp} pengalaman</span>
                    <span className="text-xs px-2 py-1 rounded-lg" style={{ background: "rgba(245,197,24,0.10)", color: "#F5C518" }}>{t.cert}</span>
                  </div>
                  <Link
                    href={`/register?trainer=${t.id}`}
                    className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all"
                    style={{ background: "rgba(232,66,10,0.10)", color: "#E8420A", border: "1px solid rgba(232,66,10,0.20)" }}
                  >
                    Book Sesi PT
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── Plans ─────────────────────────────────────────────────── */}
      <section id="plans" className="py-24" style={{ background: "#111111" }}>
        <div className="max-w-7xl mx-auto px-5 xl:px-8">
          <div className="text-center mb-14">
            <p data-reveal="" className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#E8420A" }}>Membership</p>
            <h2 data-reveal="" data-delay="1" className="text-4xl font-extrabold text-white">
              Paket <span className="text-gradient-primary">Fleksibel</span> untuk Setiap Target
            </h2>
            <p data-reveal="" data-delay="2" className="text-base mt-4 max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.50)" }}>
              Pilih paket yang sesuai dengan kebutuhan dan targetmu. Semua paket sudah termasuk akses penuh ke fasilitas gym.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PLANS.map((p, i) => (
              <div
                data-reveal="scale"
                data-delay={String(i + 1)}
                key={p.id}
                className="relative flex flex-col rounded-2xl p-7 cursor-pointer"
                style={{
                  background: p.highlight ? "#222222" : "#1A1A1A",
                  filter: p.highlight ? "drop-shadow(0 8px 24px rgba(232,66,10,0.18))" : "none",
                  transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "scale(1.03)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
                }}
              >
                {p.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold" style={{ background: "#F5C518", color: "#0D0D0D" }}>
                    {p.badge}
                  </div>
                )}
                <div className="mb-6">
                  <p className="text-sm font-bold mb-4" style={{ color: "rgba(255,255,255,0.50)" }}>{p.name}</p>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-extrabold" style={{ color: p.highlight ? "#F5C518" : "white" }}>{formatPrice(p.price)}</span>
                    <span className="text-sm mb-1" style={{ color: "rgba(255,255,255,0.45)" }}>{p.duration}</span>
                  </div>
                </div>
                <ul className="flex flex-col gap-3 flex-1 mb-7">
                  {p.features.map(f => (
                    <li key={f} className="flex items-start gap-3 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                      <svg className="shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#E8420A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/register?plan=${p.id}`}
                  className="btn-primary w-full text-center py-3.5 rounded-xl text-sm font-bold"
                  style={{ background: "linear-gradient(135deg, #E8420A 0%, #C93408 100%)", color: "white", boxShadow: "0 4px 14px rgba(232,66,10,0.35)" }}
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>

          <p data-reveal="" className="text-center text-sm mt-8" style={{ color: "rgba(255,255,255,0.35)" }}>
            Butuh paket tahunan atau korporat?{" "}
            <a href="#" style={{ color: "#E8420A" }}>Hubungi kami</a>
          </p>
        </div>
      </section>


      {/* ── Testimonials ──────────────────────────────────────────── */}
      <section className="py-24" style={{ background: "#0D0D0D" }}>
        <div className="max-w-7xl mx-auto px-5 xl:px-8">
          <div className="text-center mb-14">
            <p data-reveal="" className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#E8420A" }}>Testimoni</p>
            <h2 data-reveal="" data-delay="1" className="text-4xl font-extrabold text-white">
              Apa Kata <span className="text-gradient-primary">Member Kami</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                data-reveal=""
                data-delay={String(i + 1)}
                key={t.id}
                className="flex flex-col gap-5 p-6 rounded-2xl"
                style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <StarRating rating={t.rating} />
                <p className="text-sm leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.70)" }}>"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.40)" }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── CTA Banner ────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: "#111111" }}>
        <div className="max-w-7xl mx-auto px-5 xl:px-8">
          <div
            data-reveal="scale"
            className="relative overflow-hidden rounded-3xl px-10 py-16 text-center"
            style={{ background: "linear-gradient(135deg, #1A0A06 0%, #2D1208 50%, #1A0A06 100%)", border: "1px solid rgba(232,66,10,0.20)" }}
          >
            <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: "radial-gradient(circle, rgba(232,66,10,0.4) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(232,66,10,0.25) 0%, transparent 70%)" }} />

            <div className="relative z-10">
              <p data-reveal="" className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#E8420A" }}>Mulai Hari Ini</p>
              <h2 data-reveal="" data-delay="1" className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
                Siap untuk <span className="text-gradient-primary">Berkembang?</span>
              </h2>
              <p data-reveal="" data-delay="2" className="text-base mb-10 max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
                Ambil langkah pertama menuju versi terbaik dirimu. Daftar sekarang dan mulai perjalanan kebugaranmu bersama Golden Sport.
              </p>
              <div data-reveal="" data-delay="3" className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/register"
                  className="btn-primary inline-flex items-center gap-2 px-10 py-4 rounded-xl text-base font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #E8420A 0%, #C93408 100%)", boxShadow: "0 8px 28px rgba(232,66,10,0.45)" }}
                >
                  Daftar Member Sekarang
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </Link>
                <a
                  href="#plans"
                  className="inline-flex items-center gap-2 px-10 py-4 rounded-xl text-base font-semibold"
                  style={{ color: "rgba(255,255,255,0.70)", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.04)" }}
                >
                  Lihat Paket
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ── Footer ────────────────────────────────────────────────── */}
      <footer className="py-10" style={{ background: "#0D0D0D", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-5 xl:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #E8420A 0%, #C93408 100%)" }}>
              <span className="text-white font-extrabold text-xs tracking-tight">GS</span>
            </div>
            <span className="text-sm font-extrabold text-white">Golden<span style={{ color: "#E8420A" }}>Sport</span></span>
          </div>
          <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.30)" }}>
            © {new Date().getFullYear()} Golden Sport · PT. Satria GS · Hak cipta dilindungi
          </p>
          <div className="flex items-center gap-5">
            {["Instagram", "WhatsApp"].map(s => (
              <a key={s} href="#" className="text-xs transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.40)" }}>{s}</a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}
