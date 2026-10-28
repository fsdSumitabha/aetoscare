import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Phone } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { programs } from "@/lib/content/home";
import { siteConfig, type NavItem, type NavLink } from "@/lib/site";
import { BrandRings } from "@/components/layout/brand-rings";
import { NavIcon } from "@/components/layout/nav-icon";

type NavDropdownProps = {
  id: string;
  /** Wide mega-menu (services) vs compact list (devices). */
  wide?: boolean;
  children: ReactNode;
};

/**
 * Dropdown shell, shown while its NavDisclosure <li> carries data-open. The
 * transparent top padding is the hover bridge between the trigger and the card.
 */
export function NavDropdown({ id, wide = false, children }: NavDropdownProps) {
  return (
    <div
      id={id}
      className={cn(
        "invisible absolute top-full left-1/2 z-10 -translate-x-1/2 translate-y-1.5 pt-5 opacity-0",
        "transition-[opacity,translate,visibility] delay-100 duration-200 ease-out",
        "group-data-open/item:visible group-data-open/item:translate-y-0 group-data-open/item:opacity-100 group-data-open/item:delay-0",
        wide ? "w-[min(52rem,calc(100vw-4rem))]" : "w-80",
      )}
    >
      <div className="overflow-hidden rounded-3xl bg-white text-ink-900 shadow-lift ring-1 ring-ink-100">
        {children}
      </div>
    </div>
  );
}

function allLabel(item: NavItem): string {
  return `All ${item.label.toLowerCase()}`;
}

/** Services mega-menu: 2-column program grid + featured programs card. */
export function ServicesPanel({ item, links }: { item: NavItem; links: NavLink[] }) {
  return (
    <>
      <div className="grid grid-cols-[minmax(0,1fr)_15rem]">
        <ul className="grid grid-cols-2 content-start gap-1 p-2.5">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group/link flex h-full items-start gap-3 rounded-2xl p-3 transition-colors duration-200 hover:bg-canvas focus-visible:bg-canvas"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-colors duration-200 group-hover/link:bg-brand-600 group-hover/link:text-white group-hover/link:ring-brand-600">
                  <NavIcon href={link.href} className="size-4.5" />
                </span>
                <span className="min-w-0 pt-px">
                  <span className="block text-sm leading-5 font-semibold tracking-[-0.01em] text-ink-950">
                    {link.label}
                  </span>
                  {link.description ? (
                    <span className="mt-0.5 block text-[0.8rem] leading-snug text-ink-500">
                      {link.description}
                    </span>
                  ) : null}
                </span>
              </Link>
            </li>
          ))}
          {/* Overview link closes the grid (fills the odd cell with 7 services). */}
          <li>
            <Link
              href={item.href}
              className="group/all flex h-full min-h-14 items-center gap-3 rounded-2xl border border-dashed border-ink-200 p-3 text-sm font-semibold text-brand-600 transition-colors duration-200 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 focus-visible:bg-brand-50"
            >
              <span
                aria-hidden="true"
                className="grid size-9 shrink-0 place-items-center rounded-xl bg-white text-brand-600 ring-1 ring-ink-100 transition-colors duration-200 group-hover/all:bg-brand-600 group-hover/all:text-white group-hover/all:ring-brand-600"
              >
                <ArrowRight
                  className="size-4.5 transition-transform duration-200 group-hover/all:translate-x-0.5"
                  strokeWidth={2}
                />
              </span>
              {allLabel(item)}
            </Link>
          </li>
        </ul>
        <ProgramsFeature />
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-line bg-canvas py-2.5 pr-2.5 pl-5">
        <p className="font-mono text-[0.68rem] tracking-[0.14em] text-ink-500 uppercase">
          {links.length} services · one platform · one clinical team
        </p>
        <a
          href={siteConfig.phone.href}
          className="group/call inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm whitespace-nowrap transition-colors duration-200 hover:bg-white"
        >
          <Phone
            aria-hidden="true"
            className="size-4 text-brand-600 transition-transform duration-200 group-hover/call:-rotate-12"
            strokeWidth={2}
          />
          <span className="text-ink-500">Talk to our team</span>
          <span className="font-semibold text-ink-950 tabular-nums">{siteConfig.phone.display}</span>
        </a>
      </div>
    </>
  );
}

