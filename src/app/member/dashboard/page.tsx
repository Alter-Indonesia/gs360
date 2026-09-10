import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardClient } from "./_components/dashboard-client";

export const metadata = { title: "Dashboard Member — Golden Sport" };

export default async function MemberDashboardPage() {
  const cookieStore = await cookies();
  const raw = cookieStore.get("gs_member_session")?.value;
  if (!raw) redirect("/login");

  const session = JSON.parse(raw);

  return <DashboardClient session={session} />;
}
