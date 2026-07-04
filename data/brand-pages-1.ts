/** Core brand pages — Phase 3 of the Master Build.
 *  Copy follows the Master Prompt writing rules: specificity over superlatives,
 *  process over promises, every claim supportable or flagged for verification.
 */
import type { BrandPageContent } from "../app/templates/BrandPage";

export const aboutPage: BrandPageContent = {
  slug: "about",
  meta: {
    title: "About GarageFloorToday | America's Premium Concrete Coating Company",
    description: "GarageFloorToday installs premium concrete coating systems with documented preparation, certified crews, and a permanent record of every floor. Learn how we work.",
    canonical: "https://garagefloortoday.com/about",
  },
  eyebrow: "About",
  h1: "We document floors the way engineers document builds.",
  intro: "GarageFloorToday exists because concrete coating had a trust problem: identical promises, invisible prep work, and warranties nobody could verify. We built a company where the process is visible, the materials are recorded, and every floor carries its own permanent history.",
  sections: [
    {
      heading: "Why we started",
      body: "Most coating failures trace back to the work nobody sees — skipped grinding, untested moisture, cracks painted over instead of repaired. The industry's answer was louder marketing. Ours was documentation. When preparation is photographed, moisture readings are recorded, and batch numbers are logged, quality stops being a claim and becomes a record.",
    },
    {
      heading: "How we're structured",
      body: "GarageFloorToday pairs national systems with local crews. Training, materials standards, warranty terms, and the digital platform are identical in every market. The people installing your floor are local, certified, and named on your project record — not subcontracted strangers.",
    },
    {
      heading: "What we're building toward",
      body: "A national network where a homeowner in any state gets the same standard, the same documentation, and the same transferable record. Every design and operational decision is made for that scale.",
    },
  ],
  relatedLinks: [
    { label: "The GarageFloorToday Standard™", href: "/standard" },
    { label: "FloorPassport™ — how documentation works", href: "/floorpassport" },
    { label: "Careers at GFT", href: "/careers" },
  ],
  primaryCta: { label: "Get My Free Estimate", href: "/estimate" },
  structuredDataType: "AboutPage",
};

export const whyGftPage: BrandPageContent = {
  slug: "why-gft",
  meta: {
    title: "Why GarageFloorToday | Documented Craftsmanship, Engineered Systems",
    description: "Four answers to the only questions that matter: why trust us, why now, why GFT, and why not someone else. Documented prep, engineered material selection, permanent records.",
    canonical: "https://garagefloortoday.com/why-gft",
  },
  eyebrow: "Why GFT",
  h1: "Four questions. Straight answers.",
  intro: "Choosing a coating company means sorting identical claims. Here is exactly what's different about ours — and how you can verify each part rather than take our word for it.",
  sections: [
    {
      heading: "Why trust us?",
      body: "Because you don't have to. Every install is documented — moisture readings before and after grinding, prep photos at each stage, material batch numbers, and the names of the crew — all recorded on your FloorPassport™. Trust built on records is stronger than trust built on reviews alone.",
    },
    {
      heading: "Why now?",
      body: "Concrete problems compound. Cracks widen with slab movement, moisture damage spreads, and bare concrete dusts and stains permanently. A properly prepared coating stops that progression. There's no fake urgency here — just the honest physics that earlier is cheaper than later.",
    },
    {
      heading: "Why GarageFloorToday?",
      body: "Engineered material selection instead of one-product dogma. Some companies sell only polyaspartic; some sell only what's cheapest. The GFT Performance System matches epoxy, polyaspartic, or polyurea-hybrid chemistry to your slab's moisture, your climate, and your usage — and records the reasoning.",
    },
    {
      heading: "Why not someone else?",
      body: "Compare on specifics: Do they publish moisture readings? Do they photograph prep? Is the warranty transferable, and can a future buyer of your home verify it? Do you know who is installing your floor by name? If a competitor answers yes to all of these, they've earned consideration. Most can't.",
    },
  ],
  faqs: [
    { question: "Are you the cheapest option?", answer: "Usually not. Skipped preparation is where cheap quotes come from, and it's also where failures come from. Our pricing reflects full ArmorPrep™ scope on every job — and financing brings a properly built floor within most budgets." },
    { question: "Do you use subcontractors?", answer: "Floors are installed by certified GFT crews named on your project record. Crew members appear on your FloorPassport™ and on your local team page." },
  ],
  relatedLinks: [
    { label: "The GarageFloorToday Standard™", href: "/standard" },
    { label: "Compare coating systems", href: "/coatings/compare" },
    { label: "See a live FloorPassport™", href: "/floorpassport" },
  ],
  primaryCta: { label: "Get My Free Estimate", href: "/estimate" },
  structuredDataType: "FAQPage",
};

