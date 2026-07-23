const enc = new TextEncoder();
export const json = (data, status=200, headers={}) => new Response(JSON.stringify(data), {status, headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store',...headers}});
export const uuid = () => crypto.randomUUID();
export const randomToken = (bytes=32) => { const a=new Uint8Array(bytes); crypto.getRandomValues(a); return btoa(String.fromCharCode(...a)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,''); };
export const sha256 = async v => { const b=await crypto.subtle.digest('SHA-256',enc.encode(v)); return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join(''); };
export const pbkdf2 = async (password,salt) => { const key=await crypto.subtle.importKey('raw',enc.encode(password),'PBKDF2',false,['deriveBits']); const bits=await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt:enc.encode(salt),iterations:150000},key,256); return [...new Uint8Array(bits)].map(x=>x.toString(16).padStart(2,'0')).join(''); };
export const cookie = (name,value,maxAge) => `${name}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
export const getCookie = (request,name) => { const c=request.headers.get('cookie')||''; for(const part of c.split(';')){const [k,...v]=part.trim().split('='); if(k===name)return v.join('=');} return null; };
export async function authUser(context){ const token=getCookie(context.request,'ba_session'); if(!token)return null; const hash=await sha256(token); const row=await context.env.DB.prepare(`SELECT u.id,u.email,u.full_name,u.company_name,u.phone,u.country,u.preferred_language,u.plan,u.status,u.is_admin,u.created_at FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token_hash=? AND s.expires_at>datetime('now')`).bind(hash).first(); return row||null; }
export const requireAuth = async context => { const user=await authUser(context); return user?{user}:{response:json({error:'Unauthorized'},401)}; };
export async function readJson(request){ try{return await request.json();}catch{return null;} }
export const validEmail = e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(e||'').toLowerCase());
export const clean = (v,n=200) => String(v||'').trim().slice(0,n);
