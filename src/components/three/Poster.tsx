/** Static fallback for the no-WebGL / reduced-data tier. Same box as the canvas. */
export function Poster({ label }: { label: string }) {
  return (
    <div role="img" aria-label={label} className="pointer-events-none fixed inset-0 -z-10">
      {/* Poster images are captured from the real scene's resting phase once the direction is built. */}
    </div>
  );
}
