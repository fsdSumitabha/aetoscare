import { ImageResponse } from "next/og";
import { crosshairPaths, eyePath, letterPaths } from "@/lib/brand/logo-paths";

export const alt =
  "AETOS: remote patient monitoring that never sleeps. RPM, CCM and a 24/7 clinical team for medical practices.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const RINGS = [560, 440, 320, 200];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#040c1b",
          backgroundImage:
            "radial-gradient(circle at 82% 30%, rgba(43,120,255,0.45), transparent 45%), radial-gradient(circle at 70% 85%, rgba(43,207,164,0.3), transparent 40%)",
          color: "#ffffff",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {RINGS.map((d) => (
          <div
            key={d}
            style={{
              position: "absolute",
              right: 260 - d / 2,
              top: 315 - d / 2,
              width: d,
              height: d,
              borderRadius: "50%",
              border: "1.5px solid rgba(255,255,255,0.09)",
            }}
          />
        ))}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
          <svg width="220" height="60" viewBox="0 0 183 50" fill="#ffffff">
            {letterPaths.map((d) => (
              <path key={d} d={d} />
            ))}
            <path d={eyePath} fill="#2bcfa4" />
            {crosshairPaths.map((d) => (
              <path key={d} d={d} />
            ))}
          </svg>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 820 }}>
            <div style={{ fontSize: 26, letterSpacing: 4, color: "#89b8ff", textTransform: "uppercase", marginBottom: 24 }}>
              RPM · CCM · 24/7 clinical team
            </div>
            <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2.5 }}>
              Remote patient monitoring that never sleeps.
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 28, fontSize: 26, color: "#cdd5e1" }}>
            <span>First device free</span>
            <span style={{ color: "#2bcfa4" }}>●</span>
            <span>EHR-integrated</span>
            <span style={{ color: "#2bcfa4" }}>●</span>
            <span>English &amp; Spanish</span>
            <span style={{ marginLeft: "auto", color: "#ffffff" }}>aetoscare.com</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
