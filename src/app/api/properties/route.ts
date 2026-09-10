import type { NextRequest } from "next/server";

export async function GET(_req: NextRequest) {
  return Response.json({ data: [] });
}

export async function POST(_req: NextRequest) {
  return Response.json({ data: null }, { status: 201 });
}
