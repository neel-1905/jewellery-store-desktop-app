import { useContext } from "react";
import { AuthContext, AuthContextType } from "@/providers/auth-provider";

export function useAuthUser() {
  const context = useContext(AuthContext) as AuthContextType;

  if (!context) {
    throw new Error("useAuthUser must be used within an AuthProvider");
  }

  return context;
}
