import {json,randomToken,sha256,pbkdf2,cookie,readJson,clean} from '../../_lib.js';
export async function onRequestPost(context){
 const b=await readJson(context.request); const email=clean(b?.email,180).toLowerCase(), password=String(b?.password||'');
 const u=await context.env.DB.prepare('SELECT * FROM users WHERE email=?').bind(email).first();
 if(!u||await pbkdf2(password,u.password_salt)!==u.password_hash)return json({error:'Incorrect email or password.'},401);
 const token=randomToken(), tokenHash=await sha256(token); await context.env.DB.prepare("INSERT INTO sessions(token_hash,user_id,expires_at) VALUES(?,?,datetime('now','+30 days'))").bind(tokenHash,u.id).run();
 return json({ok:true},200,{'set-cookie':cookie('ba_session',token,2592000)});
}
