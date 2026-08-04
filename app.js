
(()=>{const c=supabase.createClient(BA_CONFIG.supabaseUrl,BA_CONFIG.supabaseKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
function applyLang(code=localStorage.getItem('ba_lang')||'me'){localStorage.setItem('ba_lang',code);const t={...BA_I18N.en,...(BA_I18N[code]||{})};$$('[data-i18n]').forEach(e=>{if(t[e.dataset.i18n])e.textContent=t[e.dataset.i18n]});$$('[data-lang]').forEach(e=>e.value=code)}
async function signUp(n,co,e,p){const{data,error}=await c.auth.signUp({email:e,password:p,options:{data:{full_name:n,company_name:co},emailRedirectTo:location.origin+'/dashboard.html'}});if(error)throw error;return data}
async function signIn(e,p){const{data,error}=await c.auth.signInWithPassword({email:e,password:p});if(error)throw error;return data}
async function session(){const{data,error}=await c.auth.getSession();if(error)throw error;return data.session}
async function profile(id){const{data,error}=await c.from('profiles').select('*').eq('id',id).single();if(error)throw error;return data}
async function requireUser(){const s=await session();if(!s){location.href='login.html';return null}return{session:s,profile:await profile(s.user.id)}}
async function signOut(){await c.auth.signOut();location.href='index.html'}
async function reset(e){const{error}=await c.auth.resetPasswordForEmail(e,{redirectTo:location.origin+'/reset-password.html'});if(error)throw error}
async function updatePassword(p){const{error}=await c.auth.updateUser({password:p});if(error)throw error}
function notice(m,o=false){const e=$('#notice');if(e){e.textContent=m;e.className='notice show '+(o?'ok':'error')}}
window.BA={c,applyLang,signUp,signIn,session,profile,requireUser,signOut,reset,updatePassword,notice};
document.addEventListener('DOMContentLoaded',()=>{applyLang();$$('[data-lang]').forEach(x=>x.onchange=e=>applyLang(e.target.value))})})();
