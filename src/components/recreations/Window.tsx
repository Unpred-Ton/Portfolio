/**
 * Frame for the stylised recreations of the platform's screens. Deliberately in the product's own
 * visual world (dark, data-dense, one commanding blue), not the paper's. All data inside is synthetic.
 */
export function Window({ title, caption, children }: { title: string; caption: string; children: React.ReactNode }) {
  return (
    <figure className="min-w-0">
      <div
        aria-hidden="true"
        className="overflow-hidden rounded-[10px] bg-[#0f172a] text-[#e2e8f0] shadow-[0_18px_40px_-20px_rgba(27,39,51,0.45)] ring-1 ring-[#1e293b]"
      >
        <div className="flex items-center justify-between border-b border-[#1e293b] bg-[#0a2540] px-3 py-2 text-[11px] font-medium tracking-[0.02em] text-[#cbd5e1]">
          <span className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-[#003da5]" />
            {title}
          </span>
          <span className="text-[#94a3b8]">synthetic data</span>
        </div>
        <div className="overflow-x-hidden p-3 text-[12px] leading-[1.35]">{children}</div>
      </div>
      <figcaption className="mt-2 max-w-[60ch] text-[0.8125rem] leading-line text-ink-muted">{caption}</figcaption>
    </figure>
  );
}

export const ui = {
  th: "text-left text-[10px] font-semibold uppercase tracking-[0.06em] text-[#94a3b8] py-1.5 px-2 bg-[#0d3b6e] text-white first:rounded-l-[4px] last:rounded-r-[4px]",
  td: "py-1.5 px-2 border-b border-[#1e293b] align-top",
  pill: "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
  btn: "inline-flex items-center rounded-[4px] bg-[#003da5] px-2 py-1 text-[11px] font-semibold text-white",
} as const;
