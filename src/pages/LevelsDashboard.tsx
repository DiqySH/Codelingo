import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useUser } from "@/context/user";
import { useGetLevels } from "@/hooks/database/mongo";
import { withProtected } from "@/hooks/use-protected";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const LevelsDashboard = () => {
  const { levels, isLoading } = useGetLevels(import.meta.env.VITE_MONGO_LEVELS);
  const user = useUser();
  const { email } = user;
  const navigate = useNavigate();

  useEffect(() => {
    if (email !== "margolang55@gmail.com") navigate("/");
  }, []);

  return isLoading ? (
    <div className="w-fu min-h-screen grid place-items-center">
      <Spinner />
    </div>
  ) : (
    <div>
      {levels.map((level) => (
        <Card key={level._id} className="w-fit">
          <CardContent>
            <p>{level.title}</p>
            <p>{level.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const LevelsDashboardPage = withProtected(LevelsDashboard);
export default LevelsDashboardPage;
