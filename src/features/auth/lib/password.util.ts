import { invoke } from "@tauri-apps/api/core";

export async function hashPassword(password: string): Promise<string> {
  return invoke("hash_password", { password });
}

export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return invoke("verify_password", { password, hash });
}
