async function api(url,options={}){const r=await fetch(url,{headers:{'content-type':'application/json',...(options.headers||{})},...options});const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.error||'Request failed');return d}
const qs=s=>document.querySelector(s);const qsa=s=>[...document.querySelectorAll(s)];
function msg(text){const n=qs('#notice');if(!n)return; n.textContent=text;n.style.display='block'}
async function requireUser(){try{const d=await api('/api/auth/me');return d.user}catch{location.href='/login.html';}}
window.BA={api,qs,qsa,msg,requireUser};
