import PropertyDetailClient from "./components/property-detail-client";

export const metadata = { title: "Detail Manajemen — Golden Sport" };

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PropertyDetailClient id={id} />;
}
