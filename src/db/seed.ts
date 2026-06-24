import { getDb } from "./database";

export async function seedDatabase() {
  const db = await getDb();

  await db.execute(`
    INSERT OR IGNORE INTO roles (
      name,
      description
    )
    VALUES
      ('owner', 'Full system access'),
      ('manager', 'Manage customers and orders'),
      ('salesperson', 'Create and manage orders');
  `);

  await db.execute(`
    INSERT OR IGNORE INTO permissions (
      name
    )
    VALUES
      ('customers.view'),
      ('customers.create'),
      ('customers.update'),
      ('customers.delete'),

      ('orders.view'),
      ('orders.create'),
      ('orders.update'),
      ('orders.delete'),

      ('users.view'),
      ('users.create'),
      ('users.update'),
      ('users.delete'),

      ('settings.manage');
  `);

  await db.execute(`
    INSERT OR IGNORE INTO role_permissions (
      role_id,
      permission_id
    )
    SELECT
      r.id,
      p.id
    FROM roles r
    CROSS JOIN permissions p
    WHERE r.name = 'owner';
  `);

  await db.execute(`
    INSERT OR IGNORE INTO role_permissions (
      role_id,
      permission_id
    )
    SELECT
      r.id,
      p.id
    FROM roles r
    INNER JOIN permissions p
      ON p.name IN (
        'customers.view',
        'customers.create',
        'customers.update',

        'orders.view',
        'orders.create',
        'orders.update'
      )
    WHERE r.name = 'manager';
  `);

  await db.execute(`
    INSERT OR IGNORE INTO role_permissions (
      role_id,
      permission_id
    )
    SELECT
      r.id,
      p.id
    FROM roles r
    INNER JOIN permissions p
      ON p.name IN (
        'customers.view',

        'orders.view',
        'orders.create'
      )
    WHERE r.name = 'salesperson';
  `);
}
