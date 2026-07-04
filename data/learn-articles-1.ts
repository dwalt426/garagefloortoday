/** Learning Center — pillar guides, set 1 of 2.
 *  Every slug here is already referenced by service/brand/system pages, so this
 *  file closes internal links. Block-based (CMS-ready). Claims stay qualitative
 *  or process-based; numbers only where universally standard (e.g., test names).
 */
import type { ArticleData } from "../app/templates/Templates";

export interface LearnArticle extends ArticleData {
  slug: string;
  meta: { title: string; description: string };
  faqs: { question: string; answer: string }[];
  relatedServices: { label: string; href: string }[];
}

const d = "July 2026";

export const hotTirePickup: LearnArticle = {
  slug: "hot-tire-pickup",
  meta: {
    title: "Hot Tire Pickup: Why Garage Floors Peel Under Tires",
    description: "Hot tire pickup explained — why warm tires peel coatings off concrete, which failures are prep vs chemistry, and how properly installed floors prevent it.",
  },
  title: "Hot Tire Pickup: why garage floors peel under tires",
  updatedAt: d, readingMinutes: 6,
  blocks: [
    { type: "paragraph", text: "Park after a summer drive, come back the next morning, and the coating comes up with the tire — a clean tire-shaped peel. That's hot tire pickup, the most common visible failure in coated garages, and it's almost always preventable." },
    { type: "heading", text: "What's actually happening" },
    { type: "paragraph", text: "Warm tires do two things: they soften weak coatings slightly, and as they cool they contract and grip the surface. If the coating's bond to the concrete is weaker than the tire's grip on the coating, the coating loses. The failure is at the concrete bond line — which is why it's usually a preparation story, not a tire story." },
    { type: "heading", text: "The two root causes" },
    { type: "paragraph", text: "First, inadequate surface prep: coatings applied over smooth, unground, or contaminated concrete have a fraction of the bond they'd have over a diamond-ground profile. Second, low-grade chemistry: thin DIY epoxies soften more under tire heat than professional polyaspartic or polyurea systems. Cheap kits combine both problems, which is why they're the classic hot-tire casualty." },
    { type: "callout", text: "A tire-shaped peel is diagnostic: the floor failed at the bond line. Ask any installer how they prepare concrete before you ask what they coat it with." },
    { type: "heading", text: "How it's prevented" },
    { type: "paragraph", text: "Mechanical grinding to open the concrete's pores, moisture testing so vapor doesn't undermine the bond from below, and a hot-tire-rated chemistry on top. In our process that's ArmorPrep™ plus a polyaspartic or hybrid system — and your FloorPassport™ records the prep photos and readings, so 'was it prepped properly' is never a mystery later." },
  ],
  faqs: [
    { question: "Can a hot-tire-damaged floor be repaired?", answer: "Spot repairs rarely bond well to a floor that failed for prep reasons. Usually the honest fix is grinding off the failed coating and installing correctly — we'll assess and tell you straight." },
    { question: "Do tire brands or types matter?", answer: "Marginally — softer performance compounds grip more — but no tire should defeat a properly installed floor. Blaming the tire usually excuses the prep." },
  ],
  relatedLinks: [
    { label: "ArmorPrep™ — our prep protocol", href: "/armorprep" },
    { label: "Why floors fail — full guide", href: "/learn/failure-guide" },
    { label: "Polyaspartic systems", href: "/coatings/polyaspartic" },
  ],
  relatedServices: [{ label: "Residential garage floors", href: "/services/residential-garage-floors" }],
};

