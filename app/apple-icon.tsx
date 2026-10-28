import { ImageResponse } from "next/og";
import { crosshairPaths, eyePath, markViewBox } from "@/lib/brand/logo-paths";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#040c1b",
        }}
      >
        <svg width="118" height="118" viewBox={markViewBox} fill="#ffffff">
          <path d={eyePath} fill="#2bcfa4" />
          {crosshairPaths.map((d) => (
            <path key={d} d={d} />
          ))}
        </svg>
      </div>
    ),
    size,
  );
}
