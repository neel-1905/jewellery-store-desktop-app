import { DBUser, User } from "./auth.types";

export function mapDBUserToUser(dbUser: DBUser): User {
  return {
    id: dbUser.id,
    name: dbUser.name,
    email: dbUser.email,
    roleId: dbUser.role_id,
    isActive: dbUser.is_active,
    lastLoginAt: dbUser.last_login_at,
    createdAt: dbUser.created_at,
    updatedAt: dbUser.updated_at,
    createdBy: dbUser.created_by,
  };
}
