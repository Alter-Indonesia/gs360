import { JoinAgentForm } from "./_components/join-agent-form";

export const metadata = { title: "Bergabung sebagai Agent — Kavio" };

export default async function JoinAgentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // TODO: fetch company by slug dari DB
  // const company = await db.query.companies.findFirst({ where: eq(companies.slug, slug) })
  // if (!company) notFound()

  const company = { id: "placeholder-id", name: "PT. Contoh Properti", slug };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12" style={{ background: "#F8FAFC" }}>
      <div className="w-full max-w-sm animate-fade-up">
        {/* Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "#16A34A" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <h1 className="text-xl font-bold mb-1" style={{ color: "#0F172A" }}>
            Bergabung ke {company.name}
          </h1>
          <p className="text-sm" style={{ color: "#94A3B8" }}>
            Daftarkan diri Anda sebagai agent. Permintaan akan dikonfirmasi oleh admin perusahaan.
          </p>
        </div>

        <JoinAgentForm companyId={company.id} companyName={company.name} />
      </div>
    </div>
  );
}
