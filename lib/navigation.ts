import type { Section } from "@/components/dashboard/sidebar";
const sections:Section[]=["dashboard","accounts","transactions","subscriptions","commitments","forecast","beacon","settings"];
export function sectionFromHash(hash:string):Section { const value=hash.replace(/^#/,"");const section=(value==="overview"||!value?"dashboard":value) as Section;return sections.includes(section)?section:"dashboard"; }
