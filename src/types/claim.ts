export type ClaimStatus = "pending" | "approved" | "rejected";

export interface SalesClaim {
  id: string;
  propertyId: string;
  agentId: string;
  buyerName: string;
  buyerPhone: string;
  status: ClaimStatus;
  note?: string;
  createdAt: Date;
  updatedAt: Date;
}
