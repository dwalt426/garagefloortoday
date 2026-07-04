import React from "react";
import { color, radius, motion, font, elevation, gradient } from "../../styles/tokens";

export interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "text" | "ghost-light";
  onClick?: () => void;
  href?: string;
  ariaLabel?: string;
  size?: "base" | "lg";
}

/** Sprint 11 button. Same API + one addition (ghost-light for dark hero
 *  contexts). One primary CTA per section, verb-phrase copy — unchanged rules.
 *  Feel: brushed-metal sheen pass on hover (gft-sheen), heritage-red glow lift
 *  on primary, gold focus ring — the only gold in interactive UI, a deliberate
 *  echo of the Seal's edge, spent on focus because focus deserves the crown.
 */
export function Button({ children, variant = "primary", onClick, href, ariaLabel, size = "base" }: ButtonProps) {
  const base: React.CSSProperties = {
    fontFamily: font.body,
    borderRadius: radius.sm,
    transition: `transform ${motion.fast} ${motion.easeStandard}, box-shadow ${motion.base} ${motion.easeStandard}, background-color ${motion.fast} ${motion.easeStandard}, color ${motion.fast} ${motion.easeStandard}`,
    fontWeight: 600,
    fontSize: size === "lg" ? "16px" : "14px",
    padding: size === "lg" ? "16px 32px" : "12px 24px",
    letterSpacing: "0.01em",
    cursor: "pointer",
    display: "inline-block",
    textDecoration: "none",
  };

  const variants: Record<NonNullable<ButtonProps["variant"]>, React.CSSProperties> = {
    primary: { ...base, background: gradient.redSheen, color: color.white, border: "none", boxShadow: elevation.rest },
    secondary: { ...base, backgroundColor: "transparent", color: color.black, border: `1px solid ${color.black}` },
    "ghost-light": { ...base, backgroundColor: "rgba(246,241,231,0.08)", color: color.cream, border: "1px solid rgba(246,241,231,0.35)", backdropFilter: "blur(8px)" },
    text: { ...base, backgroundColor: "transparent", color: color.red, border: "none", padding: "0" },
  };

  const hoverClass =
    variant === "primary"
      ? "gft-sheen hover:-translate-y-0.5 hover:[box-shadow:0_0_0_1px_rgba(158,27,27,0.25),0_8px_24px_rgba(158,27,27,0.28)]"
      : variant === "secondary"
      ? "gft-sheen hover:bg-black hover:text-white hover:-translate-y-0.5"
      : variant === "ghost-light"
      ? "gft-sheen hover:bg-[rgba(246,241,231,0.16)] hover:-translate-y-0.5"
      : "hover:underline underline-offset-4";

  const focusClass =
    variant === "text"
      ? "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B08D4F]"
      : "focus-visible:outline-none focus-visible:[box-shadow:0_0_0_2px_#F6F1E7,0_0_0_4px_#B08D4F]";

  const Tag = href ? "a" : "button";
  return (
    <Tag href={href} onClick={onClick} aria-label={ariaLabel} style={variants[variant]} className={`${hoverClass} ${focusClass}`}>
      {children}
    </Tag>
  );
}
