import Image from "next/image";

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/images/logo-shield.png"
      alt="JTP Trading"
      width={165}
      height={174}
      className={`h-10 w-auto shrink-0 object-contain sm:h-11 ${className}`}
      priority
    />
  );
}

export function LogoLockup({
  title,
  subtitle,
  className = "",
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <LogoMark />
      <span className="flex flex-col leading-tight">
        <span className="text-lg font-bold tracking-wide">{title}</span>
        {subtitle && (
          <span className="text-[8.5px] uppercase tracking-[0.15em] text-neutral-400">{subtitle}</span>
        )}
      </span>
    </span>
  );
}
