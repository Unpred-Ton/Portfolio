/**
 * The platform's shape as a clean node-and-connector diagram (geometry, not picture-making).
 * Server component; pure SVG. The Server API routes hub is accented as the single point every
 * read and write passes through.
 */
function Node({
  x,
  y,
  w,
  h,
  title,
  sub,
  accent,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        className={accent ? "fill-accent-soft stroke-accent" : "fill-paper stroke-ink"}
        strokeWidth={accent ? 1.75 : 1.25}
        rx={4}
      />
      <text x={x + 12} y={y + 22} className={`t-data text-[11px] ${accent ? "fill-accent-ink" : "fill-ink"}`} fontWeight={600}>
        {title}
      </text>
      {sub ? (
        <text x={x + 12} y={y + 38} className="t-data fill-ink-muted text-[9px]">
          {sub}
        </text>
      ) : null}
    </g>
  );
}

function Wire({ d, dashed }: { d: string; dashed?: boolean }) {
  return (
    <path
      d={d}
      fill="none"
      className="stroke-ink-muted"
      strokeWidth={1.25}
      strokeDasharray={dashed ? "4 4" : undefined}
      markerEnd="url(#arrow)"
    />
  );
}

export function ArchitectureDiagram() {
  return (
    <figure>
      <svg viewBox="0 0 800 340" className="w-full min-w-[640px] max-w-none" role="img" aria-labelledby="arch-title arch-desc">
        <title id="arch-title">Platform architecture</title>
        <desc id="arch-desc">
          Browser and NextAuth talk only to server API routes. Routes read Secret Manager, write Supabase Postgres under
          default-deny row-level security, log every write to the audit table, and call the external systems. Cloud
          Scheduler triggers the sync routes.
        </desc>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-ink-muted" />
          </marker>
        </defs>

        <Node x={20} y={34} w={190} h={54} title="Browser" sub="Next.js App Router · SWR" />
        <Node x={20} y={138} w={190} h={54} title="NextAuth" sub="Google OAuth · JWT · approvals" />
        <Node x={20} y={242} w={190} h={54} title="Cloud Scheduler" sub="3x daily · every 30 min" />

        <Node x={300} y={128} w={200} h={74} title="Server API routes" sub="78 routes · Zod on writes" accent />

        <Node x={590} y={24} w={190} h={54} title="Supabase Postgres" sub="RLS default-deny" />
        <Node x={590} y={104} w={190} h={54} title="Secret Manager" sub="~150 store tokens" />
        <Node x={590} y={184} w={190} h={54} title="Audit log" sub="before/after JSON · undo" />
        <Node x={590} y={264} w={190} h={54} title="External systems" sub="Lightspeed · Google · Atlassian" />

        <Wire d="M210 61 H255 V150 H298" />
        <Wire d="M210 165 H298" />
        <Wire d="M210 269 H255 V180 H298" dashed />

        <Wire d="M500 150 H545 V51 H588" />
        <Wire d="M500 160 H545 V131 H588" />
        <Wire d="M500 172 H545 V211 H588" />
        <Wire d="M500 182 H545 V291 H588" />
      </svg>
      <figcaption className="mt-4 text-[0.8125rem] leading-line text-ink-muted">
        Architecture as built. The browser never reaches the database - every read and write is a Zod-validated server route.
        Cloud Run hosts the container; Cloud Build deploys it.
      </figcaption>
    </figure>
  );
}
