import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/session";

// Routes auth (tidak butuh session)
const PUBLIC_AUTH_ROUTES = ["/login", "/register", "/join"];
const PUBLIC_CONSOLEHUB_ROUTES = ["/consolehub/login"];
// Marketplace public (no auth required)
const PUBLIC_MARKETPLACE_ROUTES = ["/", "/listing"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("kavio_session")?.value;
  const session = await decrypt(token);

  const isConsolehubRoute = pathname.startsWith("/consolehub");
  const isMarketplaceRoute = PUBLIC_MARKETPLACE_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(r + "/")
  );
  const isPublicAuthRoute = PUBLIC_AUTH_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(r + "/")
  );
  const isPublicConsolehubRoute = PUBLIC_CONSOLEHUB_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(r + "/")
  );
  const isTenantAppRoute = pathname.startsWith("/app");

  // ── Public marketplace — siapa saja boleh akses ───────────────────────────
  if (isMarketplaceRoute) {
    return NextResponse.next();
  }

  // ── Consolehub routes ─────────────────────────────────────────────────────
  if (isConsolehubRoute) {
    if (isPublicConsolehubRoute) {
      if (session?.role === "owner") {
        return NextResponse.redirect(new URL("/consolehub/overview", req.url));
      }
      return NextResponse.next();
    }

    if (session?.role !== "owner") {
      return NextResponse.redirect(new URL("/consolehub/login", req.url));
    }
    return NextResponse.next();
  }

  // ── Auth routes (/login, /register, /join) ────────────────────────────────
  if (isPublicAuthRoute) {
    // Sudah login sebagai admin/agent → redirect ke dashboard
    if (session?.userId && session.role !== "owner") {
      return NextResponse.redirect(new URL("/app/overview", req.url));
    }
    return NextResponse.next();
  }

  // ── Protected tenant app routes (/app/*) ──────────────────────────────────
  if (isTenantAppRoute) {
    if (!session?.userId || session.role === "owner") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
