import {json,uuid,randomToken,sha256,pbkdf2,cookie,readJson,validEmail,clean} from '../../_lib.js';
export async function onRequestPost(context){
 const b=await readJson(context.request); if(!b)return json({error:'Invalid request'},400);
 const email=clean(b.email,180).toLowerCase(), password=String(b.password||''), fullName=clean(b.fullName,100), company=clean(b.companyName,120);
 if(!validEmail(email)||password.length<8||!fullName)return json({error:'Use a valid email, full name and password of at least 8 characters.'},400);
 const exists=await context.env.DB.prepare('SELECT id FROM users WHERE email=?').bind(email).first(); if(exists)return json({error:'An account with this email already exists.'},409);
 const id=uuid(), salt=randomToken(18), hash=await pbkdf2(password,salt);
 await context.env.DB.prepare('INSERT INTO users(id,email,password_hash,password_salt,full_name,company_name) VALUES(?,?,?,?,?,?)').bind(id,email,hash,salt,fullName,company).run();
 const token=randomToken(), tokenHash=await sha256(token); await context.env.DB.prepare("INSERT INTO sessions(token_hash,user_id,expires_at) VALUES(?,?,datetime('now','+30 days'))").bind(tokenHash,id).run();
 return json({ok:true,user:{id,email,full_name:fullName,company_name:company}},201,{'set-cookie':cookie('ba_session',token,2592000)});
}
