import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type SectionTone = "light" | "canvas" | "dark";

const toneClasses: Record<SectionTone, string> = {
  light: "bg-white text-ink-900",
  canvas: "bg-canvas text-ink-900",
  dark: "bg-ink-950 text-white",
};

type SectionProps = {
  /** Anchor id, also used for in-page navigation. */
  id: string;
  /** id of the section's heading element (h2) for aria-labelledby. */
  labelledBy: string;
  tone?: SectionTone;
  className?: string;
  /** Classes for the inner page-width container. */
  containerClassName?: string;
  /** Decorative layers rendered behind the container (aria-hidden by caller). */
  background?: ReactNode;
  children: ReactNode;
};

/**
 * Landmark wrapper for every home-page section: semantic <section> labelled by
 * its heading, consistent vertical rhythm, tone and page-width container.
 */
export function Section({
  id,
  labelledBy,
  tone = "light",
  className,
  containerClassName,
  background,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative isolate overflow-x-clip py-24 sm:py-28 lg:py-32",
        toneClasses[tone],
        className,
      )}
    >
      {background}
      <div className={cn("container-page relative", containerClassName)}>{children}</div>
    </section>
  );
}