export const moistureTesting: LearnArticle = {
  slug: "moisture-testing",
  meta: {
    title: "Concrete Moisture Testing Before Coating: Why It's Non-Negotiable",
    description: "Moisture vapor rising through concrete is the invisible coating killer. What moisture testing measures, why skipping it causes bubbling and delamination, and how results drive system choice.",
  },
  title: "Moisture testing: the invisible step that decides your floor's fate",
  updatedAt: d, readingMinutes: 7,
  blocks: [
    { type: "paragraph", text: "Concrete looks solid; it behaves like a very slow sponge. Water vapor moves up through slabs from the ground below constantly, and it's invisible at install time. Coat over high vapor transmission and the moisture builds pressure under the coating — bubbles, blisters, and delamination follow months later, long after the installer's truck left." },
    { type: "heading", text: "What testing measures" },
    { type: "paragraph", text: "Moisture testing quantifies how much water vapor is moving through your slab — commonly via calcium chloride testing (measuring vapor emission over 24 hours) or in-situ relative humidity probes. The result is a number that either sits inside a coating system's tolerance or doesn't." },
    { type: "heading", text: "Why the number changes the system" },
    { type: "paragraph", text: "Readings within tolerance: coat normally. Elevated readings: a vapor-mitigating primer or moisture-tolerant system goes down first. Severe readings — especially below grade — can mean the honest answer is fixing drainage before any floor finish. A company that never mentions moisture is telling you they coat every slab the same way and hope." },
    { type: "callout", text: "On every GFT install, readings are taken during ArmorPrep™ and recorded on your FloorPassport™ — before and after grinding. If a question ever arises, the numbers exist." },
    { type: "heading", text: "Where it matters most" },
    { type: "paragraph", text: "Basements (below grade, always suspect), slabs without vapor barriers (common in older homes), and any large commercial slab, where moisture varies across the floor — one test point isn't enough, which is why warehouse installs get grid mapping." },
  ],
  faqs: [
    { question: "My slab feels dry — do I still need testing?", answer: "Yes. Vapor transmission is invisible and touch tells you nothing about it. Dry-feeling slabs fail coatings regularly." },
    { question: "What if my readings are high?", answer: "Mitigation primer or system change in most cases; source remediation in severe ones. Either way, the decision is recorded — never coated over and hoped." },
  ],
  relatedLinks: [
    { label: "ArmorPrep™", href: "/armorprep" },
    { label: "Basement floors — moisture-first spec", href: "/services/basements" },
    { label: "FloorPassport™", href: "/floorpassport" },
  ],
  relatedServices: [{ label: "Basements", href: "/services/basements" }, { label: "Warehouse floors", href: "/services/warehouse" }],
};

export const concretePreparation: LearnArticle = {
  slug: "concrete-preparation",
  meta: {
    title: "Concrete Preparation for Floor Coatings: The Complete Guide",
    description: "Why surface preparation — grinding, profiling, decontamination, repair — determines coating lifespan more than the coating itself. What proper prep looks like.",
  },
  title: "Concrete preparation: the work that decides everything",
  updatedAt: d, readingMinutes: 8,
  blocks: [
    { type: "paragraph", text: "Here's the industry's open secret: the coating you choose matters less than what happens to the concrete before it. A mid-grade coating over excellent prep outlasts a premium coating over poor prep, every time. Preparation is invisible in the finished floor — which is exactly why cheap installers skip it and why we photograph it." },
    { type: "heading", text: "Grinding vs. acid etching" },
    { type: "paragraph", text: "Diamond grinding mechanically removes the slab's weak surface layer (laitance) and opens the pore structure coatings anchor into. Acid etching — the DIY-kit method — chemically roughens the surface but leaves laitance and contamination behind, and its results vary wildly with rinsing. Professional floors are ground; there isn't a serious debate about this." },
    { type: "heading", text: "Decontamination" },
    { type: "paragraph", text: "Oil, old sealers, paint, and adhesives all block bonding. Shop floors soaked with years of oil need degreasing plus grinding; slabs with old coatings need those removed or ground through. Coating over contamination is the second-most-common failure cause after moisture." },
    { type: "heading", text: "Repair before coating" },
    { type: "paragraph", text: "Cracks and spalls get structural repair ground flush — not caulk smears — and expansion joints get honored, not bridged, because slabs move and coatings that ignore movement crack along the old lines." },
    { type: "callout", text: "The GFT test for any installer, including us: ask to see prep photos from a past job. On a GFT floor, they're on the FloorPassport™." },
  ],
  faqs: [
    { question: "How much of the project cost is prep?", answer: "A meaningful share — grinding, testing, and repair are labor- and equipment-intensive. Quotes dramatically cheaper than others are usually cheaper here, in the part you can't see." },
    { question: "Can new concrete skip prep?", answer: "No — new slabs still carry laitance and curing compounds, plus high moisture until fully cured. New concrete has its own prep requirements and waiting periods." },
  ],
  relatedLinks: [
    { label: "ArmorPrep™ — our protocol", href: "/armorprep" },
    { label: "Moisture testing", href: "/learn/moisture-testing" },
    { label: "Concrete crack repair", href: "/learn/concrete-repair" },
  ],
  relatedServices: [{ label: "Residential garages", href: "/services/residential-garage-floors" }, { label: "Automotive shops", href: "/services/automotive-shops" }],
};

