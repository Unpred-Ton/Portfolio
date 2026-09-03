"use client";

import { useRef } from "react";
import { syntheticExportMonths } from "@content/recreations/synthetic";
import { useStore } from "@/lib/store";
import { gsap, useGSAP, NO_PREFERENCE } from "@/components/motion/gsap";
import { Window } from "./Window";

export function ExportWalkerRecreation() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const bars = root.querySelectorAll<HTMLElement>("[data-fill]");
      const stamp = root.querySelector<HTMLElement>("[data-stamp]");
      const count = root.querySelector<HTMLElement>("[data-count]");
      if (!bars.length || !stamp || !count) return;
      gsap.matchMedia().add(NO_PREFERENCE, () => {
        if (useStore.getState().reducedMotion) return;
        const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top 80%", once: true } });
        // Four workers: months complete in overlapping waves, like the bounded pool does.
        tl.to(bars, { scaleX: 1, transformOrigin: "left center", duration: 0.5, ease: "power1.inOut", stagger: { each: 0.12, from: "start" } });
        const obj = { n: 0 };
        tl.to(obj, { n: 12, duration: 1.6, ease: "none", onUpdate: () => { count.textContent = String(Math.round(obj.n)); } }, 0);
        tl.fromTo(stamp, { autoAlpha: 0, scale: 1.3, rotate: -8 }, { autoAlpha: 1, scale: 1, rotate: -6, duration: 0.35, ease: "expo.out" }, ">-0.1");
      });
    },
    { scope: ref },
  );
  return (
    <Window title="Sales Export - 12 months" caption="Sales Export: months stream through a bounded worker pool, each writing a sales and item-count workbook, then the run is verified against the legacy export.">
      <div ref={ref} className="relative">
        <div className="mb-2 flex items-center justify-between text-[11px]">
          <span className="text-[#cbd5e1]">
            Months complete: <span data-count className="tabular-nums">0</span>/12
          </span>
          <span className="text-[#94a3b8]">4 workers · Northside Demo</span>
        </div>
        <ul className="grid grid-cols-4 gap-1.5 sm:grid-cols-6">
          {syntheticExportMonths.map((m) => (
            <li key={m} className="rounded-[4px] bg-[#111c33] p-1.5">
              <div className="flex justify-between text-[10px] text-[#94a3b8]">
                <span>{m}</span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-[#1e293b]">
                <div data-fill className="h-1.5 w-full origin-left scale-x-0 rounded-full bg-[#003da5]" />
              </div>
            </li>
          ))}
        </ul>
        <div
          data-stamp
          className="pointer-events-none absolute right-0 -top-1 rounded-[4px] bg-[#0f172a] border-2 border-[#22c55e] px-2 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#22c55e] opacity-0"
        >
          Verified · 0 diffs
        </div>
      </div>
    </Window>
  );
}