export const standardPage: BrandPageContent = {
  slug: "standard",
  meta: {
    title: "The GarageFloorToday Standard™ | Our Six-Step Operating Discipline",
    description: "The six non-negotiable steps every GarageFloorToday project follows: ArmorPrep™ preparation, crack repair, engineered material selection, certified crews, FloorPassport™ documentation, lifetime support.",
    canonical: "https://garagefloortoday.com/standard",
  },
  eyebrow: "The GarageFloorToday Standard™",
  h1: "Every project. Every market. The same standard.",
  intro: "The Standard is our operating discipline — six steps that happen on every project whether it's a one-car garage or a commercial facility. It isn't a slogan. It's a checklist your crew completes and your FloorPassport™ documents.",
  sections: [
    {
      heading: "The six steps",
      body: "Each step below is verified and recorded before the project closes. If a step doesn't apply, the record says why.",
      checklist: [
        { label: "ArmorPrep™ diamond grinding & moisture testing", detail: "Mechanical grinding opens the concrete's pore structure; moisture vapor transmission is measured and recorded before and after." },
        { label: "Crack repair", detail: "Structural repair of cracks and spalls — not cosmetic fills that telegraph back through the coating." },
        { label: "GFT Performance System material selection", detail: "Chemistry matched to measured moisture, climate, and usage. The reasoning is recorded, not just the choice." },
        { label: "Certified installer crews", detail: "Named individuals with documented training — on your record, not anonymous labor." },
        { label: "FloorPassport™ documentation", detail: "Photos, readings, batch numbers, and warranty in one permanent record under your GFT Project ID™." },
        { label: "Lifetime performance support", detail: "Maintenance schedule, service history, and a warranty that transfers with your home." },
      ],
    },
    {
      heading: "Why a named standard matters",
      body: "Anyone can say 'quality work.' A named, published checklist creates accountability: you know what's supposed to happen, the crew knows what's verified, and the record shows what was done. Franchise scale makes this more important, not less — the Standard is how a floor in Ohio and a floor in Arizona end up equally well built.",
    },
  ],
  relatedLinks: [
    { label: "ArmorPrep™ — why preparation decides everything", href: "/armorprep" },
    { label: "GFT Performance System — how we choose materials", href: "/performance-system" },
    { label: "FloorPassport™ — your permanent record", href: "/floorpassport" },
  ],
  primaryCta: { label: "Get My Free Estimate", href: "/estimate" },
  structuredDataType: "WebPage",
};

