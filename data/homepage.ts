/** All homepage content lives here, not in components.
 *  When the CMS arrives, this file's exports become fetch calls with the
 *  same return types — components don't change.
 */
import {
  ShieldCheck, CheckCircle2, MapPin, Star, Wrench, Building2,
  Home, Waves, Layers, Factory, Droplets, Thermometer, Palette,
  Target, Gauge, Wind,
} from "lucide-react";
import type {
  ServiceCategory, CrewMember, Review, TimelineStep, StandardItem,
  TrustSignal, Project, PerformanceFactor, NavColumn,
} from "../types";

export const hero = {
  h1: "Beautiful Garage Floors. Built to Perform for Decades.",
  subhead:
    "Premium concrete coating systems engineered for your home, professionally installed with meticulous preparation and a fast return to service.",
  microTrust: "Backed by The GarageFloorToday Standard™",
  primaryCta: "Get My Free Estimate",
  secondaryCta: "See the Standard",
};

export const trustSignals: TrustSignal[] = [
  { id: "floors", icon: CheckCircle2, label: "12,000+ Floors Installed" },
  { id: "warranty", icon: ShieldCheck, label: "Lifetime Performance Warranty" },
  { id: "passport", icon: Star, label: "FloorPassport™ on Every Job" },
  { id: "crews", icon: MapPin, label: "Certified Local Crews" },
];

export const standardItems: StandardItem[] = [
  { id: "prep", label: "ArmorPrep™ diamond grinding & moisture testing", detail: "Every slab is ground, tested, and documented before a drop of coating goes down." },
  { id: "repair", label: "Crack repair", detail: "Structural repairs, not cosmetic fills." },
  { id: "system", label: "GFT Performance System material selection", detail: "The right chemistry for your climate, moisture, and usage — engineered, not guessed." },
  { id: "crews", label: "Certified installer crews", detail: "Trained, certified, and on your FloorPassport by name." },
  { id: "passport", label: "FloorPassport™ digital project record", detail: "Materials, batch numbers, readings, photos — permanently documented." },
  { id: "support", label: "Lifetime performance support", detail: "Your floor's full history travels with your home." },
];

export const timelineSteps: TimelineStep[] = [
  { id: "inspect", label: "Inspection", description: "Slab condition, moisture, and layout assessed." },
  { id: "prep", label: "ArmorPrep™", description: "Diamond grinding opens the concrete pore structure." },
  { id: "repair", label: "Repairs", description: "Cracks and spalls repaired structurally." },
  { id: "select", label: "System Selection", description: "Coating chemistry matched to your garage." },
  { id: "apply", label: "Application", description: "Base, flake, and topcoat applied in sequence." },
  { id: "qa", label: "Quality Inspection", description: "Checked against The Standard before sign-off." },
  { id: "passport", label: "FloorPassport™ Issued", description: "Your permanent project record, delivered." },
  { id: "enjoy", label: "Ready to Enjoy", description: "Fast return to service — park with confidence." },
];

export const services: ServiceCategory[] = [
  { slug: "residential", title: "Residential Garages", description: "Floors engineered for daily life — cars, kids, projects, and everything else.", icon: Home, href: "/services/residential-garage-floors" },
  { slug: "commercial", title: "Commercial", description: "Showrooms, retail, and workspaces that hold up under traffic.", icon: Building2, href: "/services/commercial-concrete-coatings" },
  { slug: "patios", title: "Patios & Pool Decks", description: "UV-stable, slip-resistant outdoor surfaces.", icon: Waves, href: "/services/patios" },
  { slug: "basements", title: "Basements", description: "Moisture-managed floors for below-grade spaces.", icon: Layers, href: "/services/basements" },
  { slug: "industrial", title: "Industrial", description: "Chemical-resistant systems for demanding facilities.", icon: Factory, href: "/services/industrial" },
  { slug: "workshops", title: "Workshops", description: "Impact-rated floors for the space you actually work in.", icon: Wrench, href: "/services/workshops" },
];

export const performanceFactors: PerformanceFactor[] = [
  { id: "environment", icon: Wind, label: "Environment", description: "Indoor, outdoor, below grade" },
  { id: "moisture", icon: Droplets, label: "Moisture", description: "Vapor transmission tested" },
  { id: "usage", icon: Wrench, label: "Usage", description: "Parking, workshop, showroom" },
  { id: "climate", icon: Thermometer, label: "Climate", description: "Freeze-thaw, heat, humidity" },
  { id: "finish", icon: Palette, label: "Finish", description: "Flake, metallic, solid, quartz" },
  { id: "goals", icon: Target, label: "Performance Goals", description: "Durability, chemistry, aesthetics" },
];

export const recentProjects: Project[] = [
  { gftProjectId: "GFT-2026-08114", city: "Dallas", state: "TX", finishName: "Granite Ridge", installDate: "2026-06-22", system: "polyaspartic", crewLeadName: "Marcus Webb", warrantyStatus: "active" },
  { gftProjectId: "GFT-2026-08097", city: "Plano", state: "TX", finishName: "Carbon Fleck", installDate: "2026-06-18", system: "polyurea-hybrid", crewLeadName: "Dana Ruiz", warrantyStatus: "active" },
  { gftProjectId: "GFT-2026-08051", city: "Fort Worth", state: "TX", finishName: "Quarry Slate", installDate: "2026-06-11", system: "polyaspartic", crewLeadName: "Marcus Webb", warrantyStatus: "active" },
];

export const featuredCrew: CrewMember[] = [
  { id: "mw", name: "Marcus Webb", role: "Lead Installer", market: "Dallas, TX", yearsCertified: 6, floorsCompleted: 412 },
  { id: "dr", name: "Dana Ruiz", role: "Lead Installer", market: "Fort Worth, TX", yearsCertified: 4, floorsCompleted: 287 },
  { id: "jt", name: "James Tran", role: "Crew Chief", market: "Plano, TX", yearsCertified: 8, floorsCompleted: 559 },
];

export const reviews: Review[] = [
  { id: "r1", rating: 5, body: "The prep work alone took longer than our old contractor's entire install. Floor still looks brand new two years later.", themes: ["Durability", "Installation Experience"], customerFirstName: "Sarah", city: "Dallas" },
  { id: "r2", rating: 5, body: "They showed me the moisture readings before and after grinding. Nobody else even mentioned moisture.", themes: ["Installation Experience", "Communication"], customerFirstName: "Mike", city: "Plano" },
  { id: "r3", rating: 5, body: "The visualizer sold my wife before the estimator even arrived. Finished floor matches it exactly.", themes: ["Design Help"], customerFirstName: "Devon", city: "Fort Worth" },
];

export const navColumns: NavColumn[] = [
  { title: "Services", links: services.map((s) => ({ label: s.title, href: s.href })) },
  { title: "Why GFT", links: [
    { label: "The GarageFloorToday Standard™", href: "/standard" },
    { label: "GFT Performance System", href: "/coatings/compare" },
    { label: "FloorPassport™", href: "/floorpassport" },
    { label: "Warranty", href: "/warranty" },
  ]},
  { title: "Resources", links: [
    { label: "Cost Guide", href: "/learn/cost-guide" },
    { label: "Compare Coating Systems", href: "/learn/polyaspartic-vs-epoxy" },
    { label: "Learning Center", href: "/learn" },
    { label: "FAQs", href: "/learn" },
  ]},
];
