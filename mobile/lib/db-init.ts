import { db } from './db';

export async function initDb() {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS routines (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL UNIQUE,
      color TEXT DEFAULT '#FF6B00'
    );
    CREATE TABLE IF NOT EXISTS time_blocks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      routine_id INTEGER,
      start_min INTEGER,
      end_min INTEGER,
      flex_mode TEXT,
      flex_window INTEGER,
      lead_mins INTEGER,
      FOREIGN KEY (routine_id) REFERENCES routines(id) ON DELETE CASCADE
    );
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      time_block_id INTEGER,
      event_date TEXT,
      planned_start INTEGER,
      planned_end INTEGER,
      status TEXT,
      resched_count INTEGER DEFAULT 0,
      FOREIGN KEY (time_block_id) REFERENCES time_blocks(id) ON DELETE CASCADE
    );
  `);
}
