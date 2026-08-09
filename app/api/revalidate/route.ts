import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const secret = request.nextUrl.searchParams.get("secret");
    const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET || "kontrol_secret_key_2026";

    if (secret !== REVALIDATION_SECRET) {
      return NextResponse.json({ message: "Invalid revalidation token" }, { status: 401 });
    }

    const body = await request.json();
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
  } catch (err) {
    return NextResponse.json({ message: "Error revalidating cache", error: String(err) }, { status: 500 });
  }
}
