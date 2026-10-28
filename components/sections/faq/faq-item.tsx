import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type FaqItemProps = {
  /** Zero-based position, rendered as a two-digit index. */
  index: number;
  question: string;
  answer: string;
  /** Shared `name` makes the group an exclusive accordion. */
  group: string;
  defaultOpen?: boolean;
};

/**
 * Smooth height animation where the browser supports `::details-content` and
 * `interpolate-size` (and motion is allowed); everywhere else it opens instantly.
 */
const smoothOpen = [
  "supports-[interpolate-size:allow-keywords]:[interpolate-size:allow-keywords]",
  "supports-[interpolate-size:allow-keywords]:details-content:h-0",
  "supports-[interpolate-size:allow-keywords]:details-content:overflow-clip",
  "supports-[interpolate-size:allow-keywords]:motion-safe:details-content:transition-[height,content-visibility]",
  "supports-[interpolate-size:allow-keywords]:details-content:transition-discrete",
  "supports-[interpolate-size:allow-keywords]:details-content:duration-400",
  "supports-[interpolate-size:allow-keywords]:details-content:ease-[cubic-bezier(0.22,1,0.36,1)]",
  "supports-[interpolate-size:allow-keywords]:open:details-content:h-auto",
].join(" ");

/**
 * Keeps hyphenated words such as "Wi-Fi" on one line in narrow cards without
 * changing the text content (the FAQPage JSON-LD must match it exactly).
 */
function keepHyphenatedWords(text: string): ReactNode[] {
  return text.split(/(\S+-\S+)/).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

/** One accordion row built on native <details>/<summary>: no JavaScript needed. */
export function FaqItem({ index, question, answer, group, defaultOpen = false }: FaqItemProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <details
      name={group}
      open={defaultOpen}
      className={cn(
        "group rounded-3xl bg-canvas ring-1 ring-ink-100 transition-[background-color,box-shadow] duration-300",
        "not-open:hover:bg-ink-50 not-open:hover:ring-ink-200",
        "open:bg-white open:shadow-lift open:ring-brand-300",
        smoothOpen,
      )}
    >
      <summary className="flex min-h-14 cursor-pointer list-none items-center gap-4 rounded-3xl px-5 py-4 select-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-hidden sm:gap-5 sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
        <span
          aria-hidden="true"
          className="w-6 shrink-0 font-mono text-xs font-medium text-ink-500 tabular-nums transition-colors duration-300 group-open:text-brand-600"
        >
          {number}
        </span>
        <h3 className="flex-1 text-base leading-snug font-semibold tracking-[-0.01em] text-ink-950 sm:text-lg">
          {keepHyphenatedWords(question)}
        </h3>
        <span
          aria-hidden="true"
          className="relative grid size-9 shrink-0 place-items-center rounded-full bg-white text-ink-700 ring-1 ring-ink-200 transition-[background-color,color,box-shadow,rotate] duration-300 group-open:rotate-180 group-open:bg-brand-600 group-open:text-white group-open:ring-brand-600"
        >
          <span className="absolute h-0.5 w-3.5 rounded-full bg-current" />
          <span className="absolute h-3.5 w-0.5 rounded-full bg-current transition-transform duration-300 group-open:scale-y-0" />
        </span>
      </summary>

      <div className="pr-5 pb-6 pl-5 sm:pr-20 sm:pl-17">
        <p className="text-[0.95rem] leading-relaxed text-ink-500 sm:text-base">{answer}</p>
      </div>
    </details>
  );
}
