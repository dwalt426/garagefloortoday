/** Learning Center — pillar guides, set 2 of 2, plus the registry. */
import type { LearnArticle } from "./learn-articles-1";
import {
  hotTirePickup, moistureTesting, concretePreparation, concreteRepair,
  polyasparticVsEpoxy, polyureaGuide, garageFloorMaintenance, colorSelection,
} from "./learn-articles-1";

const d = "July 2026";

export const costGuide: LearnArticle = {
  slug: "cost-guide",
  meta: {
    title: "Garage Floor Coating Cost Guide: What Drives the Price",
    description: "What garage floor coatings cost and why — the five price drivers, why quotes differ so much, where cheap quotes cut, and how to compare bids honestly.",
  },
  title: "The cost guide: what actually drives your quote",
  updatedAt: d, readingMinutes: 8,
  blocks: [
    { type: "paragraph", text: "Coating quotes for the same garage can differ by thousands, and the difference is rarely the color. It's almost always in the work you can't see. Here are the five real price drivers — so you can read any quote, including ours." },
    { type: "heading", text: "1. Square footage — the baseline" },
    { type: "paragraph", text: "Materials and labor scale with area. A one-car garage runs roughly 250 sq ft, two-car around 450, three-car around 650. This is the only driver every quote handles the same way." },
    { type: "heading", text: "2. Preparation scope — the divider" },
    { type: "paragraph", text: "Diamond grinding, moisture testing, decontamination, and crack repair are labor- and equipment-heavy. This is where dramatically cheaper quotes are cheaper — acid etching instead of grinding, no testing, caulked cracks. The line item is invisible in the finished floor and decisive in its lifespan." },
    { type: "heading", text: "3. System chemistry and layers" },
    { type: "paragraph", text: "Single-coat epoxy costs less than a polyaspartic system, which costs less than a multi-layer hybrid. More layers and better chemistry cost more and do more — the honest question is whether your floor's use justifies the stack (sometimes it doesn't; see the system pages)." },
    { type: "heading", text: "4. Slab condition" },
    { type: "paragraph", text: "Heavy cracking, old coatings to remove, oil contamination, or high moisture readings add scope. A fair quote states this after inspection rather than discovering it as change orders." },
    { type: "heading", text: "5. What's included after install day" },
    { type: "paragraph", text: "Warranty terms, documentation, and support differ enormously. A verifiable transferable warranty and a permanent install record are part of what you're buying — or not buying." },
    { type: "callout", text: "For your numbers: the cost calculator gives an instant installed range, and the Smart Estimator adds your slab condition and finish tier. Both state their assumptions openly." },
    { type: "heading", text: "How to compare bids" },
    { type: "paragraph", text: "Ask each bidder the same four questions: How do you prepare the concrete? Do you moisture test and record it? What exactly are the layers? Is the warranty written and transferable? The quotes will stop looking identical immediately." },
  ],
  faqs: [
    { question: "Why not just publish exact prices?", answer: "Because prep scope honestly varies by slab. What we publish instead: transparent ranges, the drivers, and calculators with stated assumptions — the opposite of 'call for pricing.'" },
    { question: "Is financing available?", answer: "Yes — with the amortization math shown openly. See the financing calculator." },
  ],
  relatedLinks: [
    { label: "Cost calculator", href: "/tools/cost-calculator" },
    { label: "Smart Estimator", href: "/estimate" },
    { label: "Concrete preparation guide", href: "/learn/concrete-preparation" },
  ],
  relatedServices: [{ label: "Residential garages", href: "/services/residential-garage-floors" }],
};

