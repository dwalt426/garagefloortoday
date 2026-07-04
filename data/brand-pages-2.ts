import type { BrandPageContent } from "../app/templates/BrandPage";

export const floorPassportPage: BrandPageContent = {
  slug: "floorpassport",
  meta: {
    title: "FloorPassport™ | A Permanent Record for Every Floor",
    description: "Every GarageFloorToday installation gets a FloorPassport™ — moisture readings, prep photos, materials, batch numbers, crew, warranty, and maintenance history under one GFT Project ID™.",
    canonical: "https://garagefloortoday.com/floorpassport",
  },
  eyebrow: "FloorPassport™",
  h1: "Like a CarFax for your floor.",
  intro: "Every GarageFloorToday installation is issued a FloorPassport™ — a permanent digital record identified by your GFT Project ID™. Everything about your floor lives in one place: how it was prepared, what went into it, who built it, and what it's covered by.",
  sections: [
    {
      heading: "What's on the record",
      body: "The FloorPassport™ isn't a certificate — it's the actual project data.",
      checklist: [
        { label: "Moisture readings", detail: "Vapor transmission measured before and after grinding, with the system's tolerance threshold." },
        { label: "Preparation photos", detail: "The ground slab, repairs, and each coating stage, photographed by the crew." },
        { label: "Materials & batch numbers", detail: "Exact products and manufacturing batches — traceable if a question ever arises." },
        { label: "Crew", detail: "The certified installers who built your floor, by name." },
        { label: "Warranty", detail: "Terms, start date, and current status — verifiable by anyone with the Project ID." },
        { label: "Maintenance & service history", detail: "Scheduled care, completed visits, and any future repairs, appended to the same record forever." },
      ],
    },
    {
      heading: "It transfers with your home",
      body: "Selling your house? The FloorPassport™ transfers to the new owner — warranty included. A documented floor with a verifiable history is a selling point; a buyer can look up your GFT Project ID™ and see everything. No other proof of 'the garage floor was done professionally' works like this.",
    },
    {
      heading: "Look one up right now",
      body: "Any completed floor's record can be verified at our lookup page with its Project ID — the same ID printed on the installation certificate and yard sign. Transparency you can test before you're a customer is the point.",
    },
  ],
  faqs: [
    { question: "Is my personal information public?", answer: "No. Public lookup shows the floor's technical record — system, readings, warranty status, crew — never your name, address, or contact details." },
    { question: "What if I lose my Project ID?", answer: "It's on your installation certificate, your welcome email, and recoverable through your homeowner portal login or your local GFT team." },
  ],
  relatedLinks: [
    { label: "Look up a FloorPassport™", href: "/lookup" },
    { label: "Warranty details", href: "/warranty" },
    { label: "The GarageFloorToday Standard™", href: "/standard" },
  ],
  primaryCta: { label: "Look Up a Floor", href: "/lookup" },
  structuredDataType: "Service",
};

export const warrantyPage: BrandPageContent = {
  slug: "warranty",
  meta: {
    title: "Warranty | Lifetime Performance Coverage, Transferable & Verifiable",
    description: "GarageFloorToday's warranty is recorded on your FloorPassport™, transferable to future homeowners, and verifiable by Project ID. Here's what's covered and how claims work.",
    canonical: "https://garagefloortoday.com/warranty",
  },
  eyebrow: "Warranty",
  h1: "A warranty you can verify, not just file away.",
  intro: "Most coating warranties live in a drawer and die in a dispute over what was promised. Ours lives on your FloorPassport™ — terms, start date, and status, verifiable by anyone with your GFT Project ID™, and transferable when your home sells.",
  sections: [
    {
      heading: "What's covered",
      body: "Coverage terms — including adhesion, hot-tire pickup, and defect coverage — are stated on your FloorPassport™ at issuance. Because moisture readings and prep documentation are part of the same record, warranty claims start from facts, not recollections. [VERIFY: final warranty terms, exclusions, and durations require legal review before publication.]",
    },
    {
      heading: "Why documentation changes warranties",
      body: "The classic warranty dispute is 'improper maintenance' versus 'improper installation' — unresolvable when installation was never documented. On a GFT floor, the installation record exists: readings, photos, batches. That protects you, and it protects honest work.",
    },
    {
      heading: "Transfer on home sale",
      body: "Warranty transfers to the new homeowner with the FloorPassport™. The transfer is recorded on the same Project ID, so coverage history never fragments.",
    },
  ],
  faqs: [
    { question: "How do I make a claim?", answer: "Contact your local GFT team with your Project ID. The install record is already on file, so claims don't start with an argument about what was done." },
  ],
  relatedLinks: [
    { label: "FloorPassport™ — the record behind the warranty", href: "/floorpassport" },
    { label: "ArmorPrep™ — the prep that prevents claims", href: "/armorprep" },
  ],
  primaryCta: { label: "Get My Free Estimate", href: "/estimate" },
  structuredDataType: "WebPage",
  verificationFlags: ["Final warranty terms, exclusions, durations — legal review required before publish"],
};

