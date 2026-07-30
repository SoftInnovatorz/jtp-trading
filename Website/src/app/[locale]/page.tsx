import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { HeroCarousel } from "@/components/HeroCarousel";
import { buildMetadata } from "@/lib/seo";

type Slide = { tag: string; title: string; body: string; image: string; href: string };
type Highlight = { title: string; body: string; image: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildMetadata({ locale, path: "/", title: t("home.title"), description: t("home.description") });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const slides = t.raw("slides") as Slide[];
  const highlights = t.raw("highlights") as Highlight[];

  return (
    <>
      <HeroCarousel slides={slides} />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="text-2xl font-bold sm:text-3xl">{t("highlightsTitle")}</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h) => (
            <div key={h.title} className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100">
                <Image
                  src={h.image}
                  alt={h.title}
                  fill
                  sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 font-semibold">{h.title}</h3>
              <p className="mt-1.5 text-sm text-neutral-600">{h.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-neutral-100 bg-neutral-50">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-14 text-center sm:px-6">
          <h2 className="text-xl font-bold sm:text-2xl">{t("onlineStoreTitle")}</h2>
          <p className="max-w-md text-sm text-neutral-600">{t("onlineStoreBody")}</p>
          <Link
            href="/contact"
            className="mt-2 rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
          >
            {t("hero.ctaSecondary")}
          </Link>
        </div>
      </section>
    </>
  );
}
