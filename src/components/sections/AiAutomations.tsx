import { aiFeatures, aiGuardrails, aiMetrics, aiVideo, replyPipeline } from "@content/ai";
import { Section } from "./Section";
import { Reveal } from "@/components/motion/Reveal";
import { Readout } from "@/components/motion/Readout";
import { Icon } from "@/components/ui/Icon";
import { ReplyAssistantRecreation } from "@/components/recreations/ReplyAssistantRecreation";

const headline = aiFeatures.find((f) => f.headline);
const assists = aiFeatures.filter((f) => !f.headline);

const featureEmoji: Record<string, string> = {
  "apl-mapping": "🔗",
  "category-fix": "🗂️",
  "ai-summary": "📝",
  "ask-gemini": "💬",
};

export function AiAutomations() {
  return (
    <Section
      id="ai"
      index="02 / AI automations"
      bg="surface-2"
      heading="Gemini agents inside the platform"
      lead="Five Gemini features run in production on the flagship, from an autonomous support agent to assists inside the tools. The rule for all of them: Gemini suggests, a person approves, and every call is audited and quota-guarded."
    >
      {/* Metrics band */}
      <Reveal stagger className="mb-20 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line md:grid-cols-4">
        {aiMetrics.map((m) => (
          <div key={m.label} className="bg-surface p-5 sm:p-6">
            <Readout value={m.value} className="t-data block text-[1.9rem] font-bold tracking-[-0.02em] text-accent sm:text-[2.25rem]" />
            <p className="mt-1 text-sm font-medium text-ink">{m.label}</p>
            {m.note ? <p className="mt-0.5 text-[0.8125rem] leading-snug text-ink-muted">{m.note}</p> : null}
          </div>
        ))}
      </Reveal>

      {/* Narrated walkthrough */}
      <div className="mb-20 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
        <Reveal>
          <figure className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface p-2 sm:p-3">
            <video
              controls
              preload="none"
              playsInline
              poster={aiVideo.poster}
              width={aiVideo.width}
              height={aiVideo.height}
              className="w-full rounded-lg border border-line-2 bg-black"
              aria-label={`Narrated walkthrough of the Gemini features, ${aiVideo.duration}`}
            >
              <source src={aiVideo.src} type="video/mp4" />
            </video>
            <figcaption className="tag mt-3 px-1 text-ink-muted">Narrated, {aiVideo.duration}. First minute: the short version. The rest: how it works.</figcaption>
          </figure>
        </Reveal>
        <Reveal>
          <h3 className="text-2xl font-bold tracking-[-0.02em] text-ink">Watch the short version first</h3>
          <p className="mt-3 leading-relaxed text-ink-2">{aiVideo.caption}</p>
        </Reveal>
      </div>

      {/* Headline: the Reply Assistant */}
      {headline ? (
        <div className="mb-20">
          <Reveal className="mb-8 max-w-[64ch]">
            <p className="tag mb-3 text-accent">Headline feature</p>
            <h3 className="text-2xl font-bold tracking-[-0.02em] text-ink">
              {headline.name}: an agent that answers franchise tickets
            </h3>
            <p className="mt-3 text-ink-2">
              Replaces {headline.replaces.charAt(0).toLowerCase() + headline.replaces.slice(1)}
            </p>
          </Reveal>

          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <Reveal className="space-y-6">
              <div>
                <p className="tag mb-2">How it works</p>
                <p className="leading-relaxed text-ink-2">{headline.mechanism}</p>
              </div>
              <div>
                <p className="tag mb-2">What keeps it honest</p>
                <p className="leading-relaxed text-ink-2">{headline.guardrail}</p>
              </div>
              <div>
                <p className="tag mb-2">Evaluated, not vibes-checked</p>
                <p className="leading-relaxed text-ink-2">
                  A replay harness re-runs real historical tickets through the agent and grades every draft with Gemini as the judge, so a prompt change is measured before it ships. Reordering the prompt for Gemini&apos;s implicit cache lifted the cached share of input tokens from about 10% to about 50%, which is why a ticket costs around two US cents to answer.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <ReplyAssistantRecreation />
            </Reveal>
          </div>
        </div>
      ) : null}

      {/* Pipeline */}
      <div className="mb-20">
        <Reveal className="mb-8 max-w-[60ch]">
          <h3 className="text-2xl font-bold tracking-[-0.02em] text-ink">How one reply flows</h3>
          <p className="mt-3 text-ink-2">Six steps from a franchise hitting reply to the team learning from its own answer.</p>
        </Reveal>
        <Reveal stagger as="ol" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {replyPipeline.map((s, i) => (
            <li key={s.id} className="relative rounded-[var(--radius-card)] border border-line bg-surface p-5">
              <div className="flex items-center gap-3">
                <span className="t-data grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-[0.8125rem] font-bold text-white">
                  {i + 1}
                </span>
                <p className="font-semibold text-ink">{s.label}</p>
                {i < replyPipeline.length - 1 ? (
                  <Icon name="arrow-right" size={16} className="ml-auto text-ink-muted" />
                ) : null}
              </div>
              <p className="mt-3 text-[0.9375rem] leading-snug text-ink-2">{s.detail}</p>
            </li>
          ))}
        </Reveal>
      </div>

      {/* The other four */}
      <div className="mb-20">
        <Reveal className="mb-8 max-w-[60ch]">
          <h3 className="text-2xl font-bold tracking-[-0.02em] text-ink">Four more Gemini assists</h3>
          <p className="mt-3 text-ink-2">
            Each one takes over a specific manual judgement inside an existing tool, and each one carries its own validation rule.
          </p>
        </Reveal>
        <Reveal stagger className="grid gap-5 md:grid-cols-2">
          {assists.map((f) => (
            <article key={f.id} className="flex flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6">
              <p className="flex items-center gap-2 text-lg font-bold tracking-[-0.01em] text-ink">
                <span aria-hidden className="text-base leading-none">{featureEmoji[f.id]}</span>
                {f.name}
              </p>
              <p className="mt-0.5 text-[0.8125rem] text-ink-muted">{f.where}</p>
              <p className="mt-4 text-[0.9375rem] leading-snug text-ink-2">
                <span className="font-semibold text-ink">Replaces</span> {f.replaces.charAt(0).toLowerCase() + f.replaces.slice(1)}
              </p>
              <p className="mt-3 text-[0.9375rem] leading-snug text-ink-2">{f.mechanism}</p>
              <p className="mt-3 flex gap-2 text-[0.9375rem] leading-snug text-ink-2">
                <Icon name="shield" size={16} className="mt-0.5 shrink-0 text-accent" />
                <span>{f.guardrail}</span>
              </p>
            </article>
          ))}
        </Reveal>
      </div>

      {/* Shared guardrails */}
      <div>
        <Reveal className="mb-6 max-w-[60ch]">
          <h3 className="text-2xl font-bold tracking-[-0.02em] text-ink">Shared guardrails</h3>
          <p className="mt-3 text-ink-2">The patterns every Gemini feature on the platform follows.</p>
        </Reveal>
        <Reveal stagger as="ul" className="grid gap-x-12 gap-y-5 md:grid-cols-2">
          {aiGuardrails.map((l) => (
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
    </Section>
  );
}
