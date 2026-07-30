
document.addEventListener("DOMContentLoaded",()=>{
 const y=document.querySelector("[data-year]"); if(y)y.textContent=new Date().getFullYear();
 const form=document.querySelector("#contactForm");
 if(form)form.addEventListener("submit",()=>{const b=form.querySelector("button");b.textContent="Sending…";});
});
