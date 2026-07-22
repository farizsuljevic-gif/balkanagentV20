const menuToggle=document.getElementById("menuToggle"),mainNav=document.getElementById("mainNav");
menuToggle?.addEventListener("click",()=>{const open=mainNav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",open);menuToggle.textContent=open?"✕":"☰"});
mainNav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{mainNav.classList.remove("open");menuToggle.textContent="☰"}));
document.getElementById("year").textContent=new Date().getFullYear();
document.getElementById("demoForm")?.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.currentTarget);const msg=`BalkanAgent demo request%0A%0AName: ${encodeURIComponent(f.get("name"))}%0ABusiness: ${encodeURIComponent(f.get("business"))}%0APhone: ${encodeURIComponent(f.get("phone"))}%0AMessage: ${encodeURIComponent(f.get("message")||"-")}`;window.open(`https://wa.me/4917622824031?text=${msg}`,"_blank","noopener");});
