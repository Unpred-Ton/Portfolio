import { site } from "@content/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-bg py-10">
      <Container className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-ink-muted">
          © {year} {site.name}. Built with Next.js, React Three Fiber and GSAP.
        </p>
        <p className="tag text-ink-muted">Code MIT / content mine</p>
      </Container>
    </footer>
  );
}
