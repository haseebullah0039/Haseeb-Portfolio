import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icon";
import { Magnetic } from "./Magnetic";

type Variant = "primary" | "secondary" | "outline" | "ghost";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "sm";
  arrow?: boolean;
  icon?: string;
  magnetic?: boolean;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
};

/** Link styled as a button. Internal routes use next/link. */
export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  icon,
  magnetic = false,
  external = false,
  className = "",
  ariaLabel,
}: ButtonProps) {
  const classes = `btn btn-${variant}${size === "sm" ? " btn-sm" : ""} ${className}`.trim();
  const content = (
    <>
      {icon && <Icon name={icon} size={18} />}
      <span>{children}</span>
      {arrow && <Icon name="arrowRight" size={18} className="btn-arrow" />}
    </>
  );

  const isInternal = href.startsWith("/") && !external;
  const el = isInternal ? (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {content}
    </Link>
  ) : (
    <a
      href={href}
      className={classes}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  );

  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
