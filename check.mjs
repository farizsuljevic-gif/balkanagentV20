import {readdir,readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const rootPath=fileURLToPath(new URL('../',import.meta.url));
async function walk(p){let out=[];for(const n of await readdir(p)){const f=path.join(p,n);(await stat(f)).isDirectory()?out.push(...await walk(f)):out.push(f)}return out}
const files=await walk(rootPath);let bad=[];
for(const f of files.filter(x=>x.endsWith('.html'))){const t=await readFile(f,'utf8');for(const m of t.matchAll(/(?:src|href)="(\/[^"]+)"/g)){const rel=m[1].split('?')[0];if(rel.startsWith('/api/')||rel==='/')continue;try{await stat(path.join(rootPath,rel.slice(1)))}catch{bad.push(`${f}: missing ${rel}`)}}}
if(bad.length){console.error(bad.join('\n'));process.exit(1)}
console.log(`Checked ${files.length} files; static references OK.`)
