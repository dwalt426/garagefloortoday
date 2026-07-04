/** Phase 4 service landing pages — content set 2 of 2. */
import type { ServiceLandingContent } from "../app/templates/ServiceLandingPage";

export const poolDecks: ServiceLandingContent = {
  slug: "pool-decks",
  meta: {
    title: "Pool Deck Coatings | Chlorine-Resistant, Slip-Safe, Cool | GarageFloorToday",
    description: "Pool deck coatings engineered for chlorine, constant wet exposure, barefoot slip safety, and cooler surface temperature. UV-stable finishes documented on FloorPassport™.",
    canonical: "https://garagefloortoday.com/services/pool-decks",
  },
  eyebrow: "Pool Deck",
  h1: "Pool decks that stay cool, grippy, and chlorine-proof.",
  valueProp: "A pool deck is the most demanding barefoot surface there is: constant water, pool chemicals, full sun, and safety stakes measured in slips and falls. Every requirement here is safety- and comfort-driven.",
  heroPhotoNote: "real residential pool deck, water visible, sunny, barefoot-friendly setting — no people's faces needed",
  surfaceFactors: [
    { factor: "Chlorine & pool chemistry", explanation: "Splash-out and treatment chemicals attack coatings not built to resist them." },
    { factor: "Constant wet + slip safety", explanation: "A wet, barefoot surface makes slip resistance a genuine safety requirement." },
    { factor: "Barefoot heat comfort", explanation: "Full-sun decks get hot; color and finish are chosen to stay walkable." },
    { factor: "UV exposure", explanation: "Unshaded decks demand UV-stable chemistry to hold color." },
  ],
  recommendation: {
    headline: "Pool decks need a UV-stable, chlorine-resistant system with maximum slip resistance and a cooler finish.",
    body: "Chemistry resists chlorine and constant moisture; texture maximizes wet grip for bare feet; lighter colors are favored to reduce surface heat. This is the patio standard, extended for water and safety.",
    typicalSystem: "GFT Performance — UV-stable polyaspartic, chlorine-rated, high-slip finish",
  },
  armorPrepScope: "Pool-deck ArmorPrep™ grinds and repairs the slab with special attention to drainage away from the pool, edge and coping transitions, and any existing water damage — moisture management is central this close to a pool.",
  applicationStandard: [
    { requirement: "Slip resistance (barefoot, wet)", note: "Maximum practical wet grip for a pool environment." },
    { requirement: "UV-stable system required", note: "Holds color in unshaded, full-sun exposure." },
    { requirement: "Chlorine resistance required", note: "Chemistry rated for splash-out and pool chemicals." },
    { requirement: "Barefoot heat comfort", note: "Color/finish chosen to keep the surface walkable in sun." },
    { requirement: "Drainage & edge detailing", note: "Water sheds toward drains; coping transitions detailed." },
    { requirement: "FloorPassport™ included", note: "Full record including outdoor maintenance guidance." },
  ],
  commonProblems: [
    { problem: "The deck is too hot for bare feet", cause: "Dark or heat-absorbing finish in full sun.", howGftAddresses: "Lighter, cooler finishes recommended specifically for pool decks." },
    { problem: "It's dangerously slick when wet", cause: "Insufficient slip texture for a barefoot wet surface.", howGftAddresses: "High-slip-resistance finish specified as a safety requirement." },
    { problem: "Pool chemicals discolored the coating", cause: "Coating not rated for chlorine exposure.", howGftAddresses: "Chlorine-resistant chemistry selected for the pool environment." },
  ],
  comparison: {
    title: "Coated pool deck vs. bare or painted concrete",
    body: "Bare pool concrete gets hot, slick, and stained; ordinary paint peels under constant wet and chemical exposure fast. A UV-stable, chlorine-rated, high-slip coating is safer underfoot, cooler, and built to last poolside. For an existing deck, it's a renewal that directly improves safety — the reason slip resistance leads this page's standard.",
  },
  maintenance: "Rinse regularly to clear pool chemicals and debris; periodic wash. The finish resists chlorine, but rinsing splash-out extends its life. Refresh guidance is on your FloorPassport™.",
  faqs: [
    { question: "Is it really safe when wet?", answer: "Slip resistance is the leading requirement of the pool deck standard, specified for barefoot, wet conditions. No surface is slip-proof, but it's engineered for the environment." },
    { question: "Will pool chemicals ruin it?", answer: "The system is chlorine-rated. Rinsing splash-out during maintenance further protects it." },
    { question: "Can it go right up to the coping?", answer: "Yes — edge and coping transitions are detailed as part of the install." },
  ],
  relatedArticles: [
    { label: "Color selection guide", href: "/learn/color-selection" },
    { label: "Garage floor maintenance", href: "/learn/garage-floor-maintenance" },
  ],
  relatedServices: [
    { label: "Patios", href: "/services/patios" },
  ],
};

