-- Email leads: one row per guide request
CREATE TABLE IF NOT EXISTS email_leads (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  email      TEXT    NOT NULL,
  guide_key  TEXT    NOT NULL,
  created_at TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- Short-lived download tokens (1-hour TTL)
CREATE TABLE IF NOT EXISTS download_tokens (
  token      TEXT PRIMARY KEY,
  guide_key  TEXT    NOT NULL,
  email      TEXT    NOT NULL,
  expires_at TEXT    NOT NULL,
  created_at TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_email_leads_email ON email_leads(email);
CREATE INDEX IF NOT EXISTS idx_download_tokens_expires ON download_tokens(expires_at);
