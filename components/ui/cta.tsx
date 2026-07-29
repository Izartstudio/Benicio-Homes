import Link from "next/link";
import type {
  ButtonHTMLAttributes,
  ComponentProps,
  CSSProperties,
  ReactNode,
} from "react";
import { cn } from "@/utils/cn";
import styles from "./cta.module.css";

type CTABaseProps = {
  arrowClassName?: string;
  children: ReactNode;
  darkBackground?: string;
  lightBackground?: string;
  variant?: "dark" | "light";
};

type CTALinkProps = CTABaseProps &
  Omit<ComponentProps<typeof Link>, "children"> & {
    href: ComponentProps<typeof Link>["href"];
  };

type CTAButtonProps = CTABaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    href?: never;
  };

export type CTAProps = CTALinkProps | CTAButtonProps;

type CTAStyle = CSSProperties & {
  "--cta-dark-background"?: string;
  "--cta-light-background"?: string;
};

export function CTA({
  arrowClassName,
  children,
  className,
  darkBackground,
  lightBackground,
  style,
  variant = "dark",
  ...props
}: CTAProps) {
  const ctaStyle: CTAStyle = {
    ...style,
    ...(darkBackground
      ? { "--cta-dark-background": darkBackground }
      : undefined),
    ...(lightBackground
      ? { "--cta-light-background": lightBackground }
      : undefined),
  };
  const content = (
    <>
      {children}
      <span
        aria-hidden="true"
        className={cn(styles.arrow, arrowClassName)}
      >
        &rsaquo;
      </span>
    </>
  );
  const ctaClassName = cn(
    styles.root,
    variant === "light" ? styles.light : styles.dark,
    className,
  );

  if ("href" in props && props.href !== undefined) {
    return (
      <Link
        {...(props as Omit<CTALinkProps, keyof CTABaseProps>)}
        className={ctaClassName}
        style={ctaStyle}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      {...(props as Omit<CTAButtonProps, keyof CTABaseProps>)}
      className={ctaClassName}
      style={ctaStyle}
    >
      {content}
    </button>
  );
}
