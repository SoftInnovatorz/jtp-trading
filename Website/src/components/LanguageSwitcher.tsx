"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LABELS: Record<string, string> = { ja: "日本語", en: "English" };

export function LanguageSwitcher({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const separatorClass = dark ? "text-white/30" : "text-neutral-300";
  const activeClass = dark
    ? "font-semibold text-white underline underline-offset-4"
    : "font-semibold text-neutral-950 underline underline-offset-4";
  const inactiveClass = dark
    ? "text-white/70 hover:text-white transition-colors"
    : "text-neutral-500 hover:text-neutral-900 transition-colors";

  return (
    <div className={`flex items-center gap-1 text-sm ${className}`}>
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-1">
          {i > 0 && <span className={separatorClass}>/</span>}
          <button
            type="button"
            onClick={() => {
              window.localStorage.setItem("jtp-lang-chosen", "true");
              router.replace(pathname, { locale: loc });
            }}
            aria-current={loc === locale ? "true" : undefined}
            className={loc === locale ? activeClass : inactiveClass}
          >
            {LABELS[loc]}
          </button>
        </span>
      ))}
    </div>
  );
}
