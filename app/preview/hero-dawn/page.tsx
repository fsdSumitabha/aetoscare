import type { Metadata } from "next";
import { HeroDawn } from "@/components/sections/hero-concepts/dawn/hero-dawn";

export const metadata: Metadata = {
  title: "Hero concept: Dawn to dusk",
  robots: { index: false, follow: false },
};

export default function HeroPreviewPage() {
  return <HeroDawn />;
}
