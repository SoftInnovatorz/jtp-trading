"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon, CloseIcon, ZoomIcon } from "./icons";

export function ImageGrid({
  images,
  alt,
  linkTo,
  linkLabel,
}: {
  images: string[];
  alt: string;
  linkTo?: string;
  linkLabel?: string;
}) {
  const t = useTranslations("common");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = () => setActiveIndex(null);
  const showPrev = () => setActiveIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
  const showNext = () => setActiveIndex((i) => (i === null ? i : (i + 1) % images.length));

  useEffect(() => {
    if (activeIndex === null) return;

    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex]);

  return (
    <>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActiveIndex(i)}
            className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-neutral-100"
            aria-label={`${t("enlarge")}: ${alt} ${i + 1}`}
          >
            <Image
              src={src}
              alt={`${alt} ${i + 1}`}
              fill
              sizes="(min-width: 640px) 220px, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-end justify-center bg-neutral-950/0 p-2 transition-colors duration-300 group-hover:bg-neutral-950/40">
              <span className="flex translate-y-2 items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-neutral-900 opacity-0 shadow transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <ZoomIcon className="h-3 w-3" />
                {t("enlarge")}
              </span>
            </div>
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${alt} ${activeIndex + 1}`}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label={t("closeImage")}
            className="absolute right-4 top-4 cursor-pointer rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          >
            <CloseIcon className="h-5 w-5" />
          </button>

          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              aria-label={t("previousImage")}
              className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:left-4"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
          )}

          <div
            className="relative h-[70vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeIndex]}
              alt={`${alt} ${activeIndex + 1}`}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>

          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label={t("nextImage")}
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:right-4"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          )}

          {linkTo && (
            <a
              href={linkTo}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-6 flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-neutral-900 shadow transition-colors hover:bg-neutral-100"
            >
              {linkLabel}
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      )}
    </>
  );
}
