import { commitments, opportunities } from "@/data/mock";
import { formatMoney } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { ForecastChart } from "./forecast-chart";
import { Sidebar } from "./sidebar";

const summary = [
  { label: "Liquid cash", value: "£28,818", note: "Across 2 accounts" },
  { label: "Committed cash", value: "£4,286", note: "Next 30 days" },
  { label: "Free cash", value: "£24,532", note: "Available after commitments", strong: true },
];

export function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f5f5f3]">
      <Sidebar />
      <main className="lg:pl-[230px]">
        <header className="sticky top-0 z-20 flex h-16 items-center border-b border-[#e7e8e4] bg-[#f5f5f3]/90 px-5 backdrop-blur md:px-8 lg:px-10">
          <div className="flex items-center gap-2 lg:hidden"><div className="grid size-7 place-items-center rounded-lg bg-[#153f34] text-xs font-semibold text-white">H</div><span className="font-semibold">Harbor</span></div>
          <div className="ml-auto flex items-center gap-2"><Button aria-label="Search"><span className="text-[#7e8580]">⌕</span><span className="hidden sm:inline">Search</span><kbd className="hidden rounded border border-[#dedfdb] bg-[#f6f6f4] px-1.5 font-mono text-[10px] text-[#929792] md:inline">⌘K</kbd></Button><Button className="size-9 px-0" aria-label="Notifications">◌</Button></div>
        </header>

        <div id="overview" className="mx-auto max-w-[1380px] px-5 pb-14 pt-8 md:px-8 lg:px-10">
          <div className="animate-rise flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div><p className="text-[12px] font-medium uppercase tracking-[.12em] text-[#858b87]">Wednesday, 12 August</p><h1 className="mt-2 text-[28px] font-semibold tracking-[-.045em] md:text-[32px]">Good morning, Alex.</h1><p className="mt-1 text-[14px] text-[#717873]">Here’s your financial position and what’s ahead.</p></div>
            <div className="flex items-center gap-2"><Button>Last 30 days <span className="text-[#8b918d]">⌄</span></Button><Button className="border-[#17483b] bg-[#17483b] text-white hover:bg-[#0f392e]">＋ Add account</Button></div>
          </div>

          <section className="animate-rise mt-8 overflow-hidden rounded-[20px] bg-[#153f34] p-6 text-white shadow-[0_12px_30px_rgba(25,49,40,.12)] md:p-8" style={{ animationDelay: "80ms" }}>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div><div className="flex items-center gap-2 text-[12px] text-[#b9cbc5]"><span>Total net worth</span><span className="cursor-help" title="Assets minus liabilities">ⓘ</span></div><div className="mt-3 text-[40px] font-medium tracking-[-.055em] md:text-[50px]">£72,314.68</div><div className="mt-3 flex items-center gap-2 text-[12px]"><Badge className="bg-white/10 text-[#cbe2d9]">↗ 4.2%</Badge><span className="text-[#a9beb7]">£2,916 this month</span></div></div>
              <div className="grid grid-cols-3 gap-7 border-t border-white/10 pt-5 lg:min-w-[440px] lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"><div><p className="text-[10px] uppercase tracking-[.1em] text-[#91aaa2]">Assets</p><p className="mt-1.5 text-[16px] font-medium">£76,218</p></div><div><p className="text-[10px] uppercase tracking-[.1em] text-[#91aaa2]">Liabilities</p><p className="mt-1.5 text-[16px] font-medium">£3,904</p></div><div><p className="text-[10px] uppercase tracking-[.1em] text-[#91aaa2]">Updated</p><p className="mt-1.5 text-[16px] font-medium">Now</p></div></div>
            </div>
          </section>

          <section className="animate-rise mt-4 grid gap-4 md:grid-cols-3" style={{ animationDelay: "120ms" }}>
            {summary.map((item) => <Card key={item.label} className="p-5"><div className="flex items-center justify-between"><p className="text-[12px] text-[#747b76]">{item.label}</p><span className="text-[#a3a7a4]">{item.strong ? "●" : "○"}</span></div><p className="mt-4 text-[24px] font-semibold tracking-[-.04em]">{item.value}</p><p className="mt-1 text-[11px] text-[#929793]">{item.note}</p></Card>)}
          </section>

          <section className="animate-rise mt-4 grid gap-4 xl:grid-cols-[1.6fr_1fr]" style={{ animationDelay: "160ms" }}>
            <Card className="p-5 md:p-6">
              <CardHeader><div><p className="text-[13px] font-medium">30-day projected balance</p><div className="mt-2 flex items-end gap-2"><span className="text-[26px] font-semibold tracking-[-.04em]">£26,489</span><span className="mb-1 text-[11px] text-[#a16622]">↓ £2,329</span></div></div><Button>View forecast <span>→</span></Button></CardHeader>
              <ForecastChart />
            </Card>
            <Card className="p-5 md:p-6">
              <CardHeader><div><p className="text-[13px] font-medium">Financial runway</p><p className="mt-1 text-[11px] text-[#8a908c]">Based on essential outgoings</p></div><span className="text-[#999e9a]">ⓘ</span></CardHeader>
              <div className="mt-8 flex items-baseline gap-2"><span className="text-[40px] font-semibold tracking-[-.05em]">11.4</span><span className="text-[13px] text-[#747b76]">months</span></div>
              <div className="mt-7 h-2 overflow-hidden rounded-full bg-[#edf0ed]"><div className="h-full w-[72%] rounded-full bg-[#396e5e]" /></div>
              <div className="mt-2 flex justify-between text-[10px] text-[#999e9a]"><span>0</span><span>Healthy threshold: 6 months</span><span>16</span></div>
              <p className="mt-7 border-t border-[#ecece9] pt-4 text-[11px] leading-5 text-[#737a75]">Your liquid cash covers core commitments through <strong className="font-medium text-[#333936]">July 2027</strong>.</p>
            </Card>
          </section>

          <section className="animate-rise mt-4 grid gap-4 xl:grid-cols-[1fr_1.25fr]" style={{ animationDelay: "200ms" }}>
            <Card className="p-5 md:p-6">
              <CardHeader><div><p className="text-[13px] font-medium">Monthly spending</p><p className="mt-1 text-[11px] text-[#8d928f]">1–12 August</p></div><Button>Transactions →</Button></CardHeader>
              <div className="mt-5 flex items-end justify-between"><div><p className="text-[27px] font-semibold tracking-[-.04em]">£3,842</p><p className="mt-1 text-[11px] text-[#318067]">↓ 8% vs last month</p></div><p className="text-right text-[10px] text-[#929793]">£5,600 typical<br/>monthly pace</p></div>
              <div className="mt-6 flex h-2 overflow-hidden rounded-full bg-[#eee]"><div className="w-[39%] bg-[#1f5848]"/><div className="w-[21%] bg-[#668b7e]"/><div className="w-[15%] bg-[#9ab0a8]"/><div className="w-[10%] bg-[#c7d2ce]"/></div>
              <div className="mt-5 grid grid-cols-2 gap-3 text-[11px] sm:grid-cols-4">{[["Home","£1,486"],["Food","£812"],["Transport","£564"],["Other","£980"]].map(([name,value], i)=><div key={name}><span className={`mr-1.5 inline-block size-1.5 rounded-full ${["bg-[#1f5848]","bg-[#668b7e]","bg-[#9ab0a8]","bg-[#c7d2ce]"][i]}`}/><span className="text-[#7b817d]">{name}</span><p className="ml-3 mt-1 font-medium">{value}</p></div>)}</div>
            </Card>
            <Card className="p-5 md:p-6">
              <CardHeader><div><p className="text-[13px] font-medium">Upcoming payments</p><p className="mt-1 text-[11px] text-[#8d928f]">£2,885 due in the next 16 days</p></div><Button>View all →</Button></CardHeader>
              <div className="mt-4 divide-y divide-[#ecece9]">{commitments.map((item, index)=><div key={item.id} className="flex items-center gap-3 py-3"><div className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#f0f1ee] text-[11px] font-semibold text-[#5d6862]">{item.name.slice(0,2).toUpperCase()}</div><div className="min-w-0"><p className="truncate text-[12px] font-medium">{item.name}</p><p className="mt-0.5 text-[10px] text-[#929793]">{item.category} · {index === 0 ? "In 3 days" : item.dueDate.slice(5).replace("-", " Aug ")}</p></div><p className="ml-auto text-[12px] font-medium">{formatMoney(item.amount)}</p></div>)}</div>
            </Card>
          </section>

          <section className="animate-rise mt-4" style={{ animationDelay: "240ms" }}>
            <Card className="p-5 md:p-6"><CardHeader><div><div className="flex items-center gap-2"><p className="text-[13px] font-medium">Optimization opportunities</p><Badge>3 found</Badge></div><p className="mt-1 text-[11px] text-[#8d928f]">Potential value identified from your current position</p></div><div className="text-right"><p className="text-[18px] font-semibold text-[#1e624d]">£665 / yr</p><p className="text-[10px] text-[#919693]">estimated impact</p></div></CardHeader>
              <div className="mt-5 grid gap-3 lg:grid-cols-3">{opportunities.map((item, index)=><button key={item.id} className="group rounded-xl border border-[#e7e8e4] bg-[#fafaf8] p-4 text-left transition hover:-translate-y-0.5 hover:border-[#cfd6d1] hover:shadow-sm"><div className="flex items-center justify-between"><span className="grid size-7 place-items-center rounded-lg bg-[#e9f0ec] text-[12px] text-[#265d4c]">{["↗","⊙","⌁"][index]}</span><span className="text-[11px] font-medium text-[#316c58]">{formatMoney(item.annualImpact)}/yr</span></div><p className="mt-4 text-[12px] font-medium">{item.title}</p><p className="mt-1.5 text-[11px] leading-[1.55] text-[#777e79]">{item.description}</p><p className="mt-4 text-[11px] font-medium text-[#52605a] group-hover:text-[#174b3e]">Review opportunity →</p></button>)}</div>
            </Card>
          </section>
          <p className="mt-8 text-center text-[10px] text-[#a1a6a2]">Mock data · Last refreshed just now</p>
        </div>
      </main>
    </div>
  );
}
