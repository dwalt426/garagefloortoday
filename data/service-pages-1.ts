/** Phase 4 service landing pages — content set 1 of 2.
 *  Each page solves genuinely different problems; no shared FAQs or copy.
 *  All durability/spec claims kept qualitative or flagged — no fabricated numbers.
 */
import type { ServiceLandingContent } from "../app/templates/ServiceLandingPage";

export const residentialGarage: ServiceLandingContent = {
  slug: "residential-garage-floors",
  meta: {
    title: "Residential Garage Floor Coatings | GarageFloorToday",
    description: "Premium residential garage floor coatings engineered for hot tires, oil, dusting, and salt. Documented ArmorPrep™, matched chemistry, FloorPassport™ record on every install.",
    canonical: "https://garagefloortoday.com/services/residential-garage-floors",
  },
  eyebrow: "Residential Garage",
  h1: "A garage floor built for how you actually use it.",
  valueProp: "Daily parking, weekend projects, kids' bikes, road salt in winter. A residential garage floor faces more variety than almost any surface in your home — and most coatings fail because they were installed for none of it.",
  heroPhotoNote: "real two-car garage, natural light, car parked, some shelving and a bike — lived-in, not a staged empty showroom",
  surfaceFactors: [
    { factor: "Hot tire pickup", explanation: "Warm tires soften and grip weak coatings, pulling them off the slab. Chemistry and prep both decide whether this happens." },
    { factor: "Oil and automotive fluids", explanation: "Drips and leaks stain and degrade unsealed concrete and low-grade coatings alike." },
    { factor: "Concrete dusting", explanation: "Bare and painted slabs shed fine dust constantly — onto tools, storage, and cars." },
    { factor: "Road salt (freeze-thaw regions)", explanation: "Salt tracked in over winter attacks concrete and cheap finishes; chloride resistance matters in cold climates." },
  ],
  recommendation: {
    headline: "For most residential garages, we recommend a polyaspartic or polyurea-hybrid system.",
    body: "In freeze-thaw climates we lean toward polyurea-hybrid for chloride and impact resistance; in milder climates a polyaspartic system delivers UV stability and fast return to parking. The final call follows your slab's measured moisture and your usage — a workshop garage gets a different spec than a park-and-go garage.",
    typicalSystem: "GFT Performance — Polyaspartic or Polyurea Hybrid",
  },
  armorPrepScope: "Residential ArmorPrep™ means diamond grinding the full slab, moisture-testing before coating, and repairing cracks and any spalling around the door line where freeze-thaw damage concentrates. Expansion joints are evaluated and honored rather than coated over.",
  applicationStandard: [
    { requirement: "Moisture test required", note: "Recorded pre- and post-grind on your FloorPassport™." },
    { requirement: "Crack inspection required", note: "Structural repair of cracks and spalls before coating." },
    { requirement: "Expansion joint evaluation", note: "Joints honored, not bridged, to prevent telegraphing." },
    { requirement: "Hot tire resistance required", note: "System selected and prepped to resist hot-tire pickup." },
    { requirement: "UV stability where sun reaches", note: "For garages with west-facing doors or frequent open time." },
    { requirement: "FloorPassport™ included", note: "Every residential install, no exceptions." },
  ],
  commonProblems: [
    { problem: "My old epoxy is peeling under the tires", cause: "Hot-tire pickup on an under-prepared or low-grade epoxy floor.", howGftAddresses: "Diamond-ground profile plus a hot-tire-resistant system; the failure mode is designed out, not painted over." },
    { problem: "The floor won't stop making dust", cause: "Bare or painted concrete shedding surface laitance.", howGftAddresses: "Grinding removes laitance; the sealed coating eliminates dusting entirely." },
    { problem: "Salt stains every winter", cause: "Chloride attack on unprotected concrete.", howGftAddresses: "Chloride-resistant chemistry selected for cold-climate garages." },
  ],
  comparison: {
    title: "Coating vs. garage floor paint",
    body: "Garage floor paint and DIY epoxy kits are a coat of product over largely unprepared concrete. They look good for a season, then peel at the tires and stain at the drips. A professionally ground, moisture-tested, correctly matched coating system is a different category of product with a different service life — which is why we document the difference rather than just assert it.",
  },
  maintenance: "Rinse or damp-mop as needed; a full wash a few times a year. No waxing, no resealing on the normal maintenance schedule. Your FloorPassport™ includes a maintenance reminder cadence specific to your system.",
  faqs: [
    { question: "Can I park on it the same day?", answer: "Return-to-service depends on the system; polyaspartic systems typically allow foot traffic and parking far faster than epoxy. Your crew gives you the exact timing for your install." },
    { question: "Will it be slippery when wet?", answer: "Broadcast flake adds texture, and slip-resistant additives can be specified for wetter garages. Tell your consultant if this is a priority." },
    { question: "Does it work over an old coating?", answer: "Sometimes — but only after evaluation. Grinding through or removing a failing prior coating is often necessary; the estimate states the scope after inspection." },
  ],
  relatedArticles: [
    { label: "What causes hot tire pickup", href: "/learn/hot-tire-pickup" },
    { label: "Epoxy vs polyaspartic for garages", href: "/learn/polyaspartic-vs-epoxy" },
    { label: "Garage floor maintenance guide", href: "/learn/garage-floor-maintenance" },
  ],
  relatedServices: [
    { label: "Workshops", href: "/services/workshops" },
    { label: "Basements", href: "/services/basements" },
  ],
};

