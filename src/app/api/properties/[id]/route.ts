import type { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/properties/[id]">
) {
  const { id } = await ctx.params;
  return Response.json({ data: { id } });
}

export async function PUT(
  _req: NextRequest,
  ctx: RouteContext<"/api/properties/[id]">
) {
  const { id } = await ctx.params;
  return Response.json({ data: { id } });
}

export async function DELETE(
  _req: NextRequest,
  ctx: RouteContext<"/api/properties/[id]">
) {
  const { id } = await ctx.params;
  return Response.json({ data: { id } });
}
