import { getSession } from "@/features/auth/lib/session";
import AuthProvider from "@/providers/auth-provider";
import { Navigate, Outlet } from "react-router-dom";

function AuthGuard() {
  const session = getSession();

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

export default AuthGuard;
