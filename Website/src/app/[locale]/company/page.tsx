import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { buildMetadata } from "@/lib/seo";
import { googleMapsUrl } from "@/lib/maps";
import { MapPinIcon } from "@/components/icons";

type OverviewRow = { label: string; value: string };

// Index of the head office address row within company.overview (messages/*.json) — the one row that should link to a map.
const HEAD_OFFICE_ROW_INDEX = 2;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildMetadata({ locale, path: "/company", title: t("company.title"), description: t("company.description") });
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("company");
  const tc = await getTranslations("common");
  const overview = t.raw("overview") as OverviewRow[];

  return (
    <>
      <PageHero title={t("hero.title")} subtitle={t("hero.subtitle")} />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100">
            <Image
              src="/images/mission-new.jpg"
              alt={t("mission.title")}
              fill
              sizes="(min-width: 1024px) 580px, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">{t("mission.title")}</h2>
            <p className="mt-4 text-neutral-600">{t("mission.body")}</p>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-100 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="lg:order-2 relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100">
              <Image
                src="/images/message.png"
                alt={t("message.title")}
                fill
                sizes="(min-width: 1024px) 580px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="lg:order-1">
              <h2 className="text-2xl font-bold sm:text-3xl">{t("message.title")}</h2>
              <p className="mt-4 text-neutral-600">{t("message.body")}</p>
              <div className="mt-6 flex items-center gap-4">
                <div className="relative h-12 w-28">
                  <Image
                    src={t("message.signatureImage")}
                    alt={t("message.name")}
                    fill
                    sizes="112px"
                    className="object-contain object-left"
                  />
                </div>
                <p className="text-sm font-semibold text-neutral-800">{t("message.name")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold sm:text-3xl">{t("overviewTitle")}</h2>
        <dl className="mt-8 divide-y divide-neutral-200 border-y border-neutral-200">
          {overview.map((row, i) => (
            <div key={row.label} className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-4 sm:gap-4">
              <dt className="text-sm font-semibold text-neutral-500 sm:col-span-1">{row.label}</dt>
              <dd className="text-sm text-neutral-800 sm:col-span-3">
                {row.value}
                {i === HEAD_OFFICE_ROW_INDEX && (
                  <a
                    href={googleMapsUrl(row.value)}
                    target="_blank"
                    rel="noreferrer"
                    className="ml-2 inline-flex items-center gap-1 text-xs font-semibold text-amber-600 hover:text-amber-700"
                  >
                    <MapPinIcon className="h-3.5 w-3.5" />
                    {tc("viewOnMap")}
                  </a>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
