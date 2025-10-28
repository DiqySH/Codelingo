import { createContext, useContext, useEffect } from "react";
import { AdminProviderProps, AdminsProviderState } from "@/types";
import { useGetAdmins } from "@/hooks/database/mongo";
import { useUser } from "@/context/user";
import { useNavigate } from "react-router";
import Loading from "../Loading";

const initialState: AdminsProviderState = {
  admins: [],
  isLoading: true,
  error: null,
  reFetch: false,
  setReFetch: () => {},
};

const AdminsProviderContext = createContext<AdminsProviderState>(initialState);

export const AdminsProvider = ({ children, ...props }: AdminProviderProps) => {
  const { admins, isLoading, error, reFetch, setReFetch } = useGetAdmins(
    import.meta.env.VITE_MONGO_ADMINS
  );

  const value: AdminsProviderState = {
    admins,
    isLoading,
    error,
    reFetch,
    setReFetch,
  };

  const { email } = useUser();
  const ADMIN_EMAILS = admins.map((admin) => admin.email);
  const navigate = useNavigate();

  useEffect(() => {
    if (admins.length == 0) {
      return;
    }
    if (ADMIN_EMAILS.includes(email as string)) {
      return;
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admins]);

  return (
    <AdminsProviderContext.Provider {...props} value={value}>
      {isLoading ? <Loading /> : children}
    </AdminsProviderContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAdminsContext = () => {
  const context = useContext(AdminsProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
