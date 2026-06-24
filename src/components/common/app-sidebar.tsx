import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { navLinks } from "@/constants/nav";
import DynamicLucideIcon from "./dynamic-lucide-icon";
import { Link, useLocation } from "react-router-dom";

export default function AppSidebar() {
  const currentPath = useLocation().pathname;

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <h1 className="text-xl font-bold">Jewellery App</h1>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarMenu>
          {navLinks.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className="transition-colors duration-200"
                isActive={currentPath === item.url}
              >
                <Link to={item.url}>
                  <DynamicLucideIcon name={item.icon} />
                  {item.title}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
