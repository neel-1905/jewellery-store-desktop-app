import SplashScreen from "@/components/common/splash-screen";
import { isSetupCompleteQueryOptions } from "@/features/auth/lib/auth.query-options";
import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";

function SetupGuard() {
  const { data: isSetupComplete, isLoading } = useQuery(
    isSetupCompleteQueryOptions(),
  );

  if (isLoading) {
    return <SplashScreen />;
  }

  if (!isSetupComplete) {
    return <Navigate to="/setup" replace />;
  }

  return <Outlet />;
}

export default SetupGuard;
