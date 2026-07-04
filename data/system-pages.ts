import type { BrandPageContent } from "../app/templates/BrandPage";

/** /coatings/[slug] — the 4 system pages. Reuses BrandPage (hero + sections +
 *  checklist + FAQs + related) — no new template needed; content differentiates.
 *  Rule: honest about each chemistry's weaknesses, including our own hybrid's
 *  trade-offs. Quantified specs stay out until manufacturer sheets land in DB.
 */

export const epoxyPage: BrandPageContent = {
  slug: "epoxy",
  meta: {
    title: "Epoxy Garage Floor Coating | Honest Strengths & Limits",
    description: "What epoxy garage floor coatings do well, where they fail (UV yellowing, hot tire pickup, slow cure), and when epoxy is still the right engineering choice.",
    canonical: "https://garagefloortoday.com/coatings/epoxy",
  },
  eyebrow: "Epoxy",
  h1: "Epoxy: the classic chemistry, used where it actually belongs.",
  intro: "Epoxy built this industry — and earned its mixed reputation. It bonds hard, builds thick, and costs less; it also yellows in UV, cures slowly, and fails at hot tires when installed cheaply. We still specify epoxy — as an engineered base layer or budget-conscious interior system — where its strengths fit and its weaknesses don't matter.",
  sections: [
    { heading: "Where epoxy genuinely excels", body: "High-build thickness for rough slabs, strong chemical resistance for the price, and excellent adhesion over properly ground concrete. As a base coat under a UV-stable topcoat, epoxy's thickness is an asset — that's how hybrid systems use it." },
    { heading: "Where it fails — honestly", body: "Direct UV yellows and chalks it, which is why outdoor epoxy is a mistake. Slow cure means days, not hours, before parking. And the DIY-kit version of epoxy — thin, applied over unground concrete — is the source of most 'my floor peeled' stories. The chemistry isn't the whole problem; the installation usually is." },
    {
      heading: "When we recommend it",
      body: "Epoxy earns its place in specific situations:",
      checklist: [
        { label: "As a high-build base layer", detail: "Under a UV-stable polyaspartic topcoat in hybrid systems." },
        { label: "Interior, low-UV spaces", detail: "Basements and interior commercial floors where yellowing can't happen." },
        { label: "Budget-driven interior projects", detail: "When cost matters and cure time doesn't — honestly stated as the trade." },
      ],
    },
  ],
  faqs: [
    { question: "Is epoxy bad?", answer: "No — misapplied epoxy is bad. Outdoor epoxy yellows, thin DIY epoxy peels. Properly specified interior or base-layer epoxy performs well for its cost." },
    { question: "Why is epoxy cheaper?", answer: "Material cost and cure-time economics. The price difference is real; so are the trade-offs in UV stability and return-to-service." },
    { question: "Epoxy vs polyaspartic?", answer: "Polyaspartic is UV-stable and cures in hours; epoxy is thicker per coat and cheaper. See the full comparison for which fits your project." },
  ],
  relatedLinks: [
    { label: "Epoxy vs polyaspartic — full comparison", href: "/learn/polyaspartic-vs-epoxy" },
    { label: "GFT Hybrid systems", href: "/coatings/hybrid" },
    { label: "Why floors fail", href: "/learn/failure-guide" },
  ],
  primaryCta: { label: "Get My Free Estimate", href: "/estimate" },
  structuredDataType: "Service",
};

