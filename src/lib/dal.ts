import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import type { SessionPayload } from "@/lib/session";

export const verifySession = cache(async (): Promise<SessionPayload> => {
  const session = await getSession();
  if (!session?.userId) redirect("/login");
  return session;
});

export const verifyOwnerSession = cache(async (): Promise<SessionPayload> => {
  const session = await getSession();
  if (!session?.userId || session.role !== "owner") {
    redirect("/consolehub/login");
  }
  return session;
});

export const getAuthUser = cache(async (): Promise<SessionPayload | null> => {
  return getSession();
});
