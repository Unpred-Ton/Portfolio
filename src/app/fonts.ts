import localFont from "next/font/local";

/** Primary voice: a clean, slightly characterful grotesk for display and reading copy. */
export const sans = localFont({
  src: [
    { path: "./fonts/schibsted-grotesk.woff2", weight: "400 900", style: "normal" },
    { path: "./fonts/schibsted-grotesk-italic.woff2", weight: "400 900", style: "italic" },
  ],
  variable: "--font-sans-src",
  display: "swap",
});

/** Data voice: labels, metrics, figures, the monogram - the engineer's register. */
export const mono = localFont({
  src: "./fonts/martian-mono.woff2",
  variable: "--font-mono-src",
  display: "swap",
  weight: "100 800",
});
