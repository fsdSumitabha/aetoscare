import Link from "next/link";
import { Phone } from "@/components/ui/icons";
import { siteConfig } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button-link";
import { Logo } from "@/components/ui/logo";
import { DesktopNav } from "@/components/layout/desktop-nav";
import { MobileNav } from "@/components/layout/mobile-nav";

/**
 * Floating cream glass "pill" header. The pill deepens its background and shadow as
 * the page scrolls (`header-elevate`, scroll-driven CSS); browsers without
 * scroll timelines, and reduced-motion users, get a fixed, more opaque cream
 * glass so the nav stays legible over any section.
 */
export function SiteHeader() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="container-page pt-3 sm:pt-4">
        <div className="pointer-events-auto relative grid h-16 grid-cols-[1fr_auto] items-center gap-x-3 rounded-full pr-2.5 pl-3 font-humanist text-care-950 ring-1 ring-care-900/8 backdrop-blur-xl backdrop-saturate-150 header-elevate not-supports-[animation-timeline:scroll()]:bg-cream-50/92 motion-reduce:bg-cream-50/92 sm:pl-4 lg:grid-cols-[1fr_auto_1fr]">
          {/* Specular highlight along the top edge of the glass. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-12 -top-px h-px bg-linear-to-r from-transparent via-white to-transparent"
          />

          <Link
            href="/"
            aria-label={`${siteConfig.name} home`}
            className="inline-flex h-11 items-center justify-self-start rounded-full px-2 [&>svg]:h-6"
          >
            <Logo className="text-care-950" eyeClassName="fill-blush-400" />
          </Link>

          <DesktopNav />

          <div className="flex items-center justify-end gap-2">
            <a
              href={siteConfig.phone.href}
              className="group/phone hidden h-11 items-center gap-2.5 rounded-full pr-3.5 pl-1.5 text-sm font-medium whitespace-nowrap text-care-900/80 tabular-nums transition-colors duration-200 hover:bg-care-900/5 hover:text-care-950 xl:inline-flex"
            >
              <span
                aria-hidden="true"
                className="grid size-8 place-items-center rounded-full bg-care-50 text-care-700 ring-1 ring-care-100 transition-colors duration-200 group-hover/phone:bg-care-700 group-hover/phone:text-white"
              >
                <Phone className="size-3.5" strokeWidth={2.25} />
              </span>
              <span>
                <span className="sr-only">Call </span>
                {siteConfig.phone.display}
              </span>
            </a>
            <div className="hidden sm:block">
              <ButtonLink href={siteConfig.demoUrl} variant="care" size="md">
                Request a demo
              </ButtonLink>
            </div>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
