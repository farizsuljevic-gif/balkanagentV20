import {json,getCookie,sha256,cookie} from '../../_lib.js';
export async function onRequestPost(context){ const t=getCookie(context.request,'ba_session'); if(t)await context.env.DB.prepare('DELETE FROM sessions WHERE token_hash=?').bind(await sha256(t)).run(); return json({ok:true},200,{'set-cookie':cookie('ba_session','',0)}); }
