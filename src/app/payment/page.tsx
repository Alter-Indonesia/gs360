import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PaymentClient } from "./_components/payment-client";

export const metadata = { title: "Pembayaran — Golden Sport" };

export default async function PaymentPage() {
  const cookieStore = await cookies();
  const raw = cookieStore.get("gs_member_reg")?.value;
  if (!raw) redirect("/register");

  const session = JSON.parse(raw);

  return (
    <Suspense>
      <PaymentClient session={session} />
    </Suspense>
  );
}
