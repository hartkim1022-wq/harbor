import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { HarborLogo } from "../components/brand/harbor-logo";
import { Sidebar } from "../components/dashboard/sidebar";
import { Dashboard } from "../components/dashboard/dashboard";
import { SettingsView } from "../components/settings/settings-view";
import { initialData } from "../data/mock";
import { sectionFromHash } from "../lib/navigation";

const profile={...initialData.profile,displayName:"Morgan"};
test("Settings deep links reopen the Profile workspace",()=>{assert.equal(sectionFromHash("#settings"),"settings");assert.equal(sectionFromHash("#overview"),"dashboard");});
test("Profile settings render every identity field and a clear save action",()=>{const html=renderToStaticMarkup(createElement(SettingsView,{profile,onSave:async()=>true,saving:false}));for(const label of ["Display name","Full name","Base currency","Time zone","Language","Theme","Save changes"])assert.match(html,new RegExp(label,"i"));assert.match(html,/Settings → Profile/);});
test("sidebar receives the updated display name and rendered Harbor lockup",()=>{const html=renderToStaticMarkup(createElement(Sidebar,{active:"dashboard",onNavigate:()=>{},profile}));assert.match(html,/Morgan/);assert.match(html,/data-testid="harbor-logo"/);assert.match(html,/Harbor/);});
test("dashboard greeting receives the updated display name",()=>{const html=renderToStaticMarkup(createElement(Dashboard,{data:{...initialData,profile},onNavigate:()=>{}}));assert.match(html,/Morgan/);});
test("standalone Harbor mark is rendered as an accessible graphic",()=>{const html=renderToStaticMarkup(createElement(HarborLogo));assert.match(html,/<svg/);assert.match(html,/aria-label="Harbor"/);});
test("production identity surfaces contain no template person",()=>{const files=["components/finance-workspace.tsx","components/dashboard/sidebar.tsx","components/dashboard/dashboard.tsx","components/settings/settings-view.tsx","data/mock.ts","lib/normalize.ts"];const source=files.map(file=>readFileSync(new URL(`../${file}`,import.meta.url),"utf8")).join("\n");assert.doesNotMatch(source,/Alex(?: Hart)?/i);});
