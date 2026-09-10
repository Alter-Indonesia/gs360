import { Suspense } from "react";
import { RegisterClient } from "./_components/register-client";

export const metadata = { title: "Daftar Member — Golden Sport" };

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterClient />
    </Suspense>
  );
}
