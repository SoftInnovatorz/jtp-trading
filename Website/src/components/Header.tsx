"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { LogoLockup } from "./Logo";
import { FacebookIcon, InstagramIcon, TwitterIcon, MenuIcon, CloseIcon, PhoneIcon } from "./icons";

export function Header() {
  const t = useTranslations("nav");
  const th = useTranslations("header");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white text-neutral-900 shadow-sm shadow-black/[0.03]">
      <div className="bg-neutral-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 text-xs sm:px-6">
          <a
            href={siteConfig.phoneHref}
            className="hidden items-center gap-1.5 text-white/70 hover:text-white sm:flex"
          >
            <PhoneIcon className="h-3.5 w-3.5" />
            {siteConfig.phone}
            <span className="text-white/40">・{th("hours")}</span>
          </a>
          <div className="flex w-full items-center justify-between sm:w-auto sm:justify-end sm:gap-4">
            <div className="flex items-center gap-3">
              <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="text-white/70 hover:text-white">
                <FacebookIcon className="h-3.5 w-3.5" />
              </a>
              <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="text-white/70 hover:text-white">
                <InstagramIcon className="h-3.5 w-3.5" />
              </a>
              <a href={siteConfig.social.twitter} target="_blank" rel="noreferrer" aria-label="Twitter" className="text-white/70 hover:text-white">
                <TwitterIcon className="h-3.5 w-3.5" />
              </a>
            </div>
            <LanguageSwitcher dark />
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/">
          <LogoLockup title="JTP TRADING" subtitle={th("tagline")} />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {siteConfig.navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  active ? "text-neutral-950" : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="text-neutral-900 md:hidden"
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-neutral-100 px-4 pb-6 pt-2 md:hidden">
          <ul className="flex flex-col gap-1">
            {siteConfig.navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-2 py-3 text-base font-medium text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950"
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
