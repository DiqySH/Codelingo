import { Button } from "@/components/ui/button";
import useRealtimeValue from "@/hooks/database/use-realtime-value";
import { withProtected } from "@/hooks/use-protected";
import { LevelObject } from "@/types";
import { useNavigate } from "react-router";

const Levels = () => {
  const { data: levels } = useRealtimeValue<LevelObject[]>("/levels");
  const navigate = useNavigate();
  return (
    <div>
      {levels?.map((level, idx) => (
        <div className="flex flex-col" key={level.question}>
          <p>Level {idx}</p>
          <Button className="w-fit" onClick={() => navigate(`/levels/${idx}`)}>
            Start
          </Button>
        </div>
      ))}
    </div>
  );
};

const LevelsPage = withProtected(Levels);
export default LevelsPage;
