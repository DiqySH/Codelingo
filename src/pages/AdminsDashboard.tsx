import { withProtected } from "@/hooks/use-protected";
import { DataTable } from "@/components/DataTable";

const AdminsDashboard = () => {
  return (
    <div className="w-full min-h-screen px-4 flex justify-center">
      <DataTable />
    </div>
  );
};

const AdminsDashboardPage = withProtected(AdminsDashboard);
export default AdminsDashboardPage;
