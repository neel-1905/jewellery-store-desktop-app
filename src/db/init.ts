import { getDb } from "./database";
// import { runMigrations } from "./migrations";
import { migrateDatabase } from "./migrations/migrate";
import { seedDatabase } from "./seed";

export async function initializeDatabase() {
  await getDb();

  // await runMigrations();
  await migrateDatabase();

  await seedDatabase();
}
