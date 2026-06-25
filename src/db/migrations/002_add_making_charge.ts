import Database from "@tauri-apps/plugin-sql";

import { Migration } from "@/types/db.types";

export const migration002AddMakingCharge: Migration = {
  version: 2,

  async up(db: Database) {
    await db.execute(`
      ALTER TABLE order_items
      ADD COLUMN making_charge REAL NOT NULL DEFAULT 0;
    `);
  },
};
