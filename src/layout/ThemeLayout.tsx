import { ThemeProvider } from "@/components/provider/ThemeProvider";
import { Outlet } from "react-router";

const ThemeLayout = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Outlet />
    </ThemeProvider>
  );
};

export default ThemeLayout;
