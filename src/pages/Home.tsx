import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { withProtected } from "@/hooks/use-protected";
import { Sun, Moon } from "lucide-react";

const Home = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="w-full min-h-screen flex justify-center items-center gap-4">
      <Button
        variant="ghost"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <Sun /> : <Moon />}
      </Button>
      <h1 className="text-4xl">Codelingo</h1>
    </div>
  );
};

const HomePage = withProtected(Home);
export default HomePage;
