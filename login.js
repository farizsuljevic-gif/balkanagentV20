import {json,randomToken,sha256,pbkdf2,cookie,readJson,clean,uuid} from '../../_lib.js';
const ADMIN_EMAIL='fariz.suljevic@gmail.com';
const ADMIN_PASSWORD='BA-Fariz-2026!xQ7';
export async function onRequestPost(context){
 const b=await readJson(context.request); const email=clean(b?.email,180).toLowerCase(), password=String(b?.password||'');
 let u=await context.env.DB.prepare('SELECT * FROM users WHERE email=?').bind(email).first();
 if(!u && email===ADMIN_EMAIL && password===ADMIN_PASSWORD){
   const id=uuid(),salt=randomToken(18),hash=await pbkdf2(password,salt);
   await context.env.DB.prepare("INSERT INTO users(id,email,password_hash,password_salt,full_name,company_name,status,is_admin,email_verified,plan) VALUES(?,?,?,?,?,'BalkanAgent','active',1,1,'professional')").bind(id,email,hash,salt,'Fariz Suljevic').run();
   u=await context.env.DB.prepare('SELECT * FROM users WHERE email=?').bind(email).first();
 }
 if(!u||await pbkdf2(password,u.password_salt)!==u.password_hash)return json({error:'Incorrect email or password.'},401);
 const token=randomToken(), tokenHash=await sha256(token); await context.env.DB.prepare("INSERT INTO sessions(token_hash,user_id,expires_at) VALUES(?,?,datetime('now','+30 days'))").bind(tokenHash,u.id).run();
 return json({ok:true,is_admin:!!u.is_admin},200,{'set-cookie':cookie('ba_session',token,2592000)});
}
