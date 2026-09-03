/**
 * The platform's shape, drawn as printer geometry: boxes and ruled connectors, no picture-making.
 * Server component; pure SVG.
 */
const box = "fill-paper stroke-ink";
const label = "t-data fill-ink text-[11px]";
const sub = "t-data fill-ink-muted text-[9px]";

function Node({ x, y, w, h, title, sub: s }: { x: number; y: number; w: number; h: number; title: string; sub?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} className={box} strokeWidth={1.25} rx={2} />
      <text x={x + 10} y={y + 20} className={label} fontWeight={600}>
        {title}
      </text>
      {s ? (
        <text x={x + 10} y={y + 36} className={sub}>
          {s}
        </text>
      ) : null}
    </g>
  );
}

function Wire({ d, dashed }: { d: string; dashed?: boolean }) {
  return <path d={d} fill="none" className="stroke-ink" strokeWidth={1.25} strokeDasharray={dashed ? "4 4" : undefined} markerEnd="url(#arrow)" />;
}

export function ArchitectureDiagram() {
  return (
    <figure>
      <svg viewBox="0 0 800 330" className="w-full min-w-[640px] max-w-none" role="img" aria-labelledby="arch-title arch-desc">
        <title id="arch-title">Platform architecture</title>
        <desc id="arch-desc">
          Browser and NextAuth talk only to server API routes. Routes read Secret Manager, write Supabase Postgres under
          default-deny row-level security, log every write to the audit table, and call the external systems. Cloud
          Scheduler triggers the sync routes.
        </desc>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-ink" />
          </marker>
        </defs>

        <Node x={20} y={30} w={190} h={52} title="Browser" sub="Next.js App Router · SWR" />
        <Node x={20} y={130} w={190} h={52} title="NextAuth" sub="Google OAuth · JWT · approvals" />
        <Node x={20} y={230} w={190} h={52} title="Cloud Scheduler" sub="3x daily · every 30 min" />

        <Node x={300} y={120} w={200} h={72} title="Server API routes" sub="78 routes · Zod on writes" />

        <Node x={590} y={20} w={190} h={52} title="Supabase Postgres" sub="RLS default-deny" />
        <Node x={590} y={100} w={190} h={52} title="Secret Manager" sub="~150 store tokens" />
        <Node x={590} y={180} w={190} h={52} title="Audit log" sub="before/after JSON · undo" />
        <Node x={590} y={260} w={190} h={52} title="External systems" sub="Lightspeed · Google · Atlassian" />

        <Wire d="M210 56 H255 V140 H298" />
        <Wire d="M210 156 H298" />
        <Wire d="M210 256 H255 V172 H298" dashed />

        <Wire d="M500 140 H545 V46 H588" />
        <Wire d="M500 150 H545 V126 H588" />
        <Wire d="M500 165 H545 V206 H588" />
        <Wire d="M500 175 H545 V286 H588" />

        <text x={300} y={228} className={sub}>
          The browser never reaches the database. Every read and write is a server route.
        </text>
      </svg>
      <figcaption className="mt-2 text-[0.8125rem] leading-line text-ink-muted">
        Architecture as built. Cloud Run hosts the container; Cloud Build deploys it.
      </figcaption>
    </figure>
  );
}
