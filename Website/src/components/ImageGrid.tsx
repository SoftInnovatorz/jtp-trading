import Image from "next/image";
import { ArrowRightIcon } from "./icons";

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
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      {images.map((src, i) => {
        const tile = (
          <div className="relative aspect-square overflow-hidden rounded-xl bg-neutral-100">
            <Image
              src={src}
              alt={`${alt} ${i + 1}`}
              fill
              sizes="(min-width: 640px) 220px, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {linkTo && (
              <div className="absolute inset-0 flex items-end justify-center bg-neutral-950/0 p-2 transition-colors duration-300 group-hover:bg-neutral-950/40">
                <span className="flex translate-y-2 items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-neutral-900 opacity-0 shadow transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {linkLabel}
                  <ArrowRightIcon className="h-3 w-3" />
                </span>
              </div>
            )}
          </div>
        );

        return linkTo ? (
          <a
            key={src}
            href={linkTo}
            target="_blank"
            rel="noreferrer"
            className="group"
            aria-label={linkLabel ? `${linkLabel}: ${alt} ${i + 1}` : undefined}
          >
            {tile}
          </a>
        ) : (
          <div key={src} className="group">
            {tile}
          </div>
        );
      })}
    </div>
  );
}
