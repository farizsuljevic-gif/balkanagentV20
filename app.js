
(() => {
  "use strict";
  const K={users:"ba_ref_users",session:"ba_ref_session",demos:"ba_ref_demos"};
  const ADMIN={id:"admin",name:"BalkanAgent Admin",company:"BalkanAgent",email:"admin@balkanagent.com",password:"BalkanAgent2026!",role:"admin",plan:"Enterprise"};
  function read(k,f){try{return JSON.parse(localStorage.getItem(k))??f}catch{return f}}
  function write(k,v){localStorage.setItem(k,JSON.stringify(v));return v}
  function init(){const u=read(K.users,[]);const a=u.find(x=>x.email===ADMIN.email);if(!a)u.unshift({...ADMIN});else Object.assign(a,ADMIN);write(K.users,u)}
  function users(){return read(K.users,[])}
  function current(){const e=localStorage.getItem(K.session);return e?users().find(x=>x.email===e)||null:null}
  function login(email,password,adminOnly=false){const u=users().find(x=>x.email.toLowerCase()===String(email).trim().toLowerCase()&&x.password===String(password));if(!u)throw new Error("Pogrešan email ili lozinka.");if(adminOnly&&u.role!=="admin")throw new Error("Nalog nema administratorski pristup.");localStorage.setItem(K.session,u.email);return u}
  function register(d){const list=users(),email=String(d.email||"").trim().toLowerCase();if(!d.name||!email||!d.password)throw new Error("Popunite obavezna polja.");if(d.password.length<8)throw new Error("Lozinka mora imati najmanje 8 znakova.");if(list.some(x=>x.email.toLowerCase()===email))throw new Error("Email je već registrovan.");const u={id:"u-"+Date.now(),name:d.name,company:d.company||"",email,password:d.password,role:"user",plan:"Starter"};list.push(u);write(K.users,list);localStorage.setItem(K.session,email);return u}
  function requireUser(adminOnly=false){const u=current();if(!u){location.href=adminOnly?"admin-login.html":"login.html";return null}if(adminOnly&&u.role!=="admin"){localStorage.removeItem(K.session);location.href="admin-login.html";return null}return u}
  function logout(){localStorage.removeItem(K.session);location.href="index.html"}
  function update(id,changes){const list=users(),u=list.find(x=>x.id===id);if(!u)throw new Error("Korisnik nije pronađen.");Object.assign(u,changes);write(K.users,list);return u}
  function remove(id){const target=users().find(x=>x.id===id);if(!target||target.role==="admin")return;write(K.users,users().filter(x=>x.id!==id))}
  function esc(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
  function notice(msg,ok=false){const e=document.getElementById("notice");if(!e)return;e.textContent=msg;e.className="notice show "+(ok?"ok":"error")}
  init();window.BA={K,ADMIN,read,write,users,current,login,register,requireUser,logout,update,remove,esc,notice};
})();