export const commercial: ServiceLandingContent = {
  slug: "commercial-concrete-coatings",
  meta: {
    title: "Commercial Concrete Floor Coatings | GarageFloorToday",
    description: "Commercial concrete coatings for showrooms, retail, and light-industrial spaces. Documented prep, chemical- and traffic-rated systems, and scheduling built around your operations.",
    canonical: "https://garagefloortoday.com/services/commercial-concrete-coatings",
  },
  eyebrow: "Commercial",
  h1: "Floors that hold up to traffic — and to inspection.",
  valueProp: "Commercial floors carry foot traffic, cart wheels, spills, and the reputational weight of every customer who walks across them. They also often carry compliance and safety requirements a residential garage never sees.",
  heroPhotoNote: "real commercial space — showroom or retail floor with people or product, natural light, not an empty warehouse",
  surfaceFactors: [
    { factor: "Sustained foot and cart traffic", explanation: "Abrasion from constant traffic wears finishes that would last decades in a home garage." },
    { factor: "Slip resistance & safety compliance", explanation: "Commercial spaces often carry slip-resistance obligations; the finish must meet them." },
    { factor: "Spill exposure", explanation: "Cleaning chemicals, food, and product spills demand chemical resistance and easy cleanup." },
    { factor: "Downtime cost", explanation: "Every hour the floor is out of service is lost revenue — return-to-service timing is a business decision, not just a spec." },
  ],
  recommendation: {
    headline: "Commercial spaces usually call for a polyurea-hybrid or high-build system, scheduled around your hours.",
    body: "The chemistry is chosen for abrasion and chemical resistance; the schedule is chosen for your operations — overnight or phased installs to minimize downtime. Fast-cure systems earn their premium when they get you back open sooner.",
    typicalSystem: "GFT Performance — Polyurea Hybrid (traffic- and chemical-rated)",
  },
  armorPrepScope: "Commercial ArmorPrep™ scales the same discipline up: full mechanical grinding, moisture testing across a larger slab (often at multiple points), joint and control-cut evaluation, and repair of the heavier cracking common in older commercial concrete.",
  applicationStandard: [
    { requirement: "Multi-point moisture testing", note: "Larger slabs tested at multiple locations, all recorded." },
    { requirement: "Slip-resistance specification", note: "Finish texture matched to the space's safety needs." },
    { requirement: "Chemical-exposure review", note: "System matched to the cleaning agents and spills expected." },
    { requirement: "Operational scheduling", note: "Install phased around your hours to limit downtime." },
    { requirement: "Traffic-rated system", note: "Abrasion resistance appropriate to expected traffic." },
    { requirement: "FloorPassport™ included", note: "Full documentation for facility records and warranty." },
  ],
  commonProblems: [
    { problem: "Our floor looks worn in the traffic lanes", cause: "Abrasion on an under-specified or under-prepared coating.", howGftAddresses: "A traffic-rated system over a properly ground profile; wear resistance matched to the actual footfall." },
    { problem: "Cleaning chemicals are dulling the finish", cause: "Chemical incompatibility with the installed coating.", howGftAddresses: "System selected against your specific cleaning regimen during the exposure review." },
    { problem: "We can't afford to close for a week", cause: "Slow-cure systems and unplanned scheduling.", howGftAddresses: "Fast-cure chemistry and phased/overnight scheduling built around your hours." },
  ],
  comparison: {
    title: "Coated vs. bare or sealed commercial concrete",
    body: "Bare and simply-sealed commercial concrete dusts, stains, and telegraphs every spill. A coated floor is easier to clean, safer underfoot, and materially better-looking to customers — but only if it's specified for the traffic and chemicals it will actually face. Over-specifying wastes budget; under-specifying fails early. The exposure review exists to hit the right point.",
  },
  maintenance: "Routine dust-mopping and neutral-cleaner washing. High-traffic commercial floors benefit from a documented cleaning schedule; your FloorPassport™ notes the recommended cadence and any topcoat-refresh assessment timing.",
  faqs: [
    { question: "Can you install without closing our business?", answer: "Usually yes — through overnight or phased installs. We plan the sequence around your operating hours during the estimate." },
    { question: "Do you handle multi-location rollouts?", answer: "Yes. National standards mean a consistent floor and consistent documentation across every location, coordinated centrally." },
    { question: "Is the finish slip-safe for a public space?", answer: "Slip resistance is specified to your space's needs as part of the Application Standard, not left to chance." },
  ],
  relatedArticles: [
    { label: "Commercial flooring buyer's guide", href: "/learn/commercial-flooring" },
    { label: "Polyurea guide", href: "/learn/polyurea-guide" },
    { label: "Concrete preparation explained", href: "/learn/concrete-preparation" },
  ],
  relatedServices: [
    { label: "Industrial floors", href: "/services/industrial" },
    { label: "Warehouse floors", href: "/services/warehouse" },
    { label: "Showrooms", href: "/services/showrooms" },
  ],
};

