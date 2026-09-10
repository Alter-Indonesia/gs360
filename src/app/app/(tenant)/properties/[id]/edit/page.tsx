export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <div>Edit Property: {id}</div>;
}
