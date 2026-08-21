import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GlobalContactSection } from "@/components/features/global-contact-section";
import { OrganizationJsonLd, LocalBusinessJsonLd } from "@/components/features/json-ld";
import { fetchOrganizationInfo } from "@/lib/api";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kontrol.uz"),
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
  ],
  authors: [{ name: "Kontrol.uz Team" }],
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    url: "https://kontrol.uz",
    siteName: "Kontrol.uz",
    title: "Kontrol.uz — Intellektual Xavfsizlik Tizimlari",
    description: "Sanoat va tijorat ob'yektlari uchun videokuzatuv va SKUD tizimlari.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1200&h=630&auto=format&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "Kontrol.uz Industrial Security Systems",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { LanguageProvider } from "@/lib/i18n/context";
import { CartProvider } from "@/lib/cart/cart-context";
import { FloatingContactButtons } from "@/components/features/floating-contact-buttons";

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
      </body>
    </html>
  );
}