export const basements: ServiceLandingContent = {
  slug: "basements",
  meta: {
    title: "Basement Floor Coatings | Moisture-Managed, Comfortable | GarageFloorToday",
    description: "Basement floor coatings built around below-grade moisture. Vapor testing, mitigation where needed, and comfortable, finished-space finishes documented on FloorPassport™.",
    canonical: "https://garagefloortoday.com/services/basements",
  },
  eyebrow: "Basement",
  h1: "Basement floors that respect what's coming up through the slab.",
  valueProp: "Basements are defined by one thing above all: moisture from below grade. A basement coating that ignores vapor transmission will fail — which is why testing and mitigation, not finish selection, lead this standard.",
  heroPhotoNote: "real finished basement space — living area or rec room, warm interior light, genuinely usable room",
  surfaceFactors: [
    { factor: "Below-grade moisture vapor", explanation: "Water vapor rising through the slab is the defining basement challenge and the top failure cause." },
    { factor: "Living-space comfort", explanation: "Basements are increasingly living space; the finish should feel finished, not industrial." },
    { factor: "Low light", explanation: "Color and sheen are chosen to brighten spaces with limited natural light." },
    { factor: "Radon/vapor systems", explanation: "Coordination with existing vapor or radon mitigation where present." },
  ],
  recommendation: {
    headline: "Basements are specified around measured moisture first, finish second.",
    body: "We measure vapor transmission and, where it's high, use a vapor-mitigating primer or system before the finish coat. Only then do we choose a finish suited to a comfortable living space. Getting the order right is the whole game in a basement.",
    typicalSystem: "Vapor-mitigating base + finish system, specified after moisture testing",
  },
  armorPrepScope: "Basement ArmorPrep™ leads with thorough moisture testing across the slab, grinding, crack and cove repair, and coordination with any existing sump, drain, or radon systems. Mitigation scope is driven entirely by the readings.",
  applicationStandard: [
    { requirement: "Moisture testing required (multi-point)", note: "Below-grade vapor mapped before any system is chosen." },
    { requirement: "Vapor mitigation where indicated", note: "Mitigating primer/system used when readings require it." },
    { requirement: "Crack & cove repair", note: "Slab and wall-base transitions repaired for a clean finish." },
    { requirement: "Comfort-appropriate finish", note: "Finish suited to living space, not just a utility floor." },
    { requirement: "Mitigation-system coordination", note: "Existing radon/sump/drain systems respected." },
    { requirement: "FloorPassport™ included", note: "Moisture readings and mitigation decisions on record." },
  ],
  commonProblems: [
    { problem: "My last basement floor bubbled and lifted", cause: "Coating applied over high below-grade moisture with no mitigation.", howGftAddresses: "Moisture measured first; mitigation applied where readings demand it." },
    { problem: "The basement floor feels cold and industrial", cause: "Utility finish in a space that's now living area.", howGftAddresses: "Finish and color chosen for comfort and brightness in a living space." },
    { problem: "Musty smell near the floor", cause: "Moisture and porous concrete.", howGftAddresses: "A sealed, moisture-managed system reduces the porous-concrete contribution; persistent moisture issues are flagged for you to address at the source." },
  ],
  comparison: {
    title: "Coated basement floor vs. bare slab or carpet",
    body: "Bare basement slabs dust and wick moisture; carpet over a damp slab invites mold. A moisture-managed coating seals the floor, handles vapor correctly, and creates a clean, comfortable, mold-resistant surface. Where moisture is severe, we'll tell you honestly if source remediation is needed before any floor finish — because a coating can't fix a drainage problem, only coexist with a managed one.",
  },
  maintenance: "Damp-mop as needed; the sealed surface resists the dusting and staining of bare basement concrete. Any moisture readings and mitigation notes stay on your FloorPassport™ for future reference.",
  faqs: [
    { question: "What if my basement has a moisture problem?", answer: "We measure it. Where vapor is high, we mitigate; where there's an active water-intrusion problem, we'll tell you it needs to be solved at the source first. We won't coat over a problem and call it fixed." },
    { question: "Can it go under a finished living space?", answer: "Yes — a moisture-managed coating is a strong base for a finished basement, and far more forgiving than carpet over a damp slab." },
    { question: "Will it work with my radon system?", answer: "We coordinate with existing radon and sump systems as part of the install." },
  ],
  relatedArticles: [
    { label: "Moisture testing explained", href: "/learn/moisture-testing" },
    { label: "Concrete preparation explained", href: "/learn/concrete-preparation" },
  ],
  relatedServices: [
    { label: "Residential garage", href: "/services/residential-garage-floors" },
    { label: "Workshops", href: "/services/workshops" },
  ],
};

