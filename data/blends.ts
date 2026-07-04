/** Blend catalog — mirrors the `blends` table. Swatch images pending real
 *  product photography per The Lens; css gradient stands in until then and is
 *  replaced by swatch_photo_url at CMS integration.
 */
export interface Blend { id: string; name: string; family: "Earth" | "Modern" | "Classic"; css: string; }

export const blends: Blend[] = [
  { id: "granite-ridge", name: "Granite Ridge", family: "Earth", css: "radial-gradient(circle at 30% 30%, #8a7d6b 2px, transparent 2px), radial-gradient(circle at 70% 60%, #4a463f 2px, transparent 2px), radial-gradient(circle at 50% 80%, #d6d3cf 2px, transparent 2px), #6b6257" },
  { id: "carbon-fleck", name: "Carbon Fleck", family: "Modern", css: "radial-gradient(circle at 25% 40%, #555 2px, transparent 2px), radial-gradient(circle at 65% 25%, #999 2px, transparent 2px), radial-gradient(circle at 80% 70%, #222 2px, transparent 2px), #3a3a3a" },
  { id: "quarry-slate", name: "Quarry Slate", family: "Earth", css: "radial-gradient(circle at 35% 55%, #7d8896 2px, transparent 2px), radial-gradient(circle at 70% 30%, #4a5560 2px, transparent 2px), #5d6874" },
  { id: "nightfall", name: "Nightfall", family: "Modern", css: "radial-gradient(circle at 30% 30%, #2c3e50 2px, transparent 2px), radial-gradient(circle at 60% 70%, #111a22 2px, transparent 2px), #1d2b3a" },
  { id: "tuxedo", name: "Tuxedo", family: "Classic", css: "radial-gradient(circle at 40% 40%, #eee 2px, transparent 2px), radial-gradient(circle at 70% 60%, #111 2px, transparent 2px), #4d4d4d" },
  { id: "creekbed", name: "Creekbed", family: "Earth", css: "radial-gradient(circle at 30% 60%, #a58d6f 2px, transparent 2px), radial-gradient(circle at 65% 35%, #6e5c44 2px, transparent 2px), #8a7458" },
  { id: "orbit", name: "Orbit", family: "Modern", css: "radial-gradient(circle at 35% 35%, #b8bcc4 2px, transparent 2px), radial-gradient(circle at 70% 65%, #6a7078 2px, transparent 2px), #8d939c" },
  { id: "foundry-gray", name: "Foundry Gray", family: "Classic", css: "#5f6266" },
];
