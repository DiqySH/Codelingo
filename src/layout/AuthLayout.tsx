import { Outlet } from "react-router";
import AuthStateChangeProvider from "../context/auth";
import { UserProvider } from "../context/user";

const AuthLayout = () => {
  return (
    <UserProvider>
      <AuthStateChangeProvider>
        <Outlet />
      </AuthStateChangeProvider>
    </UserProvider>
  );
};

export default AuthLayout;
