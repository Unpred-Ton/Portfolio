/** The line printer's column ruler: ----+----1----+----2 ... to column 132. */
export function ColumnRuler({ columns = 132 }: { columns?: number }) {
  let s = "";
  for (let c = 1; c <= columns; c++) {
    if (c % 10 === 0) s += String((c / 10) % 10);
    else if (c % 5 === 0) s += "+";
    else s += "-";
  }
  return (
    <p aria-hidden="true" className="t-data overflow-hidden whitespace-nowrap text-[11px] leading-line text-ink-muted/80">
      {s}
    </p>
  );
}
