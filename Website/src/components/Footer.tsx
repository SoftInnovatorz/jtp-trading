import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { LogoLockup } from "./Logo";
import { FacebookIcon, InstagramIcon, TwitterIcon, PhoneIcon } from "./icons";

export function Footer() {
  const t = useTranslations("nav");
  const f = useTranslations("footer");
  const c = useTranslations("contact");
  const h = useTranslations("header");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-amber-500 bg-neutral-950 text-white/60">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr] md:gap-8">
        <div className="md:pr-8">
          <LogoLockup title="JTP TRADING" subtitle={h("tagline")} dark />
          <p className="mt-5 text-sm font-medium text-white/90">{f("companyName")}</p>
          <p className="mt-1.5 max-w-[26ch] text-sm leading-relaxed">{f("address")}</p>
          <a
            href={siteConfig.phoneHref}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-white/90 hover:text-amber-400"
          >
            <PhoneIcon className="h-3.5 w-3.5" />
            {siteConfig.phone}
          </a>
        </div>

        <div className="md:border-l md:border-white/10 md:pl-8">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white">
            {t("home")}
          </p>
          <span className="mt-2 block h-0.5 w-6 bg-amber-500" />
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            {siteConfig.navItems.map((item) => (
              <li key={item.key}>
                <Link href={item.href} className="transition-colors hover:text-amber-400">
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-8 md:border-l md:border-white/10 md:pl-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white">
              {f("followUs")}
            </p>
            <span className="mt-2 block h-0.5 w-6 bg-amber-500" />
            <div className="mt-4 flex items-center gap-4">
              <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="text-white/50 transition-colors hover:text-amber-400">
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="text-white/50 transition-colors hover:text-amber-400">
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a href={siteConfig.social.twitter} target="_blank" rel="noreferrer" aria-label="Twitter" className="text-white/50 transition-colors hover:text-amber-400">
                <TwitterIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <Link
            href="/contact"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-xs font-semibold text-neutral-950 transition-colors hover:bg-amber-400"
          >
            {c("hero.title")}
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/30 sm:px-6">
        © {year} {f("companyName")} {f("rights")}
      </div>
    </footer>
  );
}
