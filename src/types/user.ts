export type UserRole = "admin" | "agent";

export interface User {
  id: string;
  companyId: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

export interface Company {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
}
