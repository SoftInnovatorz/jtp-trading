import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/config/site";
import { PhoneIcon } from "@/components/icons";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildMetadata({ locale, path: "/contact", title: t("contact.title"), description: t("contact.description") });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <>
      <PageHero title={t("hero.title")} subtitle={t("hero.subtitle")} />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <p className="text-sm text-neutral-600">{t("intro")}</p>

            <div className="mt-8 rounded-2xl border border-neutral-200 p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                {t("directTitle")}
              </p>
              <a
                href={siteConfig.phoneHref}
                className="mt-2 flex items-center gap-2 text-xl font-bold text-neutral-900 hover:text-amber-600"
              >
                <PhoneIcon className="h-5 w-5" />
                {siteConfig.phone}
              </a>
              <p className="mt-1 text-xs text-neutral-500">{t("hoursNote")}</p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
