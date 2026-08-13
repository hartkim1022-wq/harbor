import type { HarborProfile, ThemePreference } from "./types";

export function profileInitials(name:string){const parts=name.trim().split(/\s+/).filter(Boolean);return (parts.length?parts.slice(0,2).map(part=>part[0]).join(""):"H").toUpperCase();}
export function greetingFor(profile:Pick<HarborProfile,"timeZone">,date=new Date()){const hour=Number(new Intl.DateTimeFormat("en-GB",{hour:"2-digit",hourCycle:"h23",timeZone:profile.timeZone}).format(date));return hour<12?"Good morning":hour<18?"Good afternoon":"Good evening";}
export function resolvedTheme(preference:ThemePreference,prefersDark:boolean):"light"|"dark"{return preference==="system"?(prefersDark?"dark":"light"):preference;}
export function validateAvatar(file:{type:string;size:number}){if(!["image/jpeg","image/png","image/webp","image/gif"].includes(file.type))return "Choose a PNG, JPEG, WebP or GIF image.";if(file.size>1_500_000)return "Choose an image smaller than 1.5 MB.";return null;}
