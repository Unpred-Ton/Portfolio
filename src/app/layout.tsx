import type { Metadata } from "next";
import { site } from "@content/site";
import { siteUrl } from "@/lib/env";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SkipLink } from "@/components/ui/SkipLink";
import { banner, data, prose } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: site.title, template: `%s - ${site.name}` },
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    url: "/",
    siteName: site.name,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name} - portfolio` }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, images: ["/og.png"] },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Data Automation Engineer and Web Application Developer",
  email: `mailto:${site.email}`,
  url: siteUrl(),
  sameAs: [site.linkedin, site.github],
};

/* The direction contract survives the production build as a real HTML comment (see DESIGN.md at finish). */
const DIRECTION_CONTRACT = `<!--
THESIS: The portfolio is one continuous-form report feeding out of a line printer; it refuses the dark hero, gradient glow and card grid the category ships and prints its evidence in ruled lines instead.
OWN-WORLD: Warm off-white paper barred pale green every three lines, perforated tractor strips on both edges, fan-fold page breaks with job and page counters, blue-black dot-matrix type (Workbench banners, Martian Mono data, Schibsted Grotesk prose), red ribbon only where something can be done.
STORY: A hiring manager watches the banner page print the name, reads the career as numbered jobs, sees the flagship as a totals block with provenance and verified guardrails, and tears off the CV.
FIRST VIEWPORT: A 3D line printer across the top with the fan-fold stack behind it; the banner page printing JOHNSON BOLHAYON in 5x7 character-matrix letters row by row; headline, one-liner and the red Tear-off-CV action beneath; the 132-column ruler at the foot.
FORM: The Green-Bar Printout, candidate 1 of 7 on the grounded list, chosen by the user as Impeccable's pick over the assigned roll; seed key 7f3a9c21.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${banner.variable} ${data.variable} ${prose.variable}`}>
      <body className="antialiased">
        <div hidden aria-hidden="true" dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }} />
        <SkipLink />
        <MotionProvider>{children}</MotionProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </body>
    </html>
  );
}
