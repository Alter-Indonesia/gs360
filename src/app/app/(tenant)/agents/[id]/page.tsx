export default async function AgentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <div>Agent Detail: {id}</div>;
}
