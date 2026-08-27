import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { ImageGrid } from "@/components/ImageGrid";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildMetadata({ locale, path: "/business", title: t("business.title"), description: t("business.description") });
}

export default async function BusinessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("business");
  const tc = await getTranslations("common");
  const usedImages = t.raw("usedClothing.images") as string[];
  const remakeImages = t.raw("remake.images") as string[];
  const leatherImages = t.raw("leather.images") as string[];

  return (
    <>
      <PageHero title={t("hero.title")} subtitle={t("hero.subtitle")} />

      <section className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6">
        <p className="text-neutral-700">{t("intro")}</p>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-amber-600">{t("usedClothing.tag")}</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{t("usedClothing.title")}</h2>
            <p className="mt-4 text-neutral-600">{t("usedClothing.body")}</p>
          </div>
          <ImageGrid
            images={usedImages}
            alt={t("usedClothing.title")}
            linkTo={siteConfig.ecommerceUrl}
            linkLabel={tc("seeMore")}
          />
        </div>
      </section>

      <section className="border-t border-neutral-100 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="lg:order-2">
              <p className="text-xs font-semibold tracking-[0.2em] text-amber-600">{t("leather.tag")}</p>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{t("leather.title")}</h2>
              <p className="mt-4 text-neutral-600">{t("leather.body")}</p>
            </div>
            <div className="lg:order-1">
              <ImageGrid
                images={leatherImages}
                alt={t("leather.title")}
                linkTo={siteConfig.ecommerceUrl}
                linkLabel={tc("seeMore")}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-amber-600">{t("remake.tag")}</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{t("remake.title")}</h2>
            <p className="mt-4 text-neutral-600">{t("remake.body")}</p>
          </div>
          <ImageGrid
            images={remakeImages}
            alt={t("remake.title")}
            linkTo={siteConfig.ecommerceUrl}
            linkLabel={tc("seeMore")}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 p-8">
            <h3 className="text-lg font-bold">{t("infrastructureTitle")}</h3>
            <p className="mt-3 text-sm text-neutral-600">{t("infrastructure")}</p>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-neutral-200 p-8">
            <h3 className="text-lg font-bold">{t("brandsTitle")}</h3>
            <p className="mt-3 text-sm text-neutral-600">{t("brandsBody")}</p>
            <div className="relative mt-4 h-16 w-full">
              <Image
                src="/images/brands.png"
                alt={t("brandsTitle")}
                fill
                sizes="(min-width: 640px) 320px, 90vw"
                className="object-contain object-left"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
