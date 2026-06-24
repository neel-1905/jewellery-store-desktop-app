import { createMemoryRouter } from "react-router-dom";
import RootLayout from "@/components/common/root-layout";
import ProtectedLayout from "@/components/common/protected-layout";

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
        element: <ProtectedLayout />,
        children: [
          {
            index: true,
            element: <p>dashboard page</p>,
          },
        ],
      },
    ],
  },
]);

export default router;
