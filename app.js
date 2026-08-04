
(()=>{const c=supabase.createClient(BA_CONFIG.supabaseUrl,BA_CONFIG.supabaseKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
async function signUp(n,co,e,p){const{data,error}=await c.auth.signUp({email:e,password:p,options:{data:{full_name:n,company_name:co},emailRedirectTo:location.origin+'/dashboard.html'}});if(error)throw error;return data}
async function signIn(e,p){const{data,error}=await c.auth.signInWithPassword({email:e,password:p});if(error)throw error;return data}
async function getSession(){const{data,error}=await c.auth.getSession();if(error)throw error;return data.session}
async function profile(id){const{data,error}=await c.from('profiles').select('*').eq('id',id).single();if(error)throw error;return data}
async function requireUser(){const s=await getSession();if(!s){location.href='login.html';return null}return{session:s,profile:await profile(s.user.id)}}
async function signOut(){await c.auth.signOut();location.href='index.html'}
function notice(m,o=false){const e=document.getElementById('notice');if(e){e.textContent=m;e.className='notice show '+(o?'ok':'error')}}
window.BA={c,signUp,signIn,getSession,profile,requireUser,signOut,notice};})();
