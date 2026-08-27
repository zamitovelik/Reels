import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

// Real enforcement point. proxy.ts only does an optimistic redirect for UX speed —
// this is what actually protects dashboard data, per Next.js's recommended DAL pattern.
export const verifySession = cache(async () => {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/login");
  }

  return { isLoggedIn: true as const };
});
