/**
 * The banner page. Line printers separated jobs with a page whose letters were built from
 * characters - a 5x7 dot matrix printed one row at a time. Same here.
 */
const GLYPHS: Record<string, string[]> = {
  A: [" ### ", "#   #", "#   #", "#####", "#   #", "#   #", "#   #"],
  B: ["#### ", "#   #", "#   #", "#### ", "#   #", "#   #", "#### "],
  C: [" ####", "#    ", "#    ", "#    ", "#    ", "#    ", " ####"],
  D: ["#### ", "#   #", "#   #", "#   #", "#   #", "#   #", "#### "],
  E: ["#####", "#    ", "#    ", "#### ", "#    ", "#    ", "#####"],
  H: ["#   #", "#   #", "#   #", "#####", "#   #", "#   #", "#   #"],
  I: ["#####", "  #  ", "  #  ", "  #  ", "  #  ", "  #  ", "#####"],
  J: ["  ###", "   # ", "   # ", "   # ", "   # ", "#  # ", " ##  "],
  L: ["#    ", "#    ", "#    ", "#    ", "#    ", "#    ", "#####"],
  N: ["#   #", "##  #", "# # #", "#  ##", "#   #", "#   #", "#   #"],
  O: [" ### ", "#   #", "#   #", "#   #", "#   #", "#   #", " ### "],
  R: ["#### ", "#   #", "#   #", "#### ", "# #  ", "#  # ", "#   #"],
  S: [" ####", "#    ", "#    ", " ### ", "    #", "    #", "#### "],
  T: ["#####", "  #  ", "  #  ", "  #  ", "  #  ", "  #  ", "  #  "],
  Y: ["#   #", "#   #", " # # ", "  #  ", "  #  ", "  #  ", "  #  "],
  " ": ["     ", "     ", "     ", "     ", "     ", "     ", "     "],
};

const ROWS = 7;
const COLS = 5;

export function BannerName({ word, className }: { word: string; className?: string }) {
  const letters = word.toUpperCase().split("").map((ch) => GLYPHS[ch] ?? GLYPHS[" "]);
  const totalCols = letters.length * (COLS + 1) - 1;

  return (
    <div className={className} aria-hidden="true">
      {Array.from({ length: ROWS }, (_, r) => (
        <div
          key={r}
          className="print-row grid gap-[0.06em]"
          style={{ gridTemplateColumns: `repeat(${totalCols}, minmax(0, 1fr))` }}
        >
          {letters.map((glyph, li) => (
            <Letter key={li} row={glyph[r]} glyphIndex={li} rowIndex={r} withGap={li < letters.length - 1} />
          ))}
        </div>
      ))}
    </div>
  );
}

function Letter({ row, glyphIndex, rowIndex, withGap }: { row: string; glyphIndex: number; rowIndex: number; withGap: boolean }) {
  const cells = row.split("").map((c, i) => (
    <span key={`${glyphIndex}-${rowIndex}-${i}`} className="banner-cell" data-on={c === "#" ? "1" : "0"} />
  ));
  if (withGap) cells.push(<span key={`${glyphIndex}-${rowIndex}-gap`} className="banner-cell" data-on="0" />);
  return <>{cells}</>;
}
