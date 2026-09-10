import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";
import { SidebarProvider } from "@/components/layout/sidebar-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden" style={{ background: "linear-gradient(145deg, #E6F4EE 0%, #EDF8F2 40%, #E2F3EC 100%)" }}>
        {/* Ambient orbs */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div style={{ position: "absolute", top: "-10%", left: "-5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(15,138,93,0.07) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", bottom: "-10%", right: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(15,138,93,0.05) 0%, transparent 70%)" }} />
        </div>
        <Sidebar />
        <div className="flex flex-1 flex-col min-w-0 py-5 pr-5">
          <Navbar />
          <main className="flex-1 overflow-y-auto pt-4 pb-4 px-4 xl:px-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