export const financingPage: BrandPageContent = {
  slug: "financing",
  meta: {
    title: "Financing | Clear Monthly Payments, No Hidden Math",
    description: "Finance your GarageFloorToday floor with transparent terms. Use the calculator to see monthly payments — standard amortization, stated APR, no games.",
    canonical: "https://garagefloortoday.com/financing",
  },
  eyebrow: "Financing",
  h1: "A properly built floor, on a monthly budget.",
  intro: "A documented, warrantied floor costs more than a weekend DIY kit — and less per year of service life. Financing spreads the difference. Our calculator shows the actual amortization math with the APR stated, because 'no hidden math' should be literal.",
  sections: [
    {
      heading: "How it works",
      body: "Choose terms at your estimate or checkout; approval is handled by our financing partner. Your monthly payment, term, and APR are stated before you sign. [VERIFY: financing partner name, available terms, APR ranges, and promotional offers require partner confirmation before publication.]",
    },
    {
      heading: "Run your own numbers",
      body: "The financing calculator lets you set a project amount and term and see the payment — the same formula lenders use, shown openly. No 'call for details' games.",
    },
  ],
  relatedLinks: [
    { label: "Financing calculator", href: "/tools/financing" },
    { label: "Cost calculator", href: "/tools/cost-calculator" },
    { label: "Smart Estimator", href: "/estimate" },
  ],
  primaryCta: { label: "Calculate My Payment", href: "/tools/financing" },
  structuredDataType: "WebPage",
  verificationFlags: ["Financing partner, terms, APR ranges — partner confirmation required"],
};

export const contactPage: BrandPageContent = {
  slug: "contact",
  meta: {
    title: "Contact GarageFloorToday | Estimates, Support, FloorPassport Help",
    description: "Reach GarageFloorToday for free estimates, existing-project support, FloorPassport™ questions, or franchise inquiries.",
    canonical: "https://garagefloortoday.com/contact",
  },
  eyebrow: "Contact",
  h1: "Talk to a person who knows floors.",
  intro: "Estimates, questions about an existing floor, FloorPassport™ lookups, media, or franchise inquiries — here's the fastest route for each.",
  sections: [
    {
      heading: "New floor",
      body: "The fastest path is the Smart Estimator — you'll see a price range and recommended system before anyone calls you. Prefer to talk first? Call and you'll reach your local team, not a national call center reading a script.",
    },
    {
      heading: "Existing GFT floor",
      body: "Have your GFT Project ID™ ready (it's on your certificate and in your portal). Your floor's full record is on file, so support starts from your actual install — readings, materials, warranty — not from scratch.",
    },
    {
      heading: "Franchise inquiries",
      body: "GarageFloorToday is building a national network on documented standards. If you're an operator who believes craftsmanship should be provable, we'd like to hear from you.",
    },
  ],
  relatedLinks: [
    { label: "Smart Estimator", href: "/estimate" },
    { label: "FloorPassport™ lookup", href: "/lookup" },
    { label: "Careers", href: "/careers" },
  ],
  primaryCta: { label: "Get My Free Estimate", href: "/estimate" },
  structuredDataType: "WebPage",
};

export const careersPage: BrandPageContent = {
  slug: "careers",
  meta: {
    title: "Careers | Build Floors Worth Signing Your Name To",
    description: "GarageFloorToday certifies installers, puts their names on every FloorPassport™, and counts every floor they complete. Careers in a trade where craftsmanship is visible.",
    canonical: "https://garagefloortoday.com/careers",
  },
  eyebrow: "Careers",
  h1: "Your name goes on every floor you build.",
  intro: "Most flooring jobs are anonymous labor on someone else's brand. At GarageFloorToday, certified installers are named on every FloorPassport™, their completed-floor counts are public on local team pages, and craftsmanship is a documented career record — not a claim on a resume.",
  sections: [
    {
      heading: "What certification means here",
      body: "GFT installers train on the full Standard: ArmorPrep™ grinding and moisture testing, structural repair, system chemistry, and documentation. Certification isn't a badge for the website — it's the reason a customer in any market gets the same floor.",
    },
    {
      heading: "A trade with a track record",
      body: "Every floor you complete is on your record. Marcus Webb's crew page says 412 floors because Marcus has installed 412 documented floors. When your work is verifiable, your reputation is portable — inside GFT and in your career.",
    },
    {
      heading: "Roles",
      body: "Installer and crew chief roles in local markets; design consultants; and platform roles (engineering, content, operations) supporting the national system. [VERIFY: live openings feed from the applicant tracking system before publication.]",
    },
  ],
  relatedLinks: [
    { label: "The GarageFloorToday Standard™", href: "/standard" },
    { label: "About GFT", href: "/about" },
  ],
  primaryCta: { label: "See Open Roles", href: "/careers/openings" },
  structuredDataType: "WebPage",
  verificationFlags: ["Open roles list — ATS integration required"],
};

/** Registry consumed by the router — one import, all core pages */
import { aboutPage, whyGftPage, standardPage, armorPrepPage, performanceSystemPage } from "./brand-pages-1";
export const allBrandPages: BrandPageContent[] = [
  aboutPage, whyGftPage, standardPage, armorPrepPage, performanceSystemPage,
  floorPassportPage, warrantyPage, financingPage, contactPage, careersPage,
];
