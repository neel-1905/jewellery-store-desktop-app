import Database from "@tauri-apps/plugin-sql";

let db: Database | null = null;

export async function getDb() {
  if (db) return db;

  db = await Database.load("sqlite:jewellery.db");
  await db.execute("PRAGMA journal_mode=WAL;");
  await db.execute("PRAGMA busy_timeout=5000;");

  return db;
}
