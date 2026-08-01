const clipStyle = "rounded-[3px] ring-1 ring-black/10";

export function JapanFlag({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" className={`${clipStyle} ${className}`} aria-hidden="true">
      <rect width="48" height="32" fill="#ffffff" />
      <circle cx="24" cy="16" r="9.5" fill="#bc002d" />
    </svg>
  );
}

export function ThailandFlag({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" className={`${clipStyle} ${className}`} aria-hidden="true">
      <rect width="48" height="32" fill="#ffffff" />
      <rect y="0" width="48" height="5.33" fill="#a51931" />
      <rect y="5.33" width="48" height="5.33" fill="#ffffff" />
      <rect y="10.67" width="48" height="10.67" fill="#2d2a4a" />
      <rect y="21.33" width="48" height="5.33" fill="#ffffff" />
      <rect y="26.67" width="48" height="5.33" fill="#a51931" />
    </svg>
  );
}

export function PakistanFlag({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" className={`${clipStyle} ${className}`} aria-hidden="true">
      <rect width="48" height="32" fill="#01411c" />
      <rect width="12" height="32" fill="#ffffff" />
      <circle cx="30" cy="16" r="7" fill="#ffffff" />
      <circle cx="32.3" cy="16" r="5.7" fill="#01411c" />
      <path
        d="M36 9.5 L37 13.2 L40.6 12.1 L38.2 15 L40.6 17.9 L37 16.8 L36 20.5 L35 16.8 L31.4 17.9 L33.8 15 L31.4 12.1 L35 13.2 Z"
        fill="#ffffff"
      />
    </svg>
  );
}
