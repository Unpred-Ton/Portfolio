"use client";

import { useRef } from "react";
import { syntheticStores, syntheticTickets } from "@content/recreations/synthetic";
import { useStore } from "@/lib/store";
import { gsap, useGSAP, NO_PREFERENCE } from "@/components/motion/gsap";
import { Window, ui } from "./Window";

const usage = [
  { tool: "Sales Export", n: 265 },
  { tool: "Category Fix", n: 186 },
  { tool: "Stock Take Export", n: 142 },
  { tool: "Import Products", n: 97 },
  { tool: "Delete Products", n: 61 },
];

export function DashboardRecreation() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const bars = ref.current?.querySelectorAll<HTMLElement>("[data-bar]");
      if (!bars?.length) return;
      gsap.matchMedia().add(NO_PREFERENCE, () => {
        if (useStore.getState().reducedMotion) return;
        gsap.from(bars, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.7,
          stagger: 0.07,
          ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        });
      });
    },
    { scope: ref },
  );
  const max = usage[0].n;
  return (
    <Window title="Dashboard" caption="The Dashboard: the signed-in user's open tasks and tickets beside a tool-usage leaderboard counting fetch-push sessions.">
      <div ref={ref} className="grid gap-3 sm:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="mb-1.5 text-[11px] font-semibold text-[#cbd5e1]">My open tasks</p>
          <ul className="space-y-1">
            {syntheticStores.slice(0, 3).map((s, i) => (
              <li key={s.code} className="flex items-center justify-between rounded-[4px] bg-[#111c33] px-2 py-1.5">
                <span>
                  <span className="text-[#94a3b8]">{s.code}</span> {s.name}
                </span>
                <span className={`${ui.pill} ${i === 0 ? "bg-[#7f1d1d] text-[#fecaca]" : "bg-[#1e3a8a] text-[#bfdbfe]"}`}>
                  {i === 0 ? "Blocked" : "In progress"}
                </span>
              </li>
            ))}
          </ul>
          <p className="mb-1.5 mt-3 text-[11px] font-semibold text-[#cbd5e1]">Freshdesk - open</p>
          <ul className="space-y-1">
            {syntheticTickets.slice(0, 2).map((t) => (
              <li key={t.id} className="flex items-center justify-between rounded-[4px] bg-[#111c33] px-2 py-1.5">
                <span>
                  <span className="text-[#94a3b8]">#{t.id}</span> {t.subject}
                </span>
                <span className={`${ui.pill} bg-[#78350f] text-[#fde68a]`}>{t.status}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-1.5 text-[11px] font-semibold text-[#cbd5e1]">Tool usage - 30 days</p>
          <ol className="space-y-1.5">
            {usage.map((u) => (
              <li key={u.tool} className="grid grid-cols-[1fr_2.5rem] items-center gap-2">
                <div>
                  <div className="flex justify-between text-[11px]">
                    <span>{u.tool}</span>
                  </div>
                  <div className="mt-0.5 h-1.5 rounded-full bg-[#1e293b]">
                    <div data-bar className="h-1.5 rounded-full bg-[#003da5]" style={{ width: `${(u.n / max) * 100}%` }} />
                  </div>
                </div>
                <span className="text-right tabular-nums text-[#cbd5e1]">{u.n}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Window>
  );
}
