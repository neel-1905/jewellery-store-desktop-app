import { Outlet } from "react-router-dom";
import AppSidebar from "@/components/common/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashboardHeader from "./dashboard-header";

function DashboardLayout() {
  return (
    <SidebarProvider className="h-screen">
      <AppSidebar />
      <SidebarInset className="overflow-hidden">
        <DashboardHeader />
        <div className="p-4 flex-1 overflow-y-auto app-scrollbar">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default DashboardLayout;
