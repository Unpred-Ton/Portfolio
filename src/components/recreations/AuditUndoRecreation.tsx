"use client";

import { useRef } from "react";
import { syntheticAuditEntries } from "@content/recreations/synthetic";
import { useStore } from "@/lib/store";
import { gsap, useGSAP, NO_PREFERENCE } from "@/components/motion/gsap";
import { Window, ui } from "./Window";

export function AuditUndoRecreation() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const row = root.querySelector<HTMLElement>("[data-row='0']");
      const btn = root.querySelector<HTMLElement>("[data-undo]");
      const newCell = root.querySelector<HTMLElement>("[data-new]");
      const status = root.querySelector<HTMLElement>("[data-status]");
      if (!row || !btn || !newCell || !status) return;
      gsap.matchMedia().add(NO_PREFERENCE, () => {
        if (useStore.getState().reducedMotion) return;
        const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top 80%", once: true }, delay: 0.6 });
        tl.to(btn, { scale: 0.92, duration: 0.12, ease: "power1.out" })
          .to(btn, { scale: 1, duration: 0.18, ease: "expo.out" })
          .to(row, { backgroundColor: "#14532d", duration: 0.25 }, "<")
          .set(newCell, { textContent: "In progress" })
          .set(status, { textContent: "Restored" })
          .to(row, { backgroundColor: "rgba(0,0,0,0)", duration: 0.6, ease: "power1.out" }, "+=0.4");
      });
    },
    { scope: ref },
  );
  return (
    <Window title="User Logs" caption="The audit log: every write stores a before and after snapshot, and a wrong edit is restored with one click.">
      <div ref={ref}>
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr>
              <th className={`${ui.th} hidden sm:table-cell`}>Time</th>
              <th className={ui.th}>User</th>
              <th className={ui.th}>Field</th>
              <th className={`${ui.th} hidden sm:table-cell`}>Old</th>
              <th className={ui.th}>New</th>
              <th className={ui.th}></th>
            </tr>
          </thead>
          <tbody>
            {syntheticAuditEntries.map((e, i) => (
              <tr key={i} data-row={i} className="rounded-[4px]">
                <td className={`${ui.td} hidden tabular-nums text-[#94a3b8] sm:table-cell`}>{e.at}</td>
                <td className={ui.td}>{e.user}</td>
                <td className={ui.td}>{e.field}</td>
                <td className={`${ui.td} hidden text-[#94a3b8] sm:table-cell`}>{e.from}</td>
                <td className={ui.td} data-new={i === 0 ? "" : undefined}>
                  {e.to}
                </td>
                <td className={`${ui.td} text-right`}>
                  {i === 0 ? (
                    <span data-undo className={ui.btn}>
                      Undo
                    </span>
                  ) : (
                    <span className="text-[#64748b]">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-[11px] text-[#94a3b8]">
          Status: <span data-status className="text-[#cbd5e1]">3 changes today</span>
        </p>
      </div>
    </Window>
  );
}