export const buyersGuide: LearnArticle = {
  slug: "buyers-guide",
  meta: {
    title: "Garage Floor Coating Buyer's Guide: Choose Without Regret",
    description: "The complete buyer's guide — the decision sequence (surface, system, finish, installer), the questions that expose weak installers, and the traps that create regret.",
  },
  title: "The buyer's guide: how to choose a floor you won't regret",
  updatedAt: d, readingMinutes: 9,
  blocks: [
    { type: "paragraph", text: "Most flooring regret comes from deciding in the wrong order: falling for a color, then a price, then discovering what the price omitted. The regret-proof order is surface → system → finish → installer. This guide walks it." },
    { type: "heading", text: "Step 1: Understand your surface" },
    { type: "paragraph", text: "Your slab's moisture, condition, climate, and use determine everything downstream. A basement is a moisture problem first; a shop is an impact problem first; a pool deck is a safety problem first. Read the service page for your application — each has its own standard." },
    { type: "heading", text: "Step 2: Match the system" },
    { type: "paragraph", text: "Epoxy, polyaspartic, polyurea, or a hybrid stack — each has honest strengths and limits (the system pages state both). Beware any company whose answer never varies; that's inventory talking." },
    { type: "heading", text: "Step 3: Choose the finish" },
    { type: "paragraph", text: "Now the fun part, safely — blend, texture, and color, chosen with the color framework and the visualizer at room scale." },
    { type: "heading", text: "Step 4: Vet the installer — the four questions" },
    { type: "paragraph", text: "How do you prepare concrete (grinding, or 'etching'?). Do you moisture-test and record readings? Who exactly installs — named employees or subs? Is the warranty written, transferable, and verifiable? Weak installers get vague on question one and stay vague." },
    { type: "callout", text: "The documentation test beats every review: ask to see the actual records of a past job. If records don't exist, the marketing is the product." },
    { type: "heading", text: "The three classic traps" },
    { type: "paragraph", text: "The urgency discount ('today only' pricing signals a sales system, not a craft). The one-day pitch without a prep answer (speed should come from chemistry, never skipped prep). The unverifiable lifetime warranty (a warranty nobody can look up is a sentence, not coverage)." },
  ],
  faqs: [
    { question: "DIY kit or professional?", answer: "A DIY kit is a season-to-few-years product at a fraction of the cost; a professional system is a decades product. Both are legitimate purchases if bought knowingly — the failure is expecting one to be the other. See the failure guide for what the difference looks like." },
    { question: "When's the best season to install?", answer: "Modern systems install year-round in most climates; scheduling is usually easier off-peak. Slab temperature and humidity are handled by your crew's process, not your calendar." },
  ],
  relatedLinks: [
    { label: "Cost guide", href: "/learn/cost-guide" },
    { label: "Why floors fail", href: "/learn/failure-guide" },
    { label: "Compare systems", href: "/coatings/compare" },
  ],
  relatedServices: [{ label: "All services", href: "/services/garage-floor-coatings" }],
};

