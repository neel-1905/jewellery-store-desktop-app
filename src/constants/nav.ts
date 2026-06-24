import { icons } from "lucide-react";

type IconName = keyof typeof icons;

export const navLinks: { title: string; url: string; icon: IconName }[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: "LayoutGrid",
  },
  {
    title: "Customers",
    url: "/customers",
    icon: "Users",
  },
  {
    title: "Orders",
    url: "/orders",
    icon: "ShoppingCart",
  },
  {
    title: "Users",
    url: "/users",
    icon: "UserCog",
  },
  {
    title: "Settings",
    url: "/settings",
    icon: "Settings",
  },
];