export const concreteRepair: LearnArticle = {
  slug: "concrete-repair",
  meta: {
    title: "Concrete Crack Repair Before Coating: Methods That Last",
    description: "Why cracks telegraph through coatings, the difference between structural repair and cosmetic fills, and how slab movement determines the right repair approach.",
  },
  title: "Concrete cracks: repair that lasts vs. fills that telegraph",
  updatedAt: d, readingMinutes: 6,
  blocks: [
    { type: "paragraph", text: "Almost every slab has cracks; almost every coating failure along a crack traces to how the crack was handled. Coatings don't hide cracks — they inherit them. A crack smeared with caulk and coated over reappears in the finish within seasons, a phenomenon installers call telegraphing." },
    { type: "heading", text: "Why cracks come back" },
    { type: "paragraph", text: "Slabs move — thermal cycling, moisture changes, and in expansive-soil regions, the ground itself. A flexible cosmetic fill moves with the crack, flexing the coating above it until the line shows. Structural repair fills the crack with rigid material ground flush, restoring the slab's continuity so the coating sits on one surface, not two shifting halves." },
    { type: "heading", text: "Cracks vs. joints — different rules" },
    { type: "paragraph", text: "Control joints and expansion joints exist to move; they're honored (kept as flexible joints) rather than rigidly filled. Random cracks are defects; they're repaired rigidly. Treating these two the same — filling joints rigid or leaving cracks flexible — causes failures in both directions." },
    { type: "callout", text: "In freeze-thaw and expansive-clay regions (looking at you, North Texas and the Midwest), crack behavior is climate-driven — which is why local pages carry local slab guidance." },
    { type: "heading", text: "When a crack means more" },
    { type: "paragraph", text: "Wide, offset, or actively growing cracks can indicate settlement or structural issues a coating shouldn't paper over. We'll flag those honestly — a coating company that coats over structural movement is selling you a countdown." },
  ],
  faqs: [
    { question: "Will repaired cracks be visible?", answer: "Under flake and textured finishes, properly ground repairs disappear. Under smooth high-gloss finishes, prep is held to a finish-critical standard — see the showroom page." },
    { question: "My last floor cracked along the same old lines — why?", answer: "Telegraphing: cosmetic fills under the old coating. Correct structural repair before recoating prevents the repeat." },
  ],
  relatedLinks: [
    { label: "Concrete preparation guide", href: "/learn/concrete-preparation" },
    { label: "Why floors fail", href: "/learn/failure-guide" },
    { label: "ArmorPrep™", href: "/armorprep" },
  ],
  relatedServices: [{ label: "Residential garages", href: "/services/residential-garage-floors" }, { label: "Industrial floors", href: "/services/industrial" }],
};

export const polyasparticVsEpoxy: LearnArticle = {
  slug: "polyaspartic-vs-epoxy",
  meta: {
    title: "Polyaspartic vs Epoxy Garage Floors: The Honest Comparison",
    description: "Polyaspartic vs epoxy compared honestly: UV stability, cure time, thickness, cost, and hot-tire resistance — and the cases where each is genuinely the right choice.",
  },
  title: "Polyaspartic vs epoxy: the comparison without the sales pitch",
  updatedAt: d, readingMinutes: 8,
  blocks: [
    { type: "paragraph", text: "This is the most-searched question in the category, and most answers are written by companies that sell only one of the two. We install both, so here's the version with no dog in the fight." },
    { type: "heading", text: "Where polyaspartic wins" },
    { type: "paragraph", text: "UV stability — it doesn't yellow outdoors or at sunny door lines. Cure speed — return to service in a fraction of epoxy's days-long cure. Hot-tire resistance and flexibility over minor slab movement. For a daily-use residential garage, these are usually the properties that matter." },
    { type: "heading", text: "Where epoxy wins" },
    { type: "paragraph", text: "Thickness per coat — epoxy builds high, valuable on rough slabs. Cost — meaningfully cheaper in material. Chemical resistance per dollar for interior floors. For a windowless basement or budget interior commercial floor, epoxy's weaknesses may literally never come into play." },
    { type: "heading", text: "The answer most pages won't give" },
    { type: "paragraph", text: "They're layers, not rivals. Many of the best floors use epoxy's build as a base and polyaspartic's UV-stable durability as the topcoat — that's the hybrid approach. The single-chemistry framing is mostly a marketing artifact of companies locked into one product line." },
    { type: "callout", text: "Watch for the tell: any company whose answer to 'which is better' never depends on your slab, climate, or use is reciting their inventory, not engineering your floor." },
  ],
  faqs: [
    { question: "Which is more expensive?", answer: "Polyaspartic material costs more. Whether it's worth it depends on UV exposure and how fast you need the floor back — sometimes it isn't, and we'll say so." },
    { question: "Which lasts longer?", answer: "With equal preparation, a polyaspartic or hybrid system generally outlasts single-coat epoxy in a working garage. With unequal preparation, prep wins regardless of chemistry — see the preparation guide." },
  ],
  relatedLinks: [
    { label: "Epoxy system page", href: "/coatings/epoxy" },
    { label: "Polyaspartic system page", href: "/coatings/polyaspartic" },
    { label: "Hybrid systems", href: "/coatings/hybrid" },
  ],
  relatedServices: [{ label: "Residential garages", href: "/services/residential-garage-floors" }],
};

