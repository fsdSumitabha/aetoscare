import { HeartPulse, Languages, PackageCheck, ShieldCheck, type LucideIcon } from "@/components/ui/icons";
import { hero } from "@/lib/content/home";
import { cn } from "@/lib/cn";

const icons: LucideIcon[] = [PackageCheck, HeartPulse, ShieldCheck, Languages];

const rule =
  "after:absolute after:top-1/2 after:right-0 after:h-7 after:w-px after:-translate-y-1/2 after:bg-care-900/12";
const ruleLgOnly =
  "lg:after:absolute lg:after:top-1/2 lg:after:right-0 lg:after:h-7 lg:after:w-px lg:after:-translate-y-1/2 lg:after:bg-care-900/12";

/** Proof points as a quiet, evenly ruled row (2 × 2 on small screens). */
export function ProofRow() {
  return (
    <ul className="mx-auto mt-8 grid w-full max-w-5xl grid-cols-2 gap-y-1 lg:mt-10 lg:grid-cols-4">
      {hero.proofPoints.map((point, index) => {
        const Icon = icons[index] ?? HeartPulse;
        return (
          <li
            key={point}
            className={cn(
              "relative flex flex-col items-center justify-center gap-1.5 px-3 py-3 text-center font-humanist text-[0.88rem] leading-snug font-medium text-care-950/85 sm:flex-row sm:gap-2.5 sm:text-[0.95rem]",
              index % 2 === 0 && index < 3 ? rule : null,
              index === 1 ? ruleLgOnly : null,
            )}
          >
            <Icon className="size-[1.1rem] shrink-0 text-care-600" strokeWidth={1.9} />
            {point}
          </li>
        );
      })}
    </ul>
  );
}
