import { useAuthUser } from "@/features/auth/hooks/useAuthUser.hook";

function DashboardPage() {
  const { user } = useAuthUser();

  return <div>DashboardPage - {user?.email}</div>;
}

export default DashboardPage;
