import type { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/claims/[id]">
) {
  const { id } = await ctx.params;
  return Response.json({ data: { id } });
}
