
import fs from "node:fs";import path from "node:path";
const root=process.cwd(),files=fs.readdirSync(root),needed=["index.html","admin.html","dashboard.html","styles.css","app.js","logo.svg","schema.sql","functions/api/[[path]].js"];
for(const f of needed){if(!fs.existsSync(path.join(root,f)))throw new Error(`Missing ${f}`)}
for(const f of files.filter(x=>x.endsWith(".html"))){const s=fs.readFileSync(path.join(root,f),"utf8");for(const m of s.matchAll(/(?:href|src)="\/([^"#?]+)/g)){const target=m[1];if(target.startsWith("api/"))continue;if(!fs.existsSync(path.join(root,target)))throw new Error(`${f}: missing /${target}`)}}
console.log("BalkanAgent checks passed.");
