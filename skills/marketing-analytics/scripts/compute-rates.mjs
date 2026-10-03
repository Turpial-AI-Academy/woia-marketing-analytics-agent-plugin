import { readFile } from "node:fs/promises";
const idx=process.argv.indexOf("--file"); if(idx<0||!process.argv[idx+1]) throw new Error("--file is required");
const doc=JSON.parse(await readFile(process.argv[idx+1],"utf8"));
if(!Array.isArray(doc.metrics)) throw new Error("metrics must be an array");
const results=[]; let failed=false;
for(const [i,m] of doc.metrics.entries()){
  const numerator=Number(m.numerator), denominator=Number(m.denominator);
  if(typeof m.name!=="string"||!Number.isFinite(numerator)||!Number.isFinite(denominator)){
    results.push({index:i,name:m.name??null,result:"ERROR",error:"invalid name/numerator/denominator"}); failed=true; continue;
  }
  if(denominator===0){results.push({index:i,name:m.name,result:"ERROR",error:"zero denominator"});failed=true;continue}
  results.push({index:i,name:m.name,result:"OK",numerator,denominator,rate:numerator/denominator});
}
console.log(JSON.stringify({result:failed?"PARTIAL":"PASS",metrics:results},null,2));
process.exitCode=failed?2:0;
