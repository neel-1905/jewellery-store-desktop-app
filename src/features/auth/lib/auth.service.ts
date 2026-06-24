import { getDb } from "@/db/database";
import { getSession } from "./session";
import { DBUser, User, UserRole } from "../domain/auth.types";
import { mapDBUserToUser } from "../domain/user.mapper";

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
