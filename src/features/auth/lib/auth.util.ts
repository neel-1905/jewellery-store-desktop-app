import { getCurrentUser } from "@/features/auth/lib/auth.service";

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}
