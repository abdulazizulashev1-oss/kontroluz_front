import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE_NAME,
  createSessionToken,
  verifySessionToken,
} from "@/lib/auth/session";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";

const ADMIN_LOGIN = process.env.ADMIN_LOGIN || "admin@kontrol.uz";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "KontrolAdmin2026!";
const ADMIN_SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET ||
  "fallback_kontrol_secret_key_change_in_env_local_2026";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, login, password } = body;

    // 1. Handle Logout
    if (action === "logout") {
      const response = NextResponse.json({
        success: true,
        message: "Tizimdan muvaffaqiyatli chiqildi",
      });
      response.cookies.delete(SESSION_COOKIE_NAME);
      return response;
    }

    // 2. Handle Login
    if (action === "login") {
      const clientIp = getClientIp(request);
      const rateLimitKey = `admin-login:${clientIp}`;

      // Rate limit: Maximum 5 login attempts per 15 minutes per IP
      const rateCheck = checkRateLimit(rateLimitKey, 5, 15 * 60 * 1000);
      if (!rateCheck.success) {
        const retryMinutes = Math.ceil((rateCheck.resetTime - Date.now()) / 60000);
        return NextResponse.json(
          {
            success: false,
            error: `Juda ko'p xato urinishlar qilindi. Iltimos, ${retryMinutes} daqiqadan so'ng qayta urinib ko'ring.`,
          },
          { status: 429 }
        );
      }

      if (login === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
        // Create cryptographically signed HMAC-SHA256 session token
        const token = await createSessionToken(
          { email: ADMIN_LOGIN, role: "SUPER_ADMIN" },
          ADMIN_SESSION_SECRET,
          7 * 24 * 3600 // 7 days
        );

        const response = NextResponse.json({
          success: true,
          message: "Autentifikatsiya muvaffaqiyatli",
          user: { email: ADMIN_LOGIN, role: "SUPER_ADMIN" },
        });

        // Set secure HTTP-only session cookie
        response.cookies.set({
          name: SESSION_COOKIE_NAME,
          value: token,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return response;
      }

      return NextResponse.json(
        {
          success: false,
          error: "Login yoki parol noto'g'ri kiritildi",
          remainingAttempts: rateCheck.remaining,
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Noto'g'ri so'rov" },
      { status: 400 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: String(err?.message || err) },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);

  if (sessionCookie?.value) {
    const verifyResult = await verifySessionToken(
      sessionCookie.value,
      ADMIN_SESSION_SECRET
    );

    if (verifyResult.valid && verifyResult.payload) {
      return NextResponse.json({
        authenticated: true,
        user: {
          email: verifyResult.payload.email,
          role: verifyResult.payload.role,
        },
      });
    }
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