export const polyureaGuide: LearnArticle = {
  slug: "polyurea-guide",
  meta: {
    title: "Polyurea Floor Coating Guide: Toughness, Trade-offs, Truth",
    description: "The complete polyurea guide: what the chemistry does, how it relates to polyaspartic, the '20x stronger' claim examined, and where polyurea genuinely earns its cost.",
  },
  title: "The polyurea guide: toughness, trade-offs, and the truth about the hype",
  updatedAt: d, readingMinutes: 9,
  blocks: [
    { type: "paragraph", text: "Polyurea is the chemistry the toughest floors are built on — and the word the most aggressive marketing in this industry is built on. Both things are true. This guide separates them." },
    { type: "heading", text: "What polyurea actually is" },
    { type: "paragraph", text: "A polymer family formed by fast-reacting chemistry, known for high elongation (it stretches and returns), strong abrasion and impact resistance, and broad chemical tolerance. Polyaspartic is technically a modified polyurea engineered for slower, workable cure and UV stability — the two are siblings, not opposites." },
    { type: "heading", text: "About '20x stronger than epoxy'" },
    { type: "paragraph", text: "This industry-famous figure comes from comparing specific lab properties — chiefly tensile strength and elongation — under test conditions. It's not a whole-floor performance multiplier, and repeating it as one is how the industry earns distrust. The defensible claim: for impact, abrasion, flexibility, and chemical exposure, properly installed polyurea-based systems are the most demanding-duty choice available, and the gap versus budget epoxy is large and real." },
    { type: "heading", text: "Where polyurea earns its cost" },
    { type: "paragraph", text: "Workshops and auto shops (impacts, solvents, fluids), industrial and warehouse traffic, freeze-thaw and expansive-soil regions where flexibility matters, and any floor whose owner plans to use it hard for decades. Where it may not: a mild-climate park-and-go garage — polyaspartic alone often serves at lower cost." },
    { type: "callout", text: "Fast-setting pure polyurea is unforgiving to install, which is why hybrids dominate quality residential work. 'Pure polyurea' as a selling point tells you about the datasheet, not the floor you'll get." },
  ],
  faqs: [
    { question: "Polyurea vs polyaspartic — which do I want?", answer: "For raw toughness: polyurea-based systems. For UV and fast workable installation: polyaspartic. For most demanding floors: a hybrid using both — the recommendation your slab's readings and use case drive." },
    { question: "Is polyurea waterproof?", answer: "Polyurea coatings are highly water-resistant as a surface, but no floor coating fixes a slab moisture problem from below — that's what moisture testing and mitigation are for." },
  ],
  relatedLinks: [
    { label: "Polyurea system page", href: "/coatings/polyurea" },
    { label: "Hybrid systems", href: "/coatings/hybrid" },
    { label: "Moisture testing", href: "/learn/moisture-testing" },
  ],
  relatedServices: [{ label: "Workshops", href: "/services/workshops" }, { label: "Industrial floors", href: "/services/industrial" }],
};

