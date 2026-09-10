import type { NextRequest } from "next/server";

export async function POST(
  _req: NextRequest,
  ctx: RouteContext<"/api/claims/[id]/approve">
) {
  const { id } = await ctx.params;
  return Response.json({ data: { id } });
}
