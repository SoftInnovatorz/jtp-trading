import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { buildMetadata } from "@/lib/seo";
import { googleMapsUrl } from "@/lib/maps";
import { MapPinIcon } from "@/components/icons";

type Country = { flag: string; name: string; role: string; address: string; body: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildMetadata({ locale, path: "/trading", title: t("trading.title"), description: t("trading.description") });
}

export default async function TradingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("trading");
  const tc = await getTranslations("common");
  const countries = t.raw("countries") as Country[];

  return (
    <>
      <PageHero title={t("hero.title")} subtitle={t("hero.subtitle")} />

      <section className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6">
        <p className="text-neutral-700">{t("intro")}</p>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {countries.map((c) => (
            <div key={c.name} className="rounded-2xl border border-neutral-200 p-8">
              <div className="relative h-8 w-12">
                <Image src={c.flag} alt={c.name} fill className="object-contain object-left" />
              </div>
              <h3 className="mt-4 text-xl font-bold">{c.name}</h3>
              <p className="mt-1 text-sm font-semibold text-amber-600">{c.role}</p>
              <p className="mt-4 text-sm text-neutral-600">{c.body}</p>
              <p className="mt-4 border-t border-neutral-100 pt-4 text-xs text-neutral-400">{c.address}</p>
              <a
                href={googleMapsUrl(c.address)}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 hover:text-amber-700"
              >
                <MapPinIcon className="h-3.5 w-3.5" />
                {tc("viewOnMap")}
              </a>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
