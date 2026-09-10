import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email tidak valid" }).trim(),
  password: z.string().min(1, { message: "Password wajib diisi" }),
});

export const RegisterCompanySchema = z.object({
  companyName: z
    .string()
    .min(2, { message: "Nama perusahaan minimal 2 karakter" })
    .trim(),
  email: z.string().email({ message: "Email tidak valid" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password minimal 8 karakter" })
    .regex(/[A-Z]/, { message: "Password harus ada huruf kapital" })
    .regex(/[0-9]/, { message: "Password harus ada angka" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
});

export const JoinAgentSchema = z.object({
  name: z.string().min(2, { message: "Nama minimal 2 karakter" }).trim(),
  email: z.string().email({ message: "Email tidak valid" }).trim(),
  phone: z
    .string()
    .min(9, { message: "Nomor telepon tidak valid" })
    .regex(/^[0-9+\-\s()]+$/),
  password: z
    .string()
    .min(8, { message: "Password minimal 8 karakter" })
    .regex(/[A-Z]/, { message: "Password harus ada huruf kapital" })
    .regex(/[0-9]/, { message: "Password harus ada angka" }),
  confirmPassword: z.string(),
  companyId: z.string().min(1),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
});

export const ConsolehubLoginSchema = z.object({
  email: z.string().email({ message: "Email tidak valid" }).trim(),
  password: z.string().min(1, { message: "Password wajib diisi" }),
});

export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterCompanyInput = z.infer<typeof RegisterCompanySchema>;
export type JoinAgentInput = z.infer<typeof JoinAgentSchema>;

export type FormState<T = Record<string, string[]>> = {
  errors?: T;
  message?: string;
} | undefined;
