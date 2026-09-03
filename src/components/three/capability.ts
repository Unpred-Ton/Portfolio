import type { RenderTier } from "@/lib/store";

/** Decide how much 3D this device should get. Runs on the client only. */
export function detectTier(): RenderTier {
  if (typeof window === "undefined") return "poster";

  if (process.env.NODE_ENV !== "production") {
    const forced = new URLSearchParams(window.location.search).get("tier");
    if (forced === "full" || forced === "lite" || forced === "poster") return forced;
  }

  if (window.matchMedia("(prefers-reduced-data: reduce)").matches) return "poster";

  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
  if (!gl) return "poster";

  const nav = navigator as Navigator & { deviceMemory?: number };
  const small = window.innerWidth < 768;
  const weak = (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;
  return small || weak ? "lite" : "full";
}
