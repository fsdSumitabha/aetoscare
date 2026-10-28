import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button-link";
import { LogoMark } from "@/components/ui/logo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-title"
      className="relative isolate flex min-h-[80dvh] items-center overflow-hidden bg-ink-950 pt-32 pb-24 text-white"
    >
      <div aria-hidden="true" className="bg-line-grid-dark mask-spotlight absolute inset-0 -z-10" />
      <div className="container-page flex flex-col items-center text-center">
        <LogoMark className="size-16 text-white/90" eyeClassName="fill-vital-300" />
        <p className="mt-8 font-mono text-sm tracking-[0.16em] text-brand-200 uppercase">Error 404</p>
        <h1 id="not-found-title" className="mt-4 text-4xl font-semibold tracking-[-0.035em] sm:text-6xl">
          This page is <span className="accent-serif text-gradient-light">off the chart.</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg text-ink-200">
          The page you’re looking for doesn’t exist or has moved. Head back home or talk to our team.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" variant="vital" size="lg">
            Back to home
          </ButtonLink>
          <ButtonLink href={siteConfig.demoUrl} variant="ghost-dark" size="lg">
            Request a demo
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
