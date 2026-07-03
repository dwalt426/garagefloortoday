import type { LucideIcon } from "lucide-react";

/** Central entity — everything keys off this per the Brand Bible §4 */
export interface Project {
  gftProjectId: string; // "GFT-2028-10483"
  city: string;
  state: string;
  finishName: string;
  installDate: string;
  system: CoatingSystem;
  crewLeadName: string;
  warrantyStatus: "active" | "expired" | "transferred";
}

export type CoatingSystem =
  | "epoxy"
  | "polyaspartic"
  | "polyurea-hybrid";

export interface ServiceCategory {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

export interface CrewMember {
  id: string;
  name: string;
  role: string;
  market: string;
  yearsCertified: number;
  floorsCompleted: number;
  photoUrl?: string;
}

export interface Review {
  id: string;
  rating: 1 | 2 | 3 | 4 | 5;
  body: string;
  themes: ReviewTheme[];
  customerFirstName: string;
  city: string;
  projectId?: string;
}

export type ReviewTheme =
  | "Installation Experience"
  | "Durability"
  | "Design Help"
  | "Communication";

export interface TimelineStep {
  id: string;
  label: string;
  description: string;
}

export interface StandardItem {
  id: string;
  label: string;
  detail: string;
}

export interface TrustSignal {
  id: string;
  icon: LucideIcon;
  label: string;
}

export interface NavColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface PerformanceFactor {
  id: string;
  icon: LucideIcon;
  label: string;
  description: string;
}
