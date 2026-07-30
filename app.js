
const BA={
 async api(url,options={}){
  const r=await fetch(url,{credentials:"same-origin",headers:{"content-type":"application/json",...(options.headers||{})},...options});
  const d=await r.json().catch(()=>({}));
  if(!r.ok)throw new Error(d.error||"Request failed");
  return d;
 },
 msg(text,type="error"){
  const n=document.querySelector("#notice");if(!n)return;
  n.textContent=text;n.style.display="block";
  n.style.background=type==="ok"?"#12372d":"#301925";
  n.style.borderColor=type==="ok"?"#286d58":"#673044";
 },
 async requireUser(admin=false){
  try{
   const {user}=await this.api("/api/auth/me");
   if(admin&&!user.is_admin){location.href="/dashboard.html";return null}
   return user;
  }catch{location.href="/login.html";return null}
 },
 money(n){return new Intl.NumberFormat("en-GB",{style:"currency",currency:"EUR",maximumFractionDigits:0}).format(Number(n||0))},
 escape(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))},
 toggleMenu(){document.querySelector(".sidebar")?.classList.toggle("open")}
};
window.BA=BA;
