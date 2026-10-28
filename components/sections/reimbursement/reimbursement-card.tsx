import type { ReimbursementLine } from "@/lib/content/home";
import { ReimbursementBar } from "@/components/sections/reimbursement/reimbursement-bar";
import { formatUsd } from "@/components/sections/reimbursement/format-currency";
import { cn } from "@/lib/cn";

export type ReimbursementAccent = "brand" | "vital";

export type ReimbursementProgram = {
  key: string;
  name: string;
  abbr: string;
  /** Monthly maximum per patient. */
  max: number;
  lines: readonly ReimbursementLine[];
  /** One-time code billed outside the monthly stack (RPM only). */
  onboarding?: {
    code: string;
    label: string;
    amount: number;
    note: string;
  };
};

type ReimbursementCardProps = {
  program: ReimbursementProgram;
  accent: ReimbursementAccent;
  className?: string;
};

const accentStyles: Record<
  ReimbursementAccent,
  {
    badge: string;
    total: string;
    footer: string;
    topLine: string;
    rings: string;
    segments: readonly string[];
  }
> = {
  brand: {
    badge: "bg-brand-50 text-brand-700 ring-brand-100",
    total: "text-brand-700",
    footer: "bg-brand-50/70",
    topLine: "via-brand-400",
    rings: "text-brand-500/20",
    segments: ["bg-brand-800", "bg-brand-600", "bg-brand-500", "bg-brand-400"],
  },
  vital: {
    badge: "bg-vital-50 text-vital-700 ring-vital-100",
    total: "text-vital-700",
    footer: "bg-vital-50/80",
    topLine: "via-vital-400",
    rings: "text-vital-500/20",
    segments: ["bg-vital-700", "bg-vital-600", "bg-vital-400"],
  },
};

/*
 * Column model. sm+: CPT code · Service · Time · Amount · Running total.
 * Below sm the Service and Time cells are hidden and their text is folded
 * under the CPT code (the row header), leaving three roomy columns at 360px.
 * Full-width rows therefore use spans that add up to 3 (xs) and 5 (sm+).
 */
const cellStart = "pr-2 pl-5 sm:pr-3 sm:pl-8";
const cellMid = "px-2 sm:px-3";
const cellEnd = "pr-5 pl-2 sm:pr-8 sm:pl-3";
const smOnlyCell = "hidden sm:table-cell";
/* Top-align on phones so amounts line up with the CPT code, not the folded label. */
const bodyAlign = "py-3.5 align-top sm:align-middle";
const headCell =
  "py-3 font-mono text-[0.64rem] font-medium tracking-[0.12em] text-ink-500 uppercase sm:whitespace-nowrap";
const noteText = "mt-1 block font-mono text-[0.68rem] font-normal text-ink-500";
const footLabel = "py-5 pr-3 pl-5 text-left text-sm font-semibold text-ink-900 sm:pl-8";

/**
 * One reimbursement program as a CPT-code ledger: a decorative cumulative bar
 * plus the accessible source-of-truth table.
 */
