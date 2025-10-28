import { createBrowserRouter } from "react-router";
import HomePage from "@/pages/Home";
import NotFound from "../pages/NotFound";
import AuthLayout from "../layout/AuthLayout";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import LevelPage from "@/pages/Level";
import LevelsPage from "@/pages/Levels";
import ThemeLayout from "@/layout/ThemeLayout";
import LevelsContextLayout from "@/layout/LevelLContextLayout";
import AdminLayout from "@/layout/AdminLayout";
import LevelsDashboardPage from "@/pages/LevelsDashboard";
import AdminsDashboardPage from "@/pages/AdminsDashboard";

const router = createBrowserRouter([
  {
    element: <ThemeLayout />,
    children: [
      {
        path: "/*",
        element: <NotFound />,
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/register",
            element: <RegisterPage />,
          },
          {
            element: <AdminLayout />,
            children: [
              {
                path: "/dashboard/levels",
                element: <LevelsDashboardPage />,
              },
              {
                path: "/dashboard/admins",
                element: <AdminsDashboardPage />,
              },
            ],
          },
          {
            element: <LevelsContextLayout />,
            children: [
              {
                path: "/levels",
                element: <LevelsPage />,
              },
              {
                path: "/levels/:level",
                loader: ({ params }) => {
                  return params.level;
                },
                element: <LevelPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