export const workshops: ServiceLandingContent = {
  slug: "workshops",
  meta: {
    title: "Workshop Floor Coatings | Impact & Chemical Tough | GarageFloorToday",
    description: "Workshop floor coatings for hobbyists and pros: impact-resistant to dropped tools, resistant to shop chemicals, easy to sweep, and easy on the feet during long sessions.",
    canonical: "https://garagefloortoday.com/services/workshops",
  },
  eyebrow: "Workshop",
  h1: "A shop floor that takes a beating and sweeps clean.",
  valueProp: "A workshop floor lives between a garage and a light-industrial space: dropped tools, jack stands, spilled solvents and finishes, metal shavings, and long hours standing on it. It needs to be tough, cleanable, and comfortable.",
  heroPhotoNote: "real home/pro workshop — workbench, tools, a project in progress, task lighting",
  surfaceFactors: [
    { factor: "Impact from dropped tools", explanation: "Wrenches, jack stands, and stock hit the floor; the coating shouldn't chip at every impact." },
    { factor: "Shop chemical spills", explanation: "Solvents, finishes, oils, and adhesives demand real chemical resistance." },
    { factor: "Cleanability", explanation: "Metal shavings, sawdust, and spills should sweep and wipe up, not embed." },
    { factor: "Standing comfort", explanation: "Long shop sessions on a hard floor — finish and cleanliness affect fatigue." },
  ],
  recommendation: {
    headline: "Workshops usually get an impact- and chemical-resistant system with an easy-clean finish.",
    body: "The chemistry is chosen for the solvents and finishes a shop actually uses; the build for dropped-tool impact; the finish for fast cleanup of shavings and spills. A flake finish also hides the wear and marks a working shop inevitably collects.",
    typicalSystem: "GFT Performance — Polyaspartic or Polyurea Hybrid, flake finish",
  },
  armorPrepScope: "Workshop ArmorPrep™ is garage-grade prep with extra attention to any existing oil or finish contamination on the slab, moisture testing, and crack repair — a hobby shop floor is often an older slab that's seen years of use.",
  applicationStandard: [
    { requirement: "Moisture test required", note: "Recorded before coating, like every GFT install." },
    { requirement: "Impact-appropriate system", note: "Build chosen to resist dropped-tool chipping." },
    { requirement: "Chemical-resistance review", note: "Matched to the shop's solvents and finishes." },
    { requirement: "Easy-clean, wear-hiding finish", note: "Flake finish for cleanability and marks-hiding." },
    { requirement: "Contamination removal", note: "Existing oil/finish residue removed before coating." },
    { requirement: "FloorPassport™ included", note: "Full documentation and maintenance schedule." },
  ],
  commonProblems: [
    { problem: "My garage floor chips when I drop tools", cause: "Thin or brittle coating with no impact rating.", howGftAddresses: "An impact-appropriate system build for shop conditions." },
    { problem: "Wood stain and solvents stained the floor", cause: "Coating not rated for shop chemicals.", howGftAddresses: "Chemical resistance matched to the finishes and solvents you use." },
    { problem: "Metal shavings grind into everything", cause: "Porous or rough surface that traps debris.", howGftAddresses: "A sealed, smooth-but-textured finish that sweeps clean." },
  ],
  comparison: {
    title: "Coated workshop vs. bare or painted garage floor",
    body: "A bare or painted shop floor stains with every project, chips under tools, and traps shavings and dust. A coated, flake-finished shop floor sweeps clean, resists the chemicals you work with, and hides the marks of real use. For anyone who spends serious hours in their shop, it's the difference between fighting the floor and forgetting about it.",
  },
  maintenance: "Sweep shavings and dust, wipe spills, and wash periodically. The flake finish hides wear between cleans. Maintenance cadence is on your FloorPassport™.",
  faqs: [
    { question: "Is it tough enough for a metalworking shop?", answer: "For heavy metalworking with serious point loads, we may recommend an industrial-grade spec — the estimate reflects your actual use. For most hobby and pro wood/auto shops, a flake polyaspartic/hybrid system is ideal." },
    { question: "Will welding spatter damage it?", answer: "Coatings are not fireproof; heavy welding areas may need a protective mat or a bare zone. Tell your consultant about welding so the layout accounts for it." },
    { question: "Can I stand on it comfortably for hours?", answer: "The finish is easier on feet and cleaner than bare concrete; for long standing sessions, anti-fatigue mats in work zones still help." },
  ],
  relatedArticles: [
    { label: "Epoxy vs polyaspartic", href: "/learn/polyaspartic-vs-epoxy" },
    { label: "Color selection guide", href: "/learn/color-selection" },
  ],
  relatedServices: [
    { label: "Residential garage", href: "/services/residential-garage-floors" },
    { label: "Automotive shops", href: "/services/automotive-shops" },
  ],
};

