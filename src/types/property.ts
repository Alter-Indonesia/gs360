export type PropertyStatus = "available" | "in_progress" | "sold";

export interface Property {
  id: string;
  companyId: string;
  title: string;
  address: string;
  price: number;
  status: PropertyStatus;
  createdAt: Date;
  updatedAt: Date;
}