export const polyasparticPage: BrandPageContent = {
  slug: "polyaspartic",
  meta: {
    title: "Polyaspartic Garage Floor Coating | UV-Stable, Fast Cure",
    description: "Polyaspartic coatings: UV-stable, fast-curing, hot-tire resistant — and what the one-day-floor marketing doesn't tell you about prep and cost.",
    canonical: "https://garagefloortoday.com/coatings/polyaspartic",
  },
  eyebrow: "Polyaspartic",
  h1: "Polyaspartic: the modern standard for residential garages.",
  intro: "Polyaspartic solved epoxy's two biggest problems — UV yellowing and slow cure — and became the residential standard for good reason. It's also become a marketing word. Here's what the chemistry actually delivers, what it costs, and where the 'one-day floor' pitch cuts corners.",
  sections: [
    { heading: "What the chemistry delivers", body: "Aliphatic polyaspartics are UV-stable (no yellowing outdoors or at sunny door lines), cure fast enough to return a garage to service quickly, resist hot-tire pickup when properly installed, and stay flexible enough to handle slab movement better than rigid epoxy." },
    { heading: "What the marketing skips", body: "'One-day floor' is only honest when the prep is honest. Fast cure tempts installers to compress grinding, moisture testing, and repair — the steps that decide lifespan. A one-day polyaspartic floor over unground, untested concrete fails like any other rushed floor. Speed should come from chemistry, not skipped prep — that's the entire point of documenting ArmorPrep™." },
    { heading: "Cost, honestly", body: "Polyaspartic material costs more than epoxy. For an interior basement with zero UV, paying the polyaspartic premium may be unnecessary — and we'll say so. For a garage with sun exposure and daily parking, it's usually the right money." },
  ],
  faqs: [
    { question: "Is polyaspartic really better than epoxy?", answer: "For UV exposure, cure speed, and hot-tire resistance — yes. For thick builds on rough slabs or tight budgets indoors, epoxy still competes. 'Better' depends on the surface." },
    { question: "Can I really park the same day?", answer: "Often within about a day depending on conditions — your crew gives exact timing. The chemistry is fast; the prep must never be." },
    { question: "Does polyaspartic work outdoors?", answer: "Yes — UV stability is its defining advantage. It's our default recommendation for patios and pool decks." },
  ],
  relatedLinks: [
    { label: "Epoxy vs polyaspartic", href: "/learn/polyaspartic-vs-epoxy" },
    { label: "ArmorPrep™ — why prep decides everything", href: "/armorprep" },
    { label: "Hot tire pickup explained", href: "/learn/hot-tire-pickup" },
  ],
  primaryCta: { label: "Get My Free Estimate", href: "/estimate" },
  structuredDataType: "Service",
};

export const polyureaPage: BrandPageContent = {
  slug: "polyurea",
  meta: {
    title: "Polyurea Floor Coating | Impact & Chemical Toughness",
    description: "Polyurea coatings: exceptional impact, abrasion, and chemical resistance for workshops, shops, and industrial floors — plus the application realities most pages omit.",
    canonical: "https://garagefloortoday.com/coatings/polyurea",
  },
  eyebrow: "Polyurea",
  h1: "Polyurea: toughness for floors that take real abuse.",
  intro: "Polyurea is the toughness chemistry — outstanding impact, abrasion, and chemical resistance, and flexible enough to move with the slab. It's our backbone for workshops, auto shops, and industrial floors. It also demands more from the installer than any other system, which is exactly why it's often installed badly elsewhere.",
  sections: [
    { heading: "Why it's the toughness pick", body: "Polyurea handles dropped tools, jack stands, forklift wheels, solvents, and fluids that would scar softer systems. Its elongation lets it flex over minor slab movement instead of cracking with it — a genuine advantage in expansive-soil and freeze-thaw regions." },
    { heading: "The installer's honest caveat", body: "Pure polyurea sets extremely fast — sometimes too fast for careful detail work — and is unforgiving of prep shortcuts. That's why much of the market (including us, in most residential cases) uses polyurea in hybrid formulations that keep the toughness while allowing workable application. A company selling 'pure polyurea' as automatically superior is marketing the datasheet, not the floor." },
    { heading: "The '20x stronger than epoxy' claim", body: "You'll see this number across the industry. It comes from specific tensile-elongation lab comparisons, not whole-floor performance, and we won't repeat it as a blanket fact. What we'll stand behind: for impact, abrasion, and chemical exposure, a properly installed polyurea or hybrid system is the strongest choice we offer — and your FloorPassport™ records exactly what went down." },
  ],
  faqs: [
    { question: "Is polyurea overkill for a normal garage?", answer: "Sometimes, honestly. A park-and-go garage in a mild climate is well served by polyaspartic. Polyurea earns its cost with heavy use, workshops, and harsh climates." },
    { question: "Polyurea vs polyaspartic?", answer: "Related chemistries. Polyaspartic (technically a polyurea subtype) leads on UV and workability; conventional polyurea leads on raw toughness. Hybrids combine them — see the comparison guide." },
  ],
  relatedLinks: [
    { label: "Polyurea guide — full deep dive", href: "/learn/polyurea-guide" },
    { label: "GFT Hybrid systems", href: "/coatings/hybrid" },
    { label: "Workshop floors", href: "/services/workshops" },
  ],
  primaryCta: { label: "Get My Free Estimate", href: "/estimate" },
  structuredDataType: "Service",
};

