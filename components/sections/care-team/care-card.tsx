import type { ReactNode } from "react";
import { Check } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

type CareCardProps = {
  /** id for the card's h3, used by aria-labelledby. */
  titleId: string;
  title: string;
  description?: string;
  points: readonly string[];
  /** Decorative visual shown above the copy (must be aria-hidden). */
  visual: ReactNode;
  glow: "vital" | "brand";
};

/**
 * Glass card on the dark care-team band. From lg the parent grid uses
 * subgrid rows so both cards' visuals and titles line up.
 */
export function CareCard({ titleId, title, description, points, visual, glow }: CareCardProps) {
  return (
    <article
      aria-labelledby={titleId}
      className="glass-dark relative isolate flex flex-col gap-8 overflow-hidden rounded-4xl p-5 sm:p-8 lg:row-span-2 lg:grid lg:grid-rows-subgrid xl:p-10"
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-32 -right-24 -z-10 size-80 rounded-full blur-3xl",
          glow === "vital" ? "bg-vital-400/12" : "bg-brand-500/18",
        )}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent"
      />

      {visual}

      <div>
        <h3 id={titleId} className="text-2xl font-semibold tracking-[-0.02em] text-white sm:text-[1.75rem]">
          {title}
        </h3>
        {description ? <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-200">{description}</p> : null}
        <ul role="list" className="mt-6 grid gap-x-6 gap-y-3.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <span className="mt-px grid size-6 shrink-0 place-items-center rounded-md bg-vital-300/10 text-vital-300 ring-1 ring-vital-300/25">
                <Check aria-hidden="true" className="size-3.5" strokeWidth={2.8} />
              </span>
              <span className="text-[0.95rem] leading-snug text-ink-100">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
