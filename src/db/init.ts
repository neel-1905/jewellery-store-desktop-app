import { getDb } from "./database";
import { runMigrations } from "./migrations";
import { seedDatabase } from "./seed";

export async function initializeDatabase() {
  await getDb();

  await runMigrations();

  await seedDatabase();
}
