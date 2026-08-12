"use client";

export type Section = "dashboard" | "accounts" | "transactions" | "subscriptions" | "commitments" | "forecast" | "insights" | "settings";
const primary: { label: string; id: Section; mark: string }[] = [
  { label: "Dashboard", id: "dashboard", mark: "⌂" }, { label: "Accounts", id: "accounts", mark: "▣" },
  { label: "Transactions", id: "transactions", mark: "↔" }, { label: "Subscriptions", id: "subscriptions", mark: "◫" },
  { label: "Commitments", id: "commitments", mark: "◷" }, { label: "Forecast", id: "forecast", mark: "⌁" }, { label: "Insights", id: "insights", mark: "✦" },
];

export function Sidebar({ active, onNavigate }: { active: Section; onNavigate: (section: Section) => void }) {
  const link = (id: Section, label: string, mark: string) => (
    <button key={id} onClick={() => onNavigate(id)} className={`flex h-9 w-full items-center gap-3 rounded-lg px-2.5 text-left text-[13px] transition ${active === id ? "bg-[#e9ebe7] font-medium text-[#1c2521]" : "text-[#68706b] hover:bg-[#eeefec] hover:text-[#252b28]"}`}>
      <span className="w-4 text-center text-[14px] text-[#69716c]" aria-hidden="true">{mark}</span>{label}
    </button>
  );
  return <aside className="fixed inset-y-0 left-0 z-30 hidden w-[230px] border-r border-[#e5e6e2] bg-[#f8f8f6] px-3 py-4 lg:flex lg:flex-col">
    <button onClick={() => onNavigate("dashboard")} className="flex h-11 items-center gap-2.5 px-2"><div className="grid size-7 place-items-center rounded-[9px] bg-[#153f34] text-[12px] font-semibold text-white">H</div><span className="text-[15px] font-semibold tracking-[-.02em]">Harbor</span></button>
    <nav className="mt-7 space-y-1" aria-label="Main navigation">{primary.map(({ id, label, mark }) => link(id, label, mark))}</nav>
    <div className="mt-auto">{link("settings", "Settings", "⚙")}<div className="mt-4 flex items-center gap-3 border-t border-[#e4e5e1] px-2 pt-4"><div className="grid size-8 place-items-center rounded-full bg-[#d9e1dc] text-[11px] font-semibold text-[#23473c]">AH</div><div className="min-w-0"><p className="truncate text-[12px] font-medium">Alex Hart</p><p className="text-[10px] text-[#8a8f8b]">Personal workspace</p></div></div></div>
  </aside>;
}
