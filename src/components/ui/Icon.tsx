import type { SVGProps } from "react";

export type IconName =
  | "download"
  | "mail"
  | "external"
  | "linkedin"
  | "github"
  | "arrow-right"
  | "arrow-down"
  | "arrow-up-right"
  | "chevron-down"
  | "chevron-right"
  | "check"
  | "menu"
  | "close"
  | "plus"
  | "shield"
  | "location";

const PATHS: Record<IconName, React.ReactNode> = {
  download: (
    <>
      <path d="M12 4v11" />
      <path d="m7 11 5 5 5-5" />
      <path d="M4 20h16" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  external: (
    <>
      <path d="M14 4h6v6" />
      <path d="M20 4 10 14" />
      <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <path d="M8 10v7" />
      <path d="M8 7v.01" />
      <path d="M12 17v-4a2 2 0 0 1 4 0v4" />
      <path d="M12 10v7" />
    </>
  ),
  github: (
    <>
      <path d="M9 19c-4 1.5-4-2.5-6-3" />
      <path d="M15 21v-3.5a3 3 0 0 0-.8-2.3c2.7-.3 5.5-1.3 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.7 11.7 0 0 0-6 0C6.5 2.5 5.5 2.8 5.5 2.8a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.2c0 4.6 2.8 5.7 5.5 6a3 3 0 0 0-.8 2.3V21" />
    </>
  ),
  "arrow-right": (
    <>
      <path d="M4 12h16" />
      <path d="m14 6 6 6-6 6" />
    </>
  ),
  "arrow-down": (
    <>
      <path d="M12 4v16" />
      <path d="m6 14 6 6 6-6" />
    </>
  ),
  "arrow-up-right": (
    <>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </>
  ),
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  "chevron-right": <path d="m9 6 6 6-6 6" />,
  check: <path d="m5 12 5 5L20 7" />,
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  close: (
    <>
      <path d="M6 6 18 18" />
      <path d="M18 6 6 18" />
    </>
  ),
  plus: (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  location: (
    <>
      <path d="M12 21s-6-5.3-6-10a6 6 0 0 1 12 0c0 4.7-6 10-6 10Z" />
      <circle cx="12" cy="11" r="2" />
    </>
  ),
};

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
  label?: string;
}

/** One stroke weight, one grid. Decorative unless a label is given. */
export function Icon({ name, size = 18, label, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
      focusable="false"
      {...rest}
    >
      {PATHS[name]}
    </svg>
  );
}
