/** Static fallback for the no-WebGL / reduced-data tier: the printer's exit lip, drawn flat. */
export function Poster({ label }: { label: string }) {
  return (
    <div role="img" aria-label={label} className="pointer-events-none fixed inset-x-0 top-0 z-30 h-[6vh]">
      <svg viewBox="0 0 1000 80" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
        <rect x="0" y="0" width="1000" height="80" fill="#2a2f33" /><rect x="40" y="58" width="920" height="3" fill="#8e979c" />
        <rect x="0" y="0" width="1000" height="6" fill="#3a4147" />
        <rect x="50" y="66" width="900" height="4" fill="#0f1214" />
        <circle cx="30" cy="70" r="10" fill="#8e979c" />
        <circle cx="970" cy="70" r="10" fill="#8e979c" />
      </svg>
    </div>
  );
}
