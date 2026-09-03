import Link from "next/link";
import { Icon, type IconName } from "./Icon";

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  icon?: IconName;
  variant?: "ribbon" | "ink";
  download?: boolean;
  external?: boolean;
  className?: string;
}

const base =
  "inline-flex min-h-11 items-center gap-2 rounded-[2px] px-4 text-sm font-semibold uppercase tracking-[0.04em] transition-[background-color,transform] duration-150 ease-out-expo active:scale-[0.98] t-data";

const variants = {
  ribbon: "bg-ribbon text-paper hover:bg-ribbon-hover",
  ink: "border border-ink text-ink hover:bg-ink hover:text-paper",
};

/** Red ribbon is reserved for actions. Nothing else on the paper is red. */
export function ButtonLink({ href, children, icon, variant = "ink", download, external, className }: ButtonLinkProps) {
  const cls = `${base} ${variants[variant]} ${className ?? ""}`;
  const inner = (
    <>
      {children}
      {icon ? <Icon name={icon} size={16} /> : null}
    </>
  );
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noreferrer">
        {inner}
      </a>
    );
  }
  if (download || href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls} download={download}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