export function ReimbursementCard({ program, accent, className }: ReimbursementCardProps) {
  const styles = accentStyles[accent];
  const titleId = `reimbursement-${program.key}-title`;
  const { onboarding } = program;

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        "relative isolate overflow-hidden rounded-4xl bg-white shadow-soft ring-1 ring-ink-100 transition-shadow duration-300 hover:shadow-lift",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent to-transparent",
          styles.topLine,
        )}
      />
      <CornerRings className={styles.rings} />

      <header className="flex items-start gap-4 px-5 pt-6 sm:px-8 sm:pt-8">
        <span
          aria-hidden="true"
          className={cn(
            "grid size-12 shrink-0 place-items-center rounded-2xl font-mono text-sm font-bold tracking-tight ring-1",
            styles.badge,
          )}
        >
          {program.abbr}
        </span>
        <div className="min-w-0">
          <h3 id={titleId} className="text-lg font-semibold tracking-tight text-ink-950 sm:text-xl">
            {program.name}
            <span className="sr-only"> ({program.abbr})</span>
          </h3>
          <p className="mt-1 text-sm text-ink-500">
            Up to <strong className="font-semibold text-ink-900">{formatUsd(program.max)}</strong> per
            patient, per month
          </p>
        </div>
      </header>

      <ReimbursementBar
        className="px-5 pt-7 sm:px-8"
        lines={program.lines}
        max={program.max}
        segmentClasses={styles.segments}
        oneTime={onboarding ? { amount: onboarding.amount, note: onboarding.note } : undefined}
      />

      <table className="mt-7 w-full border-collapse text-left text-[0.8125rem] sm:text-sm">
        <caption className="sr-only">
          {program.name} reimbursement per patient, per month
          {onboarding ? ", plus a one-time setup code" : ""}
        </caption>
        <thead>
          <tr className="border-y border-line bg-canvas">
            {/* w-full marks the label column as the one that absorbs spare width. */}
            <th scope="col" className={cn(cellStart, headCell, "w-full sm:w-auto")}>
              CPT code<span className="sm:hidden"> &amp; service</span>
            </th>
            <th scope="col" className={cn(cellMid, headCell, smOnlyCell, "sm:w-full")}>
              Service
            </th>
            <th scope="col" className={cn(cellMid, headCell, smOnlyCell)}>
              Time
            </th>
            <th scope="col" className={cn(cellMid, headCell, "text-right")}>
              Amount
            </th>
            <th scope="col" className={cn(cellEnd, headCell, "text-right")}>
              Running total
            </th>
          </tr>
        </thead>

        {onboarding ? (
          <tbody>
            <RowGroupHeader label="One-time setup" />
            <tr className="border-b border-dashed border-ink-200 bg-canvas/60">
              <th scope="row" className={cn(cellStart, bodyAlign, "font-mono font-semibold text-ink-900")}>
                <CodeLabel code={onboarding.code} dotClassName="ring-2 ring-ink-300 ring-inset" />
                <span className="mt-1 block font-sans font-normal text-ink-600 sm:hidden">
                  {onboarding.label}
                  <span className={noteText}>{onboarding.note}</span>
                </span>
              </th>
              <td className={cn(cellMid, bodyAlign, smOnlyCell, "text-ink-600")}>
                {onboarding.label}
                <span className={noteText}>{onboarding.note}</span>
              </td>
              <td className={cn(cellMid, bodyAlign, smOnlyCell, "font-mono text-xs text-ink-500")}>
                <NotTimeBased />
              </td>
              <td className={cn(cellMid, bodyAlign, "text-right font-mono whitespace-nowrap text-ink-900")}>
                {formatUsd(onboarding.amount)}
              </td>
              <td className={cn(cellEnd, bodyAlign, "text-right font-mono text-ink-500")}>
                <span aria-hidden="true">—</span>
                <span className="sr-only">Not part of the monthly total</span>
              </td>
            </tr>
          </tbody>
        ) : null}

        <tbody>
          {onboarding ? <RowGroupHeader label="Monthly codes" /> : null}
          {program.lines.map((line, index) => (
            <tr
              key={`${line.code}-${index}`}
              className="border-b border-line transition-colors last:border-b-0 hover:bg-canvas/70"
            >
              <th scope="row" className={cn(cellStart, bodyAlign, "font-mono font-semibold text-ink-900")}>
                <CodeLabel
                  code={line.code}
                  dotClassName={styles.segments[index % styles.segments.length]}
                />
                <span className="mt-1 block font-sans font-normal text-ink-600 sm:hidden">
                  {line.label}
                  {line.increment ? <span className={noteText}>{line.increment}</span> : null}
                </span>
              </th>
              <td className={cn(cellMid, bodyAlign, smOnlyCell, "text-ink-600")}>{line.label}</td>
              <td className={cn(cellMid, bodyAlign, smOnlyCell, "font-mono text-xs whitespace-nowrap text-ink-500")}>
                {line.increment ?? <NotTimeBased />}
              </td>
              <td className={cn(cellMid, bodyAlign, "text-right font-mono whitespace-nowrap text-ink-900")}>
                {formatUsd(line.amount)}
              </td>
              <td
                className={cn(
                  cellEnd,
                  bodyAlign,
                  "text-right font-mono font-semibold whitespace-nowrap",
                  styles.total,
                )}
              >
                {formatUsd(line.cumulative)}
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr className={cn("border-t border-ink-200", styles.footer)}>
            {/* colSpan can't be responsive: phones label 1 of 3 columns, sm+ spans 3 of 5. */}
            <th scope="row" className={cn(footLabel, "sm:hidden")}>
              Monthly maximum
            </th>
            <th scope="row" colSpan={3} className={cn(footLabel, smOnlyCell)}>
              Monthly maximum
            </th>
            <td colSpan={2} className="py-5 pr-5 pl-3 text-right sm:pr-8">
              <span className={cn("font-mono text-2xl font-semibold tracking-tight sm:text-3xl", styles.total)}>
                {formatUsd(program.max)}
              </span>
            </td>
          </tr>
        </tfoot>
      </table>
    </article>
  );
}

function CodeLabel({ code, dotClassName }: { code: string; dotClassName: string }) {
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap">
      <span aria-hidden="true" className={cn("size-2 shrink-0 rounded-full", dotClassName)} />
      {code}
    </span>
  );
}

function NotTimeBased() {
  return (
    <>
      <span aria-hidden="true">—</span>
      <span className="sr-only">Not time-based</span>
    </>
  );
}

/**
 * Full-width row-group label: spans all 3 phone columns, and on sm+ the three
 * label columns plus an empty cell over Amount and Running total.
 */
function RowGroupHeader({ label }: { label: string }) {
  return (
    <tr>
      <th
        scope="rowgroup"
        colSpan={3}
        className="pt-5 pr-3 pb-2 pl-5 text-left font-mono text-[0.64rem] font-medium tracking-[0.14em] text-ink-500 uppercase sm:pl-8"
      >
        {label}
      </th>
      <td colSpan={2} className={smOnlyCell} />
    </tr>
  );
}

function CornerRings({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 200 200"
      fill="none"
      className={cn("pointer-events-none absolute -top-24 -right-24 -z-10 size-64", className)}
    >
      <g stroke="currentColor" strokeWidth="1">
        <circle cx="100" cy="100" r="36" />
        <circle cx="100" cy="100" r="60" />
        <circle cx="100" cy="100" r="86" strokeDasharray="2 6" />
        <path d="M100 0v40M100 160v40M0 100h40M160 100h40" />
      </g>
    </svg>
  );
}