export const hybridPage: BrandPageContent = {
  slug: "hybrid",
  meta: {
    title: "GFT Hybrid Coating Systems | The Right Layers, Engineered",
    description: "GFT hybrid systems layer chemistries deliberately — tough base, UV-stable top — so each layer does what it's best at. How hybrids work and when they're worth it.",
    canonical: "https://garagefloortoday.com/coatings/hybrid",
  },
  eyebrow: "GFT Hybrid",
  h1: "Hybrid systems: each layer doing what it's best at.",
  intro: "No single chemistry wins every property. Hybrid systems stack them deliberately — a tough, high-build base (polyurea or epoxy, per the slab) under a UV-stable polyaspartic topcoat — so the floor gets toughness where it bonds and beauty where it shows. This is the GFT Performance System's default answer for demanding floors.",
  sections: [
    {
      heading: "How a hybrid is built",
      body: "A typical GFT hybrid stack, adapted per project:",
      checklist: [
        { label: "ArmorPrep™ profile", detail: "Ground, moisture-tested, repaired — the layer under every layer." },
        { label: "Base coat matched to the slab", detail: "Polyurea for flex/toughness, or high-build epoxy for rough interior slabs." },
        { label: "Broadcast layer", detail: "Flake or quartz for texture, appearance, and wear-hiding." },
        { label: "UV-stable polyaspartic topcoat", detail: "Color-true, hot-tire-resistant, cleanable wear surface." },
      ],
    },
    { heading: "When a hybrid is worth it — and when it isn't", body: "Worth it: workshops, shops, harsh climates, commercial traffic, and any floor where both toughness and appearance matter for decades. Possibly not: a low-budget interior basement or a mild-climate park-and-go garage, where a single-chemistry system may honestly suffice. Your FloorPassport™ records which stack you got and why — the recommendation is accountable, not a sales reflex toward the priciest option." },
  ],
  faqs: [
    { question: "Is 'hybrid' just a marketing word?", answer: "Across the industry, sometimes. Here it means a documented layer stack — each layer named on your FloorPassport™ with batch numbers. If the record can't say what the layers are, it's marketing; if it can, it's engineering." },
    { question: "Why not always use the hybrid?", answer: "Cost honesty. When a simpler system genuinely fits the surface and climate, recommending the expensive stack anyway would violate the point of the Performance System." },
  ],
  relatedLinks: [
    { label: "GFT Performance System™", href: "/performance-system" },
    { label: "Compare all systems", href: "/coatings/compare" },
    { label: "The GarageFloorToday Standard™", href: "/standard" },
  ],
  primaryCta: { label: "Engineer My Floor", href: "/tools/engineer-my-floor" },
  structuredDataType: "Service",
};

export const allSystemPages: BrandPageContent[] = [epoxyPage, polyasparticPage, polyureaPage, hybridPage];
