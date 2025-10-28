import { AdminsProvider } from "@/components/provider/AdminsProvider";
import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

const AdminsContextLayout = () => {
  return (
    <AdminsProvider>
      <SidebarProvider>
        <AppSidebar />
        <Outlet />
      </SidebarProvider>
    </AdminsProvider>
  );
};

export default AdminsContextLayout;
