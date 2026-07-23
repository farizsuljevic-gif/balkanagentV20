PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  password_salt TEXT NOT NULL,
  full_name TEXT NOT NULL,
  company_name TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  country TEXT DEFAULT '',
  preferred_language TEXT DEFAULT 'en',
  plan TEXT DEFAULT 'starter',
  status TEXT DEFAULT 'pending',
  is_admin INTEGER DEFAULT 0,
  email_verified INTEGER DEFAULT 0,
  stripe_customer_id TEXT DEFAULT '',
  stripe_subscription_id TEXT DEFAULT '',
  subscription_status TEXT DEFAULT 'none',
  current_period_end TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS sessions (token_hash TEXT PRIMARY KEY,user_id TEXT NOT NULL,expires_at TEXT NOT NULL,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE TABLE IF NOT EXISTS ai_agents (id TEXT PRIMARY KEY,user_id TEXT NOT NULL,name TEXT NOT NULL,role TEXT NOT NULL,language TEXT DEFAULT 'en',status TEXT DEFAULT 'active',instructions TEXT DEFAULT '',created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS conversations (id TEXT PRIMARY KEY,user_id TEXT NOT NULL,agent_id TEXT,customer_name TEXT DEFAULT 'Guest',channel TEXT DEFAULT 'website',status TEXT DEFAULT 'open',last_message TEXT DEFAULT '',created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,FOREIGN KEY(agent_id) REFERENCES ai_agents(id) ON DELETE SET NULL);
CREATE TABLE IF NOT EXISTS bookings (id TEXT PRIMARY KEY,user_id TEXT NOT NULL,customer_name TEXT NOT NULL,customer_email TEXT DEFAULT '',service TEXT NOT NULL,booking_date TEXT NOT NULL,status TEXT DEFAULT 'pending',notes TEXT DEFAULT '',created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS invoices (id TEXT PRIMARY KEY,user_id TEXT NOT NULL,stripe_invoice_id TEXT UNIQUE,invoice_number TEXT UNIQUE NOT NULL,customer_name TEXT DEFAULT '',customer_email TEXT NOT NULL,plan TEXT NOT NULL,amount_cents INTEGER NOT NULL,currency TEXT DEFAULT 'EUR',status TEXT DEFAULT 'paid',issued_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE);
CREATE INDEX IF NOT EXISTS idx_invoices_user_id ON invoices(user_id);
