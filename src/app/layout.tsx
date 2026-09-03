import type { Metadata } from "next";
import { site } from "@content/site";
import { siteUrl } from "@/lib/env";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SkipLink } from "@/components/ui/SkipLink";
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* DIRECTION CONTRACT: written once the visual world is chosen (impeccable new-work, section 5). */}
        <SkipLink />
        <MotionProvider>{children}</MotionProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </body>
    </html>
  );
}