export const industrial: ServiceLandingContent = {
  slug: "industrial",
  meta: {
    title: "Industrial Floor Coatings | Chemical & Load Resistant | GarageFloorToday",
    description: "Industrial concrete floor coatings engineered for forklifts, chemical exposure, and heavy point loads. Documented prep and material selection matched to your facility's demands.",
    canonical: "https://garagefloortoday.com/services/industrial",
  },
  eyebrow: "Industrial",
  h1: "Floors engineered for the loads other coatings can't take.",
  valueProp: "Forklifts, pallet jacks, dropped tools, chemical exposure, and thermal cycling. Industrial floors face conditions that would destroy a residential coating in months — which is why chemistry and preparation aren't marketing choices here, they're engineering requirements.",
  heroPhotoNote: "working industrial floor — forklift or equipment present, natural or facility light, genuinely in-use",
  surfaceFactors: [
    { factor: "Point loads & impact", explanation: "Forklift wheels and dropped equipment concentrate force that cracks weak systems." },
    { factor: "Chemical exposure", explanation: "Solvents, acids, and oils demand chemistry specifically resistant to what's on site." },
    { factor: "Thermal cycling", explanation: "Wash-down, process heat, and cold storage stress the coating-to-concrete bond." },
    { factor: "Continuous operation", explanation: "Facilities rarely stop; installation must be staged to keep production moving." },
  ],
  recommendation: {
    headline: "Industrial floors are specified against your facility's actual chemical and load profile.",
    body: "There is no single 'industrial coating.' A wash-down food facility, a machine shop, and a battery plant need different chemistries. We review your chemical exposures, load types, and thermal conditions, then specify — and document — the system built for them.",
    typicalSystem: "Specified per facility — high-build polyurea/urethane systems common; confirmed after exposure review",
  },
  armorPrepScope: "Industrial ArmorPrep™ often means aggressive shot-blasting or heavy grinding to achieve a deep profile, extensive repair of load-damaged concrete, and moisture mitigation where process water or below-grade conditions are present. The prep is proportional to the punishment the floor will take.",
  applicationStandard: [
    { requirement: "Chemical exposure inventory", note: "Every on-site chemical reviewed against system resistance." },
    { requirement: "Load & impact assessment", note: "Traffic and point-load profile drives system build thickness." },
    { requirement: "Aggressive profiling", note: "Shot-blast or heavy grind for maximum mechanical bond." },
    { requirement: "Thermal/moisture mitigation", note: "Addressed where wash-down or process conditions require." },
    { requirement: "Staged installation", note: "Sequenced to keep the facility operating." },
    { requirement: "FloorPassport™ + facility documentation", note: "Full record for compliance and maintenance planning." },
  ],
  commonProblems: [
    { problem: "The coating is cracking under the forklifts", cause: "Insufficient system build for the point loads, or inadequate profiling.", howGftAddresses: "Build thickness and profile specified to the measured load profile, not a generic spec." },
    { problem: "Chemicals are eating through the floor", cause: "Coating chemistry incompatible with on-site substances.", howGftAddresses: "Chemical inventory reviewed against resistance data before specifying." },
    { problem: "We can't shut the plant down", cause: "Unstaged installation on a continuous operation.", howGftAddresses: "Zoned, staged installs that keep production running." },
  ],
  comparison: {
    title: "Coated vs. bare industrial slab",
    body: "A bare industrial slab absorbs chemicals, dusts into products and equipment, and degrades at joints and impact points. A correctly specified coating protects the concrete asset, improves safety and cleanability, and is far cheaper than slab replacement. The engineering risk isn't whether to coat — it's specifying correctly, which is why the exposure and load review is non-negotiable.",
  },
  maintenance: "Maintenance is facility-specific and documented in your FloorPassport™ — typically scheduled inspections of high-wear zones and joints, with defined thresholds for topcoat refresh in traffic lanes.",
  faqs: [
    { question: "Do you provide documentation for audits?", answer: "Yes. The FloorPassport™ records materials, batches, and prep — useful for facility, safety, and compliance records." },
    { question: "Can you match a specific chemical resistance spec?", answer: "We specify against your actual chemical inventory. Provide your list and we match resistance data to it. [VERIFY: specific chemical resistance claims require manufacturer data sheets before publication.]" },
  ],
  relatedArticles: [
    { label: "Polyurea guide", href: "/learn/polyurea-guide" },
    { label: "Concrete preparation explained", href: "/learn/concrete-preparation" },
    { label: "Concrete repair", href: "/learn/concrete-repair" },
  ],
  relatedServices: [
    { label: "Warehouse floors", href: "/services/warehouse" },
    { label: "Commercial coatings", href: "/services/commercial-concrete-coatings" },
    { label: "Automotive shops", href: "/services/automotive-shops" },
  ],
};

