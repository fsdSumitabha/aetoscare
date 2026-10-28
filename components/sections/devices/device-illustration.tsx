import type { ComponentType } from "react";
import { cn } from "@/lib/cn";
import { devices } from "@/lib/content/home";
import { ArtDefs, type ArtProps } from "./device-art-shared";
import { BloodPressureArt } from "./device-art-blood-pressure";
import { GlucometerArt } from "./device-art-glucometer";
import { OximeterArt } from "./device-art-oximeter";
import { SpirometerArt } from "./device-art-spirometer";
import { ScaleArt } from "./device-art-scale";

export type DeviceKey = (typeof devices.items)[number]["key"];

const artByDevice: Record<DeviceKey, ComponentType<ArtProps>> = {
  "blood-pressure-monitor": BloodPressureArt,
  glucometer: GlucometerArt,
  "pulse-oximeter": OximeterArt,
  spirometer: SpirometerArt,
  "weight-scale": ScaleArt,
};

type DeviceIllustrationProps = {
  device: DeviceKey;
  className?: string;
};

/**
 * Original flat-3D product render of an AETOS cellular device, with a live LCD
 * showing the device's sample reading. Purely decorative (the card carries the
 * real text). The screen glows brighter while an ancestor `group/device` is
 * hovered. Gradient and filter ids are prefixed `dev-<key>-`.
 */
export function DeviceIllustration({ device, className }: DeviceIllustrationProps) {
  const item = devices.items.find((entry) => entry.key === device);
  if (!item) return null;

  const prefix = `dev-${device}-`;
  const Art = artByDevice[device];

  return (
    <svg
      viewBox="0 0 320 240"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("h-auto w-full overflow-visible", className)}
    >
      <ArtDefs prefix={prefix} />
      <Art prefix={prefix} value={item.sample} unit={item.unit} />
    </svg>
  );
}
