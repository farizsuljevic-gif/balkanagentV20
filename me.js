import {json,authUser} from '../../_lib.js';
export async function onRequestGet(context){ const u=await authUser(context); return u?json({user:u}):json({error:'Unauthorized'},401); }
