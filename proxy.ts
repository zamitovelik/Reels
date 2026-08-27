import { NextResponse, type NextRequest } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, type SessionData } from "@/lib/session";

// Optimistic check only (fast, cookie-based) — the real enforcement is verifySession()
// in src/lib/dal.ts, called from the dashboard layout/pages/actions themselves.
export default async function proxy(request: NextRequest) {
  const session = await getIronSession<SessionData>(request, NextResponse.next(), sessionOptions);

  if (!session.isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
