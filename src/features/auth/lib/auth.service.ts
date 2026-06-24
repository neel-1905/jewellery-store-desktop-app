import { getDb } from "@/db/database";
import { getSession } from "./session";
import { DBUser, User, UserRole } from "../domain/auth.types";
import { mapDBUserToUser } from "../domain/user.mapper";
import { LoginFormData, SetupFormData } from "../domain/auth.validations";
import { hashPassword, verifyPassword } from "./password.util";

export async function isSetupComplete(): Promise<boolean> {
  const db = await getDb();

  const result = await db.select<{ count: number }[]>(
    `
      SELECT COUNT(*) as count
      FROM shops
    `,
  );

  return result[0].count > 0;
}

export async function getCurrentUser(): Promise<
  User & {
    role_name: UserRole;
  }
> {
  const session = getSession();

  if (!session) {
    throw new Error("No session found");
  }

  const db = await getDb();

  const user = (
    await db.select<
      (DBUser & {
        role_name: UserRole;
      })[]
    >(
      `
        SELECT
          u.*,
          r.name as role_name
        FROM users u
        INNER JOIN roles r
          ON r.id = u.role_id
        WHERE u.id = ?
      `,
      [session.userId],
    )
  )[0];

  if (!user) {
    throw new Error("User not found");
  }

  return {
    ...mapDBUserToUser(user),
    role_name: user.role_name,
  };
}

export async function createInitialSetup(data: SetupFormData) {
  const db = await getDb();

  const ownerRole = (
    await db.select<{ id: number }[]>(
      `
        SELECT id
        FROM roles
        WHERE name = 'owner'
      `,
    )
  )[0];

  if (!ownerRole) {
    throw new Error("Owner role not found");
  }

  const passwordHash = await hashPassword(data.user.password);

  try {
    await db.execute(
      `
        INSERT INTO shops (
          name,
          phone,
          email,
          address,
          gst_number
        )
        VALUES (?, ?, ?, ?, ?)
      `,
      [
        data.shop.name,
        data.shop.phone,
        data.shop.email,
        data.shop.address,
        data.shop.gstNumber,
      ],
    );

    await db.execute(
      `
        INSERT INTO users (
          name,
          email,
          password_hash,
          role_id,
          created_by
        )
        VALUES (?, ?, ?, ?, NULL)
      `,
      [data.user.name, data.user.email, passwordHash, ownerRole.id],
    );
  } catch (error) {
    throw error;
  }
}

export async function login(data: LoginFormData): Promise<{ userId: number }> {
  const db = await getDb();

  const user = (
    await db.select<DBUser[]>(
      `
        SELECT *
        FROM users
        WHERE email = ?
      `,
      [data.email],
    )
  )[0];

  if (!user) {
    throw new Error("Invalid email or password");
  }

  if (!user.is_active) {
    throw new Error("User account is inactive");
  }

  const isValidPassword = await verifyPassword(
    data.password,
    user.password_hash,
  );

  if (!isValidPassword) {
    throw new Error("Invalid email or password");
  }

  await db.execute(
    `
      UPDATE users
      SET last_login_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `,
    [user.id],
  );

  return { userId: user.id };
}
