"use client";

import { useRef } from "react";
import { syntheticBotTicket as t } from "@content/recreations/synthetic";
import { useStore } from "@/lib/store";
import { gsap, useGSAP, NO_PREFERENCE } from "@/components/motion/gsap";
import { Window, ui } from "./Window";

/**
 * The Reply Assistant drafting a reply: classify, investigate with read-only tools, draft,
 * score, hand to a person. Everything shown is invented. Final state is the resting state.
 */
export function ReplyAssistantRecreation() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const decision = root.querySelector<HTMLElement>("[data-decision]");
      const calls = root.querySelectorAll<HTMLElement>("[data-call]");
      const ticks = root.querySelectorAll<HTMLElement>("[data-tick]");
      const draft = root.querySelector<HTMLElement>("[data-draft]");
      const bar = root.querySelector<HTMLElement>("[data-bar]");
      const pct = root.querySelector<HTMLElement>("[data-pct]");
      const ready = root.querySelector<HTMLElement>("[data-ready]");
      const actions = root.querySelector<HTMLElement>("[data-actions]");
      if (!decision || !draft || !bar || !pct || !ready || !actions) return;
      gsap.matchMedia().add(NO_PREFERENCE, () => {
        if (useStore.getState().reducedMotion) return;
        const score = { v: 0 };
        const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top 80%", once: true }, delay: 0.4 });
        tl.from(decision, { autoAlpha: 0, scale: 0.9, duration: 0.3, ease: "expo.out" })
          .from(calls, { autoAlpha: 0, x: -8, duration: 0.3, stagger: 0.45, ease: "power2.out" }, "+=0.2")
          .from(ticks, { autoAlpha: 0, scale: 0.6, duration: 0.2, stagger: 0.45, ease: "back.out(2)" }, "<+=0.3")
          .from(draft, { autoAlpha: 0, y: 6, duration: 0.4, ease: "expo.out" }, "+=0.2")
          .fromTo(bar, { scaleX: 0 }, { scaleX: t.confidence / 100, duration: 0.7, ease: "expo.out", transformOrigin: "left center" }, "<")
          .to(score, { v: t.confidence, duration: 0.7, ease: "expo.out", onUpdate: () => { pct.textContent = `${Math.round(score.v)}%`; } }, "<")
          .from(ready, { autoAlpha: 0, scale: 0.85, duration: 0.3, ease: "back.out(2)" }, "-=0.1")
          .from(actions, { autoAlpha: 0, y: 4, duration: 0.3, ease: "expo.out" }, "-=0.1");
      });
    },
    { scope: ref },
  );

  return (
    <Window
      title="Reply Assistant - Inbox"
      caption="The agent classifies a franchise reply, investigates it with read-only tools, drafts an answer with a confidence score, and leaves it as a private note for a person to approve. All data invented."
    >
      <div ref={ref} className="space-y-3">
        {/* Incoming reply */}
        <div className="rounded-[6px] border border-[#1e293b] bg-[#111b2e] p-2.5">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            <p className="font-semibold text-[#e2e8f0]">
              <span className="text-[#94a3b8]">{t.id}</span> {t.subject}
            </p>
            <span className="text-[10px] text-[#94a3b8]">{t.from} · 09:12</span>
          </div>
          <p className="mt-1.5 text-[#cbd5e1]">{t.message}</p>
        </div>

        {/* Decision + tool trace */}
        <div className="grid gap-3 sm:grid-cols-[auto_1fr] sm:items-start">
          <span data-decision className={`${ui.pill} self-start bg-[#1d4ed8] text-white`}>
            Decision: {t.decision}
          </span>
          <ul className="space-y-1 font-mono text-[11px]">
            {t.tools.map((c) => (
              <li key={c.call} data-call className="flex items-start gap-2">
                <span data-tick className="mt-[3px] inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-[#22c55e]" />
                <span className="min-w-0">
                  <span className="text-[#93c5fd]">{c.call}</span>
                  <span className="text-[#94a3b8]"> {"->"} {c.result}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Draft */}
        <div data-draft className="rounded-[6px] border border-[#1e3a5f] bg-[#0a2540] p-2.5">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#94a3b8]">Draft reply (private note)</p>
          <p className="text-[#e2e8f0]">{t.draft}</p>
          <p className="mt-1.5 text-[10px] text-[#94a3b8]">{t.knowledge}</p>
        </div>

        {/* Confidence + actions */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <div className="flex min-w-[9rem] flex-1 items-center gap-2">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#1e293b]">
              <div data-bar className="h-full rounded-full bg-[#22c55e]" style={{ width: "100%", transform: `scaleX(${t.confidence / 100})`, transformOrigin: "left center" }} />
            </div>
            <span data-pct className="w-9 text-right font-mono text-[11px] tabular-nums text-[#e2e8f0]">
              {t.confidence}%
            </span>
          </div>
          <span data-ready className={`${ui.pill} bg-[#14532d] text-[#bbf7d0]`}>
            Ready to send
          </span>
          <div data-actions className="flex items-center gap-1.5">
            <span className="inline-flex items-center rounded-[4px] border border-[#334155] px-2 py-1 text-[11px] font-semibold text-[#cbd5e1]">
              Edit
            </span>
            <span className={ui.btn}>Approve and send</span>
          </div>
        </div>
      </div>
    </Window>
  );
}
