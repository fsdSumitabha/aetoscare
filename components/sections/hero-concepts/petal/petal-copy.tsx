import { Fragment } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { Check, Heart, Languages, ShieldCheck, type LucideIcon } from "@/components/ui/icons";
import { MotionToggle } from "@/components/ui/motion-toggle";
import { cn } from "@/lib/cn";
import { hero } from "@/lib/content/home";
import { siteConfig } from "@/lib/site";
import { PetalScribble } from "./petal-scribble";

type ProofPoint = (typeof hero.proofPoints)[number];

/** Each proof point gets its own pastel tint so the row reads like sweets in a jar. */
const proofStyles: Record<ProofPoint, { icon: LucideIcon; filled?: boolean; tag: string; bubble: string }> = {
  "First device free": {
    icon: Check,
    tag: "bg-care-50 text-care-800 ring-care-100",
    bubble: "bg-care-100 text-care-700",
  },
  "24/7/365 RN coverage": {
    icon: Heart,
    filled: true,
    tag: "bg-blush-50 text-[#9c4129] ring-blush-100",
    bubble: "bg-blush-100 text-blush-500",
  },
  "HIPAA-compliant": {
    icon: ShieldCheck,
    tag: "bg-lilac-50 text-lilac-700 ring-lilac-100",
    bubble: "bg-lilac-100 text-lilac-500",
  },
  "English & Spanish": {
    icon: Languages,
    tag: "bg-honey-100 text-[#6b4e12] ring-honey-200",
    bubble: "bg-honey-200 text-[#946a12]",
  },
};

/** Split the accent so its last two words never break apart under the scribble. */
const accentWords = hero.titleAccent.split(" ");
const accentHead = accentWords.slice(0, -2).join(" ");
const accentTail = accentWords.slice(-2).join(" ");

export function PetalCopy() {
  return (
    <div className="relative max-w-2xl lg:max-w-none">
      <p className="inline-flex max-w-full items-center gap-2.5 rounded-full bg-blush-50/90 py-1.5 pr-4 pl-1.5 text-[0.78rem] leading-snug font-semibold text-[#a8462d] shadow-[0_8px_20px_-14px_rgb(201_85_58/0.55)] ring-1 ring-blush-200/70 sm:text-[0.8125rem]">
        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white text-blush-500 shadow-[0_2px_6px_-2px_rgb(201_85_58/0.35)]">
          <Heart className="size-3.5" fill="currentColor" strokeWidth={0} />
        </span>
        <span className="flex flex-wrap items-center gap-x-1.5">
          {hero.eyebrow.split(" · ").map((part, index) => (
            <Fragment key={part}>
              {index > 0 ? (
                <span aria-hidden="true" className="hidden text-blush-300 sm:inline">
                  ·
                </span>
              ) : null}
              <span>{part}</span>
            </Fragment>
          ))}
        </span>
      </p>

      <h1
        id="hero-title"
        className="mt-6 font-display text-[2.8rem] leading-[1.04] font-normal tracking-[-0.025em] text-care-950 [font-variation-settings:'SOFT'_100,'opsz'_144] sm:text-6xl sm:leading-[1.02] lg:text-[3.6rem] xl:text-[4.6rem] xl:leading-[1]"
      >
        {`${hero.titleLead} `}
        <span className="text-blush-500 italic">
          {`${accentHead} `}
          <span className="relative inline-block whitespace-nowrap">
            <span className="bg-linear-to-r from-blush-500 via-[#cf6a7c] to-lilac-500 bg-clip-text pr-[0.08em] text-transparent">
              {accentTail}
            </span>
            <PetalScribble className="absolute -bottom-[0.2em] left-[-0.02em] h-[0.3em] w-[98%] text-blush-300" />
          </span>
        </span>
      </h1>

      <p className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-stone-600 sm:text-lg sm:leading-relaxed">
        {hero.description}
      </p>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
        <ButtonLink href={siteConfig.demoUrl} variant="care" size="lg" className="w-full sm:w-auto">
          {hero.primaryCta.label}
        </ButtonLink>
        <ButtonLink href={hero.secondaryCta.href} variant="cream" size="lg" className="w-full sm:w-auto">
          {hero.secondaryCta.label}
        </ButtonLink>
      </div>

      <ul className="mt-8 flex flex-wrap gap-2 sm:gap-2.5">
        {hero.proofPoints.map((point) => {
          const style = proofStyles[point];
          const Icon = style.icon;
          return (
            <li
              key={point}
              className={cn(
                "inline-flex items-center gap-2 rounded-full py-1.5 pr-3.5 pl-1.5 text-[0.8125rem] font-semibold ring-1 sm:text-sm",
                style.tag,
              )}
            >
              <span className={cn("grid size-6 shrink-0 place-items-center rounded-full", style.bubble)}>
                <Icon
                  className="size-3.5"
                  strokeWidth={style.filled ? 0 : 2.5}
                  fill={style.filled ? "currentColor" : "none"}
                />
              </span>
              {point}
            </li>
          );
        })}
      </ul>

      <MotionToggle tone="light" className="mt-5 opacity-80 hover:opacity-100" />
    </div>
  );
}
