import { SidebarTrigger } from "@/components/ui/sidebar";
import { headings } from "@/constants/headings";
import { useLocation } from "react-router-dom";

function DashboardHeader() {
  const pathname = useLocation().pathname;

  const heading =
    Object.entries(headings)
      .sort((a, b) => b[0].length - a[0].length) // longest match first
      .find(([path]) => pathname.startsWith(path))?.[1] ?? "Dashboard";

  return (
    <header className="sticky top-0 w-full border-b shadow-xs px-4 py-3">
      <div className="flex gap-2 items-center">
        <SidebarTrigger />
        <h1 className="text-2xl font-semibold">{heading}</h1>
      </div>
    </header>
  );
}

export default DashboardHeader;
