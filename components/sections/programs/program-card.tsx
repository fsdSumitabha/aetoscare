import Link from "next/link";
import type { ComponentType } from "react";
import { ArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import type { programs } from "@/lib/content/home";
import { CcmCornerGraphic, RpmCornerGraphic } from "./program-corner-graphics";

export type ProgramItem = (typeof programs.items)[number];
type ProgramKey = ProgramItem["key"];

type Accent = {
  /** Gradient stops for the oversized abbreviation. */
  abbr: string;
  kicker: string;
  dot: string;
  node: string;
  nodeFinal: string;
  /** Gradient stops for the connector drawn by each step's ::before. */
  connector: string;
  glow: string;
  linkHover: string;
  linkIcon: string;
};

/** RPM = brand azure, CCM = vital mint. Static strings so Tailwind can see them. */
const accents: Record<ProgramKey, Accent> = {
  rpm: {
    abbr: "from-brand-500 via-brand-400/70 to-brand-200/0",
    kicker: "text-brand-700",
    dot: "bg-brand-500",
    node: "bg-white text-brand-700 ring-brand-200",
    nodeFinal: "bg-brand-600 text-white ring-brand-600",
    connector: "before:from-brand-400 before:to-brand-100",
    glow: "bg-brand-300/25",
    linkHover: "hover:bg-brand-50/70 hover:ring-brand-300",
    linkIcon: "bg-brand-600",
  },
  ccm: {
    abbr: "from-vital-500 via-vital-400/70 to-vital-200/0",
    kicker: "text-vital-700",
    dot: "bg-vital-500",
    node: "bg-white text-vital-700 ring-vital-200",
    nodeFinal: "bg-vital-700 text-white ring-vital-700",
    connector: "before:from-vital-400 before:to-vital-100",
    glow: "bg-vital-300/25",
    linkHover: "hover:bg-vital-50/70 hover:ring-vital-300",
    linkIcon: "bg-vital-700",
  },
};

const cornerGraphics: Record<ProgramKey, ComponentType> = {
  rpm: RpmCornerGraphic,
  ccm: CcmCornerGraphic,
};

type ProgramCardProps = {
  item: ProgramItem;
};

/**
 * One care program (RPM or CCM): oversized abbreviation, the "what is"
 * kicker, name and summary, a three-step vertical stepper and a deep link.
 */
export function ProgramCard({ item }: ProgramCardProps) {
  const accent = accents[item.key];
  const CornerGraphic = cornerGraphics[item.key];
  const titleId = `programs-${item.key}-title`;

  return (
    <article
      aria-labelledby={titleId}
      className="reveal relative isolate flex flex-col overflow-hidden rounded-4xl bg-white p-6 shadow-soft ring-1 ring-ink-100 sm:p-10"
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-28 -right-28 -z-10 size-80 rounded-full blur-3xl",
          accent.glow,
        )}
      />
      <CornerGraphic />

      <header className="relative">
        <span
          aria-hidden="true"
          className={cn(
            "block w-fit bg-linear-to-b bg-clip-text pb-1 font-mono text-[4.5rem] leading-[0.85] font-semibold tracking-[-0.07em] text-transparent sm:text-[7rem]",
            accent.abbr,
          )}
        >
          {item.abbr}
        </span>
        <p
          className={cn(
            "mt-7 flex items-center gap-2 text-sm font-medium sm:mt-8",
            accent.kicker,
          )}
        >
          <span aria-hidden="true" className={cn("size-1.5 shrink-0 rounded-full", accent.dot)} />
          {item.question}
        </p>
        <h3
          id={titleId}
          className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-ink-950 sm:text-[2rem] sm:leading-tight"
        >
          {item.name}
        </h3>
        <p className="mt-3 max-w-md text-base leading-relaxed text-ink-500 sm:text-lg">
          {item.summary}
        </p>
      </header>

      <ol className="relative mt-9 grid gap-7 sm:mt-10">
        {item.steps.map((step, index) => {
          const last = index === item.steps.length - 1;
          return (
            <li
              key={step.title}
              className={cn(
                "relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 sm:gap-x-5",
                !last &&
                  cn(
                    "before:absolute before:top-12 before:-bottom-5 before:left-5 before:w-px before:-translate-x-1/2 before:bg-linear-to-b",
                    accent.connector,
                  ),
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "relative flex size-10 items-center justify-center rounded-full font-mono text-xs font-semibold shadow-soft ring-1",
                  last ? accent.nodeFinal : accent.node,
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="pt-1.5">
                <h4 className="text-base font-semibold tracking-[-0.01em] text-ink-900 sm:text-lg">
                  {step.title}
                </h4>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-500">
                  {step.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-auto pt-10">
        <Link
          href={item.href}
          className={cn(
            "group/link inline-flex min-h-12 items-center gap-3 rounded-full bg-white py-1.5 pr-1.5 pl-5 text-sm font-semibold text-ink-900 ring-1 ring-ink-200 transition-[background-color,box-shadow] duration-200",
            accent.linkHover,
          )}
        >
          <span>
            Learn about {item.abbr}
            <span className="sr-only"> ({item.name})</span>
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "flex size-9 items-center justify-center rounded-full text-white transition-transform duration-200 group-hover/link:translate-x-0.5",
              accent.linkIcon,
            )}
          >
            <ArrowRight aria-hidden="true" className="size-4" strokeWidth={2.25} />
          </span>
        </Link>
      </div>
    </article>
  );
}
