import { Heart } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

/**
 * Small illustrative UI moments that float around the care window.
 * All decorative: the parent figure is aria-hidden and carries a caption.
 */

const cardBase = "rounded-3xl bg-white font-humanist shadow-float ring-1 ring-care-900/5";

/** Morning message from the nurse. */
export function NurseMessageCard({ className }: { className?: string }) {
  return (
    <div className={cn(cardBase, "w-[10.75rem] p-3 sm:w-[14.5rem] sm:p-4", className)}>
      <div className="flex items-center gap-2 sm:gap-2.5">
        <span className="relative grid size-7 shrink-0 place-items-center rounded-full bg-blush-100 font-display text-[0.65rem] font-medium text-blush-600 sm:size-9 sm:text-[0.8rem]">
          DR
          <span className="absolute -right-px -bottom-px size-2 rounded-full bg-care-400 ring-2 ring-white sm:size-2.5" />
        </span>
        <span className="min-w-0 leading-tight">
          <span className="block truncate text-[0.7rem] font-semibold text-care-950 sm:text-[0.8rem]">
            Nurse Daniela
          </span>
          <span className="block text-[0.6rem] text-stone-500 sm:text-[0.7rem]">7:02 AM</span>
        </span>
      </div>
      <p className="mt-2 rounded-2xl rounded-tl-md bg-cream-100 px-2.5 py-2 text-[0.68rem] leading-snug text-stone-700 sm:mt-3 sm:px-3 sm:text-[0.8rem]">
        Good morning, Maria! Your reading looks great today.
        <Heart
          aria-hidden="true"
          className="ml-1 inline size-3 -translate-y-px text-blush-400"
          fill="currentColor"
          strokeWidth={0}
        />
      </p>
    </div>
  );
}

/** A calm blood pressure reading taken at home. */
export function ReadingCard({ className }: { className?: string }) {
  return (
    <div className={cn(cardBase, "w-[8.75rem] p-3 sm:w-[12rem] sm:p-4", className)}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-[0.6rem] font-medium text-stone-500 sm:text-[0.72rem]">Blood pressure</span>
        <span className="rounded-full bg-care-100 px-1.5 py-0.5 text-[0.55rem] font-semibold text-care-700 sm:px-2 sm:text-[0.65rem]">
          Normal
        </span>
      </div>
      <div className="mt-1 flex items-baseline gap-1 sm:mt-1.5">
        <span className="font-display text-[1.45rem] leading-none tracking-[-0.02em] text-care-950 [font-variation-settings:'SOFT'_100,'opsz'_72] sm:text-[2.1rem]">
          124/79
        </span>
        <span className="text-[0.58rem] text-stone-500 sm:text-[0.7rem]">mmHg</span>
      </div>
      <svg viewBox="0 0 140 30" className="mt-1.5 h-5 w-full sm:mt-2 sm:h-7" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="dawn-spark-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fcd0c0" stopOpacity="0.7" />
            <stop offset="1" stopColor="#fcd0c0" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 20 C10 20 14 17 22 18 S34 21 44 19 L54 19 L58 10 L62 25 L66 5 L70 22 L74 19 C86 19 94 15 106 16 S124 18 134 14 L134 30 L0 30 Z"
          fill="url(#dawn-spark-fill)"
        />
        <path
          d="M0 20 C10 20 14 17 22 18 S34 21 44 19 L54 19 L58 10 L62 25 L66 5 L70 22 L74 19 C86 19 94 15 106 16 S124 18 134 14"
          fill="none"
          stroke="#ef8e70"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="134" cy="14" r="2.6" fill="#ef8e70" />
        <circle cx="134" cy="14" r="5" fill="#ef8e70" opacity="0.2" />
      </svg>
      <p className="mt-1 text-[0.58rem] text-stone-500 sm:mt-1.5 sm:text-[0.68rem]">Taken at home · 7:00 AM</p>
    </div>
  );
}

