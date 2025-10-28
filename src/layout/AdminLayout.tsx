import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useUser } from "@/context/user";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

const AdminLayout = () => {
  const { email } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (email !== "margolang55@gmail.com") navigate("/");
  }, [email, navigate]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <Outlet />
    </SidebarProvider>
  );
};

export default AdminLayout;
