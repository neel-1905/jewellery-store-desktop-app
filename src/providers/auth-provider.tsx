import { createContext } from "react";
import { User } from "@/features/auth/domain/auth.types";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUserQueryOptions } from "@/features/auth/lib/auth.query-options";
import SplashScreen from "@/components/common/splash-screen";
import { Navigate } from "react-router-dom";

export type AuthContextType = {
  user: User | null;
} | null;

export const AuthContext = createContext<AuthContextType>(null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery(getCurrentUserQueryOptions());

  if (isLoading) {
    return <SplashScreen />;
  }

  if (isError || !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
