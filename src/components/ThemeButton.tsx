import { Button } from "./ui/button";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./provider/ThemeProvider";

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant="outline"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="hover:cursor-pointer"
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
};

export default ThemeButton;
