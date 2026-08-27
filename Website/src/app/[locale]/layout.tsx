import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LanguagePopup } from "@/components/LanguagePopup";
import { SITE_URL } from "@/config/seo";
import { buildMetadata } from "@/lib/seo";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("home.title"), template: `%s | ${t("titleSuffix")}` },
    ...buildMetadata({ locale, path: "/", title: t("home.title"), description: t("home.description") }),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "JTP Trading Co., Ltd.",
    alternateName: "有限会社 JTPトレーディング",
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo-shield.png`,
    telephone: "+81-78-646-8077",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2-3-1 Kaguracho, Nagata-ku, Daiichi Marushika Bldg 5F",
      addressLocality: "Kobe",
      addressRegion: "Hyogo",
      postalCode: "653-0836",
      addressCountry: "JP",
    },
    sameAs: [
      "https://www.facebook.com/jtptrading",
      "https://www.instagram.com/jtp_wholesale/",
      "https://twitter.com/kobe_patina",
    ],
  };

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-neutral-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider>
          <LanguagePopup />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
