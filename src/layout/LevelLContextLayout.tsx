import { LevelsProvider } from "@/components/provider/LevelsProvider";
import { Outlet } from "react-router";

const LevelsContextLayout = () => {
  return (
    <LevelsProvider>
      <Outlet />
    </LevelsProvider>
  );
};

export default LevelsContextLayout;
