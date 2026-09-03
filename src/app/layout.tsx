import type { Metadata } from "next";
import { site } from "@content/site";
import { siteUrl } from "@/lib/env";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SkipLink } from "@/components/ui/SkipLink";
import { sans, mono } from "./fonts";
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
THESIS: A hiring manager's 20-second scan of an engineer who makes repetitive data work disappear; a clean, navigable case file, not a novelty.
OWN-WORLD: Warm-paper light canvas, near-black Schibsted Grotesk with a Martian Mono data voice, one Action-Blue accent (#003DA5) borrowed from the flagship product, hairline rules and generous air; the product's own dark navy chrome quoted verbatim inside browser-window recreations - the only dark surfaces on the page.
STORY: a sticky, scroll-spy nav lets the reader jump straight to the flagship, explore its tools screen by screen, read the nine-year arc from Excel VBA to a full-stack (AI-assisted) platform, then reach the contact block.
FIRST VIEWPORT: name and role in large grotesk, a one-line thesis, two actions (see the flagship / download CV), a live availability pill and a three-figure proof strip, with a subtle 3D node-mesh of the platform's integrations drifting behind on the right.
FORM: elevated clean professional portfolio, single page with anchored sections and a mobile drawer; light-committed, dark recreations by contrast. Chosen by the user over the earlier Green-Bar Printout, referencing a base44 layout as the pinned brief.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md.
-->`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <div hidden aria-hidden="true" dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }} />
        <SkipLink />
        <MotionProvider>{children}</MotionProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </body>
    </html>
  );
}
