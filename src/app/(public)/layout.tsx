import type { ReactNode } from "react";
import { PublicNavbar } from "@/components/public/navbar";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0D0D0D", overflowX: "hidden" }}>
      <PublicNavbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