export const showrooms: ServiceLandingContent = {
  slug: "showrooms",
  meta: {
    title: "Showroom Floor Coatings | Flawless, Durable, On-Brand | GarageFloorToday",
    description: "Showroom floor coatings with a flawless finish that survives foot traffic and display loads. Metallic and high-gloss options that make product the star.",
    canonical: "https://garagefloortoday.com/services/showrooms",
  },
  eyebrow: "Showroom",
  h1: "A floor that makes the product the star.",
  valueProp: "A showroom floor is a marketing surface. It has to look flawless under lighting, survive constant foot traffic and display setups, and reinforce the brand — dealership, gallery, retail, or boutique.",
  heroPhotoNote: "real showroom floor under display lighting — a car or product on it, glossy/metallic finish catching light",
  surfaceFactors: [
    { factor: "Flawless appearance under lighting", explanation: "Showroom lighting reveals every imperfection; the finish must be immaculate." },
    { factor: "Foot traffic & display loads", explanation: "Constant customer traffic plus heavy display pieces demand durability behind the beauty." },
    { factor: "Brand alignment", explanation: "Color, sheen, and finish should reinforce the brand, not fight it." },
    { factor: "Reconfigurability", explanation: "Displays move; the floor must wear evenly as layouts change." },
  ],
  recommendation: {
    headline: "Showrooms pair a high-gloss or metallic finish with a genuinely durable system underneath.",
    body: "The visible layer delivers the metallic depth or mirror gloss the space needs; the system beneath is specified for real traffic and display loads so the beauty lasts. Appearance without durability is a re-coat in a year — we build both.",
    typicalSystem: "GFT Performance — Polyaspartic/Hybrid with metallic or high-gloss finish",
  },
  armorPrepScope: "Showroom ArmorPrep™ is exacting: the slab is ground perfectly flat and clean because a high-gloss or metallic finish shows every flaw beneath it. Moisture testing and crack repair are done to a finish-critical standard.",
  applicationStandard: [
    { requirement: "Finish-critical slab preparation", note: "Ground flawless — high gloss reveals everything." },
    { requirement: "Moisture test required", note: "Recorded; failures are unacceptable in a showpiece floor." },
    { requirement: "Traffic + display load rating", note: "Durable system beneath the decorative finish." },
    { requirement: "Brand-aligned finish selection", note: "Color, sheen, metallic depth matched to the brand." },
    { requirement: "Even-wear layout planning", note: "Specified to wear evenly as displays reconfigure." },
    { requirement: "FloorPassport™ included", note: "Documentation for facilities and warranty." },
  ],
  commonProblems: [
    { problem: "Our glossy floor shows every scratch", cause: "Beautiful finish over an under-specified, soft system.", howGftAddresses: "A durable system beneath the decorative layer so gloss survives traffic." },
    { problem: "Imperfections show under the display lights", cause: "Slab not prepared to a finish-critical standard.", howGftAddresses: "Exacting grinding and prep because gloss hides nothing." },
    { problem: "Wear patterns appeared where displays used to be", cause: "Uneven wear as layouts changed over an under-built floor.", howGftAddresses: "Even-wear-rated system and layout-aware planning." },
  ],
  comparison: {
    title: "Coated showroom floor vs. polished concrete or tile",
    body: "Polished concrete and tile are both valid showroom choices; a metallic or high-gloss coating offers something they can't — seamless, customizable color and depth with no grout lines, renewable over an existing slab. The trade-off is that a decorative coating must be built durably or it wears; ours is specified for the traffic, which is the whole point of pairing appearance with an engineered system.",
  },
  maintenance: "Dust-mop frequently to protect the gloss, wash with neutral cleaner, and inspect high-traffic zones on a schedule. The FloorPassport™ notes topcoat-refresh timing to keep the showpiece looking new.",
  faqs: [
    { question: "How custom can the finish be?", answer: "Metallic finishes offer significant color and depth customization; we align the finish to your brand palette during design." },
    { question: "Will it survive a busy sales floor?", answer: "Yes — because the decorative finish sits on a system specified for real traffic and display loads, not a thin decorative-only coat." },
    { question: "Can it be renewed without a full replacement?", answer: "Topcoat refresh can restore gloss without redoing the whole floor; timing is on your FloorPassport™." },
  ],
  relatedArticles: [
    { label: "Color selection guide", href: "/learn/color-selection" },
    { label: "Commercial flooring buyer's guide", href: "/learn/commercial-flooring" },
  ],
  relatedServices: [
    { label: "Commercial coatings", href: "/services/commercial-concrete-coatings" },
    { label: "Automotive shops", href: "/services/automotive-shops" },
  ],
};

