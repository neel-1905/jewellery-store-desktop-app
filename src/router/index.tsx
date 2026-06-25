import { createMemoryRouter } from "react-router-dom";
import RootLayout from "@/components/common/root-layout";
import AuthGuard from "@/guards/auth-guard";
import SetupGuard from "@/guards/setup-guard";
import DashboardLayout from "@/features/dashboard/ui/dashboard-layout";
import SetupPage from "@/features/auth/ui/setup-page";
import LoginPage from "@/features/auth/ui/login-page";
import DashboardPage from "@/features/dashboard/ui/dashboard-page";
import CustomerPage from "@/features/customer/ui/customer-page";
import CustomerDetailsPage from "@/features/customer/ui/customer-details-page";
import OrdersPage from "@/features/order/ui/orders-page";

const router = createMemoryRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "setup",
        element: <SetupPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
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
                    element: <DashboardPage />,
                  },
                  {
                    path: "customers",
                    element: <CustomerPage />,
                  },
                  {
                    path: "customers/:customerId",
                    element: <CustomerDetailsPage />,
                  },

                  {
                    path: "orders",
                    element: <OrdersPage />,
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
