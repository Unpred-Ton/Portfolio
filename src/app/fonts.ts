import localFont from "next/font/local";

/** Dot-matrix display face for banner pages and job headers. */
export const banner = localFont({
  src: "./fonts/workbench.woff2",
  variable: "--font-banner",
  display: "swap",
  weight: "400",
});

/** The printer's own voice: report lines, figures, rulers. */
export const data = localFont({
  src: "./fonts/martian-mono.woff2",
  variable: "--font-data",
  display: "swap",
  weight: "100 800",
});

/** Reading copy: case-study prose. */
export const prose = localFont({
  src: [
    { path: "./fonts/schibsted-grotesk.woff2", weight: "400 900", style: "normal" },
    { path: "./fonts/schibsted-grotesk-italic.woff2", weight: "400 900", style: "italic" },
  ],
  variable: "--font-prose",
  display: "swap",
});
