import { getDb } from "../database";
import { Migration } from "@/types/db.types";

import { migration001InitialSchema } from "./001_initial_schema";
import { migration002AddMakingCharge } from "./002_add_making_charge";

const migrations: Migration[] = [
  migration001InitialSchema,
  migration002AddMakingCharge,
];

export async function migrateDatabase() {
  const db = await getDb();

  await db.execute(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version INTEGER PRIMARY KEY,
      applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const applied = await db.select<{ version: number }[]>(
    `
      SELECT version
      FROM schema_migrations
    `,
  );

  const completed = new Set(applied.map((m) => m.version));

  for (const migration of migrations) {
    if (completed.has(migration.version)) {
      continue;
    }

    await migration.up(db);

    await db.execute(
      `
        INSERT INTO schema_migrations(version)
        VALUES(?)
      `,
      [migration.version],
    );
  }
}
