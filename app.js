
const BA = {
  _key: "balkanagent-demo-db-v3",

  _initialState() {
    return {
      sessionEmail: "",
      users: [{
        id: 1,
        full_name: "BalkanAgent Admin",
        company_name: "BalkanAgent",
        email: "admin@balkanagent.com",
        password: "BalkanAgent2026!",
        phone: "+382 68 400 509",
        website: "https://balkanagent.com",
        business_description: "AI automation platform for Balkan businesses.",
        status: "active",
        plan: "professional",
        is_admin: true
      }],
      agents: [
        {id: 1, owner: "admin@balkanagent.com", name: "Mila", role: "Sales Agent", status: "active", instructions: "Qualifies leads and answers sales questions."},
        {id: 2, owner: "admin@balkanagent.com", name: "Luka", role: "Booking Agent", status: "active", instructions: "Manages bookings and confirmations."}
      ],
      bookings: [
        {id: 1, owner: "admin@balkanagent.com", customer_name: "Demo Customer", service: "Product demo", date: "2026-08-02", time: "10:00", status: "confirmed"}
      ],
      conversations: [
        {id: 1, owner: "admin@balkanagent.com", channel: "WhatsApp", customer: "New lead", message: "I would like more information about the Business plan.", created_at: "2026-07-30T08:20:00Z"},
        {id: 2, owner: "admin@balkanagent.com", channel: "Instagram", customer: "Restaurant owner", message: "Can BalkanAgent manage table bookings?", created_at: "2026-07-30T08:05:00Z"}
      ]
    };
  },

  _load() {
    try {
      const data = JSON.parse(localStorage.getItem(this._key));
      if (data && Array.isArray(data.users)) return data;
    } catch {}
    const initial = this._initialState();
    localStorage.setItem(this._key, JSON.stringify(initial));
    return initial;
  },

  _save(data) {
    localStorage.setItem(this._key, JSON.stringify(data));
    return data;
  },

  _body(options) {
    try { return options && options.body ? JSON.parse(options.body) : {}; }
    catch { return {}; }
  },

  _user(db) {
    return db.users.find(u => u.email === db.sessionEmail) || null;
  },

  async _demoApi(url, options = {}) {
    const method = (options.method || "GET").toUpperCase();
    const body = this._body(options);
    const db = this._load();
    const user = this._user(db);

    if (url === "/api/auth/register" && method === "POST") {
      const email = String(body.email || "").trim().toLowerCase();
      if (!email || !body.password || !body.full_name) throw new Error("Please complete all required fields.");
      if (db.users.some(u => u.email === email)) throw new Error("An account with this email already exists.");
      const newUser = {
        id: Date.now(), full_name: body.full_name, company_name: body.company_name || "",
        email, password: body.password, phone: "", website: "", business_description: "",
        status: "active", plan: "starter", is_admin: false
      };
      db.users.push(newUser);
      db.sessionEmail = email;
      this._save(db);
      return {user: newUser};
    }

    if (url === "/api/auth/login" && method === "POST") {
      const email = String(body.email || "").trim().toLowerCase();
      const found = db.users.find(u => u.email === email && u.password === body.password);
      if (!found) throw new Error("Incorrect email or password.");
      if (found.status === "suspended") throw new Error("This account is suspended.");
      db.sessionEmail = found.email;
      this._save(db);
      return {user: found};
    }

    if (url === "/api/auth/logout" && method === "POST") {
      db.sessionEmail = "";
      this._save(db);
      return {ok: true};
    }

    if (url === "/api/auth/me") {
      if (!user) throw new Error("Not signed in.");
      return {user};
    }

    if (!user) throw new Error("Not signed in.");

    if (url === "/api/auth/password" && method === "POST") {
      if (String(body.password || "").length < 10) throw new Error("Use at least 10 characters.");
      user.password = body.password;
      this._save(db);
      return {ok: true};
    }

    if (url === "/api/profile" && method === "GET") return {profile: user};

    if (url === "/api/profile" && method === "PATCH") {
      ["full_name","company_name","phone","website","business_description"].forEach(k => {
        if (k in body) user[k] = body[k];
      });
      this._save(db);
      return {profile: user};
    }

    if (url === "/api/agents" && method === "GET") {
      return {items: db.agents.filter(x => x.owner === user.email)};
    }

    if (url === "/api/agents" && method === "POST") {
      db.agents.push({
        id: Date.now(), owner: user.email, name: body.name || "AI Employee",
        role: body.role || "Support Agent", status: "active", instructions: body.instructions || ""
      });
      this._save(db);
      return {ok: true};
    }

    if (url === "/api/bookings" && method === "GET") {
      return {items: db.bookings.filter(x => x.owner === user.email)};
    }

    if (url === "/api/bookings" && method === "POST") {
      db.bookings.push({
        id: Date.now(), owner: user.email, customer_name: body.customer_name || "Customer",
        service: body.service || "Service", date: body.date || "", time: body.time || "",
        status: body.status || "confirmed"
      });
      this._save(db);
      return {ok: true};
    }

    if (url === "/api/conversations" && method === "GET") {
      return {items: db.conversations.filter(x => x.owner === user.email)};
    }

    if (url === "/api/dashboard") {
      const conversations = db.conversations.filter(x => x.owner === user.email);
      const bookings = db.bookings.filter(x => x.owner === user.email);
      const agents = db.agents.filter(x => x.owner === user.email);
      return {
        conversations: conversations.length,
        bookings: bookings.length,
        agents: agents.length,
        leads: conversations.length,
        recent: conversations.slice().reverse().slice(0, 5),
        channels: [
          {name: "WhatsApp", value: 45},
          {name: "Instagram", value: 25},
          {name: "Messenger", value: 20},
          {name: "Website", value: 10}
        ]
      };
    }

    if (url === "/api/admin/stats") {
      if (!user.is_admin) throw new Error("Admin access required.");
      return {
        users: db.users.length,
        active: db.users.filter(x => x.status === "active").length,
        pending: db.users.filter(x => x.status === "pending").length,
        agents: db.agents.length
      };
    }

    if (url === "/api/admin/users" && method === "GET") {
      if (!user.is_admin) throw new Error("Admin access required.");
      return {items: db.users};
    }

    if (url === "/api/admin/users" && method === "PATCH") {
      if (!user.is_admin) throw new Error("Admin access required.");
      const target = db.users.find(x => Number(x.id) === Number(body.id));
      if (!target) throw new Error("User not found.");
      if (body.status) target.status = body.status;
      if (body.plan) target.plan = body.plan;
      this._save(db);
      return {ok: true};
    }

    throw new Error("This feature is not available in the static demo.");
  },

  async api(url, options = {}) {
    // GitHub/static package: reliable local demo API.
    // When a real backend is later connected, set window.BA_USE_REAL_API = true.
    if (!window.BA_USE_REAL_API) return this._demoApi(url, options);

    const response = await fetch(url, {
      credentials: "same-origin",
      headers: {"content-type": "application/json", ...(options.headers || {})},
      ...options
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "Request failed");
    return data;
  },

  msg(text, type = "error") {
    const node = document.querySelector("#notice");
    if (!node) return;
    node.textContent = text;
    node.style.display = "block";
    node.style.background = type === "ok" ? "#12372d" : "#301925";
    node.style.borderColor = type === "ok" ? "#286d58" : "#673044";
  },

  async requireUser(admin = false) {
    try {
      const {user} = await this.api("/api/auth/me");
      if (admin && !user.is_admin) {
        location.href = "/dashboard.html";
        return null;
      }
      return user;
    } catch {
      location.href = "/login.html";
      return null;
    }
  },

  money(n) {
    return new Intl.NumberFormat("en-GB", {
      style: "currency", currency: "EUR", maximumFractionDigits: 0
    }).format(Number(n || 0));
  },

  escape(s) {
    return String(s ?? "").replace(/[&<>"']/g, m => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[m]));
  },

  toggleMenu() {
    document.querySelector(".sidebar")?.classList.toggle("open");
  }
};

window.BA = BA;