/** Dark feature tile inside the services mega-menu, introducing RPM + CCM. */
function ProgramsFeature() {
  return (
    <div className="relative isolate m-2.5 ml-0 flex flex-col justify-between overflow-hidden rounded-2xl bg-ink-950 p-5 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-16 -right-16 size-40 rounded-full bg-brand-600/40 blur-2xl" />
        <BrandRings
          className="absolute -top-24 -right-24 size-64 text-white/12"
          nodeClassName="fill-vital-300"
        />
      </div>
      <div>
        <p aria-hidden="true" className="flex gap-1.5">
          {programs.items.map((program) => (
            <span
              key={program.key}
              className="rounded-full bg-white/5 px-2 py-0.5 font-mono text-[0.65rem] tracking-[0.14em] text-vital-300 ring-1 ring-white/10"
            >
              {program.abbr}
            </span>
          ))}
        </p>
        <p className="mt-5 text-lg leading-snug font-semibold tracking-[-0.02em]">
          {`${programs.titleLead} `}
          <span className="accent-serif text-gradient-light">{programs.titleAccent}</span>
        </p>
        <p className="mt-2 text-xs leading-relaxed text-ink-200">{programs.description}</p>
      </div>
      <Link
        href={`/#${programs.id}`}
        className="group/feat mt-3 inline-flex h-11 items-center gap-1.5 self-start rounded-full text-sm font-semibold text-vital-300 transition-colors hover:text-vital-200"
      >
        Compare the programs
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-200 group-hover/feat:translate-x-0.5"
          strokeWidth={2.25}
        />
      </Link>
    </div>
  );
}

type ListPanelProps = {
  item: NavItem;
  links: NavLink[];
  /** Small mono kicker above the list. */
  kicker?: string;
};

/** Compact dropdown list (devices). */
export function ListPanel({ item, links, kicker }: ListPanelProps) {
  return (
    <>
      {kicker ? (
        <div className="flex items-center gap-2 px-5 pt-4 pb-1">
          <span aria-hidden="true" className="relative flex size-2">
            <span className="absolute inset-0 animate-ping-slow rounded-full bg-vital-400" />
            <span className="relative size-2 rounded-full bg-vital-500" />
          </span>
          <p className="font-mono text-[0.68rem] tracking-[0.14em] text-ink-500 uppercase">
            {kicker}
          </p>
        </div>
      ) : null}
      <ul className="grid gap-0.5 p-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group/link flex items-center gap-3 rounded-2xl px-3 py-2 transition-colors duration-200 hover:bg-canvas focus-visible:bg-canvas"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-ink-50 text-ink-700 ring-1 ring-ink-100 transition-colors duration-200 group-hover/link:bg-vital-50 group-hover/link:text-vital-700 group-hover/link:ring-vital-200">
                <NavIcon href={link.href} className="size-4" />
              </span>
              <span className="flex-1 text-sm font-medium text-ink-900">{link.label}</span>
              <ArrowRight
                aria-hidden="true"
                className="size-4 -translate-x-1 text-ink-400 opacity-0 transition duration-200 group-hover/link:translate-x-0 group-hover/link:opacity-100"
                strokeWidth={2}
              />
            </Link>
          </li>
        ))}
      </ul>
      <div className="border-t border-line bg-canvas p-2">
        <Link
          href={item.href}
          className="group/all flex h-11 items-center justify-between rounded-xl px-3 text-sm font-semibold text-brand-600 transition-colors hover:bg-white hover:text-brand-700"
        >
          {allLabel(item)}
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-200 group-hover/all:translate-x-0.5"
            strokeWidth={2.25}
          />
        </Link>
      </div>
    </>
  );
}