export const warehouse: ServiceLandingContent = {
  slug: "warehouse",
  meta: {
    title: "Warehouse Floor Coatings | Traffic Lanes, Line Striping | GarageFloorToday",
    description: "Warehouse floor coatings built for forklift traffic, safety line striping, and large-area moisture challenges. Documented prep and staged installation to keep operations moving.",
    canonical: "https://garagefloortoday.com/services/warehouse",
  },
  eyebrow: "Warehouse",
  h1: "Large-area floors that survive forklift traffic and stay legible.",
  valueProp: "Warehouse floors combine a specific set of challenges: massive area, concentrated forklift traffic in defined lanes, safety striping that has to stay crisp, and the moisture surprises that come with big, old slabs.",
  heroPhotoNote: "real warehouse aisle with racking and floor striping, forklift if possible, facility light",
  surfaceFactors: [
    { factor: "Concentrated lane traffic", explanation: "Forklift traffic follows fixed paths, wearing lanes far faster than open areas." },
    { factor: "Safety line striping", explanation: "OSHA-style striping and zone markings must stay sharp and abrasion-resistant." },
    { factor: "Large-slab moisture variance", explanation: "Big slabs often have uneven moisture; single-point testing isn't enough." },
    { factor: "Joint frequency", explanation: "Large floors have many control joints, each a potential failure point if mishandled." },
  ],
  recommendation: {
    headline: "Warehouses typically get a traffic-rated system with integrated, abrasion-resistant line striping.",
    body: "The base system is specified for lane abrasion; striping and zone markings are integrated into the coating rather than painted on top, so they wear at the same rate as the floor. Moisture is mapped across the slab, not sampled once.",
    typicalSystem: "GFT Performance — Polyurea Hybrid with integrated striping",
  },
  armorPrepScope: "Warehouse ArmorPrep™ centers on grid-pattern moisture testing across the whole slab, joint treatment appropriate to a floor with dozens or hundreds of control cuts, and repair of the impact damage that clusters around dock doors and rack posts.",
  applicationStandard: [
    { requirement: "Grid moisture mapping", note: "Multiple test points across the full slab, all recorded." },
    { requirement: "Lane-abrasion specification", note: "System rated for concentrated forklift traffic." },
    { requirement: "Integrated safety striping", note: "Markings built into the system, not surface-painted." },
    { requirement: "Joint treatment plan", note: "Each control joint handled to prevent edge failure." },
    { requirement: "Staged, zoned installation", note: "Areas sequenced to keep the warehouse operating." },
    { requirement: "FloorPassport™ + zone map", note: "Documentation including a striping/zone reference." },
  ],
  commonProblems: [
    { problem: "The traffic lanes are worn but the rest looks fine", cause: "Uniform coating with no lane-specific rating.", howGftAddresses: "Lane abrasion rating specified where the traffic actually is." },
    { problem: "Our safety lines are peeling", cause: "Striping painted on top of the coating instead of integrated.", howGftAddresses: "Striping integrated into the system so it wears with the floor." },
    { problem: "Bubbling appeared months after install", cause: "Unmapped moisture in part of a large slab.", howGftAddresses: "Grid moisture mapping catches variance a single test would miss." },
  ],
  comparison: {
    title: "Coated warehouse floor vs. bare concrete",
    body: "Bare warehouse concrete dusts into inventory, degrades at joints and dock impacts, and makes safety striping a constant repainting chore. A coated, striped system cuts dust, protects joints, and keeps markings legible for years. At warehouse scale the cost question is real — which is why the spec is matched to actual traffic zones rather than blanket-applied at maximum spec everywhere.",
  },
  maintenance: "Scheduled inspection of traffic lanes and dock zones, dust control via routine sweeping/scrubbing, and a defined threshold for lane-refresh. The FloorPassport™ zone map makes it easy to track wear by area.",
  faqs: [
    { question: "Can you stripe to our existing floor plan?", answer: "Yes — we match your zone and safety-line layout, and integrate it into the coating so it lasts." },
    { question: "How do you install without stopping operations?", answer: "Zoned, staged installation. We coat sections in sequence so racking and traffic can keep moving through the rest." },
    { question: "Do you handle very large square footage?", answer: "Yes; large-area warehouses are a core commercial application, planned as a staged project." },
  ],
  relatedArticles: [
    { label: "Commercial flooring buyer's guide", href: "/learn/commercial-flooring" },
    { label: "Moisture testing explained", href: "/learn/moisture-testing" },
    { label: "Polyurea guide", href: "/learn/polyurea-guide" },
  ],
  relatedServices: [
    { label: "Industrial floors", href: "/services/industrial" },
    { label: "Commercial coatings", href: "/services/commercial-concrete-coatings" },
  ],
};

