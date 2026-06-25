import { Migration } from "@/types/db.types";
import { getDb } from "../database";

export const migration001InitialSchema: Migration = {
  version: 1,
  up: async () => {
    const db = await getDb();

    await db.execute(`
    CREATE TABLE IF NOT EXISTS shops (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT,
      email TEXT,
      address TEXT,
      gst_number TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

    await db.execute(`
    CREATE TABLE IF NOT EXISTS roles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

    await db.execute(`
    CREATE TABLE IF NOT EXISTS permissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    );
  `);

    await db.execute(`
    CREATE TABLE IF NOT EXISTS role_permissions (
      role_id INTEGER NOT NULL,
      permission_id INTEGER NOT NULL,

      PRIMARY KEY(role_id, permission_id),

      FOREIGN KEY(role_id)
        REFERENCES roles(id)
        ON DELETE CASCADE,

      FOREIGN KEY(permission_id)
        REFERENCES permissions(id)
        ON DELETE CASCADE
    );
  `);

    await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      name TEXT NOT NULL,

      email TEXT NOT NULL UNIQUE,

      password_hash TEXT NOT NULL,

      role_id INTEGER NOT NULL,

      is_active INTEGER DEFAULT 1,

      last_login_at DATETIME,

      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

      created_by INTEGER,

      FOREIGN KEY(role_id)
        REFERENCES roles(id)
        ON DELETE RESTRICT,
      
      FOREIGN KEY(created_by)
        REFERENCES users(id)
        ON DELETE SET NULL
    );
  `);

    await db.execute(`
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      customer_code TEXT UNIQUE,

      name TEXT NOT NULL,

      phone TEXT,

      email TEXT,

      address TEXT,

      notes TEXT,

      created_by INTEGER,

      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY(created_by)
        REFERENCES users(id)
        ON DELETE SET NULL
    );
  `);

    await db.execute(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      order_number TEXT UNIQUE,

      customer_id INTEGER,

      subtotal REAL NOT NULL DEFAULT 0,

      discount REAL NOT NULL DEFAULT 0,

      tax REAL NOT NULL DEFAULT 0,

      total REAL NOT NULL DEFAULT 0,

      status TEXT NOT NULL DEFAULT 'draft',

      created_by INTEGER,

      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY(customer_id)
        REFERENCES customers(id)
        ON DELETE RESTRICT,

      FOREIGN KEY(created_by)
        REFERENCES users(id)
        ON DELETE RESTRICT
    );
  `);

    await db.execute(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      order_id INTEGER NOT NULL,

      item_name TEXT NOT NULL,

      quantity INTEGER NOT NULL DEFAULT 1,

      unit_price REAL NOT NULL,

      line_total REAL NOT NULL,

      FOREIGN KEY(order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE
    );
  `);

    await db.execute(`
    CREATE INDEX IF NOT EXISTS idx_users_email
    ON users(email);
  `);

    await db.execute(`
    CREATE INDEX IF NOT EXISTS idx_customers_phone
    ON customers(phone);
  `);

    await db.execute(`
    CREATE INDEX IF NOT EXISTS idx_orders_customer
    ON orders(customer_id);
  `);

    await db.execute(`
    CREATE INDEX IF NOT EXISTS idx_orders_created_by
    ON orders(created_by);
  `);
  },
};
