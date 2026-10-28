import type { LucideIcon } from "@/components/ui/icons";
import { Receipt } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

/**
 * Connector segments between step nodes. Each segment ends on the colour the
 * next one starts with, so together they read as one brand → vital line.
 */
const connectorClasses = [
  "before:from-brand-600 before:to-brand-400",
  "before:from-brand-400 before:to-brand-300",
  "before:from-brand-300 before:to-vital-300",
  "before:from-vital-300 before:to-vital-500",
] as const;

type ProcessStepProps = {
  index: number;
  total: number;
  title: string;
  description: string;
  icon: LucideIcon;
  /** CPT codes shown in the payoff card's billing-report vignette. */
  billingCodes: readonly string[];
};

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * One onboarding step: icon node on the timeline plus a card with a big mono
 * numeral. The final step is the payoff, rendered dark with a gradient border.
 */
export function ProcessStep({
  index,
  total,
  title,
  description,
  icon: Icon,
  billingCodes,
}: ProcessStepProps) {
  const final = index === total - 1;
  const number = pad(index + 1);

  return (
    <li
      className={cn(
        "reveal relative pl-16 sm:pl-20",
        !final &&
          cn(
            "before:absolute before:top-12 before:-bottom-18 before:left-6 before:w-0.5 before:-translate-x-1/2 before:rounded-full before:bg-linear-to-b",
            connectorClasses[index % connectorClasses.length],
          ),
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-6 left-0 z-10 flex size-12 items-center justify-center rounded-2xl ring-1",
          final
            ? "bg-linear-to-br from-brand-500 to-vital-400 text-white shadow-lift ring-white/20"
            : "bg-white text-brand-600 shadow-soft ring-ink-100",
        )}
      >
        <Icon aria-hidden="true" className="size-5" strokeWidth={1.9} />
      </span>

      {final ? (
        <div className="rounded-3xl bg-linear-to-br from-brand-500 via-brand-400/50 to-vital-400 p-px shadow-lift">
          <div className="relative isolate overflow-hidden rounded-[calc(1.5rem-1px)] bg-ink-950 p-6 sm:p-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-16 -z-10 size-72 rounded-full bg-vital-400/15 blur-3xl"
            />
            <StepBody number={number} total={pad(total)} title={title} description={description} inverted />
            <BillingReport codes={billingCodes} />
          </div>
        </div>
      ) : (
        <div className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-soft ring-1 ring-ink-100 transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lift sm:p-8">
          <StepBody number={number} total={pad(total)} title={title} description={description} />
        </div>
      )}
    </li>
  );
}

type StepBodyProps = {
  number: string;
  total: string;
  title: string;
  description: string;
  inverted?: boolean;
};

function StepBody({ number, total, title, description, inverted = false }: StepBodyProps) {
  return (
    <>
      <span
        aria-hidden="true"
        className={cn(
          // Smaller on phones so the ghost numeral stays clear of the step title
          "pointer-events-none absolute top-3 right-4 bg-linear-to-b bg-clip-text font-mono text-[3.25rem] leading-none font-semibold tracking-[-0.08em] text-transparent select-none sm:top-4 sm:right-6 sm:text-[6.5rem]",
          inverted
            ? "from-white/25 to-white/0"
            : "from-ink-200 to-ink-200/0 group-hover:from-brand-200 group-hover:to-brand-200/0",
        )}
      >
        {number}
      </span>
      <div className="relative">
        <p
          aria-hidden="true"
          className={cn(
            "font-mono text-[0.7rem] font-medium tracking-[0.16em] uppercase",
            inverted ? "text-vital-300" : "text-brand-700",
          )}
        >
          Step {number} / {total}
        </p>
        <h3
          className={cn(
            "mt-3 text-xl font-semibold tracking-[-0.02em] sm:text-2xl",
            inverted ? "text-white" : "text-ink-950",
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "mt-2 max-w-md leading-relaxed",
            inverted ? "text-ink-200" : "text-ink-500",
          )}
        >
          {description}
        </p>
      </div>
    </>
  );
}

function BillingReport({ codes }: { codes: readonly string[] }) {
  return (
    <div
      aria-hidden="true"
      className="relative mt-6 rounded-2xl bg-white/4 p-3.5 ring-1 ring-white/10 sm:p-4"
    >
      <div className="flex items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-vital-300/10 text-vital-300 ring-1 ring-vital-300/20">
          <Receipt aria-hidden="true" className="size-4" strokeWidth={2} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[0.8125rem] font-medium text-white sm:text-sm">Monthly billing report</span>
          <span className="block truncate font-mono text-[0.68rem] text-white/60">RPM · CCM claims</span>
        </span>
        <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-vital-300/10 px-2.5 py-1 font-mono text-[0.65rem] font-medium text-vital-300 ring-1 ring-vital-300/25 sm:inline-flex">
          <span className="size-1.5 rounded-full bg-vital-300" />
          Ready
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5 border-t border-white/10 pt-3">
        {codes.map((code) => (
          <span
            key={code}
            className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[0.65rem] text-white/70 ring-1 ring-white/10"
          >
            {code}
          </span>
        ))}
      </div>
    </div>
  );
}
