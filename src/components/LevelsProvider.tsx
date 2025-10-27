import { createContext, useContext } from "react";
import { LevelsProviderProps, LevelsProviderState } from "@/types";
import { useGetLevels } from "@/hooks/database/mongo";

const initialState: LevelsProviderState = {
  levels: [],
  isLoading: true,
  error: null,
};

const LevelsProviderContext = createContext<LevelsProviderState>(initialState);

export const LevelsProvider = ({ children, ...props }: LevelsProviderProps) => {
  const { levels, isLoading, error } = useGetLevels(
    import.meta.env.VITE_MONGO_LEVELS
  );

  const value: LevelsProviderState = {
    levels,
    isLoading,
    error,
  };

  return (
    <LevelsProviderContext.Provider {...props} value={value}>
      {children}
    </LevelsProviderContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLevelsContext = () => {
  const context = useContext(LevelsProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
