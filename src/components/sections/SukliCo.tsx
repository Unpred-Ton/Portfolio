import Image from "next/image";
import { caseStudyById } from "@content/case-studies";
import {
  suklicoEngineering,
  suklicoFeatures,
  suklicoMarketing,
  suklicoMeta,
  suklicoMetrics,
  suklicoShots,
  suklicoStack,
  suklicoStatus,
} from "@content/suklico";
import { Section } from "./Section";
import { Reveal } from "@/components/motion/Reveal";
import { Readout } from "@/components/motion/Readout";
import { Icon } from "@/components/ui/Icon";
import { ScreenshotMatrix } from "@/components/recreations/ScreenshotMatrix";

const cs = caseStudyById("suklico-pos");

const featureEmoji: Record<string, string> = {
  sell: "🛒",
  pay: "📱",
  utang: "📒",
  loyalty: "⭐",
  shifts: "🔐",
  stock: "📦",
  reports: "📈",
  customers: "👤",
  console: "🖥️",
  print: "🧾",
};

export function SukliCo() {
  return (
    <Section id="suklico" index="03 / SukliCo POS" bg="surface" heading="SukliCo POS" lead={cs?.problem}>
      {/* Meta line */}
      <Reveal className="-mt-6 mb-10 flex flex-wrap items-center gap-x-3 gap-y-2">
        {suklicoMeta.map((m, i) => (
          <span key={m} className="flex items-center gap-3">
            {i > 0 ? <span aria-hidden className="h-1 w-1 rounded-full bg-line-2" /> : null}
            <span className="tag text-ink-2">{m}</span>
          </span>
        ))}
      </Reveal>

      {/* Cover */}
      <Reveal className="mb-14">
        <figure className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface-2 p-2 sm:p-3">
          <Image
            src="/media/suklico/cover.webp"
            width={1640}
            height={624}
            alt="SukliCo POS brand artwork: a wallet with peso coins beside the logo and the line 'Sales, stock, credit and loyalty points - even offline'."
            className="w-full rounded-lg border border-line-2"
            sizes="(min-width: 1024px) 900px, 100vw"
          />
          <figcaption className="tag mt-3 px-1 text-ink-muted">
            An Android point of sale for sari-sari and small grocery stores in the Philippines. Own brand, own code, own marketing.
          </figcaption>
        </figure>
      </Reveal>

      {/* What it is */}
      <Reveal className="mb-14 grid gap-x-14 gap-y-6 lg:grid-cols-2">
        <p className="text-lg leading-relaxed text-ink-2">{cs?.approach}</p>
        <div>
          <p className="text-lg leading-relaxed text-ink-2">{cs?.outcome}</p>
          <p className="mt-4 flex items-start gap-2 text-[0.9375rem] leading-snug text-ink-muted">
            <Icon name="check" size={16} className="mt-0.5 shrink-0 text-good" />
            <span>{suklicoStatus}</span>
          </p>
        </div>
      </Reveal>

      {/* Metrics band */}
      <Reveal stagger className="mb-20 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line md:grid-cols-4">
        {suklicoMetrics.map((m) => (
          <div key={m.label} className="bg-surface p-5 sm:p-6">
            <Readout value={m.value} className="t-data block text-[1.9rem] font-bold tracking-[-0.02em] text-accent sm:text-[2.25rem]" />
            <p className="mt-1 text-sm font-medium text-ink">{m.label}</p>
            {m.note ? <p className="mt-0.5 text-[0.8125rem] leading-snug text-ink-muted">{m.note}</p> : null}
          </div>
        ))}
      </Reveal>

      {/* Features */}
      <div className="mb-20">
        <Reveal className="mb-8 max-w-[60ch]">
          <h3 className="text-2xl font-bold tracking-[-0.02em] text-ink">What a store gets</h3>
          <p className="mt-3 text-ink-2">
            Built for the way small stores really sell: no signal for much of the day, one phone shared by the family, tingi units, and customers who pay later.
          </p>
        </Reveal>
        <Reveal stagger as="ul" className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {suklicoFeatures.map((f) => (
            <li key={f.id}>
              <p className="flex items-center gap-2 font-semibold text-ink">
                <span aria-hidden className="text-base leading-none">{featureEmoji[f.id]}</span>
                {f.name}
              </p>
              <p className="mt-1 text-[0.9375rem] leading-snug text-ink-2">{f.detail}</p>
            </li>
          ))}
        </Reveal>
      </div>

      {/* Engineering + stack */}
      <div className="mb-20 grid gap-14 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <Reveal className="mb-6">
            <h3 className="text-2xl font-bold tracking-[-0.02em] text-ink">How it is engineered</h3>
            <p className="mt-3 text-ink-2">Offline-first, append-only, multi-tenant, and tested at the database.</p>
          </Reveal>
          <Reveal stagger as="ul" className="space-y-5">
            {suklicoEngineering.map((l) => (
              <li key={l.id} className="flex gap-3.5">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                  <Icon name="shield" size={16} />
                </span>
                <div>
                  <p className="font-semibold text-ink">{l.title}</p>
                  <p className="mt-1 text-[0.9375rem] leading-snug text-ink-2">{l.detail}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
        <div>
          <Reveal className="mb-6">
            <h3 className="text-2xl font-bold tracking-[-0.02em] text-ink">Stack</h3>
            <p className="mt-3 text-ink-2">One codebase for the app, the database, the Edge Functions and the two web front ends.</p>
          </Reveal>
          <Reveal className="flex flex-wrap gap-2">
            {suklicoStack.map((s) => (
              <span key={s} className="t-data rounded-md border border-line bg-surface-2 px-2 py-1 text-[0.75rem] text-ink-2">
                {s}
              </span>
            ))}
          </Reveal>
          <Reveal className="mt-8 rounded-[var(--radius-card)] border border-line bg-surface-2 p-5">
            <p className="font-semibold text-ink">Private repository</p>
            <p className="mt-1 text-[0.9375rem] leading-snug text-ink-2">
              The source is not public while the product is in testing. Code walkthroughs are available on request.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Gemini illustrations */}
      <div className="mb-20">
        <Reveal className="mb-8 max-w-[64ch]">
          <h3 className="text-2xl font-bold tracking-[-0.02em] text-ink">Illustrated with Gemini</h3>
          <p className="mt-3 text-ink-2">
            Every scene of the explainer is a Gemini 2.5 Flash Image generation from one mascot reference sheet. The pictures carry no text; captions and logos are drawn in Remotion. Click any to enlarge.
          </p>
        </Reveal>
        <Reveal>
          <ScreenshotMatrix shots={suklicoShots} period="Oct 2026" noun="scene" width={1344} height={768} cols={3} sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw" />
        </Reveal>
      </div>

      {/* Marketing */}
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <Reveal>
          <figure className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface-2 p-2 sm:p-3">
            <video
              controls
              preload="none"
              playsInline
              poster={suklicoMarketing.video.poster}
              width={suklicoMarketing.video.width}
              height={suklicoMarketing.video.height}
              className="w-full rounded-lg border border-line-2 bg-black"
              aria-label="SukliCo POS explainer video, 34 seconds, Taglish voiceover"
            >
              <source src={suklicoMarketing.video.src} type="video/mp4" />
            </video>
            <figcaption className="tag mt-3 px-1 text-ink-muted">
              The {suklicoMarketing.video.duration} Facebook explainer: Gemini illustrations, Gemini-TTS voiceover, composed in Remotion.
            </figcaption>
          </figure>
        </Reveal>
        <Reveal className="space-y-4">
          <h3 className="text-2xl font-bold tracking-[-0.02em] text-ink">{suklicoMarketing.heading}</h3>
          {suklicoMarketing.body.map((p) => (
            <p key={p.slice(0, 24)} className="leading-relaxed text-ink-2">
              {p}
            </p>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
