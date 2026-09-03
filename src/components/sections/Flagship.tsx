import { flagshipMetrics, securityLayers, integrations, tools } from "@content/flagship";
import { pwxToolTrackers } from "@content/case-studies/pwx-tool-trackers";
import { Section } from "./Section";

export function Flagship() {
  return (
    <Section id="flagship" title={pwxToolTrackers.title}>
      <p>{pwxToolTrackers.problem}</p>
      <p>{pwxToolTrackers.approach}</p>
      <p>{pwxToolTrackers.outcome}</p>
      <dl>
        {flagshipMetrics.map((m) => (
          <div key={m.label}>
            <dt>{m.label}</dt>
            <dd>{m.value}</dd>
          </div>
        ))}
      </dl>
      <h3>Security posture</h3>
      <ul>
        {securityLayers.map((s) => (
          <li key={s.id}>
            <strong>{s.title}</strong> {s.detail}
          </li>
        ))}
      </ul>
      <h3>Integrations</h3>
      <ul>
        {integrations.map((i) => (
          <li key={i.id}>
            <strong>{i.name}</strong> ({i.access}) {i.note}
          </li>
        ))}
      </ul>
      <h3>The tools</h3>
      <ul>
        {tools.map((t) => (
          <li key={t.id}>
            <strong>{t.name}</strong> replaces {t.replaces} {t.mechanism} {t.guardrail}
          </li>
        ))}
      </ul>
    </Section>
  );
}
