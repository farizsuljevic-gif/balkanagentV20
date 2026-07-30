
(() => {
  "use strict";
  const K = {
    users: "ba_lux_users",
    session: "ba_lux_session",
    demos: "ba_lux_demos",
    language: "ba_lux_language"
  };
  const ADMIN = {
    id: "admin",
    name: "BalkanAgent Admin",
    company: "BalkanAgent",
    email: "admin@balkanagent.com",
    password: "BalkanAgent2026!",
    role: "admin",
    plan: "Enterprise"
  };

  function read(key, fallback) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key));
      return parsed ?? fallback;
    } catch {
      return fallback;
    }
  }
  function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    return value;
  }
  function init() {
    const users = read(K.users, []);
    const found = users.find(u => u.email.toLowerCase() === ADMIN.email);
    if (!found) users.unshift({...ADMIN});
    else Object.assign(found, ADMIN);
    write(K.users, users);
  }
  function users() { return read(K.users, []); }
  function currentUser() {
    const email = localStorage.getItem(K.session);
    if (!email) return null;
    return users().find(u => u.email === email) || null;
  }
  function login(email, password) {
    const user = users().find(u => u.email.toLowerCase() === String(email).trim().toLowerCase() && u.password === String(password));
    if (!user) throw new Error("Pogrešan email ili lozinka.");
    localStorage.setItem(K.session, user.email);
    return user;
  }
  function register({name, company, email, password}) {
    const list = users();
    const clean = String(email).trim().toLowerCase();
    if (!name || !clean || !password) throw new Error("Popunite obavezna polja.");
    if (password.length < 8) throw new Error("Lozinka mora imati najmanje 8 znakova.");
    if (list.some(u => u.email.toLowerCase() === clean)) throw new Error("Email je već registrovan.");
    const user = {id: "u" + Date.now(), name, company, email: clean, password, role: "user", plan: "Starter"};
    list.push(user);
    write(K.users, list);
    localStorage.setItem(K.session, clean);
    return user;
  }
  function requireUser(adminOnly = false) {
    const user = currentUser();
    if (!user) {
      location.href = "login.html";
      return null;
    }
    if (adminOnly && user.role !== "admin") {
      location.href = "dashboard.html";
      return null;
    }
    return user;
  }
  function logout() {
    localStorage.removeItem(K.session);
    location.href = "login.html";
  }
  function setNotice(message, ok = false) {
    const el = document.getElementById("notice");
    if (!el) return;
    el.textContent = message;
    el.className = "notice show " + (ok ? "ok" : "error");
  }
  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, c => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
    }[c]));
  }
  init();
  window.BA = {K, ADMIN, read, write, users, currentUser, login, register, requireUser, logout, setNotice, escapeHtml};
})();