export const failureGuide: LearnArticle = {
  slug: "failure-guide",
  meta: {
    title: "Why Garage Floor Coatings Fail: The Diagnostic Guide",
    description: "Peeling, bubbling, yellowing, cracking — every major coating failure diagnosed: what it looks like, what caused it, and whether it was preventable (usually yes).",
  },
  title: "Why floors fail: a diagnostic guide to every major failure",
  updatedAt: d, readingMinutes: 9,
  blocks: [
    { type: "paragraph", text: "Coating failures look mysterious and almost never are. Each failure mode has a signature, and each signature points at a specific skipped step or wrong choice. Diagnose your floor — or vet your next installer by what they know about this list." },
    { type: "heading", text: "Tire-shaped peeling → hot tire pickup" },
    { type: "paragraph", text: "Bond failure at the concrete: inadequate grinding, contamination, or soft chemistry. The most common failure and the most preventable. Full mechanism in the hot-tire guide." },
    { type: "heading", text: "Bubbles and blisters → moisture from below" },
    { type: "paragraph", text: "Vapor pressure lifting the coating, months after install. Signature of skipped moisture testing — the invisible step. Basements and slabs without vapor barriers are the classic victims." },
    { type: "heading", text: "Yellowing and chalking → UV on the wrong chemistry" },
    { type: "paragraph", text: "Epoxy outdoors or at a sunny door line. Not a defect in the epoxy — a specification error by whoever put it in the sun." },
    { type: "heading", text: "Cracks in the coating along old lines → telegraphing" },
    { type: "paragraph", text: "Cosmetic crack fills moving under the coating. The repair guide covers the structural fix." },
    { type: "heading", text: "Uniform early wear → wrong system for the traffic" },
    { type: "paragraph", text: "A residential-grade coating under commercial or workshop abuse. Specification failure, not product failure." },
    { type: "heading", text: "Fisheyes, craters, peeling sheets → contamination" },
    { type: "paragraph", text: "Oil, sealers, or silicone under the coating. Shop floors coated without decontamination fail this way on schedule." },
    { type: "callout", text: "Notice the pattern: five of six failures are decided before any coating is opened. That's why our record of your floor is mostly a record of its preparation." },
    { type: "heading", text: "What to do with a failed floor" },
    { type: "paragraph", text: "Honest answer: most failed coatings need removal (grinding off) and correct reinstallation — patching a bond-failure floor grafts new coating onto the same doomed foundation. We'll diagnose for free and tell you which case yours is." },
  ],
  faqs: [
    { question: "Can I coat over my failing floor?", answer: "Over a failing one, no — the new coating inherits the old bond. Over a sound old coating, sometimes, after evaluation and proper abrasion. The inspection determines which you have." },
    { question: "Is my failure covered by the old installer's warranty?", answer: "That depends on what was documented at install — which is usually nothing, which is usually the problem. It's the exact gap FloorPassport™ exists to close." },
  ],
  relatedLinks: [
    { label: "Hot tire pickup", href: "/learn/hot-tire-pickup" },
    { label: "Moisture testing", href: "/learn/moisture-testing" },
    { label: "Concrete repair", href: "/learn/concrete-repair" },
  ],
  relatedServices: [{ label: "Residential garages", href: "/services/residential-garage-floors" }],
};

export const armorPrepGuide: LearnArticle = {
  slug: "armorprep-guide",
  meta: {
    title: "ArmorPrep™ Explained: Inside GFT's Preparation Protocol",
    description: "A step-by-step walkthrough of ArmorPrep™ — diamond grinding, moisture testing, decontamination, structural repair — and why each step is photographed and recorded.",
  },
  title: "Inside ArmorPrep™: the protocol, step by step",
  updatedAt: d, readingMinutes: 6,
  blocks: [
    { type: "paragraph", text: "ArmorPrep™ is our named preparation protocol — the unglamorous hours that decide whether your floor is a decades product. This walkthrough shows exactly what happens and why every step lands on your FloorPassport™." },
    { type: "heading", text: "Step 1: Inspection and moisture baseline" },
    { type: "paragraph", text: "Slab condition mapped, cracks and contamination noted, and moisture vapor transmission measured — the reading that will drive system selection. Recorded." },
    { type: "heading", text: "Step 2: Decontamination where needed" },
    { type: "paragraph", text: "Oil, old sealers, paint, and adhesives removed — degreasing plus grinding through. Shop floors get the heaviest version of this step." },
    { type: "heading", text: "Step 3: Diamond grinding" },
    { type: "paragraph", text: "HEPA-extracted diamond grinding removes laitance and opens the pore structure — the mechanical profile every bond depends on. Photographed before anything covers it." },
    { type: "heading", text: "Step 4: Structural repair" },
    { type: "paragraph", text: "Cracks filled rigid and ground flush; spalls rebuilt; expansion joints honored. The repair guide covers why cosmetic fills aren't allowed." },
    { type: "heading", text: "Step 5: Post-grind verification" },
    { type: "paragraph", text: "Moisture re-checked, profile verified, and the system selection confirmed against the readings — with mitigation added if the slab demands it." },
    { type: "callout", text: "Every step above generates a record — photos, readings, decisions — that outlives the crew's memory and any future warranty question. Documentation over promises." },
  ],
  faqs: [
    { question: "How long does ArmorPrep™ take?", answer: "Typically the first hours of a residential install day; longer where repair or decontamination scope is real. Your estimate states expected scope after inspection." },
    { question: "Is all this really necessary for a good slab?", answer: "Grinding and testing, always — 'good-looking' slabs hide laitance and moisture routinely. Repair and decontamination scale to what inspection finds, including to zero." },
  ],
  relatedLinks: [
    { label: "ArmorPrep™ overview", href: "/armorprep" },
    { label: "Concrete preparation — the general case", href: "/learn/concrete-preparation" },
    { label: "The GarageFloorToday Standard™", href: "/standard" },
  ],
  relatedServices: [{ label: "All services", href: "/services/garage-floor-coatings" }],
};

