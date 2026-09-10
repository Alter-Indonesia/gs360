import { verifyOwnerSession } from "@/lib/dal";

export default async function ConsolehubOverviewPage() {
  await verifyOwnerSession();
  return <div>Consolehub Overview</div>;
}
