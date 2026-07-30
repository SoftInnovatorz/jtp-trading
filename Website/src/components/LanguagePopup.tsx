"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

const STORAGE_KEY = "jtp-lang-chosen";

export function LanguagePopup() {
  const t = useTranslations("languagePopup");
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const chosen = window.localStorage.getItem(STORAGE_KEY);
    if (!chosen) setOpen(true);
  }, []);

  function choose(locale: "ja" | "en") {
    window.localStorage.setItem(STORAGE_KEY, "true");
    setOpen(false);
    router.replace(pathname, { locale });
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Language selection"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
    >
      <div className="w-full max-w-sm rounded-2xl bg-white text-neutral-900 p-8 text-center shadow-2xl">
        <p className="text-lg font-semibold">{t("title")}</p>
        <p className="mt-1 text-sm text-neutral-500">{t("subtitle")}</p>
        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => choose("ja")}
            className="w-full rounded-full bg-neutral-900 text-white py-3 font-medium tracking-wide hover:bg-neutral-700 transition-colors"
          >
            {t("ja")}
          </button>
          <button
            type="button"
            onClick={() => choose("en")}
            className="w-full rounded-full border border-neutral-900 py-3 font-medium tracking-wide hover:bg-neutral-100 transition-colors"
          >
            {t("en")}
          </button>
        </div>
        <p className="mt-5 text-xs text-neutral-400">{t("remember")}</p>
      </div>
    </div>
  );
}