export const floorPassportGuide: LearnArticle = {
  slug: "floorpassport-guide",
  meta: {
    title: "FloorPassport™ Guide: How Your Floor's Record Works",
    description: "How FloorPassport™ works end to end — what's recorded at install, how public lookup protects privacy, how transfer at home sale works, and why records beat reviews.",
  },
  title: "The FloorPassport™ guide: your floor's permanent record, explained",
  updatedAt: d, readingMinutes: 6,
  blocks: [
    { type: "paragraph", text: "Every GFT floor gets a FloorPassport™ under a GFT Project ID™ — a permanent record of how the floor was built. This guide covers what's in it, who can see what, and why it changes the economics of trust in this industry." },
    { type: "heading", text: "What gets recorded, and when" },
    { type: "paragraph", text: "At scheduling, your Project ID is assigned. During ArmorPrep™: moisture readings and prep photos. During installation: materials, batch numbers, blend, and the named crew. At completion: finished photos, warranty terms, and your maintenance schedule. Afterward: every service visit, appended forever." },
    { type: "heading", text: "Public lookup vs. your private record" },
    { type: "paragraph", text: "Anyone with a Project ID — from your yard sign, say — can verify the floor's technical record and warranty status. What they can't see: your name, address, or contact details. Your private portal adds invoices, documents, and account details on top of the public technical record." },
    { type: "heading", text: "Transfer at home sale" },
    { type: "paragraph", text: "Selling? The FloorPassport™ and warranty transfer to the buyer under the same Project ID. A buyer can verify everything before closing — turning 'the garage floor was professionally done' from a listing claim into a checkable fact." },
    { type: "callout", text: "Why records beat reviews: reviews tell you how strangers felt; records show you what was done. Both matter — only one is evidence." },
  ],
  faqs: [
    { question: "What if my installer's company disappeared?", answer: "That's the industry's classic warranty failure and precisely what a platform-level record prevents: your FloorPassport™ lives with GFT nationally, not in one crew's filing cabinet." },
    { question: "Can I see one before buying?", answer: "Yes — the lookup page resolves any completed floor's public record. Transparency you can test before you're a customer is the point." },
  ],
  relatedLinks: [
    { label: "FloorPassport™ overview", href: "/floorpassport" },
    { label: "Look one up", href: "/lookup" },
    { label: "Warranty guide", href: "/learn/warranty-guide" },
  ],
  relatedServices: [{ label: "All services", href: "/services/garage-floor-coatings" }],
};

