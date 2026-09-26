import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Constant-time string comparison to prevent timing attacks
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export async function POST(request: NextRequest) {
  try {
    const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET;
    if (!REVALIDATION_SECRET) {
      console.error("[Revalidate API] REVALIDATION_SECRET is not configured in .env");
      return NextResponse.json(
        { message: "Revalidation secret is not configured on the server" },
        { status: 500 }
      );
    }

    // Accept secret from Authorization header, x-revalidate-secret header, or URL search param
    let providedSecret = request.nextUrl.searchParams.get("secret");

    const authHeader = request.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      providedSecret = authHeader.slice(7).trim();
    } else {
      const customHeader = request.headers.get("x-revalidate-secret");
      if (customHeader) {
        providedSecret = customHeader.trim();
      }
    }

    if (!providedSecret || !timingSafeEqual(providedSecret, REVALIDATION_SECRET)) {
      return NextResponse.json(
        { message: "Invalid revalidation token" },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const model = body?.model || body?.event;
    const slug = body?.entry?.slug;

    if (slug) {
      revalidatePath(`/katalog/product/${slug}`);
    }
    revalidatePath("/katalog");
    revalidatePath("/");

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      model: model || "all",
      slug: slug || "all",
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error revalidating cache", error: String(err?.message || err) },
      { status: 500 }
    );
  }
}
