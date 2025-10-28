import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useGetLevels } from "@/hooks/database/mongo";
import { withProtected } from "@/hooks/use-protected";

const LevelsDashboard = () => {
  const { levels, isLoading } = useGetLevels(import.meta.env.VITE_MONGO_LEVELS);

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
