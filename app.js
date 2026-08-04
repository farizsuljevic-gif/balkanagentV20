
(() => {
  const client = supabase.createClient(BA_CONFIG.supabaseUrl, BA_CONFIG.supabaseKey, {
    auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}
  });
  const qs=s=>document.querySelector(s), qsa=s=>[...document.querySelectorAll(s)];
  function applyLang(code=localStorage.getItem("ba_lang")||"me"){
    localStorage.setItem("ba_lang",code);
    document.documentElement.lang=code;
    const t={...(BA_I18N.en||{}),...(BA_I18N[code]||{})};
    qsa("[data-i18n]").forEach(el=>{if(t[el.dataset.i18n]) el.textContent=t[el.dataset.i18n]});
    qsa("[data-lang]").forEach(el=>el.value=code);
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
  async function requireUser(){
    const s=await getSession();
    if(!s){location.href="login.html";return null}
    return {session:s,profile:await getProfile(s.user.id)};
  }
  async function signOut(){await client.auth.signOut();location.href="index.html"}
  async function reset(email){
    const {error}=await client.auth.resetPasswordForEmail(email,{redirectTo:location.origin+"/reset-password.html"});
    if(error) throw error;
  }
  async function updatePassword(password){
    const {error}=await client.auth.updateUser({password});if(error) throw error;
  }
  function notice(msg,ok=false){const e=qs("#notice");if(e){e.textContent=msg;e.className="notice show "+(ok?"ok":"error")}}
  window.BA={client,applyLang,signUp,signIn,getSession,getProfile,requireUser,signOut,reset,updatePassword,notice};
  document.addEventListener("DOMContentLoaded",()=>{applyLang();qsa("[data-lang]").forEach(s=>s.onchange=e=>applyLang(e.target.value))});
})();
