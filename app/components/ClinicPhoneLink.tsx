import type { ReactNode } from "react";
import { getSiteSettings } from "../lib/site-content";

export default async function ClinicPhoneLink({ children, className, label }: { children: ReactNode; className?: string; label?: string }) {
  const settings = await getSiteSettings();
  const href = `tel:${(settings.phone || "").replace(/[^+\d]/g, "")}`;
  return <a href={href} className={className} aria-label={label}>{children}</a>;
}