const onCall = [
  { initials: "AM", tint: "bg-care-100 text-care-700" },
  { initials: "LS", tint: "bg-blush-100 text-blush-600" },
  { initials: "JP", tint: "bg-lilac-100 text-lilac-700" },
];

/** The quiet-hours check-in: someone is always there. */
export function NightCheckInPill({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 rounded-full bg-white py-1.5 pr-3 pl-1.5 font-humanist shadow-float ring-1 ring-care-900/5 sm:gap-3 sm:py-2 sm:pr-4 sm:pl-2",
        className,
      )}
    >
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-lilac-100 text-lilac-500 sm:size-10">
        <svg viewBox="0 0 24 24" className="size-4 sm:size-[1.15rem]" aria-hidden="true" focusable="false">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" fill="currentColor" />
        </svg>
      </span>
      <span className="leading-tight whitespace-nowrap">
        <span className="block text-[0.7rem] font-semibold text-care-950 sm:text-[0.8rem]">
          Night check-in · 2:14 AM
        </span>
        <span className="mt-0.5 flex items-center gap-1.5 text-[0.6rem] text-stone-500 sm:text-[0.7rem]">
          <span className="size-1.5 rounded-full bg-care-400" />
          Nurse on call 24/7
        </span>
      </span>
      <span className="ml-1 flex -space-x-1">
        {onCall.map((person) => (
          <span
            key={person.initials}
            className={cn(
              "grid size-6 place-items-center rounded-full text-[0.5rem] font-semibold ring-2 ring-white sm:size-7 sm:text-[0.58rem]",
              person.tint,
            )}
          >
            {person.initials}
          </span>
        ))}
      </span>
    </div>
  );
}

// Scalloped sticker edge: 18 soft bumps around a circle (computed once).
const SCALLOP = (() => {
  const bumps = 18;
  const radius = 52;
  const points = Array.from({ length: bumps }, (_, i) => {
    const angle = (i / bumps) * Math.PI * 2;
    return [60 + radius * Math.cos(angle), 60 + radius * Math.sin(angle)] as const;
  });
  const arcs = points
    .map((_, i) => {
      const [x, y] = points[(i + 1) % bumps];
      return `A9.6 9.6 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
  return `M${points[0][0].toFixed(2)} ${points[0][1].toFixed(2)} ${arcs} Z`;
})();

/** Round "First device free" sticker with slowly turning lettering. */
export function FreeDeviceSticker({ className }: { className?: string }) {
  return (
    <div className={cn("size-[5.25rem] sm:size-[6.75rem]", className)}>
      <svg
        viewBox="0 0 120 120"
        className="absolute inset-0 size-full drop-shadow-[0_12px_18px_rgb(19_54_48/0.16)]"
        aria-hidden="true"
        focusable="false"
      >
        <path d={SCALLOP} fill="#fffdf9" />
        <circle cx="60" cy="60" r="35" fill="#fff5f1" />
        <circle cx="60" cy="60" r="35" fill="none" stroke="#f7b29b" strokeWidth="1" strokeDasharray="0.5 3.2" strokeLinecap="round" />
        <path
          d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
          transform="translate(45.6 46) scale(1.2)"
          fill="#ef8e70"
        />
      </svg>
      <svg
        viewBox="0 0 120 120"
        className="absolute inset-0 size-full animate-spin-slow"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <path id="dawn-sticker-ring" d="M60 60 m-40 0 a40 40 0 1 1 80 0 a40 40 0 1 1 -80 0" />
        </defs>
        <text className="font-humanist" fontSize="9" fontWeight="700" letterSpacing="1.6" fill="#c9553a">
          <textPath href="#dawn-sticker-ring" textLength="250" lengthAdjust="spacing">
            FIRST DEVICE FREE • FIRST DEVICE FREE •
          </textPath>
        </text>
      </svg>
    </div>
  );
}
