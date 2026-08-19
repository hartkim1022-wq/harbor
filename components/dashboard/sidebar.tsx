"use client";
import { Landmark, LayoutDashboard, ListRestart, Radar, ReceiptText, Settings, TrendingUp, WalletCards, type LucideIcon } from "lucide-react";
import { HarborLogo } from "@/components/brand/harbor-logo";
import { Avatar } from "@/components/profile/avatar";
import type { HarborProfile } from "@/lib/types";

export type Section = "dashboard" | "accounts" | "transactions" | "subscriptions" | "commitments" | "forecast" | "beacon" | "settings";
const primary:{label:string;id:Section;icon:LucideIcon}[]=[
  {label:"Dashboard",id:"dashboard",icon:LayoutDashboard},{label:"Accounts",id:"accounts",icon:Landmark},
  {label:"Transactions",id:"transactions",icon:ReceiptText},{label:"Subscriptions",id:"subscriptions",icon:ListRestart},
  {label:"Commitments",id:"commitments",icon:WalletCards},{label:"Forecast",id:"forecast",icon:TrendingUp},{label:"Beacon",id:"beacon",icon:Radar},
];

export function Sidebar({active,onNavigate,profile}:{active:Section;onNavigate:(section:Section)=>void;profile:HarborProfile}){
  const link=(id:Section,label:string,Icon:LucideIcon)=><button key={id} onClick={()=>onNavigate(id)} aria-current={active===id?"page":undefined} className={`group relative flex min-h-11 w-full items-center gap-3 rounded-[var(--radius-sm)] px-3 text-left text-[13px] transition-colors duration-[var(--motion-fast)] ${active===id?"bg-[var(--surface-glacier)] font-medium text-[var(--text-primary)]":"text-[var(--text-secondary)] hover:bg-[var(--surface-subtle)] hover:text-[var(--text-primary)]"}`}>{active===id&&<span className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-[var(--harbor-ocean)]"/>}<Icon aria-hidden="true" className="size-[17px] shrink-0" strokeWidth={1.7}/><span>{label}</span></button>;
  return <aside className="fixed inset-y-0 left-0 z-30 hidden w-[244px] border-r border-[var(--border-subtle)] bg-[var(--surface-base)] px-4 py-5 lg:flex lg:flex-col">
    <button onClick={()=>onNavigate("dashboard")} aria-label="Harbor dashboard" className="flex min-h-12 items-center px-2"><HarborLogo/></button>
    <nav className="mt-7 space-y-1" aria-label="Main navigation">{primary.map(({id,label,icon})=>link(id,label,icon))}</nav>
    <div className="mt-auto border-t border-[var(--border-subtle)] pt-3">{link("settings","Settings",Settings)}<button onClick={()=>onNavigate("settings")} className="mt-2 flex min-h-14 w-full items-center gap-3 rounded-[var(--radius-sm)] px-2 text-left hover:bg-[var(--surface-subtle)]"><Avatar name={profile.displayName} src={profile.avatarDataUrl} size="sm"/><div className="min-w-0"><p className="truncate text-[12px] font-medium">{profile.displayName}</p><p className="text-[10px] text-[var(--text-muted)]">Personal workspace</p></div></button></div>
  </aside>;
}

export function MobileNavigation({active,onNavigate}:{active:Section;onNavigate:(section:Section)=>void}){return <nav className="scrollbar-none sticky top-16 z-20 flex gap-1 overflow-x-auto border-b border-[var(--border-subtle)] bg-[var(--surface-base)] px-3 py-2 lg:hidden" aria-label="Mobile navigation">{[...primary,{label:"Settings",id:"settings" as Section,icon:Settings}].map(({id,label,icon:Icon})=><button key={id} onClick={()=>onNavigate(id)} aria-current={active===id?"page":undefined} className={`flex min-h-11 shrink-0 items-center gap-2 rounded-[var(--radius-sm)] px-3 text-[12px] ${active===id?"bg-[var(--surface-glacier)] font-medium text-[var(--text-primary)]":"text-[var(--text-secondary)]"}`}><Icon className="size-4" strokeWidth={1.7} aria-hidden="true"/>{label}</button>)}</nav>}
