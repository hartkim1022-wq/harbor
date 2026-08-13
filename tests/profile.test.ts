import assert from "node:assert/strict";
import test from "node:test";
import { initialData } from "../data/mock";
import { normalizeHarborData } from "../lib/normalize";
import { greetingFor, profileInitials, resolvedTheme, validateAvatar } from "../lib/profile";
import { HttpHarborRepository } from "../lib/repository";

test("pre-RC1 workspaces gain a neutral profile without losing financial data",()=>{const legacy={...initialData,profile:undefined};const migrated=normalizeHarborData(legacy as unknown as typeof initialData);assert.equal(migrated.profile.displayName,"Harbor user");assert.equal(migrated.accounts,legacy.accounts);assert.equal(migrated.transactions,legacy.transactions);});
test("profile identity helpers propagate names and initials",()=>{assert.equal(profileInitials("Hart"),"H");assert.equal(profileInitials("Morgan Lee"),"ML");assert.equal(profileInitials(""),"H");});
test("greeting uses the profile time zone",()=>{assert.equal(greetingFor({timeZone:"Europe/London"},new Date("2026-08-12T20:00:00Z")),"Good evening");assert.equal(greetingFor({timeZone:"Asia/Shanghai"},new Date("2026-08-12T01:00:00Z")),"Good morning");});
test("theme preference resolves and persists deterministically",()=>{assert.equal(resolvedTheme("system",true),"dark");assert.equal(resolvedTheme("system",false),"light");assert.equal(resolvedTheme("light",true),"light");});
test("avatar validation rejects invalid and oversized files",()=>{assert.match(validateAvatar({type:"application/pdf",size:100})??"",/PNG/);assert.match(validateAvatar({type:"image/png",size:2_000_000})??"",/1.5 MB/);assert.equal(validateAvatar({type:"image/webp",size:1000}),null);});
test("profile editing persists through the repository boundary",async()=>{const original=globalThis.fetch;let stored=structuredClone(initialData);globalThis.fetch=async(_input,init)=>{if(init?.method==="PUT")stored=JSON.parse(String(init.body));return new Response(JSON.stringify(stored),{status:200,headers:{"content-type":"application/json"}});};try{const repository=new HttpHarborRepository();await repository.load();const result=await repository.updateProfile({...stored.profile,displayName:"Morgan",fullName:"Morgan Lee",theme:"dark"});assert.equal(result.profile.displayName,"Morgan");assert.equal(stored.profile.theme,"dark");assert.equal(stored.accounts.length,initialData.accounts.length);}finally{globalThis.fetch=original;}});
