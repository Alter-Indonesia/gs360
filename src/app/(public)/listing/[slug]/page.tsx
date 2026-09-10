export const metadata = { title: "Detail Manajemen — Golden Sport" };

export default async function ListingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div className="max-w-7xl mx-auto px-5 xl:px-8 py-10">
      <p className="text-sm" style={{ color: "#94A3B8" }}>Detail: {slug}</p>
    </div>
  );
}