export const warrantyGuide: LearnArticle = {
  slug: "warranty-guide",
  meta: {
    title: "Garage Floor Warranty Guide: Reading Coverage Like a Pro",
    description: "How to read any coating warranty — the exclusions that gut coverage, why undocumented installs make claims unwinnable, and what a verifiable warranty changes.",
  },
  title: "The warranty guide: how to read coverage like a pro",
  updatedAt: d, readingMinutes: 7,
  blocks: [
    { type: "paragraph", text: "'Lifetime warranty' is the most-printed and least-examined phrase in this industry. This guide teaches you to read any coating warranty — including ours — like someone who's seen how claims actually go." },
    { type: "heading", text: "The three questions that matter" },
    { type: "paragraph", text: "What's covered (adhesion? hot-tire? wear? UV?). What's excluded (the paragraph that giveth usually has a paragraph that taketh). And the sleeper: how is a claim decided — against what evidence?" },
    { type: "heading", text: "The exclusion patterns to know" },
    { type: "paragraph", text: "'Improper maintenance' — undefined, it can mean anything. 'Pre-existing slab conditions' — meaningless unless slab condition was documented at install. 'Normal wear' — reasonable in principle, elastic in practice. None of these are inherently dishonest; all of them are unfalsifiable without records." },
    { type: "heading", text: "Why undocumented installs make claims unwinnable" },
    { type: "paragraph", text: "The classic dispute: homeowner says defective install; installer says bad slab or bad maintenance. With no install-time evidence, it's word against word, and the party holding the checkbook usually wins. This isn't cynicism — it's the structural reason coating warranties have a bad name." },
    { type: "callout", text: "A warranty is exactly as strong as the records behind it. Moisture readings, prep photos, and batch numbers at install time turn a claim from an argument into a lookup." },
    { type: "heading", text: "What to demand from any installer" },
    { type: "paragraph", text: "Written terms before signing. Transferability in writing if you might sell. And documentation of the install itself — because coverage you can't evidence is coverage you don't have. Our terms live on your FloorPassport™, verifiable by ID; final published terms carry legal review, as they should anywhere." },
  ],
  faqs: [
    { question: "Is 'lifetime' real?", answer: "Read what 'lifetime' modifies (the floor's serviceable life? yours? the company's?) and what's excluded. A shorter, specific, documented warranty routinely outperforms a vague lifetime one at claim time." },
    { question: "What voids coverage?", answer: "Per terms — but the honest general answer industry-wide: things the installer can attribute to you. Which is why install-time documentation protects the homeowner most of all." },
  ],
  relatedLinks: [
    { label: "GFT warranty", href: "/warranty" },
    { label: "FloorPassport™ guide", href: "/learn/floorpassport-guide" },
    { label: "Buyer's guide", href: "/learn/buyers-guide" },
  ],
  relatedServices: [{ label: "All services", href: "/services/garage-floor-coatings" }],
};

export const commercialFlooring: LearnArticle = {
  slug: "commercial-flooring",
  meta: {
    title: "Commercial Floor Coating Buyer's Guide for Facilities",
    description: "The facilities-side guide to commercial coatings: specifying by exposure and traffic, minimizing downtime, documentation for compliance, and comparing bids.",
  },
  title: "Commercial flooring: the facilities buyer's guide",
  updatedAt: d, readingMinutes: 7,
  blocks: [
    { type: "paragraph", text: "Commercial coating decisions are engineering-procurement decisions wearing a design hat. This guide is for the person who owns the outcome — facilities, operations, or the owner — covering specification, downtime, documentation, and bid comparison." },
    { type: "heading", text: "Specify by exposure, not by brochure" },
    { type: "paragraph", text: "The spec should start from your inputs: traffic type and volume, chemical inventory, thermal conditions, slip obligations, and existing slab condition (including moisture, mapped, not sampled once on a large slab). A vendor who quotes before asking these is quoting a product, not your floor." },
    { type: "heading", text: "Downtime is a spec line" },
    { type: "paragraph", text: "Fast-cure chemistry and zoned, staged installation exist precisely for operations that can't stop. Make return-to-service and phasing explicit in the bid — the cheapest floor installed over a closed week can be the most expensive floor you buy." },
    { type: "heading", text: "Documentation as a compliance asset" },
    { type: "paragraph", text: "Batch numbers, materials, readings, and install records serve audits, safety reviews, and future maintenance planning. On GFT projects that's the FloorPassport™ — ask any bidder what their equivalent is." },
    { type: "heading", text: "Comparing bids that refuse to compare" },
    { type: "paragraph", text: "Normalize every bid to the same five lines: prep scope (method and testing), system stack (each layer named), downtime plan, warranty terms with evidence basis, and documentation delivered. Identical-looking totals separate fast." },
    { type: "callout", text: "See the application pages for surface-specific standards: commercial, warehouse (lane traffic, striping), industrial (chemical/load), showroom (finish-critical), and automotive (decontamination)." },
  ],
  faqs: [
    { question: "Multi-site rollout — can standards stay consistent?", answer: "That's the point of a national standard and central documentation: the same spec, process, and records at every location, coordinated centrally." },
    { question: "Who handles slip-resistance compliance?", answer: "The spec does — slip resistance is set as a requirement of the application standard for your space type, in writing, before installation." },
  ],
  relatedLinks: [
    { label: "Commercial coatings", href: "/services/commercial-concrete-coatings" },
    { label: "Warehouse floors", href: "/services/warehouse" },
    { label: "Industrial floors", href: "/services/industrial" },
  ],
  relatedServices: [{ label: "Commercial", href: "/services/commercial-concrete-coatings" }],
};

