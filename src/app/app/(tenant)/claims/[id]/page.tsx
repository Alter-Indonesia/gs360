export default async function ClaimDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <div>Claim Detail: {id}</div>;
}
