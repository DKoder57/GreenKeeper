export const CREATE_PLANTS_TABLE = `
CREATE TABLE IF NOT EXISTS plants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  species TEXT,
  created_at TEXT NOT NULL
);
`;

export const CREATE_ACTIVITIES_TABLE = `
CREATE TABLE IF NOT EXISTS activities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  plant_id INTEGER NOT NULL,
  type TEXT NOT NULL,
  notes TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (plant_id) REFERENCES plants(id)
);
`;

export const CREATE_REGION_TABLE = `
CREATE TABLE IF NOT EXISTS regions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  watering_cooldown_multiplier REAL NOT NULL DEFAULT 1.0,
  created_at TEXT NOT NULL
);
`;

export const SEED_REGION_TABLE = `
INSERT OR IGNORE INTO regions (name, watering_cooldown_multiplier, created_at)
VALUES
  ('tropical_umido', 0.8, datetime('now')),
  ('temperate', 1.0, datetime('now')),
  ('semiarido', 1.3, datetime('now'));
`;