/** Pillar page linking all service verticals together */
export const garageFloorCoatingsPillar: ServiceLandingContent = {
  slug: "garage-floor-coatings",
  meta: {
    title: "Garage Floor Coatings | Premium Concrete Coating Systems | GarageFloorToday",
    description: "Premium garage floor coating systems engineered per surface and climate. Documented ArmorPrep™, matched chemistry, and a FloorPassport™ record on every install. Explore every application.",
    canonical: "https://garagefloortoday.com/services/garage-floor-coatings",
  },
  eyebrow: "Garage Floor Coatings",
  h1: "Premium concrete coating systems, engineered per surface.",
  valueProp: "'Garage floor coating' is a category, not a product. A residential garage, a warehouse, a pool deck, and an auto shop face different physics — so GarageFloorToday specifies and documents a different system for each, all built to the same standard.",
  heroPhotoNote: "hero-grade shot of a finished flake garage floor, natural light, aspirational but real",
  surfaceFactors: [
    { factor: "Surface determines system", explanation: "The right coating depends entirely on the surface, climate, and use — there is no universal 'best.'" },
    { factor: "Preparation determines lifespan", explanation: "Across every application, prep is the number-one predictor of how long a floor lasts." },
    { factor: "Documentation determines trust", explanation: "What sets GFT apart in every category is that the process is recorded, not just promised." },
    { factor: "One standard, many applications", explanation: "The GarageFloorToday Standard™ applies everywhere; the specification adapts to each surface." },
  ],
  recommendation: {
    headline: "Start with your surface — each has its own engineered standard.",
    body: "Residential garages, commercial and industrial floors, patios and pool decks, basements, workshops, and showrooms each get a purpose-built specification. Pick your application below to see the exact standard, common problems, and recommended system for it.",
    typicalSystem: "Specified per application via the GFT Performance System™",
  },
  armorPrepScope: "ArmorPrep™ — diamond grinding, moisture testing, and structural crack repair — is the constant across every application. What changes is the scope: warehouse moisture mapping, auto-shop oil decontamination, or pool-deck drainage detailing. The discipline is identical; the specifics adapt.",
  applicationStandard: [
    { requirement: "ArmorPrep™ on every surface", note: "Grinding, moisture testing, crack repair — always." },
    { requirement: "Engineered material selection", note: "GFT Performance System™ matches chemistry to the surface." },
    { requirement: "Application-specific standard", note: "Each surface has its own published checklist." },
    { requirement: "Certified local crews", note: "Named on your record in every application." },
    { requirement: "FloorPassport™ everywhere", note: "Documentation on every install, every surface." },
    { requirement: "Lifetime performance support", note: "The same support standard across all applications." },
  ],
  commonProblems: [
    { problem: "I don't know which coating I need", cause: "Every company recommends whatever they sell.", howGftAddresses: "The GFT Performance System™ recommends per surface and climate — including when a simpler system is the right call." },
    { problem: "My last floor failed and I don't know why", cause: "Almost always preparation, rarely the 'wrong color.'", howGftAddresses: "Documented ArmorPrep™ and moisture testing remove the usual failure causes and record what was done." },
    { problem: "Every quote sounds identical", cause: "Undifferentiated marketing across the industry.", howGftAddresses: "Compare on specifics: readings published, prep photographed, warranty verifiable, crew named." },
  ],
  comparison: {
    title: "Professional coating systems vs. DIY kits",
    body: "DIY epoxy kits are a coat of product over lightly-prepared concrete — fine for a season, prone to hot-tire peel and staining after. Professional systems differ in preparation, chemistry match, and documentation, which is why they last years rather than months. We explain the honest trade-offs on the comparison pages rather than just asserting professional is better.",
  },
  maintenance: "Maintenance varies by surface — garages and shops sweep and wash; patios and pool decks rinse; commercial floors follow a documented cleaning schedule. Every FloorPassport™ carries the maintenance cadence for your specific system.",
  faqs: [
    { question: "Which surface pages should I read?", answer: "Start with the one closest to your project — residential garage, commercial, industrial, warehouse, auto shop, patio, pool deck, basement, workshop, or showroom. Each has its own standard and recommended system." },
    { question: "Do you really use different systems for different jobs?", answer: "Yes. That's the core of the GFT Performance System™ — the right chemistry for the surface, climate, and use, recorded on your FloorPassport™." },
    { question: "Is the process the same everywhere?", answer: "The GarageFloorToday Standard™ and ArmorPrep™ discipline are constant. The specification adapts to each surface." },
  ],
  relatedArticles: [
    { label: "Garage floor coatings — complete guide", href: "/learn/garage-floor-coatings" },
    { label: "Epoxy vs polyaspartic vs polyurea", href: "/coatings/compare" },
    { label: "Cost guide", href: "/learn/cost-guide" },
  ],
  relatedServices: [
    { label: "Residential garage", href: "/services/residential-garage-floors" },
    { label: "Commercial", href: "/services/commercial-concrete-coatings" },
    { label: "Patios", href: "/services/patios" },
  ],
};

/** Registry — drives app/services/[slug]/page.tsx */
import {
  residentialGarage, commercial, industrial, warehouse, automotiveShops, patios,
} from "./service-pages-1";

export const allServicePages: ServiceLandingContent[] = [
  garageFloorCoatingsPillar,
  residentialGarage, commercial, industrial, warehouse, automotiveShops,
  patios, poolDecks, basements, workshops, showrooms,
];
