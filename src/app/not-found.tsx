import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="min-h-screen flex flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-2xl font-semibold">Nothing punched here</h1>
      <p>That page does not exist.</p>
      <Link href="/">Back to the portfolio</Link>
    </main>
  );
}
