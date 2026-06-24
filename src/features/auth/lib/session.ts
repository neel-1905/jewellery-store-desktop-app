const SESSION_KEY = "auth_user";

export function setSession(userId: number) {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({
      userId,
    }),
  );
}

export function getSession(): { userId: number } | null {
  const session = localStorage.getItem(SESSION_KEY);

  return session ? JSON.parse(session) : null;
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
