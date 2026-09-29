import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth/session";

// No fallback: without a configured secret every admin session is rejected
const ADMIN_SESSION_SECRET = process.env.ADMIN_SESSION_SECRET;

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Protect Admin Panel Pages (/admin, /admin/...)
  if (pathname.startsWith("/admin")) {
    const isLoginPage = pathname === "/admin/login";
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;

    let isAuthenticated = false;
    if (sessionCookie && ADMIN_SESSION_SECRET) {
      const verification = await verifySessionToken(
        sessionCookie,
        ADMIN_SESSION_SECRET
      );
      isAuthenticated = verification.valid;
    }

    // If user is logged in and trying to access /admin/login, redirect to /admin dashboard
    if (isAuthenticated && isLoginPage) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    // If user is not logged in and trying to access any admin page (except /admin/login)
    if (!isAuthenticated && !isLoginPage) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Protect Admin API Routes (/api/admin/...)
  if (pathname.startsWith("/api/admin")) {
    const isAuthApi = pathname.startsWith("/api/admin/auth");

    if (!isAuthApi) {
      const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
      let isAuthenticated = false;

      if (sessionCookie && ADMIN_SESSION_SECRET) {
        const verification = await verifySessionToken(
          sessionCookie,
          ADMIN_SESSION_SECRET
        );
        isAuthenticated = verification.valid;
      }

      if (!isAuthenticated) {
        return NextResponse.json(
          { success: false, error: "Unauthorized - Admin session required" },
          { status: 401 }
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};
