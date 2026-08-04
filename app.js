
(() => {
  "use strict";
  const cfg=window.BA_CONFIG;
  const client=window.supabase.createClient(cfg.supabaseUrl,cfg.supabaseKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
  const q=s=>document.querySelector(s), qa=s=>[...document.querySelectorAll(s)];
  function esc(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
  function notice(msg,ok=false){const e=q("#notice");if(e){e.textContent=msg;e.className="notice show "+(ok?"ok":"error")}}
  function lang(){return localStorage.getItem("ba_lang")||"me"}
  function applyLang(code=lang()){localStorage.setItem("ba_lang",code);document.documentElement.lang=code;const d={...(BA_I18N.en||{}),...(BA_I18N[code]||{})};qa("[data-i18n]").forEach(e=>{if(d[e.dataset.i18n])e.textContent=d[e.dataset.i18n]});qa("[data-lang-select]").forEach(e=>e.value=code)}
  async function session(){const {data,error}=await client.auth.getSession();if(error)throw error;return data.session}
  async function profile(id){const {data,error}=await client.from("profiles").select("*").eq("id",id).single();if(error)throw error;return data}
  async function requireUser(admin=false){const s=await session();if(!s){location.href=admin?"admin-login.html":"login.html";return null}const p=await profile(s.user.id);if(admin&&p.role!=="admin"){await client.auth.signOut();location.href="admin-login.html";return null}return {session:s,profile:p}}
  async function signup(d){const {data,error}=await client.auth.signUp({email:d.email,password:d.password,options:{data:{full_name:d.fullName,company_name:d.companyName},emailRedirectTo:location.origin+"/dashboard.html"}});if(error)throw error;return data}
  async function signin(email,password){const {data,error}=await client.auth.signInWithPassword({email,password});if(error)throw error;return data}
  async function signout(){await client.auth.signOut();location.href="index.html"}
  async function reset(email){const {error}=await client.auth.resetPasswordForEmail(email,{redirectTo:location.origin+"/reset-password.html"});if(error)throw error}
  async function updatePassword(password){const {error}=await client.auth.updateUser({password});if(error)throw error}
  async function updateProfile(id,changes){const {data,error}=await client.from("profiles").update(changes).eq("id",id).select().single();if(error)throw error;return data}
  async function listBots(){const {data,error}=await client.from("bots").select("*").order("created_at",{ascending:false});if(error)throw error;return data||[]}
  async function createBot(payload){const s=await session();const {data,error}=await client.from("bots").insert({...payload,user_id:s.user.id}).select().single();if(error)throw error;return data}
  async function updateBot(id,payload){const {data,error}=await client.from("bots").update(payload).eq("id",id).select().single();if(error)throw error;return data}
  async function deleteBot(id){const {error}=await client.from("bots").delete().eq("id",id);if(error)throw error}
  async function listFaqs(botId){const {data,error}=await client.from("bot_faqs").select("*").eq("bot_id",botId).order("created_at");if(error)throw error;return data||[]}
  async function saveFaqs(botId,faqs){await client.from("bot_faqs").delete().eq("bot_id",botId);if(faqs.length){const {error}=await client.from("bot_faqs").insert(faqs.map(x=>({...x,bot_id:botId})));if(error)throw error}}
  async function listLeads(){const {data,error}=await client.from("leads").select("*,bots(name)").order("created_at",{ascending:false});if(error)throw error;return data||[]}
  async function submitDemo(payload){const {error}=await client.from("demo_requests").insert(payload);if(error)throw error}
  async function requestPlan(plan){const s=await session();const {error}=await client.from("payment_requests").insert({user_id:s.user.id,plan,status:"pending"});if(error)throw error}
  async function adminData(){const [p,b,l,d,r]=await Promise.all([client.from("profiles").select("*").order("created_at",{ascending:false}),client.from("bots").select("*").order("created_at",{ascending:false}),client.from("leads").select("*").order("created_at",{ascending:false}),client.from("demo_requests").select("*").order("created_at",{ascending:false}),client.from("payment_requests").select("*").order("created_at",{ascending:false})]);for(const x of [p,b,l,d,r])if(x.error)throw x.error;return {profiles:p.data||[],bots:b.data||[],leads:l.data||[],demos:d.data||[],requests:r.data||[]}}
  async function adminUpdateProfile(id,changes){const {error}=await client.from("profiles").update(changes).eq("id",id);if(error)throw error}
  async function adminUpdatePayment(id,changes){const {error}=await client.from("payment_requests").update(changes).eq("id",id);if(error)throw error}
  window.BA={client,esc,notice,lang,applyLang,session,profile,requireUser,signup,signin,signout,reset,updatePassword,updateProfile,listBots,createBot,updateBot,deleteBot,listFaqs,saveFaqs,listLeads,submitDemo,requestPlan,adminData,adminUpdateProfile,adminUpdatePayment,q,qa};
  document.addEventListener("DOMContentLoaded",()=>{applyLang();qa("[data-lang-select]").forEach(s=>s.addEventListener("change",e=>applyLang(e.target.value)))});
})();
