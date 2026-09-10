"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { submitPayment, PaymentState, MemberSession } from "@/app/actions/member";

const BANK_INFO = {
  bank: "BCA",
  account: "1234 5678 90",
  name: "PT. Satria Golden Sport",
};

const QRIS_INFO = "Scan QRIS di bawah ini menggunakan aplikasi dompet digital apapun.";

function formatPrice(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}


const CHECK_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

type Method = "transfer" | "qris" | "cash";

interface Props {
  session: MemberSession;
}

export function PaymentClient({ session }: Props) {
  const [method, setMethod] = useState<Method | null>("transfer");
  const [state, action, pending] = useActionState<PaymentState, FormData>(submitPayment, undefined);

  const methods: { id: Method; label: string; desc: string }[] = [
    { id: "transfer", label: "Transfer Bank", desc: "Transfer ke rekening BCA kami" },
    { id: "qris", label: "QRIS", desc: "Scan QR dengan dompet digital" },
    { id: "cash", label: "Bayar di Kasir", desc: "Bayar langsung di gym" },
  ];

  return (
    <div className="min-h-screen flex" style={{ background: "#0D0D0D" }}>
      {/* Left — order summary */}
      <aside
        className="hidden lg:flex flex-col justify-between w-[420px] shrink-0 p-10 xl:p-14"
        style={{ background: "rgba(255,255,255,0.03)", borderRight: "1px solid rgba(255,255,255,0.07)" }}
      >
        <Link href="/" className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #E8420A 0%, #C93408 100%)", boxShadow: "0 4px 14px rgba(232,66,10,0.40)" }}
          >
            <span className="text-white font-extrabold text-sm tracking-tight">GS</span>
          </div>
          <span className="text-lg font-extrabold tracking-tight text-white">
            Golden<span style={{ color: "#E8420A" }}>Sport</span>
          </span>
        </Link>

        <div className="flex-1 flex flex-col justify-center gap-6">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>
              Ringkasan Pesanan
            </p>
            <div
              className="rounded-2xl p-6 flex flex-col gap-4"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex flex-col gap-1">
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.40)" }}>Member</p>
                <p className="text-sm font-semibold text-white">{session.name}</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{session.email}</p>
              </div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.40)" }}>Paket</p>
                  <p className="text-sm font-bold text-white mt-0.5">Membership {session.planName}</p>
                </div>
                <p className="text-base font-extrabold" style={{ color: "#F5C518" }}>
                  {formatPrice(session.planPrice)}
                </p>
              </div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.60)" }}>Total</p>
                <p className="text-lg font-extrabold text-white">{formatPrice(session.planPrice)}</p>
              </div>
            </div>
          </div>

          <div
            className="rounded-xl px-4 py-3.5 flex items-start gap-3"
            style={{ background: "rgba(245,197,24,0.08)", border: "1px solid rgba(245,197,24,0.18)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F5C518" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
              Keanggotaan aktif setelah pembayaran berhasil.
            </p>
          </div>
        </div>

        <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
          © 2025 Golden Sport. Semua hak dilindungi.
        </p>
      </aside>

      {/* Right — payment form */}
      <main className="flex-1 flex flex-col items-center justify-center px-5 py-12 md:px-10">
        <div className="w-full max-w-[480px]">
          {/* Mobile brand */}
          <Link href="/" className="flex items-center gap-3 lg:hidden mb-8">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #E8420A 0%, #C93408 100%)" }}>
              <span className="text-white font-extrabold text-sm">GS</span>
            </div>
            <span className="text-base font-extrabold tracking-tight text-white">Golden<span style={{ color: "#E8420A" }}>Sport</span></span>
          </Link>

          <h1 className="text-3xl font-extrabold text-white mb-1">Pembayaran</h1>
          <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>
            Pilih metode pembayaran dan selesaikan transaksi
          </p>

          {state?.message && (
            <div className="mb-5 px-4 py-3 rounded-xl text-sm" style={{ background: "rgba(232,66,10,0.12)", border: "1px solid rgba(232,66,10,0.30)", color: "#FF7A4D" }}>
              {state.message}
            </div>
          )}

          <form action={action} className="flex flex-col gap-6">
            {/* Method selector */}
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.70)" }}>Metode Pembayaran</p>
              {methods.map(m => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMethod(m.id)}
                  className="flex items-center justify-between px-4 py-4 rounded-xl transition-all text-left cursor-pointer"
                  style={{
                    background: method === m.id ? "rgba(232,66,10,0.10)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${method === m.id ? "rgba(232,66,10,0.50)" : "rgba(255,255,255,0.08)"}`,
                  }}
                >
                  <div>
                    <p className="text-sm font-semibold text-white">{m.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>{m.desc}</p>
                  </div>
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all"
                    style={{
                      background: method === m.id ? "#E8420A" : "transparent",
                      border: `2px solid ${method === m.id ? "#E8420A" : "rgba(255,255,255,0.20)"}`,
                    }}
                  >
                    {method === m.id && <span style={{ color: "white" }}>{CHECK_ICON}</span>}
                  </div>
                </button>
              ))}
              <input type="hidden" name="method" value={method ?? ""} />
              {state?.errors?.method && (
                <p className="text-xs" style={{ color: "#FF7A4D" }}>{state.errors.method[0]}</p>
              )}
            </div>

            {/* Transfer details */}
            {method === "transfer" && (
              <div className="flex flex-col gap-4">
                <div
                  className="rounded-xl p-5 flex flex-col gap-3"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <p className="text-xs font-semibold tracking-wider uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>
                    Rekening Tujuan
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{BANK_INFO.bank}</p>
                      <p className="text-lg font-extrabold text-white tracking-wider mt-0.5">{BANK_INFO.account}</p>
                      <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.50)" }}>{BANK_INFO.name}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigator.clipboard.writeText(BANK_INFO.account.replace(/\s/g, ""))}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                      style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.65)" }}
                    >
                      Salin
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* QRIS */}
            {method === "qris" && (
              <div
                className="rounded-xl p-5 flex flex-col items-center gap-4"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.50)" }}>{QRIS_INFO}</p>
                {/* Dummy QR placeholder */}
                <div
                  className="w-40 h-40 rounded-2xl flex items-center justify-center"
                  style={{ background: "white" }}
                >
                  <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                    {/* Simple decorative QR pattern */}
                    <rect x="5" y="5" width="35" height="35" rx="4" fill="#0D0D0D"/>
                    <rect x="12" y="12" width="21" height="21" rx="2" fill="white"/>
                    <rect x="17" y="17" width="11" height="11" rx="1" fill="#0D0D0D"/>
                    <rect x="60" y="5" width="35" height="35" rx="4" fill="#0D0D0D"/>
                    <rect x="67" y="12" width="21" height="21" rx="2" fill="white"/>
                    <rect x="72" y="17" width="11" height="11" rx="1" fill="#0D0D0D"/>
                    <rect x="5" y="60" width="35" height="35" rx="4" fill="#0D0D0D"/>
                    <rect x="12" y="67" width="21" height="21" rx="2" fill="white"/>
                    <rect x="17" y="72" width="11" height="11" rx="1" fill="#0D0D0D"/>
                    <rect x="47" y="5" width="8" height="8" rx="1" fill="#0D0D0D"/>
                    <rect x="47" y="17" width="8" height="8" rx="1" fill="#0D0D0D"/>
                    <rect x="47" y="29" width="8" height="8" rx="1" fill="#0D0D0D"/>
                    <rect x="5" y="47" width="8" height="8" rx="1" fill="#0D0D0D"/>
                    <rect x="17" y="47" width="8" height="8" rx="1" fill="#0D0D0D"/>
                    <rect x="29" y="47" width="8" height="8" rx="1" fill="#0D0D0D"/>
                    <rect x="47" y="47" width="8" height="8" rx="1" fill="#E8420A"/>
                    <rect x="59" y="47" width="8" height="8" rx="1" fill="#0D0D0D"/>
                    <rect x="71" y="47" width="8" height="8" rx="1" fill="#0D0D0D"/>
                    <rect x="83" y="47" width="12" height="8" rx="1" fill="#0D0D0D"/>
                    <rect x="59" y="59" width="8" height="8" rx="1" fill="#0D0D0D"/>
                    <rect x="71" y="59" width="8" height="8" rx="1" fill="#0D0D0D"/>
                    <rect x="83" y="59" width="12" height="8" rx="1" fill="#0D0D0D"/>
                    <rect x="59" y="71" width="8" height="20" rx="1" fill="#0D0D0D"/>
                    <rect x="71" y="71" width="8" height="8" rx="1" fill="#0D0D0D"/>
                    <rect x="83" y="71" width="12" height="8" rx="1" fill="#0D0D0D"/>
                    <rect x="71" y="83" width="24" height="12" rx="1" fill="#0D0D0D"/>
                  </svg>
                </div>
                <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Setelah transfer, admin akan mengkonfirmasi dalam 1x24 jam
                </p>
              </div>
            )}

            {/* Cash */}
            {method === "cash" && (
              <div
                className="rounded-xl p-5 flex flex-col gap-2"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <p className="text-sm font-semibold text-white">Bayar di Kasir</p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Tunjukkan ID member Anda ke staff di meja kasir. Pembayaran dilakukan saat kunjungan pertama ke gym.
                </p>
                <div className="mt-2 flex items-center gap-2 text-xs font-semibold" style={{ color: "#F5C518" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  Akses gym aktif setelah kasir mengkonfirmasi pembayaran
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={pending || !method}
              className="w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all"
              style={{
                background: !method || pending ? "rgba(232,66,10,0.35)" : "linear-gradient(135deg, #E8420A 0%, #C93408 100%)",
                boxShadow: !method || pending ? "none" : "0 4px 18px rgba(232,66,10,0.35)",
                cursor: !method || pending ? "not-allowed" : "pointer",
              }}
            >
              {pending ? "Memproses..." : "Selesaikan Pendaftaran"}
            </button>
          </form>

          <p className="mt-5 text-xs text-center" style={{ color: "rgba(255,255,255,0.30)" }}>
            Ingin ganti paket?{" "}
            <Link href={`/register?plan=${session.plan}`} className="font-semibold" style={{ color: "rgba(255,255,255,0.50)" }}>
              Kembali ke form pendaftaran
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
