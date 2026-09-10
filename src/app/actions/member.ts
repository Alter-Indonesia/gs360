"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export type MemberSession = {
  name: string;
  email: string;
  phone: string;
  plan: string;
  planName: string;
  planPrice: number;
};

export type RegisterMemberState = {
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    password?: string[];
  };
  message?: string;
} | undefined;

export type PaymentState = {
  errors?: { method?: string[]; proof?: string[] };
  message?: string;
} | undefined;

const PLANS: Record<string, { name: string; price: number }> = {
  basic:    { name: "Basic",    price: 299_000 },
  standard: { name: "Standard", price: 499_000 },
  premium:  { name: "Premium",  price: 799_000 },
};

export async function registerMember(
  _state: RegisterMemberState,
  formData: FormData
): Promise<RegisterMemberState> {
  const name  = (formData.get("name") as string)?.trim() || "Demo User";
  const email = (formData.get("email") as string)?.trim() || "demo@goldensport.id";
  const phone = (formData.get("phone") as string)?.trim() || "081234567890";
  const plan  = (formData.get("plan") as string) || "basic";

  // Validasi dinonaktifkan untuk demo flow

  const planData = PLANS[plan] ?? PLANS.basic;

  const session: MemberSession = {
    name,
    email,
    phone,
    plan,
    planName: planData.name,
    planPrice: planData.price,
  };

  const cookieStore = await cookies();
  cookieStore.set("gs_member_reg", JSON.stringify(session), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 30, // 30 menit
  });

  redirect("/payment");
}

export async function submitPayment(
  _state: PaymentState,
  formData: FormData
): Promise<PaymentState> {
  const method = (formData.get("method") as string) || "transfer";

  // Validasi dinonaktifkan untuk demo flow

  const cookieStore = await cookies();
  const regRaw = cookieStore.get("gs_member_reg")?.value;
  if (!regRaw) redirect("/register");

  // Simpan session member aktif (dummy — tanpa DB)
  cookieStore.set("gs_member_session", JSON.stringify({
    ...JSON.parse(regRaw),
    paymentMethod: method,
    paymentStatus: "active",
    memberSince: new Date().toISOString(),
    memberId: "GS-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
  }), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  cookieStore.delete("gs_member_reg");

  redirect("/member/dashboard");
}

export async function loginMember() {
  const cookieStore = await cookies();
  const existing = cookieStore.get("gs_member_session")?.value;
  if (!existing) {
    cookieStore.set("gs_member_session", JSON.stringify({
      name: "Budi Santoso",
      email: "budi@email.com",
      phone: "081234567890",
      plan: "standard",
      planName: "Standard",
      planPrice: 499_000,
      paymentMethod: "transfer",
      paymentStatus: "active",
      memberSince: new Date().toISOString(),
      memberId: "GS-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    }), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  }
  redirect("/member/dashboard");
}

export async function getMemberSession() {
  const cookieStore = await cookies();
  const raw = cookieStore.get("gs_member_session")?.value;
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export async function logoutMember() {
  const cookieStore = await cookies();
  cookieStore.delete("gs_member_session");
  redirect("/login");
}
