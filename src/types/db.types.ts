import Database from "@tauri-apps/plugin-sql";

export type Migration = {
  version: number;
  up(db: Database): Promise<void>;
};
