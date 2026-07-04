import React from "react";
import { Star } from "lucide-react";
import { color, radius, font } from "../../styles/tokens";
import type { ServiceCategory, CrewMember, Review } from "../../types";
import { Button } from "../buttons/Button";

const cardShell: React.CSSProperties = {
  backgroundColor: color.white,
  border: `1px solid ${color.gray100}`,
  borderRadius: radius.lg,
  overflow: "hidden",
};

export interface ServiceCardProps { service: ServiceCategory; }

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;
  return (
    <div style={cardShell}>
      <div className="h-32 flex items-center justify-center" style={{ backgroundColor: color.gray100 }}>
        <Icon size={32} strokeWidth={1.5} color={color.black} aria-hidden />
      </div>
      <div className="p-6" style={{ fontFamily: font.body }}>
        <h4 className="text-lg font-semibold mb-1" style={{ fontFamily: font.display, color: color.black }}>
          {service.title}
        </h4>
        <p className="text-sm mb-4" style={{ color: color.gray700 }}>{service.description}</p>
        <Button variant="text" href={service.href}>Learn more →</Button>
      </div>
    </div>
  );
}

export interface CrewCardProps { member: CrewMember; }

export function CrewCard({ member }: CrewCardProps) {
  return (
    <div style={cardShell}>
      <div className="h-40" style={{ backgroundColor: color.gray300 }} role="img" aria-label={`Photo of ${member.name}`} />
      <div className="p-5" style={{ fontFamily: font.body }}>
        <h4 className="text-base font-semibold" style={{ color: color.black }}>{member.name}</h4>
        <p className="text-xs mb-3" style={{ color: color.gray500 }}>{member.role} · {member.market}</p>
        <div className="flex flex-wrap gap-2">
          <Pill>Certified {member.yearsCertified} yrs</Pill>
          <Pill>{member.floorsCompleted.toLocaleString()} floors</Pill>
        </div>
      </div>
    </div>
  );
}

export interface ReviewCardProps { review: Review; }

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div style={cardShell}>
      <div className="p-6" style={{ fontFamily: font.body }}>
        <div className="flex gap-1 mb-3" aria-label={`${review.rating} out of 5 stars`}>
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star key={i} size={14} fill={color.gold} color={color.gold} aria-hidden />
          ))}
        </div>
        <p className="text-sm mb-4" style={{ color: color.gray700 }}>"{review.body}"</p>
        <p className="text-xs font-semibold mb-3" style={{ color: color.black }}>
          {review.customerFirstName} · {review.city}
        </p>
        <div className="flex flex-wrap gap-2">
          {review.themes.map((t) => <Pill key={t}>{t}</Pill>)}
        </div>
      </div>
    </div>
  );
}

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="px-3 py-1 text-xs font-semibold rounded-full"
      style={{ fontFamily: font.body, backgroundColor: color.gray100, color: color.gray700 }}
    >
      {children}
    </span>
  );
}
