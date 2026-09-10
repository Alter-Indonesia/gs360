"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { createSession, deleteSession } from "@/lib/session";
import {
  LoginSchema,
  RegisterCompanySchema,
  JoinAgentSchema,
  ConsolehubLoginSchema,
  type FormState,
} from "@/lib/validations/auth";

// ─── Tenant: Login ────────────────────────────────────────────────────────────

export async function login(
  _state: FormState,
  formData: FormData
): Promise<FormState> {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = LoginSchema.safeParse(raw);
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  // TODO: query DB — untuk sekarang placeholder
  // const user = await db.query.users.findFirst({ where: eq(users.email, parsed.data.email) })
  // if (!user || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) {
  //   return { message: "Email atau password salah" }
  // }

  // Placeholder session — hapus saat DB sudah siap
  await createSession({
    userId: "placeholder-user-id",
    role: "admin",
    companyId: "placeholder-company-id",
  });

  redirect("/app/overview");
}

// ─── Tenant: Logout ───────────────────────────────────────────────────────────

export async function logout(): Promise<void> {
  await deleteSession();
  redirect("/login");
}

// ─── Tenant: Register Company (Admin pertama) ─────────────────────────────────

export async function registerCompany(
  _state: FormState,
  formData: FormData
): Promise<FormState> {
  const raw = {
    companyName: formData.get("companyName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const parsed = RegisterCompanySchema.safeParse(raw);
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const { companyName, email, password } = parsed.data;

  // TODO: cek email sudah terdaftar
  // const existing = await db.query.users.findFirst({ where: eq(users.email, email) })
  // if (existing) return { message: "Email sudah terdaftar" }

  // TODO: create company + admin di DB
  // const passwordHash = await bcrypt.hash(password, 12)
  // const [company] = await db.insert(companies).values({ name: companyName }).returning()
  // const [user] = await db.insert(users).values({ companyId: company.id, email, passwordHash, role: "admin" }).returning()
  // await createSession({ userId: user.id, role: "admin", companyId: company.id })

  void companyName; void email; void password;
  void bcrypt;

  redirect("/app/overview");
}

// ─── Tenant: Agent Request Join via company slug/referral ─────────────────────

export async function requestJoinAgent(
  _state: FormState,
  formData: FormData
): Promise<FormState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    companyId: formData.get("companyId"),
  };

  const parsed = JoinAgentSchema.safeParse(raw);
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  // TODO: cek companyId valid, cek email belum terdaftar
  // const passwordHash = await bcrypt.hash(parsed.data.password, 12)
  // await db.insert(users).values({ ...parsed.data, passwordHash, role: "agent", status: "pending" })

  return { message: "Permintaan bergabung berhasil dikirim. Tunggu konfirmasi dari perusahaan." };
}

// ─── Consolehub: Owner Login ──────────────────────────────────────────────────

export async function consolehubLogin(
  _state: FormState,
  formData: FormData
): Promise<FormState> {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = ConsolehubLoginSchema.safeParse(raw);
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  // TODO: query DB, validasi role === "owner"
  // const user = await db.query.users.findFirst({ where: eq(users.email, parsed.data.email) })
  // if (!user || user.role !== "owner" || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) {
  //   return { message: "Email atau password salah" }
  // }

  await createSession({
    userId: "placeholder-owner-id",
    role: "owner",
    companyId: null,
  });

  redirect("/consolehub/overview");
}
