import { Info } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ReimbursementCard } from "@/components/sections/reimbursement/reimbursement-card";
import { RevenueEstimator } from "@/components/sections/reimbursement/revenue-estimator";
import { formatUsd } from "@/components/sections/reimbursement/format-currency";
import { reimbursement } from "@/lib/content/home";
import { cn } from "@/lib/cn";

const HEADING_ID = "reimbursement-title";

const headlineStats = [
  {
    key: reimbursement.rpm.key,
    abbr: reimbursement.rpm.abbr,
    name: reimbursement.rpm.name,
    max: reimbursement.rpm.max,
    dot: "bg-brand-500",
    numeral: "from-brand-800 via-brand-600 to-brand-500",
  },
  {
    key: reimbursement.ccm.key,
    abbr: reimbursement.ccm.abbr,
    name: reimbursement.ccm.name,
    max: reimbursement.ccm.max,
    dot: "bg-vital-500",
    numeral: "from-vital-700 via-vital-700 to-vital-600",
  },
] as const;

/**
 * Reimbursement: headline maxima, CPT-code ledgers per program and the
 * revenue estimator (the page's only client island).
 */
export function ReimbursementSection() {
  return (
    <Section
      tone="light"
      id={reimbursement.id}
      labelledBy={HEADING_ID}
      background={<ReimbursementBackdrop />}
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-10">
        <SectionHeading
          id={HEADING_ID}
          eyebrow={reimbursement.eyebrow}
          titleLead={reimbursement.titleLead}
          titleAccent={reimbursement.titleAccent}
          description={reimbursement.description}
          className="lg:col-span-7"
        />

        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-4xl bg-line shadow-soft ring-1 ring-line lg:col-span-5">
          {headlineStats.map((stat) => (
            <div key={stat.key} className="relative flex flex-col gap-4 bg-white/90 p-5 backdrop-blur-sm sm:p-7">
              {/* Spaces between the stacked spans keep extracted text readable ("Up to $193 per…"). */}
              <dt className="flex flex-col gap-2">
                <span className="inline-flex items-center gap-2 font-mono text-[0.68rem] font-semibold tracking-[0.16em] text-ink-900 uppercase">
                  <span aria-hidden="true" className={cn("size-2 rounded-full", stat.dot)} />
                  {stat.abbr}
                </span>{" "}
                <span className="text-xs leading-snug text-ink-500 sm:text-sm">{stat.name}</span>
              </dt>
              <dd className="flex flex-col">
                <span className="text-xs font-medium text-ink-500 sm:text-sm">Up to</span>{" "}
                <span
                  className={cn(
                    "mt-1 bg-linear-to-br bg-clip-text pb-1 font-mono text-5xl leading-none font-semibold tracking-[-0.07em] text-transparent sm:text-6xl lg:text-[3.5rem] xl:text-7xl",
                    stat.numeral,
                  )}
                >
                  {formatUsd(stat.max)}
                </span>{" "}
                <span className="mt-3 text-xs text-ink-500 sm:text-sm">per patient, per month</span>
                {/* Crosshair tick (a real element: generated "+" content would be announced). */}
                <svg
                  viewBox="0 0 10 10"
                  aria-hidden="true"
                  focusable="false"
                  className="absolute top-4 right-4 size-2.5 text-ink-300"
                >
                  <path d="M5 0v10M0 5h10" stroke="currentColor" strokeWidth="1.25" />
                </svg>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-14 grid items-start gap-6 sm:mt-16 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col gap-6 lg:col-span-7 lg:gap-8">
          <ReimbursementCard program={reimbursement.rpm} accent="brand" className="reveal" />
          <ReimbursementCard program={reimbursement.ccm} accent="vital" className="reveal" />
        </div>

        {/*
          Bottom-anchored sticky: the card starts level with the RPM ledger, then rides the
          viewport's bottom edge, so its results stay in view on any laptop height with no
          empty column beside the CCM card.
        */}
        <div className="lg:sticky lg:bottom-6 lg:col-span-5 lg:self-end">
          <RevenueEstimator rates={{ rpm: reimbursement.rpm.max, ccm: reimbursement.ccm.max }} />
        </div>
      </div>

      <p className="mt-10 flex max-w-3xl items-start gap-2.5 text-xs leading-relaxed text-ink-500 sm:mt-12">
        <Info aria-hidden="true" className="mt-px size-4 shrink-0 text-ink-400" strokeWidth={2} />
        <span>{reimbursement.disclaimer}</span>
      </p>
    </Section>
  );
}

function ReimbursementBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[44rem] bg-line-grid mask-spotlight" />
      <div className="absolute -top-48 right-[-12%] size-[38rem] rounded-full bg-brand-100/70 blur-3xl" />
      <div className="absolute top-[45%] -left-56 size-[30rem] rounded-full bg-vital-100/60 blur-3xl" />
      <svg
        viewBox="0 0 400 400"
        fill="none"
        aria-hidden="true"
        focusable="false"
        className="absolute -top-28 right-[-14rem] hidden size-[46rem] text-brand-500/10 lg:block"
      >
        <g stroke="currentColor" strokeWidth="1">
          <circle cx="200" cy="200" r="70" />
          <circle cx="200" cy="200" r="120" />
          <circle cx="200" cy="200" r="170" strokeDasharray="3 9" />
          <circle cx="200" cy="200" r="196" />
          <path d="M200 0v100M200 300v100M0 200h100M300 200h100" />
        </g>
      </svg>
    </div>
  );
}
