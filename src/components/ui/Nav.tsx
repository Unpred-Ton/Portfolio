"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { site } from "@content/site";
import { Icon } from "./Icon";

const items = [
  { id: "flagship", label: "Flagship" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    drawerRef.current?.querySelector<HTMLElement>("a,button")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300",
        scrolled || open
          ? "border-b border-line bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-[75rem] items-center justify-between px-5 sm:h-20 sm:px-8">
        <a
          href="#top"
          className="flex items-center gap-2.5 text-ink"
          aria-label={`${site.name} - back to top`}
        >
          <span className="grid h-9 w-9 place-items-center rounded-md bg-ink text-[0.8125rem] font-bold text-bg t-data">JB</span>
          <span className="hidden text-sm font-semibold tracking-[-0.01em] sm:inline">{site.name}</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {items.map((i) => (
            <a
              key={i.id}
              href={`#${i.id}`}
              aria-current={active === i.id ? "true" : undefined}
              className={cn(
                "relative rounded-md px-3.5 py-2 text-[0.9375rem] font-medium transition-colors duration-200",
                active === i.id ? "text-accent" : "text-ink-2 hover:text-ink",
              )}
            >
              {i.label}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-3.5 -bottom-px h-0.5 origin-left rounded-full bg-accent transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  active === i.id ? "scale-x-100" : "scale-x-0",
                )}
              />
            </a>
          ))}
          <a
            href={site.cvPath}
            download
            className="ml-3 inline-flex min-h-10 items-center gap-2 rounded-md border border-line-2 bg-surface px-4 text-[0.9375rem] font-semibold text-ink transition-colors duration-200 hover:border-ink hover:bg-surface-2"
          >
            <Icon name="download" size={16} />
            CV
          </a>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line-2 bg-surface text-ink lg:hidden"
        >
          <Icon name={open ? "close" : "menu"} size={22} label={open ? "Close menu" : "Open menu"} />
        </button>
      </nav>

      {open ? (
        <div
          id="mobile-nav"
          ref={drawerRef}
          className="pwx-drawer border-t border-line bg-bg px-5 pb-6 pt-2 lg:hidden"
        >
          <ul className="flex flex-col">
            {items.map((i) => (
              <li key={i.id}>
                <a
                  href={`#${i.id}`}
                  onClick={close}
                  aria-current={active === i.id ? "true" : undefined}
                  className={cn(
                    "flex items-center justify-between border-b border-line py-4 text-lg font-semibold",
                    active === i.id ? "text-accent" : "text-ink",
                  )}
                >
                  {i.label}
                  <Icon name="chevron-right" size={18} />
                </a>
              </li>
            ))}
          </ul>
          <a
            href={site.cvPath}
            download
            onClick={close}
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-accent px-5 text-base font-semibold text-white"
          >
            <Icon name="download" size={18} />
            Download CV
          </a>
        </div>
      ) : null}
    </header>
  );
}