export const garageFloorCoatingsGuide: LearnArticle = {
  slug: "garage-floor-coatings",
  meta: {
    title: "Garage Floor Coatings: The Complete Guide",
    description: "The definitive starting point: how coatings work, the chemistry families, why preparation rules lifespan, cost drivers, finish options, and where to go deeper.",
  },
  title: "Garage floor coatings: the complete guide",
  updatedAt: d, readingMinutes: 10,
  blocks: [
    { type: "paragraph", text: "This is the front door of the Learning Center — the full map of how garage floor coatings work, condensed, with a path deeper on every topic. If you read one page before talking to any installer (including us), read this one." },
    { type: "heading", text: "What a coating system actually is" },
    { type: "paragraph", text: "Not paint. A coating system is layers of reactive polymers bonded into mechanically prepared concrete: a profile ground into the slab, a base coat anchored in it, optional broadcast texture (flake, quartz), and a wear topcoat. Each layer has a job; the bond into the concrete is the foundation of all of them." },
    { type: "heading", text: "The chemistry families in one paragraph" },
    { type: "paragraph", text: "Epoxy: thick, economical, strong indoors; yellows in UV, cures slow. Polyaspartic: UV-stable, fast-cure, the residential standard. Polyurea: the toughness chemistry for demanding floors. Hybrids: deliberate stacks using each where it's best. Full honesty on each at the system pages." },
    { type: "heading", text: "The rule that outranks chemistry" },
    { type: "paragraph", text: "Preparation determines lifespan more than product choice. Grinding, moisture testing, decontamination, and structural repair are where floors are actually won or lost — and where cheap quotes are actually cheap. The preparation guide and failure guide make this concrete." },
    { type: "heading", text: "Choosing: surface first" },
    { type: "paragraph", text: "Garages, shops, basements, patios, pool decks, and commercial floors each carry a different defining constraint (hot tires, impact, moisture, UV, slip safety, traffic). Every application has its own standard on its service page — start with yours." },
    { type: "heading", text: "Cost, finish, and the paper trail" },
    { type: "paragraph", text: "Cost drivers and bid comparison live in the cost guide; color strategy in the color guide; and the case for documented installs — records, verifiable warranty, transferable history — in the FloorPassport™ and warranty guides." },
    { type: "callout", text: "Fastest useful next steps: your surface's service page → the cost calculator → the buyer's guide's four installer questions." },
  ],
  faqs: [
    { question: "How long does a coated floor last?", answer: "Properly prepared and specified systems are decades products; DIY kits are seasons-to-years products. The difference is mostly preparation — see the failure guide for what shortcuts look like later." },
    { question: "What makes GFT different, in one sentence?", answer: "The process is documented — readings, photos, materials, crew, warranty — on a permanent record you and any future buyer can verify." },
  ],
  relatedLinks: [
    { label: "Buyer's guide", href: "/learn/buyers-guide" },
    { label: "Cost guide", href: "/learn/cost-guide" },
    { label: "Compare systems", href: "/coatings/compare" },
  ],
  relatedServices: [{ label: "All services", href: "/services/garage-floor-coatings" }],
};

export const allLearnArticles: LearnArticle[] = [
  garageFloorCoatingsGuide, buyersGuide, costGuide, failureGuide,
  hotTirePickup, moistureTesting, concretePreparation, concreteRepair,
  polyasparticVsEpoxy, polyureaGuide, armorPrepGuide, floorPassportGuide,
  warrantyGuide, garageFloorMaintenance, colorSelection, commercialFlooring,
];
