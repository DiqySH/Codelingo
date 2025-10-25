import { createBrowserRouter } from "react-router";
import HomePage from "@/pages/Home";
import NotFound from "../pages/NotFound";
import AuthLayout from "../layout/AuthLayout";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";

const router = createBrowserRouter([
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
    ],
  },
]);

export default router;
