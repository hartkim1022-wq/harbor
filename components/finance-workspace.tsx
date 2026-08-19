"use client";

import { useEffect, useMemo, useState } from "react";
import { AccountsView } from "@/components/accounts/accounts-view";
import { TransactionsView } from "@/components/transactions/transactions-view";
import { RecurringView } from "@/components/recurring/recurring-view";
import { ForecastView } from "@/components/forecast/forecast-view";
import { BeaconView } from "@/components/beacon/beacon-view";
import { Dashboard } from "@/components/dashboard/dashboard";
import { MobileNavigation, Sidebar, type Section } from "@/components/dashboard/sidebar";
import { SettingsView } from "@/components/settings/settings-view";
import { HarborLogo } from "@/components/brand/harbor-logo";
import { resolvedTheme } from "@/lib/profile";
import { sectionFromHash } from "@/lib/navigation";
import { HttpHarborRepository } from "@/lib/repository";
import type { AccountInput, CommitmentInput, HarborData, HarborProfileInput, SubscriptionInput, TransactionInput } from "@/lib/types";

export function FinanceWorkspace() {
  const [repository] = useState(() => new HttpHarborRepository());
  const [data, setData] = useState<HarborData | null>(null);
  const [active, setActive] = useState<Section>("dashboard");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  useEffect(() => { repository.load().then(setData).catch((reason: Error) => setError(reason.message)); }, [repository]);
  useEffect(()=>{const sync=()=>setActive(sectionFromHash(window.location.hash));sync();window.addEventListener("hashchange",sync);return()=>window.removeEventListener("hashchange",sync);},[]);
  useEffect(()=>{if(!data)return;const media=window.matchMedia("(prefers-color-scheme: dark)");const apply=()=>{const theme=resolvedTheme(data.profile.theme,media.matches);document.documentElement.dataset.theme=theme;document.querySelector('meta[name="theme-color"]')?.setAttribute("content",theme==="dark"?"#0F2134":"#EDF9FA");localStorage.setItem("harbor-theme",data.profile.theme);};apply();media.addEventListener("change",apply);return()=>media.removeEventListener("change",apply);},[data]);
  const navigate = (section: Section) => { setActive(section); history.replaceState(null, "", section === "dashboard" ? "#overview" : `#${section}`); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const run = async (operation: () => Promise<HarborData>) => { setSaving(true); setError(null); try { setData(await operation()); return true; } catch (reason) { setError(reason instanceof Error ? reason.message : "Harbor could not save your changes."); return false; } finally { setSaving(false); } };
  const actions = useMemo(() => ({
    createAccount: (input: AccountInput) => run(() => repository.createAccount(input)), updateAccount: (id: string, input: AccountInput) => run(() => repository.updateAccount(id, input)), deleteAccount: (id: string) => run(() => repository.deleteAccount(id)),
    updateProfile:(input:HarborProfileInput)=>run(()=>repository.updateProfile(input)),
    createTransaction: (input: TransactionInput) => run(() => repository.createTransaction(input)), updateTransaction: (id: string, input: TransactionInput) => run(() => repository.updateTransaction(id, input)), deleteTransaction: (id: string) => run(() => repository.deleteTransaction(id)),
    createSubscription:(input:SubscriptionInput)=>run(()=>repository.createSubscription(input)),updateSubscription:(id:string,input:SubscriptionInput)=>run(()=>repository.updateSubscription(id,input)),deleteSubscription:(id:string)=>run(()=>repository.deleteSubscription(id)),
    createCommitment:(input:CommitmentInput)=>run(()=>repository.createCommitment(input)),updateCommitment:(id:string,input:CommitmentInput)=>run(()=>repository.updateCommitment(id,input)),deleteCommitment:(id:string)=>run(()=>repository.deleteCommitment(id)),
  }), [repository]);

  return <div className="min-h-screen bg-[var(--surface-canvas)]"><Sidebar active={active} onNavigate={navigate} profile={data?.profile??{id:"loading",displayName:"User",fullName:null,avatarDataUrl:null,baseCurrency:"GBP",timeZone:"Europe/London",language:"en-GB",theme:"system",createdAt:"",updatedAt:""}}/><main className="lg:pl-[244px]">
    <header className="sticky top-0 z-20 flex h-16 items-center border-b border-[var(--border-subtle)] bg-[color-mix(in_srgb,var(--surface-canvas)_88%,transparent)] px-5 backdrop-blur md:px-8 lg:px-10"><button onClick={() => navigate("dashboard")} className="lg:hidden"><HarborLogo/></button><div className="ml-auto flex items-center gap-3 text-[11px] text-[var(--text-muted)]">{saving && <span>Saving…</span>}<span className="hidden rounded-md border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-2 py-1 sm:inline">{data?.profile.baseCurrency??"GBP"} reporting</span><button onClick={()=>navigate("settings")} className="inline-flex h-9 items-center gap-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-3 font-medium text-[var(--text-secondary)]" aria-label="Open profile settings"><span aria-hidden="true">●</span><span>Profile</span></button></div></header>
    <MobileNavigation active={active} onNavigate={navigate}/>
    {error && <div className="mx-auto mt-4 max-w-[1380px] px-5 md:px-8 lg:px-10"><div role="alert" className="rounded-[var(--radius-sm)] border border-[var(--warning)] bg-[color-mix(in_srgb,var(--warning)_10%,var(--surface-elevated))] px-4 py-3 text-[12px] text-[var(--text-primary)]">{error}</div></div>}
    {!data ? <LoadingState/> : active === "dashboard" ? <Dashboard data={data} onNavigate={navigate}/> : active === "accounts" ? <AccountsView accounts={data.accounts} actions={actions}/> : active === "transactions" ? <TransactionsView data={data} actions={actions}/> : active === "subscriptions" ? <RecurringView mode="subscriptions" items={data.subscriptions} accounts={data.accounts} actions={actions}/> : active === "commitments" ? <RecurringView mode="commitments" items={data.commitments} accounts={data.accounts} actions={actions}/> : active === "forecast" ? <ForecastView data={data}/> : active === "beacon" ? <BeaconView data={data}/> : active === "settings" ? <SettingsView profile={data.profile} onSave={actions.updateProfile} saving={saving}/> : <ComingSoon section={active} onNavigate={navigate}/>} 
  </main></div>;
}

function LoadingState() { return <div className="mx-auto max-w-[1380px] px-5 py-10 md:px-8 lg:px-10" aria-label="Loading Harbor"><div className="h-8 w-56 animate-pulse rounded bg-[var(--surface-subtle)]"/><div className="mt-8 h-48 animate-pulse rounded-[var(--radius-lg)] bg-[var(--surface-subtle)]"/><div className="mt-4 grid gap-4 md:grid-cols-3">{[1,2,3].map(i=><div key={i} className="h-28 animate-pulse rounded-[var(--radius-md)] bg-[var(--surface-subtle)]"/>)}</div></div>; }
function ComingSoon({ section, onNavigate }: { section: Section; onNavigate: (section: Section) => void }) { return <div className="mx-auto max-w-[1380px] px-5 py-10 md:px-8 lg:px-10"><p className="text-[11px] font-medium uppercase tracking-[.12em] text-[var(--text-muted)]">Harbor workspace</p><h1 className="mt-2 text-[30px] font-semibold capitalize tracking-[-.04em]">{section}</h1><div className="mt-8 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-10 text-center"><div className="mx-auto grid size-12 place-items-center rounded-xl bg-[var(--surface-subtle)] text-[var(--text-accent)]">⌁</div><h2 className="mt-5 text-[16px] font-medium">This workspace is ready for its next phase.</h2><p className="mx-auto mt-2 max-w-md text-[12px] leading-5 text-[var(--text-muted)]">Accounts and transactions now form Harbor’s working financial core. This section will build on that shared data model.</p><button onClick={()=>onNavigate("dashboard")} className="mt-5 rounded-lg bg-[var(--surface-brand)] px-4 py-2 text-[12px] font-medium text-[var(--text-on-brand)]">Return to dashboard</button></div></div>; }
