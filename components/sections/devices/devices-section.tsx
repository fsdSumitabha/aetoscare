import { Check, Signal } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { devices } from "@/lib/content/home";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { DeviceCard } from "./device-card";

const TITLE_ID = "devices-title";

function DevicesBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-152 bg-line-grid mask-fade-y opacity-70" />
      <div className="absolute -top-48 -right-40 size-144 rounded-full bg-brand-100/70 blur-3xl" />
      <div className="absolute top-[40%] -left-72 hidden size-120 rounded-full bg-vital-100/40 blur-3xl lg:block" />
    </div>
  );
}

/** Connected devices: feature checklist plus a bento showcase of the five cellular devices. */
export function DevicesSection() {
  return (
    <Section tone="light" id={devices.id} labelledBy={TITLE_ID} background={<DevicesBackdrop />}>
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
        <SectionHeading
          id={TITLE_ID}
          eyebrow={devices.eyebrow}
          titleLead={devices.titleLead}
          titleAccent={devices.titleAccent}
          description={devices.description}
          className="lg:col-span-7"
        />

        <div className="relative overflow-hidden rounded-4xl bg-canvas p-6 ring-1 ring-ink-100 sm:p-8 lg:col-span-5">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-vital-100 opacity-70 blur-2xl"
          />
          <ul role="list" className="relative grid gap-3.5">
            {devices.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3.5">
                <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-vital-50 text-vital-700 ring-1 ring-vital-100">
                  <Check aria-hidden="true" className="size-4" strokeWidth={2.6} />
                </span>
                <span className="pt-0.5 text-[0.95rem] leading-snug text-ink-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* md–lg: wide featured tile over a 2×2; xl: 12-col bento with a tall feature tile. */}
      <ul role="list" className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-16 lg:gap-6 xl:grid-cols-12">
        {devices.items.map((item, index) => {
          const featured = index === 0;
          return (
            <li
              key={item.key}
              className={cn(featured ? "md:col-span-2 xl:col-span-6 xl:row-span-2" : "xl:col-span-3")}
            >
              <DeviceCard item={item} index={index} featured={featured} />
            </li>
          );
        })}
      </ul>

      <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
        <p className="inline-flex items-center gap-3 rounded-full bg-white py-1.5 pr-4 pl-1.5 text-sm text-ink-600 shadow-soft ring-1 ring-ink-100">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-950 px-2.5 py-1 font-mono text-[0.7rem] font-semibold tracking-[0.1em] text-vital-300">
            <Signal aria-hidden="true" className="size-3.5" strokeWidth={2.4} />
            4G LTE
          </span>
          Built-in cellular connectivity
        </p>
        <ButtonLink href={devices.allDevicesCta.href} variant="secondary">
          {devices.allDevicesCta.label}
        </ButtonLink>
      </div>
    </Section>
  );
}
