import { cookies } from "next/headers";
import { Language } from "./translations";

/**
 * Server-side helper to get the active language from request cookies.
 * Defaults to 'ru' (Русский) if not set.
 */
export async function getServerLocale(): Promise<Language> {
  try {
    const cookieStore = await cookies();
    const lang = cookieStore.get("kontrol_lang")?.value as Language;
    if (lang && (lang === "uz" || lang === "ru" || lang === "en")) {
      return lang;
    }
  } catch (err) {
    // In static generation or when headers are unavailable
  }
  return "ru";
}
