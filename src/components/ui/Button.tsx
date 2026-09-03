import Link from "next/link";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "outline" | "ghost";

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  icon?: IconName;
  iconLeft?: IconName;
  variant?: Variant;
  download?: boolean;
  external?: boolean;
  className?: string;
}

const base =
  "group inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 text-[0.9375rem] font-semibold tracking-[-0.01em] transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] focus-visible:outline-offset-2";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white shadow-[0_1px_2px_rgba(0,61,165,0.25),0_8px_24px_-12px_rgba(0,61,165,0.55)] hover:bg-accent-2 hover:shadow-[0_2px_4px_rgba(0,61,165,0.3),0_14px_30px_-14px_rgba(0,61,165,0.6)]",
  outline: "border border-line-2 bg-surface text-ink hover:border-ink hover:bg-surface-2",
  ghost: "px-2 text-ink-2 hover:text-accent",
};

export function ButtonLink({
  href,
  children,
  icon,
  iconLeft,
  variant = "primary",
  download,
  external,
  className,
}: ButtonLinkProps) {
  const cls = cn(base, variants[variant], className);
  const animatedArrow = icon === "arrow-right";
  const inner = (
    <>
      {iconLeft ? <Icon name={iconLeft} size={17} /> : null}
      {children}
      {icon ? (
        <Icon
          name={icon}
          size={17}
          className={animatedArrow ? "transition-transform duration-200 group-hover:translate-x-0.5" : undefined}
        />
      ) : null}
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
