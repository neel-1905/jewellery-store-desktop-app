export type DBUser = {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role_id: number;
  is_active: number;
  last_login_at: string;
  created_at: string;
  updated_at: string;
  created_by: number;
};

export type User = {
  id: number;
  name: string;
  email: string;
  roleId: number;
  isActive: number;
  lastLoginAt: string;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
};

export type UserRole = "owner" | "manager" | "salesperson";
