/** Phase 5 design tokens — the single source of truth.
 *  Mirrors the CSS custom properties in globals.css; import from TS when
 *  a token is needed in JS (charts, canvas, inline SVG). Never hardcode hex
 *  values in components.
 */
export const color = {
  black: "#14120F",
  charcoal: "#2A2724",
  cream: "#F6F1E7",
  white: "#FFFFFF",
  /** GFT Heritage Red™ — CTAs and key callouts only */
  red: "#9E1B1B",
  redDark: "#7A1414",
  /** Reserved exclusively for FloorPassport™ / certification UI */
  gold: "#B08D4F",
  gray100: "#F5F5F4",
  gray300: "#D6D3CF",
  gray500: "#8C877E",
  gray700: "#4A463F",
  gray900: "#1C1B1A",
  success: "#2F6B3A",
  warning: "#B4741A",
  error: "#B4291A",
} as const;

export const space = {
  1: "4px", 2: "8px", 3: "12px", 4: "16px", 5: "24px",
  6: "32px", 7: "48px", 8: "64px", 9: "96px", 10: "128px",
} as const;

export const radius = {
  sm: "4px",  // buttons, inputs, pills-adjacent precision
  lg: "16px", // cards, images, modals
} as const;

/** Sprint 11 motion timing system — the one clock every animation obeys.
 *  Rules: GPU properties only (transform/opacity). Nothing bounces. Reveals
 *  are slow and confident; feedback is instant. All motion collapses to none
 *  under prefers-reduced-motion (enforced globally in globals.css).
 */
export const motion = {
  easeStandard: "cubic-bezier(0.2, 0.8, 0.2, 1)",   // UI feedback
  easeCinematic: "cubic-bezier(0.16, 1, 0.3, 1)",   // reveals, hero, imagery
  easeExit: "cubic-bezier(0.7, 0, 0.84, 0)",        // departures
  instant: "100ms",  // hover feedback
  fast: "150ms",     // buttons, toggles
  base: "300ms",     // cards, dropdowns
  slow: "600ms",     // section reveals
  cinematic: "900ms", // hero, imagery, page transitions
  stagger: 80,        // ms between siblings in a reveal group
} as const;

/** Elevation — layered shadow system. Warm-tinted (never pure black shadows on
 *  cream) so depth feels like studio lighting, not CSS. */
export const elevation = {
  rest:  "0 1px 2px rgba(20,18,15,0.06), 0 1px 3px rgba(20,18,15,0.08)",
  lift:  "0 4px 12px rgba(20,18,15,0.10), 0 2px 4px rgba(20,18,15,0.06)",
  float: "0 12px 32px rgba(20,18,15,0.14), 0 4px 8px rgba(20,18,15,0.06)",
  glowRed: "0 0 0 1px rgba(158,27,27,0.25), 0 8px 24px rgba(158,27,27,0.28)",
  glowGold: "0 0 0 1px rgba(176,141,79,0.35), 0 8px 32px rgba(176,141,79,0.22)",
} as const;

/** Cinematic gradients — the lighting rig. Derived from the Seal: deep black
 *  fields, warm cream light, heritage-red undertones, brushed-gold edges. */
export const gradient = {
  heroVignette: "radial-gradient(120% 90% at 70% 40%, transparent 0%, rgba(10,9,7,0.55) 70%, rgba(10,9,7,0.92) 100%)",
  blackDepth: "linear-gradient(175deg, #1C1B1A 0%, #14120F 55%, #0C0B09 100%)",
  creamLight: "linear-gradient(180deg, #FBF8F1 0%, #F6F1E7 100%)",
  redSheen: "linear-gradient(135deg, #B02222 0%, #9E1B1B 45%, #7A1414 100%)",
  goldEdge: "linear-gradient(90deg, transparent, rgba(176,141,79,0.65), transparent)",
  floorReflection: "linear-gradient(to top, rgba(246,241,231,0.06), transparent 40%)",
} as const;

export const font = {
  display: "'Archivo', ui-sans-serif, system-ui", // production: Söhne / General Sans
  body: "'Inter', ui-sans-serif, system-ui",      // production: Inter / Neue Haas
} as const;
