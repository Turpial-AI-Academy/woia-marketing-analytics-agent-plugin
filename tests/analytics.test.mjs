import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
const script=path.resolve('skills/marketing-analytics/scripts/compute-rates.mjs');
async function run(input){const dir=await mkdtemp(path.join(os.tmpdir(),'w3-analytics-'));try{const f=path.join(dir,'metrics.json');const before=JSON.stringify(input);await writeFile(f,before);const r=spawnSync(process.execPath,[script,'--file',f],{encoding:'utf8'});assert.equal(await readFile(f,'utf8'),before,'analytics must not alter source evidence');return {...r,data:r.stdout.trim()?JSON.parse(r.stdout):null};}finally{await rm(dir,{recursive:true,force:true});}}
test('bounded ratio calculation remains read-only evidence',async()=>{const r=await run({metrics:[{name:'synthetic-rate',numerator:1,denominator:4}]});assert.equal(r.status,0);assert.equal(r.data.metrics[0].rate,.25);});
test('zero denominator reports explicit unknown/error rather than score',async()=>{const r=await run({metrics:[{name:'no-coverage',numerator:0,denominator:0}]});assert.equal(r.status,2);assert.equal(r.data.metrics[0].result,'ERROR');assert.equal(r.data.metrics[0].rate,undefined);});
test('invalid numeric evidence refuses rate',async()=>{const r=await run({metrics:[{name:'invalid',numerator:'not-a-number',denominator:4}]});assert.equal(r.status,2);assert.equal(r.data.metrics[0].rate,undefined);});
test('missing metric collection fails closed',async()=>{assert.notEqual((await run({})).status,0);});
test('partial source evidence preserves valid observations and invalid limitations',async()=>{const r=await run({metrics:[{name:'valid',numerator:2,denominator:4},{name:'unknown',numerator:1,denominator:0}]});assert.equal(r.status,2);assert.equal(r.data.result,'PARTIAL');assert.equal(r.data.metrics[0].rate,.5);assert.equal(r.data.metrics[1].result,'ERROR');});
