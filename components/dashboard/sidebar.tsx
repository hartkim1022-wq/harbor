"use client";
import { HarborLogo } from "@/components/brand/harbor-logo";
import { Avatar } from "@/components/profile/avatar";
import type { HarborProfile } from "@/lib/types";

export type Section = "dashboard" | "accounts" | "transactions" | "subscriptions" | "commitments" | "forecast" | "beacon" | "settings";
const primary: { label: string; id: Section; mark: string }[] = [
  { label: "Dashboard", id: "dashboard", mark: "⌂" }, { label: "Accounts", id: "accounts", mark: "▣" },
  { label: "Transactions", id: "transactions", mark: "↔" }, { label: "Subscriptions", id: "subscriptions", mark: "◫" },
  { label: "Commitments", id: "commitments", mark: "◷" }, { label: "Forecast", id: "forecast", mark: "⌁" }, { label: "Beacon", id: "beacon", mark: "✦" },
];

export function Sidebar({ active, onNavigate, profile }: { active: Section; onNavigate: (section: Section) => void; profile:HarborProfile }) {
  const link = (id: Section, label: string, mark: string) => (
    <button key={id} onClick={() => onNavigate(id)} className={`flex h-9 w-full items-center gap-3 rounded-lg px-2.5 text-left text-[13px] transition ${active === id ? "bg-[#e9ebe7] font-medium text-[#1c2521]" : "text-[#68706b] hover:bg-[#eeefec] hover:text-[#252b28]"}`}>
      <span className="w-4 text-center text-[14px] text-[#69716c]" aria-hidden="true">{mark}</span>{label}
    </button>
  );
  return <aside className="fixed inset-y-0 left-0 z-30 hidden w-[230px] border-r border-[#e5e6e2] bg-[#f8f8f6] px-3 py-4 lg:flex lg:flex-col">
    <button onClick={() => onNavigate("dashboard")} className="flex h-11 items-center px-2"><HarborLogo/></button>
    <nav className="mt-7 space-y-1" aria-label="Main navigation">{primary.map(({ id, label, mark }) => link(id, label, mark))}</nav>
    <div className="mt-auto">{link("settings", "Settings", "⚙")}<button onClick={()=>onNavigate("settings")} className="mt-4 flex w-full items-center gap-3 px-2 pt-3 text-left"><Avatar name={profile.displayName} src={profile.avatarDataUrl} size="sm"/><div className="min-w-0"><p className="truncate text-[12px] font-medium">{profile.displayName}</p><p className="text-[10px] text-[var(--text-muted)]">Personal workspace</p></div></button></div>
  </aside>;
}
