"use client";

import Image from "next/image";
import { type PointerEvent as ReactPointerEvent, useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

type Shot = { src: string; title: string; caption: string; alt: string };

const SHOTS: Shot[] = [
  {
    src: "/media/freshdesk-modal-created.png",
    title: "Created",
    caption: "New tickets by type and system, plus the first-response-within-8-business-hours benchmark.",
    alt: "Created report: new tickets broken down by type and system, with a first-response benchmark met at 91.4 percent against a 65 percent target.",
  },
  {
    src: "/media/freshdesk-modal-resolved.png",
    title: "Resolved",
    caption: "What closed this period by source and type, against the three-business-day target.",
    alt: "Resolved report: tickets closed broken down by source and type, tracked against an 85 percent within-three-business-days target.",
  },
  {
    src: "/media/freshdesk-modal-unresolved.png",
    title: "Unresolved",
    caption: "The still-open backlog by status, type, system and how long it has waited.",
    alt: "Unresolved report: the open backlog broken down by status, type and system, with an ageing distribution.",
  },
  {
    src: "/media/freshdesk-modal-reopened.png",
    title: "Reopened",
    caption: "Tickets that came back after resolution, by agent, type and system (agent names anonymised).",
    alt: "Reopened report: tickets that came back after resolution, broken down by agent, type and system.",
  },
];

const IMG_W = 1136;
const IMG_H = 662;
const MIN_SCALE = 1;
const MAX_SCALE = 4;

export function ScreenshotMatrix() {
  const [open, setOpen] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ x: number; y: number; px: number; py: number } | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const reset = useCallback(() => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const show = useCallback(
    (i: number) => {
      setOpen(i);
      reset();
    },
    [reset],
  );

  const step = useCallback((dir: 1 | -1) => {
    setOpen((cur) => (cur === null ? cur : (cur + dir + SHOTS.length) % SHOTS.length));
    reset();
  }, [reset]);

  const zoom = useCallback((delta: number) => {
    setScale((s) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, +(s + delta).toFixed(2))));
  }, []);

  // Keyboard controls while open.
  useEffect(() => {
    if (open === null) return;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "+" || e.key === "=") zoom(0.5);
      else if (e.key === "-") zoom(-0.5);
      else if (e.key === "0") reset();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, step, zoom, reset]);

  // Reset pan whenever we fall back to 1x.
  useEffect(() => {
    if (scale === 1) setPan({ x: 0, y: 0 });
  }, [scale]);

  const onPointerDown = (e: ReactPointerEvent) => {
    if (scale === 1) return;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    dragRef.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y };
  };
  const onPointerMove = (e: ReactPointerEvent) => {
    const d = dragRef.current;
    if (!d) return;
    setPan({ x: d.px + (e.clientX - d.x), y: d.py + (e.clientY - d.y) });
  };
  const onPointerUp = () => {
    dragRef.current = null;
  };

  const current = open === null ? null : SHOTS[open];

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2">
        {SHOTS.map((s, i) => (
          <li key={s.src}>
            <button
              type="button"
              onClick={() => show(i)}
              aria-label={`Enlarge the ${s.title} report`}
              className="group block w-full overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface-2 p-2 text-left transition-colors duration-200 hover:border-line-2 focus-visible:border-line-2 sm:p-3"
            >
              <div className="relative overflow-hidden rounded-lg border border-line-2">
                <Image
                  src={s.src}
                  width={IMG_W}
                  height={IMG_H}
                  alt={s.alt}
                  className="w-full"
                  sizes="(min-width: 1024px) 440px, 100vw"
                />
                <span className="pointer-events-none absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Icon name="plus" size={16} />
                </span>
              </div>
              <p className="mt-2.5 flex items-baseline gap-2 px-1">
                <span className="font-semibold text-ink">{s.title}</span>
                <span className="t-data text-[0.6875rem] uppercase tracking-[0.12em] text-ink-muted">
                  Aug 2026
                </span>
              </p>
              <p className="mt-0.5 px-1 text-[0.9375rem] leading-snug text-ink-muted">{s.caption}</p>
            </button>
          </li>
        ))}
      </ul>

      {current ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${current.title} report, enlarged`}
          className="pwx-anim-overlay fixed inset-0 z-50 flex flex-col bg-black/85 backdrop-blur-sm"
          onClick={() => setOpen(null)}
        >
          {/* Top bar */}
          <div
            className="flex shrink-0 items-center justify-between gap-3 px-4 py-3 text-white sm:px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="min-w-0 truncate text-sm font-semibold">
              {current.title} <span className="font-normal text-white/60">- Aug 2026</span>
              <span className="ml-2 hidden text-white/45 sm:inline">
                {(open ?? 0) + 1} / {SHOTS.length}
              </span>
            </p>
            <div className="flex items-center gap-1.5">
              <button type="button" onClick={() => zoom(-0.5)} disabled={scale <= MIN_SCALE} aria-label="Zoom out" className="grid h-9 w-9 place-items-center rounded-md bg-white/10 text-white transition-colors hover:bg-white/20 disabled:opacity-35">
                <Icon name="minus" size={18} />
              </button>
              <span className="t-data w-12 text-center text-xs tabular-nums text-white/70">{Math.round(scale * 100)}%</span>
              <button type="button" onClick={() => zoom(0.5)} disabled={scale >= MAX_SCALE} aria-label="Zoom in" className="grid h-9 w-9 place-items-center rounded-md bg-white/10 text-white transition-colors hover:bg-white/20 disabled:opacity-35">
                <Icon name="plus" size={18} />
              </button>
              <button
                ref={closeBtn}
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Close"
                className="ml-1 grid h-9 w-9 place-items-center rounded-md bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <Icon name="close" size={18} />
              </button>
            </div>
          </div>

          {/* Stage */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-2 pb-2 sm:px-14">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); step(-1); }}
              aria-label="Previous report"
              className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 place-items-center rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 sm:grid"
            >
              <Icon name="chevron-right" size={20} className="rotate-180" />
            </button>

            <div
              className="max-h-full max-w-full touch-none select-none"
              style={{
                cursor: scale > 1 ? (dragRef.current ? "grabbing" : "grab") : "auto",
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
                transition: dragRef.current ? "none" : "transform 0.18s var(--ease-out-expo)",
              }}
              onClick={(e) => e.stopPropagation()}
              onDoubleClick={() => (scale === 1 ? zoom(1) : reset())}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onWheel={(e) => zoom(e.deltaY < 0 ? 0.25 : -0.25)}
            >
              <Image
                src={current.src}
                width={IMG_W}
                height={IMG_H}
                alt={current.alt}
                priority
                draggable={false}
                className="max-h-[78vh] w-auto rounded-lg border border-white/15 shadow-2xl"
                sizes="90vw"
              />
            </div>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); step(1); }}
              aria-label="Next report"
              className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 place-items-center rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 sm:grid"
            >
              <Icon name="chevron-right" size={20} />
            </button>
          </div>

          {/* Caption + mobile nav */}
          <div className="shrink-0 px-4 pb-4 text-center sm:px-6" onClick={(e) => e.stopPropagation()}>
            <p className="mx-auto max-w-2xl text-[0.9375rem] leading-snug text-white/70">{current.caption}</p>
            <div className="mt-3 flex items-center justify-center gap-2 sm:hidden">
              <button type="button" onClick={() => step(-1)} aria-label="Previous report" className="grid h-9 w-9 place-items-center rounded-md bg-white/10 text-white">
                <Icon name="chevron-right" size={18} className="rotate-180" />
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Next report" className="grid h-9 w-9 place-items-center rounded-md bg-white/10 text-white">
                <Icon name="chevron-right" size={18} />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
