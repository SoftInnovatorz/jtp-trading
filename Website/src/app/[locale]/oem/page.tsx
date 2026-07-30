import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { ImageGrid } from "@/components/ImageGrid";
import { Link } from "@/i18n/navigation";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

type Step = { step: string; title: string; body: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildMetadata({ locale, path: "/oem", title: t("oem.title"), description: t("oem.description") });
}

export default async function OemPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("oem");
  const tContact = await getTranslations("contact");
  const tc = await getTranslations("common");
  const leatherImages = t.raw("leatherCapability.images") as string[];
  const remakeImages = t.raw("remakeCapability.images") as string[];
  const steps = t.raw("process") as Step[];

  return (
    <>
      <PageHero title={t("hero.title")} subtitle={t("hero.subtitle")} />

      <section className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6">
        <p className="text-neutral-700">{t("intro")}</p>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="rounded-2xl bg-amber-50 p-8 text-center">
          <h3 className="text-lg font-bold">{t("minOrderTitle")}</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-neutral-700">{t("minOrderBody")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold sm:text-3xl">{t("capabilitiesTitle")}</h2>
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold">{t("leatherCapability.title")}</h3>
            <p className="mt-2 text-sm text-neutral-600">{t("leatherCapability.body")}</p>
            <div className="mt-4">
              <ImageGrid
                images={leatherImages}
                alt={t("leatherCapability.title")}
                linkTo={siteConfig.ecommerceUrl}
                linkLabel={tc("seeMore")}
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t("remakeCapability.title")}</h3>
            <p className="mt-2 text-sm text-neutral-600">{t("remakeCapability.body")}</p>
            <div className="mt-4">
              <ImageGrid
                images={remakeImages}
                alt={t("remakeCapability.title")}
                linkTo={siteConfig.ecommerceUrl}
                linkLabel={tc("seeMore")}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-100 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">{t("processTitle")}</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.step}>
                <span className="text-3xl font-bold text-amber-500">{s.step}</span>
                <h3 className="mt-2 font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-neutral-600">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-block rounded-full bg-neutral-950 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
            >
              {tContact("hero.title")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