export const automotiveShops: ServiceLandingContent = {
  slug: "automotive-shops",
  meta: {
    title: "Automotive Shop Floor Coatings | Oil, Solvent & Lift Resistant | GarageFloorToday",
    description: "Floor coatings for auto shops and dealership service bays: resistant to oil, brake fluid, solvents, and lift point loads, with a professional finish customers notice.",
    canonical: "https://garagefloortoday.com/services/automotive-shops",
  },
  eyebrow: "Automotive Shop",
  h1: "Service-bay floors that shrug off oil, solvents, and lift loads.",
  valueProp: "An auto shop floor is the hardest-working surface in the automotive world: constant fluid exposure, solvent spills, hydraulic lift loads, and dropped tools — all while being visible to paying customers.",
  heroPhotoNote: "real service bay with a lift and a vehicle, tools present, working shop lighting",
  surfaceFactors: [
    { factor: "Petroleum & fluid exposure", explanation: "Oil, transmission fluid, brake fluid, and coolant stain and degrade weak coatings continuously." },
    { factor: "Solvent spills", explanation: "Parts cleaners and solvents demand genuine chemical resistance, not just a sealer." },
    { factor: "Lift point loads", explanation: "Hydraulic lift posts concentrate weight; the floor must take it without cracking." },
    { factor: "Customer-facing appearance", explanation: "A clean, professional bay floor signals competence to every customer who sees it." },
  ],
  recommendation: {
    headline: "Auto shops need a chemical-resistant, impact-tough system that also cleans up easily.",
    body: "Chemistry is chosen for petroleum and solvent resistance; build and prep for lift loads and dropped-tool impact; finish for easy cleanup of the inevitable spills. A shop floor that wipes clean is both a maintenance win and a customer-trust signal.",
    typicalSystem: "GFT Performance — Polyurea Hybrid (chemical- and impact-rated)",
  },
  armorPrepScope: "Auto-shop ArmorPrep™ includes degreasing and grinding to remove years of embedded oil (a step routinely skipped by cheaper installers, and a routine cause of adhesion failure in shops), moisture testing, and repair of lift-area and drain-area concrete.",
  applicationStandard: [
    { requirement: "Oil decontamination + grinding", note: "Embedded petroleum removed before profiling — critical in shops." },
    { requirement: "Solvent-resistance specification", note: "System matched to the shop's actual chemicals." },
    { requirement: "Lift-area load assessment", note: "Build and prep specified for hydraulic lift point loads." },
    { requirement: "Drainage & slope respected", note: "Existing drainage honored; slip resistance near wash areas." },
    { requirement: "Easy-clean finish", note: "Surface chosen so fluids wipe up rather than soak in." },
    { requirement: "FloorPassport™ included", note: "Documentation for the shop's records and warranty." },
  ],
  commonProblems: [
    { problem: "Our floor coating lifted where the oil soaks in", cause: "Coating applied over oil-contaminated concrete without decontamination.", howGftAddresses: "Degrease-and-grind decontamination before any coating goes down." },
    { problem: "Solvents are discoloring the floor", cause: "Coating not rated for the shop's cleaners.", howGftAddresses: "Solvent-resistance matched to your actual chemical list." },
    { problem: "Cracks around the lift posts", cause: "Coating and slab not prepared for concentrated lift loads.", howGftAddresses: "Load assessment and appropriate build in lift zones." },
  ],
  comparison: {
    title: "Coated shop floor vs. sealed or bare concrete",
    body: "Sealed or bare shop concrete becomes an oil-stained, hard-to-clean liability that ages the whole business in a customer's eyes. A properly decontaminated and coated floor resists fluids, cleans in seconds, and reads as a professional operation. The single biggest failure risk in shops is skipping oil decontamination — so that's exactly where our Application Standard starts.",
  },
  maintenance: "Wipe fluid spills promptly (the finish makes this easy), routine degreasing wash, and scheduled inspection of lift and drain zones. Maintenance cadence is on your FloorPassport™.",
  faqs: [
    { question: "Can you coat around installed lifts?", answer: "Yes — we work around fixed equipment and give lift-area concrete the assessment it needs." },
    { question: "How do you handle years of oil soaked into the slab?", answer: "Decontamination and grinding remove embedded oil before coating. It's the step that makes shop floors last, and it's built into our standard." },
    { question: "Will it hold up to dropped tools?", answer: "Impact resistance is specified for shop conditions. No floor is indestructible, but the system is built for the environment." },
  ],
  relatedArticles: [
    { label: "Concrete preparation explained", href: "/learn/concrete-preparation" },
    { label: "Polyurea guide", href: "/learn/polyurea-guide" },
    { label: "Concrete repair", href: "/learn/concrete-repair" },
  ],
  relatedServices: [
    { label: "Commercial coatings", href: "/services/commercial-concrete-coatings" },
    { label: "Industrial floors", href: "/services/industrial" },
    { label: "Workshops", href: "/services/workshops" },
  ],
};

