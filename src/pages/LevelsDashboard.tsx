import Loading from "@/components/Loading";
import { Card, CardContent } from "@/components/ui/card";
import { useGetLevels } from "@/hooks/database/mongo";
import { withProtected } from "@/hooks/use-protected";

const LevelsDashboard = () => {
  const { levels, isLoading } = useGetLevels(import.meta.env.VITE_MONGO_LEVELS);

  return isLoading ? (
    <Loading />
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
