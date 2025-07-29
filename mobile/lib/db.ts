// lib/db.ts  (or in App.tsx if you kept everything there)
import * as SQLite from 'expo-sqlite';          // NEWER API

export const db = SQLite.openDatabaseSync('routine.db');  // ✅
