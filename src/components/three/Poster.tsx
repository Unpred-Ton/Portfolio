/** Static fallback for the no-WebGL / reduced-data tier: a flat node constellation. */
export function Poster({ label }: { label: string }) {
  const nodes = [
    [660, 90], [780, 150], [840, 250], [720, 300], [600, 210], [880, 360],
    [700, 420], [820, 460], [560, 340], [900, 180], [640, 500], [780, 560],
  ];
  const links = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [2, 9], [3, 7], [5, 7], [4, 8],
    [8, 10], [6, 10], [7, 11], [6, 8], [1, 9], [5, 2],
  ];
  return (
    <div role="img" aria-label={label} className="pwx-drift absolute inset-0" style={{ animation: "pwx-drift 6s ease-in-out infinite alternate" }}>
      <svg viewBox="0 0 1000 640" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
        <g stroke="#003da5" strokeOpacity="0.2" strokeWidth="1">
          {links.map(([a, b], i) => (
            <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />
          ))}
        </g>
        <g fill="#1a56db" fillOpacity="0.8">
          {nodes.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3.5" />
          ))}
        </g>
      </svg>
    </div>
  );
}