export const patios: ServiceLandingContent = {
  slug: "patios",
  meta: {
    title: "Patio Concrete Coatings | UV-Stable, Slip-Resistant | GarageFloorToday",
    description: "Outdoor patio coatings engineered for UV stability, slip resistance, and freeze-thaw durability. Documented prep and finishes that stay comfortable underfoot.",
    canonical: "https://garagefloortoday.com/services/patios",
  },
  eyebrow: "Patio",
  h1: "Outdoor floors that hold their color and their grip.",
  valueProp: "A patio coating lives outside — full sun, rain, freeze-thaw, and bare feet. The challenges are almost the opposite of an industrial floor: UV stability and slip resistance matter more than chemical or load resistance.",
  heroPhotoNote: "real residential patio in natural daylight, outdoor furniture, greenery — inviting and lived-in",
  surfaceFactors: [
    { factor: "UV exposure", explanation: "Direct sun yellows and fades non-UV-stable coatings; outdoor systems must be UV-stable." },
    { factor: "Slip resistance", explanation: "Rain and pool splash make texture essential — especially where people walk barefoot." },
    { factor: "Freeze-thaw cycling", explanation: "Outdoor slabs expand and contract; the system and repairs must accommodate movement." },
    { factor: "Barefoot comfort & heat", explanation: "Surface temperature and texture matter when people walk on it barefoot in summer." },
  ],
  recommendation: {
    headline: "Patios call for a UV-stable system with a slip-resistant, comfortable finish.",
    body: "Aliphatic (UV-stable) chemistry keeps the color true in full sun; a textured finish provides grip when wet; finish color and texture are chosen with barefoot comfort and surface heat in mind. This is a genuinely different spec from an indoor garage.",
    typicalSystem: "GFT Performance — UV-stable polyaspartic with slip-resistant finish",
  },
  armorPrepScope: "Patio ArmorPrep™ addresses outdoor-specific concrete: grinding, repair of freeze-thaw surface damage and cracks, and careful attention to drainage slope so water sheds rather than pools on the finished surface.",
  applicationStandard: [
    { requirement: "UV-stable system required", note: "Aliphatic chemistry to prevent yellowing/fading outdoors." },
    { requirement: "Slip resistance required", note: "Textured finish specified for wet, barefoot use." },
    { requirement: "Freeze-thaw-ready repair", note: "Cracks and surface spalling repaired for outdoor movement." },
    { requirement: "Drainage slope respected", note: "Water sheds off; no pooling on the coated surface." },
    { requirement: "Barefoot comfort considered", note: "Color and texture chosen with surface heat in mind." },
    { requirement: "FloorPassport™ included", note: "Documentation and maintenance schedule for outdoor care." },
  ],
  commonProblems: [
    { problem: "My patio coating turned yellow", cause: "A non-UV-stable coating used outdoors.", howGftAddresses: "UV-stable aliphatic chemistry that holds color in direct sun." },
    { problem: "It's slippery when it rains", cause: "Smooth finish with no slip-resistant texture.", howGftAddresses: "Slip-resistant texture specified for outdoor, wet, barefoot conditions." },
    { problem: "Cracks came back after a winter", cause: "Repairs not made for freeze-thaw movement.", howGftAddresses: "Freeze-thaw-appropriate repair and system flexibility." },
  ],
  comparison: {
    title: "Patio coating vs. stamped concrete",
    body: "Stamped concrete is beautiful but can crack, fade, and grow slippery, and it's hard to repair invisibly. A UV-stable patio coating renews an existing slab with fresh color, adds slip resistance, and is documented and maintainable. Which is 'better' depends on your goals — but for renewing a tired existing patio with controllable texture and color, a coating is often the more practical, longer-lived choice.",
  },
  maintenance: "Rinse off debris, wash periodically, and reapply nothing on the normal schedule — UV-stable systems are built to last outdoors. Your FloorPassport™ notes any recommended refresh timing for high-sun exposure.",
  faqs: [
    { question: "Will it get too hot to walk on?", answer: "Color choice affects surface heat; lighter finishes stay cooler. We factor barefoot comfort into the recommendation for pool and patio areas." },
    { question: "Does it work by a pool?", answer: "Yes — see our pool deck page for the chlorine- and splash-specific standard, which builds on the patio system." },
    { question: "Can you color-match my home's exterior?", answer: "The color library offers a range of outdoor-appropriate finishes; your consultant helps match your home's palette." },
  ],
  relatedArticles: [
    { label: "Color selection guide", href: "/learn/color-selection" },
    { label: "Polyaspartic vs epoxy", href: "/learn/polyaspartic-vs-epoxy" },
    { label: "Concrete repair", href: "/learn/concrete-repair" },
  ],
  relatedServices: [
    { label: "Pool decks", href: "/services/pool-decks" },
    { label: "Basements", href: "/services/basements" },
  ],
};
