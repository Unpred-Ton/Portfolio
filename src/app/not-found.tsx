import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="grid min-h-screen place-items-center bg-bg px-6 text-center">
      <div>
        <p className="t-data text-[clamp(3.5rem,12vw,7rem)] font-extrabold leading-none tracking-[-0.04em] text-accent">404</p>
        <h1 className="mt-4 text-2xl font-bold tracking-[-0.02em] text-ink">This page does not exist</h1>
        <p className="mt-3 text-ink-2">The link may be broken, or the page may have moved.</p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-md bg-accent px-5 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-accent-2"
        >
          Back to the portfolio
        </Link>
      </div>
    </main>
  );
}
