import { cn } from "@/lib/cn";

type SparkTone = "vital" | "brand";

type Vital = {
  key: string;
  label: string;
  value: string;
  unit: string;
  status: string;
  tone: SparkTone;
  /** Illustrative recent readings, oldest first. */
  trend: readonly number[];
};

const VITALS: readonly Vital[] = [
  {
    key: "bp",
    label: "Blood pressure",
    value: "124/79",
    unit: "mmHg",
    status: "Normal",
    tone: "vital",
    trend: [134, 131, 133, 128, 129, 126, 127, 124],
  },
  {
    key: "glucose",
    label: "Glucose",
    value: "108",
    unit: "mg/dL",
    status: "In range",
    tone: "vital",
    trend: [126, 121, 124, 117, 119, 112, 111, 108],
  },
  {
    key: "spo2",
    label: "SpO₂",
    value: "98",
    unit: "%",
    status: "Normal",
    tone: "brand",
    trend: [96, 97, 96, 97, 98, 97, 98, 98],
  },
  {
    key: "weight",
    label: "Weight",
    value: "176",
    unit: "lb",
    status: "Stable",
    tone: "brand",
    trend: [179, 178.6, 178.8, 178, 177.4, 177.1, 176.6, 176],
  },
];

const SPARK_WIDTH = 64;
const SPARK_HEIGHT = 20;

const sparkToneClasses: Record<SparkTone, string> = {
  vital: "text-vital-300",
  brand: "text-brand-300",
};

function sparkPaths(values: readonly number[]) {
  const min = Math.min(...values);
  const span = Math.max(...values) - min || 1;
  const step = SPARK_WIDTH / (values.length - 1);
  const points = values.map((value, index) => {
    const x = Math.round(index * step * 10) / 10;
    const y = Math.round((SPARK_HEIGHT - 3 - ((value - min) / span) * (SPARK_HEIGHT - 6)) * 10) / 10;
    return `${x} ${y}`;
  });
  const line = `M${points.join("L")}`;
  return { line, area: `${line}L${SPARK_WIDTH} ${SPARK_HEIGHT}L0 ${SPARK_HEIGHT}Z` };
}

function Sparkline({ values, tone }: { values: readonly number[]; tone: SparkTone }) {
  const { line, area } = sparkPaths(values);
  return (
    <svg
      viewBox={`0 0 ${SPARK_WIDTH} ${SPARK_HEIGHT}`}
      preserveAspectRatio="none"
      fill="none"
      focusable="false"
      className={cn("h-5 min-w-0 flex-1", sparkToneClasses[tone])}
    >
      <path d={area} fill="currentColor" fillOpacity="0.12" />
      <path
        d={line}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** 2×2 grid of the patient's latest readings with status and 7-day trend. */
export function HeroVitalsGrid() {
  return (
    <div className="mt-3 grid grid-cols-2 gap-2.5 sm:gap-3">
      {VITALS.map((vital) => (
        <div
          key={vital.key}
          className="rounded-2xl bg-white/3.5 p-3 ring-1 ring-white/6 sm:p-3.5"
        >
          <span className="block truncate text-[0.7rem] font-medium text-ink-300">
            {vital.label}
          </span>
          <span className="mt-1.5 flex items-baseline gap-1 font-mono">
            <span className="text-lg leading-none font-semibold tracking-tight text-white tabular-nums sm:text-[1.375rem]">
              {vital.value}
            </span>
            <span className="text-[0.625rem] text-ink-300">{vital.unit}</span>
          </span>
          <span className="mt-2.5 flex items-center gap-2">
            <span className="inline-flex shrink-0 items-center gap-1 font-mono text-[0.6rem] font-medium tracking-[0.12em] text-vital-300 uppercase">
              <span className="size-1.5 rounded-full bg-vital-300" />
              {vital.status}
            </span>
            <Sparkline values={vital.trend} tone={vital.tone} />
          </span>
        </div>
      ))}
    </div>
  );
}
