"use client";

import { useId, useState, type CSSProperties } from "react";
import { Calculator, Info } from "@/components/ui/icons";
import { formatUsd } from "@/components/sections/reimbursement/format-currency";
import { cn } from "@/lib/cn";

const MIN_PATIENTS = 10;
const MAX_PATIENTS = 1000;
const STEP = 10;
const DEFAULT_PATIENTS = 100;
const TICKS = 11;

type ProgramChoice = "rpm" | "ccm" | "both";

type RevenueEstimatorProps = {
  /** Monthly maximum per patient for each program (from page content). */
  rates: { rpm: number; ccm: number };
  className?: string;
};

const choices: readonly { value: ProgramChoice; label: string; srLabel: string }[] = [
  { value: "rpm", label: "RPM", srLabel: "Remote Patient Monitoring" },
  { value: "ccm", label: "CCM", srLabel: "Chronic Care Management" },
  { value: "both", label: "RPM + CCM", srLabel: "both programs" },
];

/* The highlight pill slides by whole segments (one segment = its own width). */
const indicatorOffset: Record<ProgramChoice, string> = {
  rpm: "translate-x-0",
  ccm: "translate-x-full",
  both: "translate-x-[200%]",
};

const countFormatter = new Intl.NumberFormat("en-US");

const thumbBase =
  "[&::-webkit-slider-thumb]:size-6 [&::-webkit-slider-thumb]:-mt-2 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-ink-950 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_0_2px_var(--color-vital-300),0_0_22px_2px_rgb(100_228_191/0.45)] [&::-webkit-slider-thumb]:transition-shadow " +
  "[&::-moz-range-thumb]:size-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-ink-950 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-[0_0_0_2px_var(--color-vital-300),0_0_22px_2px_rgb(100_228_191/0.45)]";

const thumbFocus =
  "[&:focus-visible::-webkit-slider-thumb]:shadow-[0_0_0_2px_var(--color-vital-300),0_0_0_8px_rgb(100_228_191/0.55)] " +
  "[&:focus-visible::-moz-range-thumb]:shadow-[0_0_0_2px_var(--color-vital-300),0_0_0_8px_rgb(100_228_191/0.55)]";

const trackBase =
  "[&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-transparent " +
  "[&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent";

/**
 * Client island: estimates potential reimbursement at maximum billable time.
 * State starts from constants, so the server render and hydration match.
 */
