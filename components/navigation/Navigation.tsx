"use client";

import React, { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { color, font, motion } from "../../styles/tokens";
import { Button } from "../buttons/Button";
import type { NavColumn } from "../../types";

export interface StickyHeaderProps {
  columns: NavColumn[];
  phone: string;
}

/** Wordmark only — never The Seal (Brand Bible §3).
 *  Frosted-glass over hero, solidifies on scroll (Phase 5 §10's single glass exception).
 */
export function StickyHeader({ columns, phone }: StickyHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 px-6 py-4 flex items-center justify-between"
      style={{
        fontFamily: font.body,
        transition: `background-color ${motion.base} ${motion.easeStandard}, box-shadow ${motion.base} ${motion.easeStandard}, backdrop-filter ${motion.base}`,
        backgroundColor: scrolled ? "rgba(246,241,231,0.82)" : "rgba(20,18,15,0.28)",
        backdropFilter: "blur(14px) saturate(140%)",
        WebkitBackdropFilter: "blur(14px) saturate(140%)",
        boxShadow: scrolled ? "0 1px 12px rgba(20,18,15,0.08)" : "none",
        borderBottom: scrolled ? "1px solid rgba(20,18,15,0.06)" : "1px solid rgba(246,241,231,0.10)",
      }}
    >
      <a href="/" className="flex items-baseline gap-1 no-underline" aria-label="GarageFloorToday home">
        <span className="text-lg font-extrabold tracking-tight" style={{ fontFamily: font.display, color: scrolled ? color.black : color.cream, transition: `color ${motion.base}` }}>
          GFT
        </span>
        <span className="text-sm font-semibold hidden sm:inline" style={{ color: scrolled ? color.gray700 : "rgba(246,241,231,0.75)", transition: `color ${motion.base}` }}>
          GarageFloorToday
        </span>
      </a>
      <nav className="hidden lg:flex gap-8" aria-label="Primary">
        {columns.map((col) => (
          <a key={col.title} href={col.links[0]?.href ?? "#"} className="text-sm font-medium no-underline hover:underline underline-offset-4" style={{ color: scrolled ? color.black : color.cream, transition: `color ${motion.base}` }}>
            {col.title}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <a href={`tel:${phone}`} className="hidden md:flex items-center gap-2 text-sm font-semibold no-underline" style={{ color: scrolled ? color.black : color.cream, transition: `color ${motion.base}` }}>
          <Phone size={14} aria-hidden /> {phone}
        </a>
        <Button variant="primary" href="/estimate">Get My Free Estimate</Button>
      </div>
    </header>
  );
}

export interface FooterProps { columns: NavColumn[]; }

export function Footer({ columns }: FooterProps) {
  return (
    <footer className="px-6 py-16" style={{ backgroundColor: color.charcoal, fontFamily: font.body }}>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <p className="text-lg font-extrabold mb-2" style={{ fontFamily: font.display, color: color.cream }}>
            GFT
          </p>
          <p className="text-xs leading-relaxed" style={{ color: color.gray500 }}>
            America's premium concrete coating company. Every floor documented, every install to
            The GarageFloorToday Standard™.
          </p>
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: color.gray500 }}>
              {col.title}
            </p>
            <ul className="space-y-2 list-none m-0 p-0">
              {col.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm no-underline hover:underline underline-offset-4" style={{ color: color.cream }}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
    </footer>
  );
}
