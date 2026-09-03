"use client";

import { useRef } from "react";
import { site } from "@content/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SceneRoot } from "@/components/three/SceneRoot";
import { useStore } from "@/lib/store";
import { gsap, useGSAP, NO_PREFERENCE } from "@/components/motion/gsap";

const proof = [
  { v: "9+ yrs", l: "data automation" },
  { v: "140+", l: "franchises served" },
  { v: "In production", l: "on Google Cloud" },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const items = el.querySelectorAll<HTMLElement>("[data-hero]");
      gsap.matchMedia().add(NO_PREFERENCE, () => {
        if (useStore.getState().reducedMotion) return;
        gsap.from(items, { autoAlpha: 0, y: 26, duration: 0.9, ease: "expo.out", stagger: 0.09, delay: 0.05 });
      });
    },
    { scope: ref },
  );

  return (
    <section id="top" className="relative flex min-h-[92svh] items-center overflow-hidden pb-20 pt-28 sm:pt-32">
      {/* Node mesh, concentrated to the right and faded toward the copy. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, transparent 34%, black 78%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, transparent 34%, black 78%)",
        }}
      >
        <div className="absolute inset-0 opacity-70">
          <SceneRoot />
        </div>
      </div>

      <Container className="relative z-10">
        <div ref={ref} className="max-w-[56rem]">
          <div
            data-hero
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-line-2 bg-surface/70 py-1.5 pl-2.5 pr-3.5 text-[0.8125rem] font-medium text-ink-2 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-good opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-good" />
            </span>
            Open to remote roles and contracts
          </div>

          <h1
            data-hero
            className="text-[clamp(2.9rem,9vw,6.25rem)] font-extrabold leading-[0.92] tracking-[-0.045em] text-ink"
          >
            Johnson
            <br />
            Bolhayon
          </h1>

          <p data-hero className="tag mt-6 text-[0.8125rem] text-ink-2">
            Data specialist<span className="text-line-2"> / </span>Data automation<span className="text-line-2"> / </span>Webapp dev (AI-assisted)
          </p>

          <p data-hero className="mt-6 max-w-[46ch] text-xl leading-relaxed text-ink-2 sm:text-2xl">
            I turn repetitive, high-volume data work into{" "}
            <span className="font-semibold text-ink">systems teams rely on</span>.
          </p>

          <div data-hero className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="#flagship" icon="arrow-down">
              See the flagship
            </ButtonLink>
            <ButtonLink href={site.cvPath} download variant="outline" iconLeft="download">
              Download CV
            </ButtonLink>
          </div>

          <dl data-hero className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-6">
            {proof.map((p) => (
              <div key={p.l}>
                <dt className="t-data text-lg font-semibold tracking-[-0.01em] text-ink">{p.v}</dt>
                <dd className="tag mt-0.5">{p.l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>

      <a
        href="#flagship"
        aria-label="Scroll to the flagship section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-ink-muted transition-colors hover:text-accent sm:block"
      >
        <Icon name="arrow-down" size={22} className="pwx-nudge" />
      </a>
    </section>
  );
}
