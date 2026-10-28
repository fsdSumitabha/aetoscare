import type { Metadata } from "next";
import { HeroPetal } from "@/components/sections/hero-concepts/petal/hero-petal";

export const metadata: Metadata = {
  title: "Hero concept: Petal",
  robots: { index: false, follow: false },
};

export default function HeroPreviewPage() {
  return <HeroPetal />;
}
