import assert from "node:assert/strict";
import test from "node:test";
import { existsSync, readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MobileNavigation } from "../components/dashboard/sidebar";
import { SettingsView } from "../components/settings/settings-view";
import { initialData } from "../data/mock";

test("canonical two-line Harbor assets exist and keep the approved geometry",()=>{for(const file of ["harbor-mark.svg","harbor-mark-deep-ocean.svg","harbor-favicon.svg","harbor-app-icon.svg"])assert.ok(existsSync(new URL(`../public/branding/${file}`,import.meta.url)));const mark=readFileSync(new URL("../public/branding/harbor-mark.svg",import.meta.url),"utf8");assert.equal((mark.match(/<path /g)??[]).length,2);assert.match(mark,/viewBox="0 0 160 100"/);assert.doesNotMatch(mark,/<rect|<text/);});
test("Snow, Deep Ocean, and System appearance choices render",()=>{const html=renderToStaticMarkup(createElement(SettingsView,{profile:initialData.profile,onSave:async()=>true,saving:false}));for(const choice of ["Snow","Deep Ocean","System"])assert.match(html,new RegExp(choice));});
test("semantic palette and reduced-motion contract are present",()=>{const css=readFileSync(new URL("../app/globals.css",import.meta.url),"utf8");for(const token of ["--surface-canvas","--text-primary","--primary","--chart-1","--focus"])assert.match(css,new RegExp(token));assert.match(css,/prefers-reduced-motion/);assert.match(css,/#cdfdff/i);assert.match(css,/#0f2134/i);});
test("mobile navigation exposes every existing workspace",()=>{const html=renderToStaticMarkup(createElement(MobileNavigation,{active:"dashboard",onNavigate:()=>{}}));for(const label of ["Dashboard","Accounts","Transactions","Subscriptions","Commitments","Forecast","Beacon","Settings"])assert.match(html,new RegExp(label));assert.match(html,/aria-current="page"/);});
