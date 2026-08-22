import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GlobalContactSection } from "@/components/features/global-contact-section";
import {
  OrganizationJsonLd,
  LocalBusinessJsonLd,
  WebSiteJsonLd,
} from "@/components/features/json-ld";
import { fetchOrganizationInfo } from "@/lib/api";
import { LanguageProvider } from "@/lib/i18n/context";
import { CartProvider } from "@/lib/cart/cart-context";
import { FloatingContactButtons } from "@/components/features/floating-contact-buttons";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kontrol.uz";
const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kontrol.uz — Intellektual Xavfsizlik va Muhandislik Tizimlari",
    template: "%s | Kontrol.uz",
  },
  description:
    "Toshkentda professional videokuzatuv kameralari, SKUD biometrik turniketlar va yong'in xavfsizligi tizimlarini sotish va o'rnatish. Rasmiy kafolat.",
  keywords: [
    "videokuzatuv kameralari Toshkent",
    "Hikvision diller Uzbekistan",
    "Dahua NVR registrator",
    "turniketlar sotib olish",
    "biometriya SKUD",
    "xavfsizlik tizimlari",
    "Kontrol.uz",
  ],
  authors: [{ name: "Kontrol.uz Team" }],
  alternates: {
    canonical: siteUrl,
    languages: {
      "uz-UZ": siteUrl,
      "ru-RU": siteUrl,
      "en-US": siteUrl,
      "x-default": siteUrl,
    },
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    alternateLocale: ["uz_UZ", "en_US"],
    url: siteUrl,
    siteName: "Kontrol.uz",
    title: "Kontrol.uz — Intellektual Xavfsizlik Tizimlari",
    description: "Sanoat va tijorat obyektlari uchun videokuzatuv va SKUD tizimlari.",
    images: [
      {
        url: `${siteUrl}/images/logo.png`,
        width: 1200,
        height: 630,
        alt: "Kontrol.uz Industrial Security Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontrol.uz — Intellektual Xavfsizlik Tizimlari",
    description: "Sanoat va tijorat obyektlari uchun videokuzatuv va SKUD tizimlari.",
    images: [`${siteUrl}/images/logo.png`],
  },
  verification: {
    google: googleVerification || "google_site_verification_code_here",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgInfo = await fetchOrganizationInfo();

  return (
    <html lang="ru" className={inter.variable}>
      <head>
        <OrganizationJsonLd org={orgInfo} />
        <LocalBusinessJsonLd org={orgInfo} />
        <WebSiteJsonLd />
      </head>
      <body className="min-h-screen flex flex-col justify-between relative">
        <LanguageProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <GlobalContactSection />
            <Footer />
            <FloatingContactButtons />
          </CartProvider>
        </LanguageProvider>
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
