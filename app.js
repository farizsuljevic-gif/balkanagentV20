
(function () {
  "use strict";

  const KEYS = {
    users: "ba-users-v4",
    session: "ba-session-v4",
    agents: "ba-agents-v4",
    bookings: "ba-bookings-v4",
    conversations: "ba-conversations-v4",
    demos: "ba-demo-requests-v4",
    subscriptions: "ba-subscriptions-v4",
    language: "ba-language"
  };

  const ADMIN = {
    id: "admin-1",
    name: "BalkanAgent Admin",
    company: "BalkanAgent",
    email: "admin@balkanagent.com",
    password: "BalkanAgent2026!",
    role: "admin",
    status: "active",
    plan: "Enterprise",
    phone: "+382 68 400 509",
    website: "https://balkanagent.com"
  };

  function read(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value ?? fallback;
    } catch (_) {
      return fallback;
    }
  }

  function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    return value;
  }

  function init() {
    const users = read(KEYS.users, []);
    const existingAdmin = users.find(u => u.email.toLowerCase() === ADMIN.email);
    if (!existingAdmin) users.unshift({...ADMIN});
    else Object.assign(existingAdmin, {...ADMIN, password: existingAdmin.password || ADMIN.password});
    write(KEYS.users, users);

    if (!localStorage.getItem(KEYS.agents)) {
      write(KEYS.agents, [
        {id: "a1", owner: ADMIN.email, name: "Mila", role: "Sales Agent", status: "active", channels: "WhatsApp, Instagram"},
        {id: "a2", owner: ADMIN.email, name: "Luka", role: "Booking Agent", status: "active", channels: "Website, Viber"}
      ]);
    }
    if (!localStorage.getItem(KEYS.bookings)) {
      write(KEYS.bookings, [
        {id: "b1", owner: ADMIN.email, customer: "Demo Customer", service: "Product demo", date: "2026-08-02", time: "10:00", status: "confirmed"},
        {id: "b2", owner: ADMIN.email, customer: "Adria Tours", service: "Onboarding", date: "2026-08-04", time: "12:30", status: "pending"}
      ]);
    }
    if (!localStorage.getItem(KEYS.conversations)) {
      write(KEYS.conversations, [
        {id: "c1", owner: ADMIN.email, channel: "WhatsApp", customer: "New lead", message: "Interested in the Business plan.", created: "2026-07-30 10:24"},
        {id: "c2", owner: ADMIN.email, channel: "Instagram", customer: "Restaurant owner", message: "Can AI manage table bookings?", created: "2026-07-30 10:21"}
      ]);
    }
  }

  function users() { return read(KEYS.users, []); }
  function saveUsers(value) { return write(KEYS.users, value); }
  function sessionEmail() { return localStorage.getItem(KEYS.session) || ""; }
  function currentUser() {
    const email = sessionEmail().toLowerCase();
    return users().find(u => u.email.toLowerCase() === email) || null;
  }
  function login(email, password) {
    const user = users().find(u =>
      u.email.toLowerCase() === String(email).trim().toLowerCase() &&
      u.password === String(password)
    );
    if (!user) throw new Error("Pogrešan email ili lozinka.");
    if (user.status === "suspended") throw new Error("Ovaj nalog je suspendovan.");
    localStorage.setItem(KEYS.session, user.email);
    return user;
  }
  function logout() {
    localStorage.removeItem(KEYS.session);
    location.href = "login.html";
  }
  function requireUser(adminOnly) {
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
  function register(data) {
    const list = users();
    const email = String(data.email || "").trim().toLowerCase();
    if (!email || !data.password || !data.name) throw new Error("Popunite obavezna polja.");
    if (data.password.length < 8) throw new Error("Lozinka mora imati najmanje 8 znakova.");
    if (list.some(u => u.email.toLowerCase() === email)) throw new Error("Email je već registrovan.");
    const user = {
      id: "u-" + Date.now(), name: data.name, company: data.company || "",
      email, password: data.password, role: "user", status: "active",
      plan: "Starter", phone: "", website: ""
    };
    list.push(user);
    saveUsers(list);
    localStorage.setItem(KEYS.session, email);
    return user;
  }
  function updateProfile(changes) {
    const list = users();
    const current = currentUser();
    if (!current) throw new Error("Niste prijavljeni.");
    const user = list.find(u => u.id === current.id);
    ["name","company","phone","website"].forEach(k => {
      if (Object.prototype.hasOwnProperty.call(changes, k)) user[k] = String(changes[k] || "");
    });
    saveUsers(list);
    return user;
  }
  function changePassword(password) {
    if (String(password).length < 8) throw new Error("Lozinka mora imati najmanje 8 znakova.");
    const list = users();
    const current = currentUser();
    const user = list.find(u => u.id === current.id);
    user.password = password;
    saveUsers(list);
  }

  function collection(name) { return read(KEYS[name], []); }
  function saveCollection(name, value) { return write(KEYS[name], value); }
  function ownerItems(name, email) {
    const user = currentUser();
    const owner = email || (user && user.email);
    return collection(name).filter(x => x.owner === owner);
  }
  function addItem(name, item) {
    const list = collection(name);
    list.push({id: name.charAt(0) + "-" + Date.now(), owner: currentUser().email, ...item});
    saveCollection(name, list);
  }
  function removeItem(name, id) {
    saveCollection(name, collection(name).filter(x => x.id !== id));
  }
  function updateItem(name, id, changes) {
    const list = collection(name);
    const item = list.find(x => x.id === id);
    if (item) Object.assign(item, changes);
    saveCollection(name, list);
  }

  function adminUpdateUser(id, changes) {
    const admin = requireUser(true);
    if (!admin) return;
    const list = users();
    const target = list.find(u => u.id === id);
    if (!target) throw new Error("Korisnik nije pronađen.");
    if (target.role === "admin" && changes.status === "suspended") throw new Error("Glavni admin ne može biti suspendovan.");
    Object.assign(target, changes);
    saveUsers(list);
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, c => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
    }[c]));
  }

  function notice(text, ok) {
    const node = document.getElementById("notice");
    if (!node) return;
    node.textContent = text;
    node.className = "notice show " + (ok ? "ok" : "error");
  }

  init();

  window.BA = {
    KEYS, ADMIN, read, write, users, saveUsers, currentUser, login, logout,
    requireUser, register, updateProfile, changePassword, collection,
    saveCollection, ownerItems, addItem, removeItem, updateItem,
    adminUpdateUser, escapeHtml, notice
  };
})();
