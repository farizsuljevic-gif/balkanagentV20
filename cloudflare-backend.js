
const json=(data,status=200,headers={})=>new Response(JSON.stringify(data),{status,headers:{"content-type":"application/json; charset=utf-8",...headers}});
const err=(message,status=400)=>json({error:message},status);
const cookie=(name,value,opts={})=>`${name}=${value}; Path=/; HttpOnly; SameSite=Lax; ${opts.maxAge!==undefined?`Max-Age=${opts.maxAge}; `:""}Secure`;
const parseCookies=req=>Object.fromEntries((req.headers.get("cookie")||"").split(";").map(x=>x.trim().split("=")).filter(x=>x.length===2));
const bytesToHex=a=>[...new Uint8Array(a)].map(b=>b.toString(16).padStart(2,"0")).join("");
async function hashPassword(password,saltHex){
 const salt=new Uint8Array(saltHex.match(/.{1,2}/g).map(x=>parseInt(x,16)));
 const key=await crypto.subtle.importKey("raw",new TextEncoder().encode(password),"PBKDF2",false,["deriveBits"]);
 return bytesToHex(await crypto.subtle.deriveBits({name:"PBKDF2",hash:"SHA-256",salt,iterations:120000},key,256));
}
const randomHex=n=>{const a=new Uint8Array(n);crypto.getRandomValues(a);return [...a].map(b=>b.toString(16).padStart(2,"0")).join("")};
async function body(req){try{return await req.json()}catch{return {}}}
async function auth(req,env,admin=false){
 const token=parseCookies(req).ba_session;if(!token)return null;
 const row=await env.DB.prepare(`SELECT u.id,u.email,u.full_name,u.company_name,u.phone,u.website,u.business_description,u.status,u.plan,u.is_admin FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token=? AND s.expires_at>datetime('now')`).bind(token).first();
 if(!row||row.status==="suspended"||(admin&&!row.is_admin))return null;
 return {...row,is_admin:Boolean(row.is_admin)};
}
async function createAdminIfNeeded(env,email,password){
 if(email!=="info@balkanagent.com")return;
 const exists=await env.DB.prepare("SELECT id FROM users WHERE email=?").bind(email).first();if(exists)return;
 const salt=randomHex(16),hash=await hashPassword(password,salt);
 await env.DB.prepare("INSERT INTO users(email,password_hash,password_salt,full_name,company_name,status,plan,is_admin) VALUES(?,?,?,?,?,'active','professional',1)").bind(email,hash,salt,"Fariz Suljevic","BalkanAgent").run();
}
async function session(env,userId){
 const token=randomHex(32),expires=new Date(Date.now()+7*864e5).toISOString();
 await env.DB.prepare("INSERT INTO sessions(token,user_id,expires_at) VALUES(?,?,?)").bind(token,userId,expires).run();return token;
}
export async function onRequest(context){
 const {request:req,env}=context,url=new URL(req.url),path=url.pathname.replace(/^\/api\/?/,""),method=req.method;
 try{
  if(path==="health")return json({ok:true,service:"BalkanAgent API"});
  if(path==="auth/register"&&method==="POST"){
   const d=await body(req);const email=String(d.email||"").trim().toLowerCase(),password=String(d.password||"");
   if(!email.includes("@")||password.length<10||!d.full_name)return err("Enter a valid email, full name and password of at least 10 characters.");
   const salt=randomHex(16),hash=await hashPassword(password,salt);
   try{const r=await env.DB.prepare("INSERT INTO users(email,password_hash,password_salt,full_name,company_name) VALUES(?,?,?,?,?)").bind(email,hash,salt,String(d.full_name).trim(),String(d.company_name||"").trim()).run();const token=await session(env,r.meta.last_row_id);return json({ok:true},{status:200,headers:{"set-cookie":cookie("ba_session",token,{maxAge:604800})}})}
   catch(e){if(String(e).includes("UNIQUE"))return err("An account with this email already exists.",409);throw e}
  }
  if(path==="auth/login"&&method==="POST"){
   const d=await body(req),email=String(d.email||"").trim().toLowerCase(),password=String(d.password||"");
   await createAdminIfNeeded(env,email,password);
   const u=await env.DB.prepare("SELECT * FROM users WHERE email=?").bind(email).first();
   if(!u||await hashPassword(password,u.password_salt)!==u.password_hash)return err("Incorrect email or password.",401);
   if(u.status==="suspended")return err("This account is suspended.",403);
   const token=await session(env,u.id);return json({ok:true},{status:200,headers:{"set-cookie":cookie("ba_session",token,{maxAge:604800})}});
  }
  if(path==="auth/logout"&&method==="POST"){const token=parseCookies(req).ba_session;if(token)await env.DB.prepare("DELETE FROM sessions WHERE token=?").bind(token).run();return json({ok:true},200,{"set-cookie":cookie("ba_session","",{maxAge:0})})}
  if(path==="auth/me"){const u=await auth(req,env);if(!u)return err("Not authenticated.",401);return json({user:u})}
  if(path==="auth/password"&&method==="POST"){const u=await auth(req,env);if(!u)return err("Not authenticated.",401);const d=await body(req),p=String(d.password||"");if(p.length<10)return err("Password must contain at least 10 characters.");const salt=randomHex(16),hash=await hashPassword(p,salt);await env.DB.prepare("UPDATE users SET password_hash=?,password_salt=? WHERE id=?").bind(hash,salt,u.id).run();return json({ok:true})}
  const u=await auth(req,env);if(!u)return err("Not authenticated.",401);
  if(path==="dashboard"){const [c,b,a,recent]=await Promise.all([env.DB.prepare("SELECT COUNT(*) n FROM conversations WHERE user_id=?").bind(u.id).first(),env.DB.prepare("SELECT COUNT(*) n FROM bookings WHERE user_id=?").bind(u.id).first(),env.DB.prepare("SELECT COUNT(*) n FROM agents WHERE user_id=?").bind(u.id).first(),env.DB.prepare("SELECT * FROM conversations WHERE user_id=? ORDER BY id DESC LIMIT 5").bind(u.id).all()]);return json({conversations:c.n,bookings:b.n,leads:c.n,revenue:b.n*75,weekly:[24,42,36,58,74,49,82],recent:recent.results})}
  if(path==="conversations"&&method==="GET"){const d=await env.DB.prepare("SELECT * FROM conversations WHERE user_id=? ORDER BY id DESC").bind(u.id).all();return json({items:d.results})}
  if(path==="bookings"&&method==="GET"){const d=await env.DB.prepare("SELECT * FROM bookings WHERE user_id=? ORDER BY starts_at").bind(u.id).all();return json({items:d.results})}
  if(path==="bookings"&&method==="POST"){const d=await body(req);if(!d.customer_name||!d.service||!d.starts_at)return err("Complete all booking fields.");await env.DB.prepare("INSERT INTO bookings(user_id,customer_name,service,starts_at) VALUES(?,?,?,?)").bind(u.id,d.customer_name,d.service,d.starts_at).run();return json({ok:true})}
  if(path==="agents"&&method==="GET"){const d=await env.DB.prepare("SELECT * FROM agents WHERE user_id=? ORDER BY id DESC").bind(u.id).all();return json({items:d.results})}
  if(path==="agents"&&method==="POST"){const d=await body(req);if(!d.name||!d.role)return err("Name and role are required.");await env.DB.prepare("INSERT INTO agents(user_id,name,role,instructions) VALUES(?,?,?,?)").bind(u.id,d.name,d.role,d.instructions||"").run();return json({ok:true})}
  if(path==="profile"&&method==="GET")return json({profile:u});
  if(path==="profile"&&method==="PATCH"){const d=await body(req);await env.DB.prepare("UPDATE users SET full_name=?,company_name=?,phone=?,website=?,business_description=? WHERE id=?").bind(d.full_name||u.full_name,d.company_name||"",d.phone||"",d.website||"",d.business_description||"",u.id).run();return json({ok:true})}
  if(path.startsWith("admin/")){
   const a=await auth(req,env,true);if(!a)return err("Administrator access required.",403);
   if(path==="admin/stats"){const [users,active,pending,agents]=await Promise.all([env.DB.prepare("SELECT COUNT(*) n FROM users").first(),env.DB.prepare("SELECT COUNT(*) n FROM users WHERE status='active'").first(),env.DB.prepare("SELECT COUNT(*) n FROM users WHERE status='pending'").first(),env.DB.prepare("SELECT COUNT(*) n FROM agents").first()]);return json({users:users.n,active:active.n,pending:pending.n,agents:agents.n})}
   if(path==="admin/users"&&method==="GET"){const d=await env.DB.prepare("SELECT id,email,full_name,company_name,status,plan,is_admin,created_at FROM users ORDER BY id DESC").all();return json({items:d.results})}
   if(path==="admin/users"&&method==="PATCH"){const d=await body(req);if(!["pending","active","suspended"].includes(d.status)||!["starter","business","professional"].includes(d.plan))return err("Invalid status or plan.");await env.DB.prepare("UPDATE users SET status=?,plan=? WHERE id=?").bind(d.status,d.plan,Number(d.id)).run();return json({ok:true})}
  }
  return err("API route not found.",404);
 }catch(e){console.error(e);return err("Server error. Check the D1 database binding and schema.",500)}
}