export const garageFloorMaintenance: LearnArticle = {
  slug: "garage-floor-maintenance",
  meta: {
    title: "Garage Floor Coating Maintenance: The Realistic Guide",
    description: "How to maintain a coated garage floor — routine care, what to avoid, seasonal salt handling, and the honest signs a floor needs professional attention.",
  },
  title: "Maintaining a coated garage floor (it's easier than you think)",
  updatedAt: d, readingMinutes: 5,
  blocks: [
    { type: "paragraph", text: "The best feature of a properly installed coating is how little it asks of you. There's no waxing, no annual resealing, no special products for normal life. Here's the realistic routine — and the few things that genuinely matter." },
    { type: "heading", text: "The routine" },
    { type: "paragraph", text: "Sweep or dust-mop as needed. Wash with water and a neutral cleaner a few times a year. Wipe automotive fluid drips when you see them — not because they'll destroy the coating, but because nothing should sit on any floor indefinitely. That's the whole program for most homes." },
    { type: "heading", text: "Winter and road salt" },
    { type: "paragraph", text: "In cold climates, salt-laden slush is the season's main event. Rinse it off periodically through winter — the coating resists chlorides far better than bare concrete, but rinsing keeps residue from dulling the finish and tracking into the house." },
    { type: "heading", text: "What to avoid" },
    { type: "paragraph", text: "Harsh solvent cleaners you wouldn't use on a car's paint, dragging unprotected sharp metal (put feet under that shelving), and pressure-washing at blast-close range. None of these are common disasters; all are avoidable ones." },
    { type: "callout", text: "Your FloorPassport™ carries the maintenance cadence for your specific system — and every service visit gets appended to the same record." },
    { type: "heading", text: "When to call us" },
    { type: "paragraph", text: "Any lifting, bubbling, or peeling — early, while it's small. On a documented floor, diagnosis starts from your actual install data, and warranty questions start from facts." },
  ],
  faqs: [
    { question: "Can I use a rubber-backed mat on it?", answer: "Breathable mats, yes. Some solid rubber backings can discolor coatings over long contact — containment mats designed for coated floors are the safe pick under vehicles." },
    { question: "How long until it needs recoating?", answer: "A properly installed system is a decades product, not an annual one. High-wear commercial lanes may see scheduled topcoat refreshes; your FloorPassport™ notes the assessment timing." },
  ],
  relatedLinks: [
    { label: "Warranty — how coverage works", href: "/warranty" },
    { label: "FloorPassport™", href: "/floorpassport" },
    { label: "Why floors fail", href: "/learn/failure-guide" },
  ],
  relatedServices: [{ label: "Residential garages", href: "/services/residential-garage-floors" }],
};

export const colorSelection: LearnArticle = {
  slug: "color-selection",
  meta: {
    title: "Choosing a Garage Floor Color: A Designer's Framework",
    description: "How to choose a garage floor color and flake blend — hiding dirt, matching your home, light and heat behavior, and why the visualizer beats imagination.",
  },
  title: "Choosing your floor color: a framework, not a swatch dump",
  updatedAt: d, readingMinutes: 5,
  blocks: [
    { type: "paragraph", text: "Color is the decision homeowners agonize over most and regret least — if they think about how the floor lives, not just how the swatch looks. Four questions do most of the work." },
    { type: "heading", text: "1. What should it hide?" },
    { type: "paragraph", text: "Multi-tone flake blends are the great concealers — dust, tire marks, and dropped-screw scuffs vanish into the pattern. Solid colors show life honestly; they suit showrooms and lightly used spaces better than working garages." },
    { type: "heading", text: "2. How much light does the space have?" },
    { type: "paragraph", text: "Darker floors make dim garages dimmer. In basements and low-window garages, lighter blends measurably brighten the room. Outdoors, lighter colors also run cooler underfoot — the pool-deck rule." },
    { type: "heading", text: "3. What does it sit next to?" },
    { type: "paragraph", text: "The floor meets your driveway, your walls, and sometimes your kitchen through an open door. Neutral earth and gray families are popular because they cooperate; strong-personality blends are best where the garage is a showpiece by intent." },
    { type: "heading", text: "4. Have you actually seen it at scale?" },
    { type: "paragraph", text: "A chip the size of a cookie lies about a floor the size of a room. Use the visualizer to see blends at room scale — and your saved design attaches to your project so the floor installed is the floor you chose." },
    { type: "callout", text: "Metallic finishes are a different decision — dramatic, showroom-grade, and dependent on finish-critical prep. See the showroom page before falling in love." },
  ],
  faqs: [
    { question: "What's the most popular choice?", answer: "Mid-tone gray and earth flake blends, for the practical reasons above — they hide use and match everything. Popular exists for a reason; so does bold." },
    { question: "Can you match a custom color?", answer: "Blends offer wide range; true custom matching depends on the system — ask your consultant, and expect honesty about what holds color outdoors." },
  ],
  relatedLinks: [
    { label: "Try the visualizer", href: "/tools/visualizer" },
    { label: "Showroom floors — metallic finishes", href: "/services/showrooms" },
    { label: "Pool decks — heat and color", href: "/services/pool-decks" },
  ],
  relatedServices: [{ label: "Residential garages", href: "/services/residential-garage-floors" }],
};