export function RevenueEstimator({ rates, className }: RevenueEstimatorProps) {
  const baseId = useId();
  const titleId = `${baseId}-title`;
  const rangeId = `${baseId}-patients`;
  const groupName = `${baseId}-program`;

  const [patients, setPatients] = useState(DEFAULT_PATIENTS);
  const [program, setProgram] = useState<ProgramChoice>("both");

  const rate =
    program === "rpm" ? rates.rpm : program === "ccm" ? rates.ccm : rates.rpm + rates.ccm;
  const monthly = patients * rate;
  const annual = monthly * 12;
  const progress = (patients - MIN_PATIENTS) / (MAX_PATIENTS - MIN_PATIENTS);
  const radioIds = choices.map((choice) => `${baseId}-${choice.value}`);

  return (
    <div
      role="group"
      aria-labelledby={titleId}
      className={cn(
        "@container relative isolate overflow-hidden rounded-4xl bg-ink-950 p-6 text-white shadow-[0_40px_90px_-40px_rgb(22_96_240/0.6)] ring-1 ring-white/10 sm:p-8",
        className,
      )}
    >
      {/* Glow, grid and crosshair backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-36 -right-28 size-80 rounded-full bg-brand-500/35 blur-3xl" />
        <div className="absolute -bottom-40 -left-24 size-80 rounded-full bg-vital-400/20 blur-3xl" />
        <div className="absolute inset-0 bg-line-grid-dark mask-fade-b" />
        <svg
          viewBox="0 0 200 200"
          fill="none"
          aria-hidden="true"
          focusable="false"
          className="absolute -top-20 -right-20 size-60 text-white/10"
        >
          <g stroke="currentColor" strokeWidth="1">
            <circle cx="100" cy="100" r="34" />
            <circle cx="100" cy="100" r="58" />
            <circle cx="100" cy="100" r="84" strokeDasharray="2 6" />
            <path d="M100 0v40M100 160v40M0 100h40M160 100h40" />
          </g>
        </svg>
      </div>

      <div className="flex items-center justify-between gap-4">
        <span className="inline-flex items-center gap-2.5 font-mono text-[0.68rem] font-medium tracking-[0.16em] text-vital-300 uppercase">
          <span className="grid size-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
            <Calculator aria-hidden="true" className="size-4.5" strokeWidth={2} />
          </span>
          Revenue estimator
        </span>
        <span
          aria-hidden="true"
          className="hidden items-center gap-2 rounded-full bg-white/5 px-3 py-1 font-mono text-[0.64rem] tracking-[0.14em] text-ink-200 uppercase ring-1 ring-white/10 @sm:inline-flex"
        >
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-ping-slow rounded-full bg-vital-300" />
            <span className="relative size-2 rounded-full bg-vital-300" />
          </span>
          Live
        </span>
      </div>

      <h3
        id={titleId}
        className="mt-5 text-2xl leading-tight font-semibold tracking-[-0.025em] sm:text-3xl lg:text-2xl xl:text-3xl"
      >
        Estimate your monthly <span className="accent-serif text-gradient-light">potential.</span>
      </h3>
      <p className="mt-2.5 max-w-md text-sm leading-relaxed text-ink-200">
        Set enrolled patients and programs to see potential reimbursement per month and per year.
      </p>

      <div className="mt-7 grid gap-7 @xl:grid-cols-2 @xl:gap-10">
        <div className="flex flex-col gap-7">
          {/* Patients slider */}
          <div>
            <div className="flex items-end justify-between gap-4">
              <label htmlFor={rangeId} className="text-sm font-medium text-ink-100">
                Enrolled patients
              </label>
              <output
                htmlFor={rangeId}
                aria-live="off"
                className="font-mono text-4xl leading-none font-semibold tracking-[-0.04em] text-white tabular-nums"
              >
                {countFormatter.format(patients)}
              </output>
            </div>

            <div className="relative mt-4 flex h-11 items-center">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-white/10 ring-1 ring-white/5"
              >
                <div
                  className="h-full w-[calc(0.75rem_+_(100%_-_1.5rem)_*_var(--progress))] rounded-full bg-linear-to-r from-brand-400 to-vital-300"
                  style={{ "--progress": progress } as CSSProperties}
                />
              </div>
              <input
                id={rangeId}
                type="range"
                min={MIN_PATIENTS}
                max={MAX_PATIENTS}
                step={STEP}
                value={patients}
                aria-valuetext={`${countFormatter.format(patients)} patients`}
                onChange={(event) => setPatients(Number(event.currentTarget.value))}
                className={cn(
                  "relative h-11 w-full cursor-pointer appearance-none bg-transparent focus-visible:outline-hidden",
                  trackBase,
                  thumbBase,
                  thumbFocus,
                )}
              />
            </div>

            <div aria-hidden="true" className="mt-1 flex justify-between px-[0.6875rem]">
              {Array.from({ length: TICKS }, (_, index) => (
                <span
                  key={index}
                  className={cn("w-px", index % 5 === 0 ? "h-2.5 bg-white/40" : "h-1.5 bg-white/20")}
                />
              ))}
            </div>
            <div aria-hidden="true" className="mt-1.5 flex justify-between font-mono text-[0.68rem] text-ink-300">
              <span>{countFormatter.format(MIN_PATIENTS)}</span>
              <span>{countFormatter.format(MAX_PATIENTS)}</span>
            </div>
          </div>

          {/* Program segmented control */}
          <fieldset className="min-w-0">
            <legend className="mb-3 text-sm font-medium text-ink-100">Programs</legend>
            <div className="relative grid grid-cols-3 rounded-full bg-white/5 p-1 ring-1 ring-white/10">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-y-1 left-1 w-[calc((100%_-_0.5rem)/3)] rounded-full bg-white shadow-[0_6px_20px_-6px_rgb(100_228_191/0.6)] transition-transform duration-300 ease-out",
                  indicatorOffset[program],
                )}
              />
              {choices.map((choice, index) => {
                const checked = program === choice.value;
                return (
                  <label
                    key={choice.value}
                    htmlFor={radioIds[index]}
                    className={cn(
                      "relative flex min-h-11 cursor-pointer items-center justify-center rounded-full px-2 text-center text-[0.8125rem] font-semibold whitespace-nowrap transition-colors duration-200 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-vital-300 sm:text-sm",
                      checked ? "text-ink-950" : "text-ink-200 hover:text-white",
                    )}
                  >
                    <input
                      id={radioIds[index]}
                      type="radio"
                      name={groupName}
                      value={choice.value}
                      checked={checked}
                      onChange={() => setProgram(choice.value)}
                      className="sr-only"
                    />
                    {choice.label}
                    {/* Expansion keeps the visible label inside the accessible name (WCAG 2.5.3). */}
                    <span className="sr-only"> ({choice.srLabel})</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        </div>

        {/* Results */}
        <div className="flex flex-col gap-3.5 @xl:justify-end">
          <output
            htmlFor={[rangeId, ...radioIds].join(" ")}
            aria-live="polite"
            className="grid gap-px overflow-hidden rounded-3xl bg-white/10 ring-1 ring-white/10"
          >
            {/* Explicit spaces keep the live announcement from running words together. */}
            <span className="block bg-ink-900/85 p-5">
              <span className="block text-sm text-ink-200">Potential monthly reimbursement</span>{" "}
              <span className="mt-2 block font-mono text-4xl leading-none font-semibold tracking-[-0.045em] text-white tabular-nums">
                {formatUsd(monthly)}
              </span>
            </span>{" "}
            <span className="block bg-ink-900/85 p-5">
              <span className="block text-sm text-ink-200">Potential annual reimbursement</span>{" "}
              <span className="mt-2 block pb-0.5 font-mono text-4xl leading-none font-semibold tracking-[-0.045em] text-gradient-light tabular-nums">
                {formatUsd(annual)}
              </span>
            </span>
          </output>

          <p className="font-mono text-xs text-ink-300">
            {countFormatter.format(patients)} patients × {formatUsd(rate)} per patient, per month
          </p>
          <p className="flex items-start gap-2 text-xs leading-relaxed text-ink-300">
            <Info aria-hidden="true" className="mt-px size-4 shrink-0 text-ink-300" strokeWidth={2} />
            Estimate at maximum billable time; excludes one-time setup.
          </p>
        </div>
      </div>
    </div>
  );
}
