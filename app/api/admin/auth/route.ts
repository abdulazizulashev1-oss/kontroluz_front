import { NextRequest, NextResponse } from "next/server";

const ADMIN_LOGIN = process.env.ADMIN_LOGIN || "admin@kontrol.uz";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "KontrolAdmin2026!";
const SESSION_COOKIE_NAME = "admin_session";
const SESSION_TOKEN_SECRET = "kontrol_admin_auth_token_secret_2026";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, login, password } = body;

    if (action === "logout") {
      const response = NextResponse.json({ success: true, message: "Tizimdan chiqildi" });
      response.cookies.delete(SESSION_COOKIE_NAME);
      return response;
    }

    if (action === "login") {
      if (login === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
        const response = NextResponse.json({
          success: true,
          message: "Autentifikatsiya muvaffaqiyatli",
          user: { email: ADMIN_LOGIN, role: "SUPER_ADMIN" },
        });

        // Set secure HTTP-only session cookie
        response.cookies.set({
          name: SESSION_COOKIE_NAME,
          value: SESSION_TOKEN_SECRET,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return response;
      }

      return NextResponse.json(
        { success: false, error: "Login yoki parol noto'g'ri kiritildi" },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: false, error: "Noto'g'ri so'rov" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: String(err?.message || err) }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);

  if (sessionCookie?.value === SESSION_TOKEN_SECRET) {
    return NextResponse.json({
      authenticated: true,
      user: { email: ADMIN_LOGIN, role: "SUPER_ADMIN" },
    });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
