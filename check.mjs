import { readFile, readdir } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';

const root = new URL('../', import.meta.url);
const required = [
  'index.html','login.html','register.html','dashboard.html','admin.html','billing.html',
  'agents.html','bookings.html','conversations.html','profile.html','privacy.html',
  'terms.html','cookies.html','impressum.html','app.js','site.js','styles.css',
  'schema.sql','wrangler.toml','UPLOAD_TO_GITHUB.txt','functions/api/[[path]].js','balkan-map-v22.png'
];
for (const file of required) await readFile(new URL(file, root));

for (const file of ['app.js','site.js','functions/api/[[path]].js']) {
  const result = spawnSync(process.execPath, ['--check', new URL(file, root).pathname], { encoding: 'utf8' });
  if (result.status !== 0) throw new Error(`Syntax error in ${file}:\n${result.stderr}`);
}

const index = await readFile(new URL('index.html', root), 'utf8');
for (const price of ['€49','€99','€159','€259']) {
  if (!index.includes(price)) throw new Error(`Missing pricing value ${price} in index.html`);
}
const app = await readFile(new URL('app.js', root), 'utf8');
for (const lang of ['en','me','de','sq','hr','sr','bs','mk','sl','it','tr','ru']) {
  if (!new RegExp(`(?:^|[,\\n])${lang}:\\{`).test(app)) throw new Error(`Missing dashboard language: ${lang}`);
}
const top = await readdir(root);
if (top.some(name => /^BalkanAgent-V3-Enterprise$/i.test(name))) throw new Error('Unexpected extra main folder found.');
console.log('BalkanAgent V3 Enterprise: structure, JavaScript, prices and 12 languages passed validation.');
