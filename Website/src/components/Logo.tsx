import Image from "next/image";

export function LogoMark({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <Image
      src={dark ? "/images/logo-mark-white.png" : "/images/logo-mark.png"}
      alt="JTP Trading"
      width={99}
      height={68}
      className={`h-9 w-auto shrink-0 object-contain sm:h-10 ${className}`}
      priority
    />
  );
}

export function LogoLockup({
  title,
  subtitle,
  className = "",
  dark = false,
}: {
  title: string;
  subtitle?: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <LogoMark dark={dark} />
      <span className="flex flex-col leading-tight">
        <span className={`text-lg font-bold tracking-wide ${dark ? "text-white" : ""}`}>{title}</span>
        {subtitle && (
          <span className={`text-[8.5px] uppercase tracking-[0.15em] ${dark ? "text-white/40" : "text-neutral-400"}`}>
            {subtitle}
          </span>
        )}
      </span>
    </span>
  );
}
