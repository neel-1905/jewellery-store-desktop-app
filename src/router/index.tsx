import { createMemoryRouter } from "react-router-dom";
import RootLayout from "@/components/common/root-layout";
import AuthGuard from "@/guards/auth-guard";
import SetupGuard from "@/guards/setup-guard";
import DashboardLayout from "@/features/dashboard/ui/dashboard-layout";

const router = createMemoryRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "setup",
        element: <p>setup page</p>,
      },
      {
        path: "login",
        element: <p>login page</p>,
      },
      {
        element: <SetupGuard />,
        children: [
          {
            element: <AuthGuard />,
            children: [
              {
                element: <DashboardLayout />,
                children: [
                  {
                    index: true,
                    element: <p>Dashboard</p>,
                  },

                  {
                    path: "customers",
                    element: <p>Customers</p>,
                  },

                  {
                    path: "orders",
                    element: <p>Orders</p>,
                  },

                  {
                    path: "users",
                    element: <p>Users</p>,
                  },

                  {
                    path: "settings",
                    element: <p>Settings</p>,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
