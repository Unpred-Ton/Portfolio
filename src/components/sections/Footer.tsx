import { site } from "@content/site";

export function Footer() {
  return (
    <footer>
      <p>
        {site.name} - built with Next.js, React Three Fiber and GSAP. Code is MIT; content is mine.
      </p>
    </footer>
  );
}