export const armorPrepPage: BrandPageContent = {
  slug: "armorprep",
  meta: {
    title: "ArmorPrep™ Surface Preparation | Diamond Grinding & Moisture Testing",
    description: "ArmorPrep™ is GarageFloorToday's documented preparation protocol: diamond grinding, moisture vapor testing, and structural crack repair — the work that decides whether a coating lasts.",
    canonical: "https://garagefloortoday.com/armorprep",
  },
  eyebrow: "ArmorPrep™",
  h1: "Preparation decides whether a floor lasts. So we document it.",
  intro: "Most coating failures aren't coating failures — they're preparation failures. Hot-tire peeling, bubbling, and delamination almost always trace to concrete that wasn't ground, tested, or repaired before coating. ArmorPrep™ is our named protocol for the work you'd otherwise never see.",
  sections: [
    {
      heading: "Diamond grinding, not acid etching",
      body: "We mechanically grind every slab with diamond tooling to open the concrete's pore structure and create the profile coatings need to bond. Acid etching — the shortcut common in DIY kits and low-bid installs — leaves laitance and contamination that grinding removes. Your prep photos show the ground surface before anything is applied.",
    },
    {
      heading: "Moisture testing, recorded",
      body: "Moisture vapor rising through a slab is a leading cause of coating failure, and it's invisible at install time. We measure moisture vapor transmission before coating and record the readings on your FloorPassport™. If readings exceed the system's tolerance, we address it — a vapor-mitigating primer or a different system — and the record shows the decision.",
    },
    {
      heading: "Structural crack repair",
      body: "Cracks are repaired with rigid structural fillers ground flush, not smeared with caulk. Slab movement is real — especially in expansive-soil regions — and repair done correctly keeps movement from telegraphing through the finished floor.",
    },
  ],
  faqs: [
    { question: "How long does ArmorPrep™ take?", answer: "Typically the first several hours of a one-day residential install; longer where repair scope is significant. Your estimate states the expected prep scope after we inspect the slab." },
    { question: "Is grinding messy?", answer: "Grinders run with HEPA-filtered dust extraction. Some dust is unavoidable; a coating over unground concrete is a bigger problem than dust." },
  ],
  relatedLinks: [
    { label: "The GarageFloorToday Standard™", href: "/standard" },
    { label: "Learning Center: concrete preparation explained", href: "/learn/concrete-preparation" },
    { label: "Learning Center: what causes hot tire pickup", href: "/learn/hot-tire-pickup" },
  ],
  primaryCta: { label: "Get My Free Estimate", href: "/estimate" },
  structuredDataType: "Service",
};

export const performanceSystemPage: BrandPageContent = {
  slug: "performance-system",
  meta: {
    title: "GFT Performance System™ | Engineered Coating Selection",
    description: "The GFT Performance System matches epoxy, polyaspartic, or polyurea-hybrid chemistry to six measured factors: environment, moisture, usage, climate, finish, and performance goals.",
    canonical: "https://garagefloortoday.com/performance-system",
  },
  eyebrow: "GFT Performance System™",
  h1: "The right system for your garage. Not the only system we sell.",
  intro: "Some companies sell one chemistry and call it the best for everyone. We think that's backwards. The GFT Performance System is a selection framework: six factors, measured on your actual slab, that determine which coating chemistry your floor should get.",
  sections: [
    {
      heading: "The six factors",
      body: "Every recommendation starts from measurement, not preference.",
      checklist: [
        { label: "Environment", detail: "Indoor garage, outdoor patio, or below-grade basement — each changes vapor behavior and UV exposure." },
        { label: "Moisture", detail: "Measured vapor transmission from your slab, recorded during ArmorPrep™." },
        { label: "Usage", detail: "Daily parking, workshop with jacks and tools, showroom, or commercial traffic." },
        { label: "Climate", detail: "Freeze-thaw cycling, sustained heat, humidity, and road-salt exposure in your region." },
        { label: "Finish", detail: "Flake, metallic, quartz, or solid — some finishes pair better with certain base chemistries." },
        { label: "Performance goals", detail: "Longevity priorities, chemical resistance needs, return-to-service timing." },
      ],
    },
    {
      heading: "Why not one product for everyone?",
      body: "Single-product companies have a marketing advantage — one simple story — and an engineering weakness: when the product doesn't fit the slab, the story wins and the floor loses. Epoxy, polyaspartic, and polyurea each have genuine strengths; our comparison pages state them honestly, including where a cheaper system is genuinely the right call.",
    },
    {
      heading: "The recommendation is recorded",
      body: "Your FloorPassport™ records not just which system was installed, but the readings that drove the choice. If a question ever arises years later, the reasoning is on file — not in a salesperson's memory.",
    },
  ],
  relatedLinks: [
    { label: "Compare: epoxy vs polyaspartic vs polyurea", href: "/coatings/compare" },
    { label: "ArmorPrep™ moisture testing", href: "/armorprep" },
    { label: "Try Engineer My Floor", href: "/tools/engineer-my-floor" },
  ],
  primaryCta: { label: "Engineer My Floor", href: "/tools/engineer-my-floor" },
  structuredDataType: "Service",
};
