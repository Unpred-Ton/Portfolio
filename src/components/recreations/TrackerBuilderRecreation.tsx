"use client";

import { useRef } from "react";
import { syntheticStores } from "@content/recreations/synthetic";
import { useStore } from "@/lib/store";
import { gsap, useGSAP, NO_PREFERENCE } from "@/components/motion/gsap";
import { Window, ui } from "./Window";

const cols = [
  { name: "FP", type: "text" },
  { name: "Owner", type: "member" },
  { name: "Status", type: "status" },
  { name: "Completion Date", type: "date" },
];

export function TrackerBuilderRecreation() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const badge = root.querySelector<HTMLElement>("[data-badge]");
      const date = root.querySelector<HTMLElement>("[data-date]");
      if (!badge || !date) return;
      gsap.matchMedia().add(NO_PREFERENCE, () => {
        if (useStore.getState().reducedMotion) return;
        const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top 80%", once: true }, delay: 0.8 });
        tl.to(badge, { scale: 0.9, duration: 0.12 })
          .set(badge, { textContent: "Completed", backgroundColor: "#14532d", color: "#bbf7d0" })
          .to(badge, { scale: 1, duration: 0.25, ease: "expo.out" })
          .fromTo(date, { textContent: "-", color: "#64748b" }, { textContent: "03/09/2026", color: "#e2e8f0", duration: 0.01 }, "+=0.2")
          .from(date, { backgroundColor: "#1e3a8a", duration: 0.8, ease: "power1.out" }, "<");
      });
    },
    { scope: ref },
  );
  return (
    <Window title="Adhoc Tracker - Onboarding checks" caption="The no-code tracker builder: typed columns, multi-assignee members, and a status set to Completed stamps the completion date server-side.">
      <div ref={ref}>
        <div className="mb-2 flex flex-wrap gap-1.5">
          {cols.map((c) => (
            <span key={c.name} className="rounded-[4px] border border-[#1e293b] px-2 py-0.5 text-[10px]">
              {c.name} <span className="text-[#94a3b8]">· {c.type}</span>
            </span>
          ))}
          <span className="rounded-[4px] border border-dashed border-[#334155] px-2 py-0.5 text-[10px] text-[#94a3b8]">+ Add column</span>
        </div>
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr>
              <th className={ui.th}>#</th>
              {cols.map((c) => (
                <th key={c.name} className={`${ui.th} ${c.name === "Owner" ? "hidden sm:table-cell" : ""}`}>
                  {c.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {syntheticStores.slice(0, 4).map((s, i) => (
              <tr key={s.code}>
                <td className={`${ui.td} text-[#64748b]`}>{i + 1}</td>
                <td className={ui.td}>{s.name}</td>
                <td className={`${ui.td} hidden sm:table-cell`}>
                  <span className={`${ui.pill} bg-[#1e293b] text-[#cbd5e1]`}>{i % 2 ? "a.demo" : "j.demo"}</span>
                </td>
                <td className={ui.td}>
                  {i === 1 ? (
                    <span data-badge className={`${ui.pill} bg-[#1e3a8a] text-[#bfdbfe]`}>
                      In-progress
                    </span>
                  ) : (
                    <span className={`${ui.pill} ${i === 0 ? "bg-[#14532d] text-[#bbf7d0]" : "bg-[#1e293b] text-[#cbd5e1]"}`}>
                      {i === 0 ? "Completed" : "To Start"}
                    </span>
                  )}
                </td>
                <td className={`${ui.td} tabular-nums`}>
                  {i === 0 ? "01/09/2026" : i === 1 ? <span data-date className="rounded-[3px] px-1">-</span> : <span className="text-[#64748b]">-</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Window>
  );
}
