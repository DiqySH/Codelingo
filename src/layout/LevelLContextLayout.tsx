import { LevelsProvider } from "@/components/LevelsProvider";
import { Outlet } from "react-router";

const LevelsContextLayout = () => {
  return (
    <LevelsProvider>
      <Outlet />
    </LevelsProvider>
  );
};

export default LevelsContextLayout;
