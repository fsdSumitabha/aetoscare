import { House, RefreshCw, Truck, type LucideIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

type TrackingStep = {
  label: string;
  detail: string;
  icon: LucideIcon;
  done: boolean;
};

const trackingSteps: readonly TrackingStep[] = [
  { label: "Shipped", detail: "Outbound", icon: Truck, done: true },
  { label: "Delivered", detail: "At home", icon: House, done: true },
  { label: "Swapped", detail: "Repair · return", icon: RefreshCw, done: false },
];

const barcode: ReadonlyArray<readonly [x: number, width: number]> = [
  [21, 2],
  [24.5, 1],
  [27, 3],
  [31.5, 1],
  [34, 2],
  [37.5, 1],
  [40, 3],
  [44.5, 1.5],
  [47.5, 1],
  [50, 2.5],
  [54, 1],
  [56.5, 2.5],
];

/**
 * "Devices provided": an isometric AETOS shipping box with a tracking trail
 * (shipped, delivered, swapped). Decorative; the card copy carries the meaning.
 */
export function DevicesVisual() {
  return (
    <div className="relative size-full">
      <div className="absolute inset-0 bg-dot-grid mask-spotlight" />
      <span className="absolute top-4 left-4 font-mono text-[0.625rem] font-medium tracking-[0.16em] text-ink-500 uppercase sm:top-5 sm:left-5">
        Device logistics
      </span>

      <div className="relative flex h-full items-center justify-center gap-4 px-4 pt-5 sm:gap-10 sm:px-6 md:gap-5 lg:gap-10">
        <div className="relative w-26 shrink-0 sm:w-40 md:w-30 lg:w-44">
          <div className="relative animate-float">
            <ShippingBox />
            <span className="absolute -top-1 right-0 inline-flex items-center gap-1 rounded-full bg-ink-950 px-2 py-1 font-mono text-[0.6rem] font-medium text-white shadow-lift sm:right-1">
              <span className="flex h-2 items-end gap-px">
                <span className="h-1 w-0.5 rounded-full bg-vital-300" />
                <span className="h-1.5 w-0.5 rounded-full bg-vital-300" />
                <span className="h-2 w-0.5 rounded-full bg-vital-300" />
              </span>
              4G
            </span>
          </div>
          <div className="mx-auto -mt-1 h-3 w-3/4 rounded-[100%] bg-ink-900/15 blur-md" />
        </div>

        <TrackingTrail />
      </div>
    </div>
  );
}

function TrackingTrail() {
  return (
    <div className="relative">
      <span className="absolute top-4 bottom-4 left-3 border-l border-dashed border-ink-300" />
      <ul className="relative flex flex-col gap-2.5 sm:gap-3">
        {trackingSteps.map(({ label, detail, icon: Icon, done }) => (
          <li key={label} className="flex items-center gap-2 sm:gap-2.5">
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full ring-4 ring-canvas",
                done
                  ? "bg-vital-500 text-white"
                  : "border border-dashed border-brand-400 bg-white text-brand-600",
              )}
            >
              <Icon aria-hidden="true" className="size-3" strokeWidth={2.5} />
            </span>
            <span className="flex min-w-0 flex-col rounded-xl bg-white px-2.5 py-1.5 shadow-soft ring-1 ring-ink-100 sm:px-3 sm:py-2">
              <span className="text-xs font-semibold text-ink-900">{label}</span>
              <span className="truncate font-mono text-[0.625rem] text-ink-500">{detail}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Isometric box: faces are drawn in local 100×100 space and mapped with matrices. */
function ShippingBox() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="h-auto w-full overflow-visible"
    >
      <defs>
        <linearGradient id="vp-box-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" className="[stop-color:var(--color-brand-50)]" />
        </linearGradient>
        <linearGradient id="vp-box-left" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" className="[stop-color:var(--color-ink-50)]" />
          <stop offset="1" className="[stop-color:var(--color-ink-100)]" />
        </linearGradient>
        <linearGradient id="vp-box-right" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" className="[stop-color:var(--color-ink-100)]" />
          <stop offset="1" className="[stop-color:var(--color-ink-200)]" />
        </linearGradient>
        <linearGradient id="vp-box-tape" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" className="[stop-color:var(--color-brand-400)]" />
          <stop offset="1" className="[stop-color:var(--color-brand-600)]" />
        </linearGradient>
      </defs>

      {/* Faces */}
      <polygon
        points="30,62 100,22 170,62 100,102"
        fill="url(#vp-box-top)"
        className="stroke-ink-200"
        strokeLinejoin="round"
      />
      <polygon
        points="30,62 100,102 100,182 30,142"
        fill="url(#vp-box-left)"
        className="stroke-ink-200"
        strokeLinejoin="round"
      />
      <polygon
        points="100,102 170,62 170,142 100,182"
        fill="url(#vp-box-right)"
        className="stroke-ink-200"
        strokeLinejoin="round"
      />

      {/* Tape across the lid and down the right face */}
      <g transform="matrix(0.7 -0.4 0.7 0.4 30 62)">
        <rect x="40" y="0" width="20" height="100" fill="url(#vp-box-tape)" opacity="0.92" />
      </g>
      <g transform="matrix(0.7 -0.4 0 0.8 100 102)">
        <rect x="40" y="0" width="20" height="44" className="fill-brand-600" opacity="0.9" />
        {/* AETOS crosshair stamped on the side */}
        <circle cx="50" cy="74" r="13" className="stroke-ink-700" strokeWidth="2.5" />
        <path
          d="M50 56v8M50 84v8M32 74h8M60 74h8"
          className="stroke-ink-700"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="50" cy="74" r="5" className="fill-brand-500" />
      </g>

      {/* Shipping label on the left face */}
      <g transform="matrix(0.7 0.4 0 0.8 30 62)">
        <rect x="14" y="24" width="52" height="42" rx="4" fill="#ffffff" className="stroke-ink-200" />
        <rect x="21" y="31" width="26" height="4" rx="2" className="fill-ink-300" />
        <rect x="21" y="39" width="18" height="3" rx="1.5" className="fill-ink-200" />
        {barcode.map(([x, width]) => (
          <rect key={x} x={x} y="48" width={width} height="11" className="fill-ink-800" />
        ))}
      </g>

      {/* Edge highlights */}
      <path d="M30 62 L100 102 L170 62" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M100 102 V182" className="stroke-ink-300" />
    </svg>
  );
}
