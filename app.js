
(()=> {
  const client = supabase.createClient(BA_CONFIG.supabaseUrl, BA_CONFIG.supabaseKey, {
    auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}
  });
  const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];

  function applyLang(code=localStorage.getItem("ba_lang")||"me"){
    localStorage.setItem("ba_lang",code);
    document.documentElement.lang=code;
    const t={...(BA_I18N.en||{}),...(BA_I18N[code]||{})};
    $$("[data-i18n]").forEach(el=>{ if(t[el.dataset.i18n]) el.textContent=t[el.dataset.i18n]; });
    $$("[data-lang]").forEach(el=>el.value=code);
  }
  function notice(msg,ok=false){
    const el=$("#notice"); if(!el) return;
    el.textContent=msg; el.className="notice show "+(ok?"ok":"error");
  }
  async function signUp(full_name,company_name,email,password){
    const {data,error}=await client.auth.signUp({
      email,password,
      options:{data:{full_name,company_name},emailRedirectTo:location.origin+"/dashboard.html"}
    });
    if(error) throw error;
    return data;
  }
  async function signIn(email,password){
    const {data,error}=await client.auth.signInWithPassword({email,password});
    if(error) throw error;
    return data;
  }
  async function signOut(){ await client.auth.signOut(); location.href="index.html"; }
  async function getSession(){
    const {data,error}=await client.auth.getSession();
    if(error) throw error;
    return data.session;
  }
  async function getProfile(id){
    const {data,error}=await client.from("profiles").select("*").eq("id",id).single();
    if(error) throw error;
    return data;
  }
  async function requireUser(admin=false){
    const s=await getSession();
    if(!s){location.href=admin?"admin-login.html":"login.html";return null}
    const p=await getProfile(s.user.id);
    if(admin && p.role!=="admin"){
      await client.auth.signOut();
      location.href="admin-login.html";
      return null;
    }
    return {session:s,profile:p};
  }
  async function resetPassword(email){
    const {error}=await client.auth.resetPasswordForEmail(email,{redirectTo:location.origin+"/reset-password.html"});
    if(error) throw error;
  }
  async function updatePassword(password){
    const {error}=await client.auth.updateUser({password}); if(error) throw error;
  }
  async function updateProfile(id,changes){
    const {data,error}=await client.from("profiles").update(changes).eq("id",id).select().single();
    if(error) throw error; return data;
  }
  async function adminUsers(){
    const {data,error}=await client.from("profiles").select("*").order("created_at",{ascending:false});
    if(error) throw error; return data||[];
  }
  async function adminUpdateUser(id,changes){
    const {error}=await client.from("profiles").update(changes).eq("id",id);
    if(error) throw error;
  }
  function esc(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}

  window.BA={client,applyLang,notice,signUp,signIn,signOut,getSession,getProfile,requireUser,resetPassword,updatePassword,updateProfile,adminUsers,adminUpdateUser,esc};
  document.addEventListener("DOMContentLoaded",()=>{applyLang();$$("[data-lang]").forEach(s=>s.onchange=e=>applyLang(e.target.value))});
})();
